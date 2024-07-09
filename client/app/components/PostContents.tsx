type Props = {
  name: string;
  comment: string;
};

export default function PostContents(props: Props) {
  return (
    <>
      <div className="border-t border-b p-3">
        <div className="flex gap-2">
          <p className="font-bold">{props.name}</p>
          <p>10分</p>
        </div>
        <p className="whitespace-break-spaces">{props.comment}</p>
      </div>
    </>
  );
}
