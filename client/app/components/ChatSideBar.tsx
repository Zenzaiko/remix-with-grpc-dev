import { Link, useLocation } from "@remix-run/react";
import { PanelLeft } from "lucide-react";
import type { MouseEventHandler } from "react";
import { CHANNELS_LIST } from "~/routes/chat._index";
import { ButtonIcon } from "./ui/ButtonIcon";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const getChannelFromPath = (path: string): number | null => {
	const match = path.match(/\/chat\/(\d+)/);
	return match ? Number.parseInt(match[1], 10) : null;
};

type Props = {
	handleSideBarOpen: MouseEventHandler<HTMLButtonElement>;
};

export default function ChatSideBar(props: Props) {
	const location = useLocation();
	const channels = CHANNELS_LIST;

	const currentChannel = getChannelFromPath(location.pathname);

	return (
		<>
			<div
				className="w-80 h-screen border-r"
				style={{
					viewTransitionName: "sidebar",
				}}
			>
				<div className="p-2 border-b border-zinc-300">
					<nav>
						<ul className="flex space-x-4 items-center">
							<ButtonIcon
								className="border-none"
								onClick={props.handleSideBarOpen}
							>
								<PanelLeft className="h-4 w-4" />
							</ButtonIcon>
						</ul>
					</nav>
				</div>
				{channels.map((channel_data) => (
					<>
						{channel_data.channel === currentChannel ? (
							<div
								key={`channel${channel_data.channel}`}
								className="bg-zinc-200 border-b border-zinc-300 p-1 flex flex-row items-center gap-3"
							>
								<Avatar>
									<AvatarImage src={channel_data.image} alt="friend-icon" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<p className="text-xs text-zinc-700 whitespace-break-spaces">
									{channel_data.comment}
								</p>
							</div>
						) : (
							<Link
								to={`/chat/${channel_data.channel}`}
								unstable_viewTransition
								key={`channel${channel_data.channel}`}
								className="border-b border-zinc-300 p-1 flex flex-row items-center gap-3"
							>
								<Avatar>
									<AvatarImage src={channel_data.image} alt="friend-icon" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<p className="text-xs text-zinc-700 whitespace-break-spaces">
									{channel_data.comment}
								</p>
							</Link>
						)}
					</>
				))}
			</div>
		</>
	);
}
