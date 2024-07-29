import type { PartialMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import {
  type ClientActionFunctionArgs,
  redirect,
  useLoaderData,
  Form,
  useParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { ChatReq } from "services/chat_connect";
import { Msg, type Req } from "services/chat_pb";
import MessageBox from "~/components/MessageBox";

export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:50051",
  });
  const client = createPromiseClient(ChatReq, transport);

  // PartialMessageを使用してリクエストメッセージのオブジェクトを定義
  const userName = localStorage.getItem("userName") || "Guest";
  const channel = params?.channel || "Invalid";
  if (channel === "Invalid") return;
  const req: PartialMessage<Req> = {
    userName,
    channel,
  };

  const stream = client.connectServer(req);

  return { stream };
};

export const clientAction = async ({
  params,
  request,
}: ClientActionFunctionArgs) => {
  const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:50051",
  });
  const client = createPromiseClient(ChatReq, transport);

  const formData = await request.formData();
  const userName = localStorage.getItem("userName") || "Guest";
  const content = formData.get("content") as string | undefined;
  const channel = params?.channel || undefined;

  if (!content || !channel) {
    throw new Error("Content and Channel must be provided");
  }

  const msg = new Msg({
    userName: userName,
    content: content,
    channel: channel,
    timestamp: BigInt(Date.now()),
  });

  await client.sendMsg(msg);

  return redirect(`/chat/${channel}`);
};

export default function ChatArea() {
  const { stream } = useLoaderData<typeof clientLoader>();
  const [messages, setMessages] = useState<Msg[]>([]);
  console.debug(stream);
  const params = useParams();

  useEffect(() => {
    console.debug("ここまでは走ってる");
    const fetchMessages = async () => {
      const asyncStream = stream as unknown as AsyncIterable<Msg>;
      for await (const msg of asyncStream) {
        console.debug(msg);
        setMessages((prev) => [...prev, msg]);
      }
    };

    fetchMessages();
  }, [stream]);

  return (
    <>
      <div className="border shadow">
        <div className="h-96 p-6">
          <div className="w-full h-full bg-zinc-100 opacity-75 flex flex-row justify-around">
            <img
              src="/public/images/animal_kiboshi_iwa_hyrax.png"
              alt="MyAvatar"
            />
            <img src="/public/images/animal_wani_water.png" alt="Friend" />
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4">
          {messages.map((msg) => (
            <div key={msg.timestamp} className="w-full flex justify-start">
              <MessageBox name={msg.userName} comment={msg.content} />
            </div>
          ))}
        </div>
        {/* <PostEdit forumId={1} /> */}
        <Form method="post">
          <input type="hidden" name="channel" value={params.channel} />
          <input type="text" name="content" placeholder="Message" required />
          <button type="submit">Send</button>
        </Form>
      </div>
    </>
  );
}
