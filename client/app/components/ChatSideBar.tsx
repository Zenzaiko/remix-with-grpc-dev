type Props = {
  friendList: {
    [userId: string]: {
      name: string;
      latestComment: string;
    };
  };
};

export default function ChatSideBar(props: Props) {
  return (
    <>
      <div className="bg-gray-700 w-96">aaa</div>
    </>
  );
}
