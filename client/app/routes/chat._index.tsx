import type { PartialMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Greeter } from "services/greeting_connect";
import type { GreetingMessage, Person } from "services/greeting_pb";
import ChatSummary from "~/components/ChatSummary";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Learning Forum" },
    { name: "10ch", content: "Welcome to 10ch!" },
  ];
};

// export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
//   const transport = createGrpcWebTransport({
//     baseUrl: "http://localhost:50051",
//   });
//   const client = createPromiseClient(Greeter, transport);
//
//   // PartialMessageを使用してリクエストメッセージのオブジェクトを定義
//   const name = params?.name || "No Name";
//   const person: PartialMessage<Person> = { name };
//
//   const greetingMessage: GreetingMessage = await client.sayHello(person);
//   console.log("greetingMessage: ", greetingMessage);
//   return greetingMessage;
// };

export default function Index() {
  // const greetingMessage = useLoaderData<typeof clientLoader>();
  return (
    <>
      <div className="w-full my-16 text-center">
        <h1 className="text-2xl animate-focus-in-contract">
          {/* {greetingMessage?.text} */}
          {`Hello ${localStorage.getItem("userName") || "Guest"}...`}
        </h1>
      </div>
      <Link to={"/chat/channel1"}>
        <div>aaaaaaaaa</div>
      </Link>
      <div className="grid grid-cols-3 gap-8">
        <div className="animate-fade-in">
          <ChatSummary comment={"これは一行目です。\nこれは改行されます。"} />
        </div>
        <div className="animate-fade-in">
          <ChatSummary
            comment={"このコメントはサンプルです。\nこれは改行されます。"}
          />
        </div>
        <div className="animate-fade-in">
          <ChatSummary comment={"これは一行目です。\nこれは改行されます。"} />
        </div>
        <div className="animate-fade-in">
          <ChatSummary comment={"これは一行目です。\nこれは改行されます。"} />
        </div>
        <div className="animate-fade-in">
          <ChatSummary
            comment={"このコメントはサンプルです。\nこれは改行されます。"}
          />
        </div>
        <div className="animate-fade-in">
          <ChatSummary comment={"これは一行目です。\nこれは改行されます。"} />
        </div>
      </div>
    </>
  );
}
