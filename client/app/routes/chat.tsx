import { Outlet } from "@remix-run/react";
import { useState } from "react";
import ChatHeader from "~/components/ChatHeader";
import ChatSideBar from "~/components/ChatSideBar";

const FRIEND_LIST = {
  user1: {
    name: "ユーザー1",
    latestComment: "これは改行されます。",
  },
  user2: {
    name: "ユーザー2",
    latestComment: "これは改行されます。",
  },
  user3: {
    name: "ユーザー3",
    latestComment: "これは改行されます。",
  },
};

export default function ChatLayout() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  return (
    <>
      <div>
        <ChatHeader handleSideBarOpen={() => setIsSideOpen((prev) => !prev)} />
      </div>
      <div className="flex flex-row">
        {isSideOpen && <ChatSideBar friendList={FRIEND_LIST} />}
        <div className="w-full flex justify-center mb-4">
          <div className="w-10/12">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
