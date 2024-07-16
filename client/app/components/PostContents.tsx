type Props = {
  isMe: boolean;
  name: string;
  comment: string;
};

export default function PostContents(props: Props) {
  return (
    <>
      <div className="w-full border-t border-b p-3 flex flex-row gap-4">
        {props.isMe ? (
          <>
            <div className="flex justify-center items-center">
              <div className="rounded-full w-6 h-6 bg-yellow-300"> </div>
            </div>
            <p className="flex-1 whitespace-break-spaces">{props.comment}</p>
          </>
        ) : (
          <>
            <p className="flex-1 whitespace-break-spaces">{props.comment}</p>
            <div className="flex justify-center items-center">
              <div className="rounded-full w-6 h-6 bg-sky-300"> </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
