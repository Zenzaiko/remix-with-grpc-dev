import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

// export const clientLoader = async () => {
//   return redirect("/login/");
// };

export default function Index() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/login");
	}, [navigate]);
	return (
		<>
			<div>Index</div>
		</>
	);
}
