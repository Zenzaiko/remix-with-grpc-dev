import { Link, unstable_useViewTransitionState } from "@remix-run/react";

type Props = {
  channel: number;
  comment: string;
  image: string;
};

export default function ChatSummary(props: Props) {
  const TO = `/chat/${props.channel}`;
  // TODO: 必要か検討
  const isTransitioning = unstable_useViewTransitionState(TO);

  return (
    <>
      <Link to={TO} unstable_viewTransition>
        <div className="border bg-zinc-100 opacity-75 ">
          <img
            src={props.image}
            alt="Friend"
            style={{
              viewTransitionName: `friend-pic-${props.channel}`,
            }}
          />
        </div>
        <div className="border p-2">
          <p className="whitespace-break-spaces text-sm">{props.comment}</p>
        </div>
      </Link>
    </>
  );
}
