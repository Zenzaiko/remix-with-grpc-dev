import { Outlet, useLocation } from "@remix-run/react";
import { useState } from "react";
import ChatHeader from "~/components/ChatHeader";
import ChatSideBar from "~/components/ChatSideBar";

export default function ChatLayout() {
	const location = useLocation();
	const [isSideOpen, setIsSideOpen] = useState(false);
	return (
		<>
			<div
				className="flex flex-row w-full"
				style={{
					viewTransitionName: isSideOpen ? "chat-to-chat" : "",
				}}
			>
				{isSideOpen && location.pathname !== "/chat/" && (
					<ChatSideBar
						handleSideBarOpen={() => setIsSideOpen((prev) => !prev)}
					/>
				)}
				<div className="w-full">
					<div>
						<ChatHeader
							handleSideBarOpen={(isOpen: boolean) => setIsSideOpen(isOpen)}
							isSideBarIconShow={!isSideOpen && location.pathname !== "/chat/"}
						/>
					</div>
					<div className="w-full flex justify-center mb-4">
						<div className="w-10/12">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
