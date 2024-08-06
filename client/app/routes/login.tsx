import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useNavigate } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";

const REQUIRED_ERROR = "あなたの名前をタイプしてみる";
const DIGITS_ERROR = "16文字以下で入力する";

export const nameSchema = z
	.string({
		required_error: REQUIRED_ERROR,
		invalid_type_error: REQUIRED_ERROR,
	})
	.trim()
	.min(1, { message: REQUIRED_ERROR })
	.max(16, { message: DIGITS_ERROR });

const loginFormValidate = z.object({
	name: nameSchema,
});

export default function Login() {
	const navigate = useNavigate();
	const onSubmit = (data: { name: string }) => {
		localStorage.setItem("userName", data.name);
		navigate("/chat/");
	};

	const {
		register,
		handleSubmit,
		formState: { isDirty, errors },
	} = useForm({
		mode: "onChange",
		resolver: zodResolver(loginFormValidate),
		defaultValues: { name: "" },
	});

	console.debug(errors.name);

	return (
		<div className="absolute inset-0 top-16 flex flex-col gap-4 justify-center items-center">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" {...register("name")} className="border" />
					<Button type="submit" disabled={!isDirty || !!errors.name}>
						Go to home
					</Button>
				</div>
			</Form>
		</div>
	);
}
