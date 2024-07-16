import { Link } from "@remix-run/react";

type Props = {
  comment: string;
};

export default function ChatSummary(props: Props) {
  return (
    <>
      <Link to={"/forum/1"}>
        <div className="w-auto h-96 border p-3 flex flex-col items-center justify-around">
          <div className="w-10/12 h-4/6 border bg-zinc-100 opacity-75">
            image
          </div>
          <div className="w-11/12 border p-1">
            <p className="whitespace-break-spaces">{props.comment}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
