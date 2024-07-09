import type { PartialMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Greeter } from "services/greeting_connect";
import type { GreetingMessage, Person } from "services/greeting_pb";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Learning Forum" },
    { name: "10ch", content: "Welcome to 10ch!" },
  ];
};

export const clientLoader = async () => {
  const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:50051",
  });
  const client = createPromiseClient(Greeter, transport);

  // PartialMessageを使用してリクエストメッセージのオブジェクトを定義
  const person: PartialMessage<Person> = { name: "Hiroaki" };

  const greetingMessage: GreetingMessage = await client.sayHello(person);
  console.log("greetingMessage: ", greetingMessage);
  return greetingMessage;
};

export default function Index() {
  const greetingMessage = useLoaderData<typeof clientLoader>();
  return (
    <div className="absolute inset-0 top-16 flex flex-col gap-4 justify-center items-center">
      <div>
        <h1 className="text-4xl animate-focus-in-contract">
          {greetingMessage?.text}
        </h1>
      </div>
      <div className="animate-fade-in">
        <Link to={"/forum/1"}>
          <div className="bg-gray-800 hover:bg-gray-700 text-white rounded px-4 py-2">
            Go to chat
          </div>
        </Link>
      </div>
    </div>
  );
}
