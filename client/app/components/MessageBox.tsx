import DynamicDateFormat from "./ui/DynamicDateFormat";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

type Props = {
	name: string;
	timestamp: bigint;
	comment: string;
};

export default function MessageBox(props: Props) {
	return (
		<>
			<Card className="w-full">
				<CardDescription className="flex item-center place-items-center justify-start py-1 pl-2 gap-2">
					<p className="text-sm text-black">{props.name}</p>
					<DynamicDateFormat
						date={new Date(Number(props.timestamp))}
						className="text-xs"
					/>
				</CardDescription>
				<CardContent>{props.comment}</CardContent>
			</Card>
		</>
	);
}
