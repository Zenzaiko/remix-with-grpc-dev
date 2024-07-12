use forum::forum_req_server::{ForumReq, ForumReqServer};
use forum::{Forum, Msg, Req};
use greeting::greeter_server::{Greeter, GreeterServer};
use greeting::{GreetingMessage, Person};
use tonic::{transport::Server, Request, Response, Status};
use tonic_web::GrpcWebLayer;
use tower_http::cors::CorsLayer;

mod greeting {
    // greeting.protoから生成したRustコードを展開するマクロ
    tonic::include_proto!("greeting");
}

mod forum {
    tonic::include_proto!("forum");
}

#[derive(Default)]
struct MyGreeter {}

#[tonic::async_trait]
impl Greeter for MyGreeter {
    async fn say_hello(
        &self,
        request: Request<Person>,
    ) -> Result<Response<GreetingMessage>, Status> {
        // gRPCリクエストを入力値から参照する
        let name = request.into_inner().name;
        println!("Creating a greeting message for {:?}", name);
        // レスポンスの内容を作成する
        let greeting_message = GreetingMessage {
            text: format!("Hello {}...", name),
        };
        // gRPCレスポンスを作成する
        let response = Response::new(greeting_message);
        // gRPCレスポンスを返す
        Ok(response)
    }
}

#[derive(Default)]
struct MyForumReq {}

#[tonic::async_trait]
impl ForumReq for MyForumReq {
    async fn get_msg(&self, request: Request<Req>) -> Result<Response<Forum>, Status> {
        // リクエストの中身を取得
        let forum_id = request.into_inner().forum_id;
        println!("Creating a forum Object for {:?}", forum_id);
        // レスポンスの内容を作成
        let forum = Forum {
            forum_id,
            subject_name: "サンプルサブジェクト1".to_string(),
            post_data: vec![
                Msg {
                    id: "1".to_string(),
                    name: "user_1".to_string(),
                    comment: "このコメントはサンプルです。\nここで改行されます。\nこのコメントはgRPCで取得されています。".to_string(),
                },
                Msg {
                    id: "2".to_string(),
                    name: "user_2".to_string(),
                    comment: "このコメントはサンプルです。\nここで改行されます。\nこのコメントはgRPCで取得されています。".to_string(),
                },
                Msg {
                    id: "3".to_string(),
                    name: "user_3".to_string(),
                    comment: "このコメントはサンプルです。\nここで改行されます。\nこのコメントはgRPCで取得されています。".to_string(),
                },
            ],
        };
        // gRPCレスポンスを作成する
        let response = Response::new(forum);
        // gRPCレスポンスを返す
        Ok(response)
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "127.0.0.1:50051".parse()?;
    let greeter = MyGreeter::default();
    let greeter = GreeterServer::new(greeter);
    // let greeter = tonic_web::enable(greeter);
    let forum_req = MyForumReq::default();
    let forum_req = ForumReqServer::new(forum_req);

    let allow_cors = CorsLayer::new()
        .allow_origin(tower_http::cors::Any)
        .allow_headers(tower_http::cors::Any)
        .allow_methods(tower_http::cors::Any);

    println!("GreeterServer listening on {}", addr);
    println!("ForumServer listening on {}", addr);

    Server::builder()
        .accept_http1(true)
        .layer(allow_cors)
        .layer(GrpcWebLayer::new())
        .add_service(greeter)
        .add_service(forum_req)
        .serve(addr)
        .await?;
    Ok(())
}
