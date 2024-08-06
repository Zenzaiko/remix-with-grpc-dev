import { Button } from "./button";

export function ButtonIcon({ ...props }) {
	return (
		<Button variant="outline" size="icon" {...props}>
			{props.children}
		</Button>
	);
}
