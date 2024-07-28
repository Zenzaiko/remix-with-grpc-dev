import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form } from "@remix-run/react";
import { SendHorizontal } from "lucide-react";
import { z } from "zod";
import { ButtonIcon } from "./ui/ButtonIcon";

const schema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .max(16, { message: "16文字以下で入力してください。" }),
});

export default function MessageEdit() {
  const [form, { name }] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  return (
    <>
      <Form method="post" {...getFormProps(form)}>
        <div>
          <label>Name</label>
          <input {...getInputProps(name, { type: "text" })} />
          {name.errors && (
            <div>
              {name.errors.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          )}
        </div>
        <ButtonIcon className="border-none" type="submit">
          <SendHorizontal className="h-4 w-4" />
        </ButtonIcon>
      </Form>
    </>
  );
}
