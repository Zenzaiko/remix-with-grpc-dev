import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

export default function DynamicDateFormat({
	date,
	className,
}: {
	date: Date;
	className?: string;
}) {
	const diffInDays = differenceInDays(new Date(), date);
	let label = "";

	if (diffInDays < 8) {
		label = formatDistanceToNow(date, {
			locale: ja,
			addSuffix: true,
		});
	} else if (diffInDays < 365) {
		label = format(date, "MM月dd日");
	} else {
		label = format(date, "yyyy年MM月dd日");
	}

	return (
		<time className={className} title={format(date, "yyyy年MM月dd日")}>
			{label}
		</time>
	);
}
