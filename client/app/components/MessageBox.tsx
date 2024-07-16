type Props = {
  name: string;
  comment: string;
};

export default function MessageBox(props: Props) {
  return (
    <>
      <div className="w-full border p-2 flex rounded-xl">
        <p className="whitespace-break-spaces">{props.comment}</p>
      </div>
    </>
  );
}
