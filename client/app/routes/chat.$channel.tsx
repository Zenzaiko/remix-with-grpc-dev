import type { PartialMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import {
	type ClientActionFunctionArgs,
	Form,
	redirect,
	useLoaderData,
	useParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { ChatReq } from "services/chat_connect";
import { Msg, type Req } from "services/chat_pb";
import MessageBox from "~/components/MessageBox";
import { CHANNELS_LIST } from "./chat._index";

import hyrax from "../images/animal_kiboshi_iwa_hyrax.png";

export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	const transport = createGrpcWebTransport({
		baseUrl: "http://localhost:50051",
	});
	const client = createPromiseClient(ChatReq, transport);

	// PartialMessageを使用してリクエストメッセージのオブジェクトを定義
	const userName = localStorage.getItem("userName") || "Guest";
	const channel = params?.channel || "Invalid";
	if (channel === "Invalid") return;
	const req: PartialMessage<Req> = {
		userName,
		channel,
	};

	const stream = client.connectServer(req);

	return { stream };
};

export const clientAction = async ({
	params,
	request,
}: ClientActionFunctionArgs) => {
	const transport = createGrpcWebTransport({
		baseUrl: "http://localhost:50051",
	});
	const client = createPromiseClient(ChatReq, transport);

	const formData = await request.formData();
	const userName = localStorage.getItem("userName") || "Guest";
	const content = formData.get("content") as string | undefined;
	const channel = params?.channel || "Invalid";

	if (!content || !channel) {
		throw new Error("Content and Channel must be provided");
	}

	const msg = new Msg({
		userName: userName,
		content: content,
		channel: channel,
		timestamp: BigInt(Date.now()),
	});

	await client.sendMsg(msg);

	return redirect(`/chat/${channel}`);
};

export default function ChatArea() {
	const { stream } = useLoaderData<typeof clientLoader>();
	const [messages, setMessages] = useState<Msg[]>([]);
	const params = useParams();
	const targetChannelData = CHANNELS_LIST.find(
		(channel) => channel.channel.toString() === params.channel,
	);

	useEffect(() => {
		const fetchMessages = async () => {
			const asyncStream = stream as unknown as AsyncIterable<Msg>;
			for await (const msg of asyncStream) {
				setMessages((prev) => [...prev, msg]);
			}
		};

		fetchMessages();
	}, [stream]);

	return (
		<>
			<div className="w-full border shadow">
				<div className="h-96 p-6 w-full bg-zinc-100 opacity-75 flex flex-row justify-around">
					<img
						src={hyrax}
						alt="MyAvatar"
						style={{
							viewTransitionName: `my-pic-${params.channel}`,
						}}
						className="max-w-1/2 h-auto"
					/>
					<img
						src={targetChannelData?.image}
						alt="Friend"
						style={{
							viewTransitionName: `friend-pic-${params.channel}`,
						}}
						className="max-w-1/2 h-auto"
					/>
				</div>
				<div className="flex flex-col gap-4 px-4">
					{messages.map((msg) => (
						<div key={msg.timestamp} className="w-full flex justify-start">
							<MessageBox
								name={msg.userName}
								timestamp={msg.timestamp}
								comment={msg.content}
							/>
						</div>
					))}
				</div>
				{/* <PostEdit forumId={1} /> */}
				<Form method="post">
					<input
						type="text"
						name="content"
						placeholder="Message"
						required
						className="border"
					/>
					<button type="submit" className="border">
						Send
					</button>
				</Form>
			</div>
		</>
	);
}
