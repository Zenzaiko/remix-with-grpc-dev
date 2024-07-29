import type { MetaFunction } from "@remix-run/node";
import ChatSummary from "~/components/ChatSummary";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Learning Forum" },
    { name: "10ch", content: "Welcome to 10ch!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="w-full my-16 text-center">
        <h1 className="text-2xl animate-focus-in-contract">
          {`Hello ${localStorage.getItem("userName") || "Guest"}...`}
        </h1>
      </div>
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
