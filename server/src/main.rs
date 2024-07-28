use chrono::Utc;
use futures::{Stream, StreamExt};
use std::collections::HashMap;
use std::pin::Pin;
use std::sync::Arc;
use tokio::sync::{mpsc, RwLock};
use tokio_stream::wrappers::ReceiverStream;
use tonic::{transport::Server, Request, Response, Status};
use tonic_web::GrpcWebLayer;
use tower_http::cors::CorsLayer;

mod chat {
    tonic::include_proto!("chat");
}

use chat::chat_req_server::{ChatReq, ChatReqServer};
use chat::{Empty, Msg, Req};

#[derive(Debug)]
pub struct Shared {
    pub channels: HashMap<String, HashMap<String, mpsc::Sender<Msg>>>,
}

impl Shared {
    pub fn new() -> Self {
        Shared {
            channels: HashMap::new(),
        }
    }

    pub async fn broadcast(&self, msg: Msg, channel: &str) {
        if let Some(users) = self.channels.get(channel) {
            for (name, tx) in users {
                match tx.send(msg.clone()).await {
                    Ok(_) => {}
                    Err(_) => {
                        println!("[Broadcast] SendError: to {}, {:?}", name, msg)
                    }
                }
            }
        }
    }
}

impl Default for Shared {
    fn default() -> Self {
        Self::new()
    }
}

#[derive(Debug)]
pub struct ChatService {
    shared: Arc<RwLock<Shared>>,
}

impl ChatService {
    pub fn new(shared: Arc<RwLock<Shared>>) -> Self {
        ChatService { shared }
    }
}

#[tonic::async_trait]
impl ChatReq for ChatService {
    type ConnectServerStream =
        Pin<Box<dyn Stream<Item = Result<Msg, Status>> + Send + Sync + 'static>>;

    async fn connect_server(
        &self,
        request: Request<Req>,
    ) -> Result<Response<Self::ConnectServerStream>, Status> {
        let req = request.into_inner();
        let name = req.user_name;
        let channel = req.channel;
        let (tx, mut rx) = mpsc::channel(32);
        let (stream_tx, stream_rx) = mpsc::channel(32);

        {
            let mut shared = self.shared.write().await;
            let channel_users = shared
                .channels
                .entry(channel.clone())
                .or_insert_with(HashMap::new);
            channel_users.insert(name.clone(), tx.clone());
        }

        let shared_clone = self.shared.clone();

        tokio::spawn(async move {
            while let Some(msg) = rx.recv().await {
                match stream_tx.send(msg).await {
                    Ok(_) => {}
                    Err(_) => {
                        println!("Stream tx sending error for user: {}", &name);
                        let mut shared = shared_clone.write().await;
                        if let Some(channel_users) = shared.channels.get_mut(&channel) {
                            channel_users.remove(&name);
                            if channel_users.is_empty() {
                                shared.channels.remove(&channel);
                            }
                        }
                        break;
                    }
                }
            }
        });

        let stream = ReceiverStream::new(stream_rx).map(Ok);
        Ok(Response::new(Box::pin(stream) as Self::ConnectServerStream))
    }

    async fn send_msg(&self, request: Request<Msg>) -> Result<Response<Empty>, Status> {
        let req_data = request.into_inner();
        let msg = Msg {
            user_name: req_data.user_name,
            content: req_data.content,
            channel: req_data.channel.clone(),
            timestamp: Utc::now().timestamp_millis(),
        };

        self.shared
            .read()
            .await
            .broadcast(msg, &req_data.channel)
            .await;
        Ok(Response::new(Empty {}))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "127.0.0.1:50051".parse()?;

    let shared = Arc::new(RwLock::new(Shared::default()));
    let chat_service = ChatService::new(shared.clone());
    let chat_service = ChatReqServer::new(chat_service);

    let allow_cors = CorsLayer::new()
        .allow_origin(tower_http::cors::Any)
        .allow_headers(tower_http::cors::Any)
        .allow_methods(tower_http::cors::Any);

    Server::builder()
        .accept_http1(true)
        .layer(allow_cors)
        .layer(GrpcWebLayer::new())
        .add_service(chat_service)
        .serve(addr)
        .await?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use tokio::sync::mpsc;

    #[tokio::test]
    async fn test_broadcast() {
        let mut shared = Shared::new();
        let (tx1, mut rx1) = mpsc::channel(32);
        let (tx2, mut rx2) = mpsc::channel(32);

        shared
            .channels
            .insert("channel1".to_string(), HashMap::new());
        shared
            .channels
            .get_mut("channel1")
            .unwrap()
            .insert("user1".to_string(), tx1);
        shared
            .channels
            .get_mut("channel1")
            .unwrap()
            .insert("user2".to_string(), tx2);

        let msg = Msg {
            user_name: "test_user".to_string(),
            content: "Hello, world!".to_string(),
            channel: "channel1".to_string(),
            timestamp: Utc::now().timestamp_millis(),
        };

        shared.broadcast(msg.clone(), "channel1").await;

        assert_eq!(rx1.recv().await.unwrap(), msg);
        assert_eq!(rx2.recv().await.unwrap(), msg);
    }

    #[tokio::test]
    async fn test_add_user_to_channel() {
        let shared = Arc::new(RwLock::new(Shared::new()));
        let (tx, _) = mpsc::channel(32);

        let user_name = "user1".to_string();
        let channel = "channel1".to_string();

        {
            let mut shared = shared.write().await;
            let channel_users = shared
                .channels
                .entry(channel.clone())
                .or_insert_with(HashMap::new);
            channel_users.insert(user_name.clone(), tx.clone());
        }

        let shared_read = shared.read().await;
        assert!(shared_read
            .channels
            .get("channel1")
            .unwrap()
            .contains_key(&user_name));
    }
}
