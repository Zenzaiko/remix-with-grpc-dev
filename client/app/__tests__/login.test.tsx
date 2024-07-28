import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Login, { nameSchema } from "~/routes/login";

describe("ログイン画面: バリデーション", () => {
  test("should pass if name meets all criteria", () => {
    const result = nameSchema.safeParse("TestName");
    expect(result.success).toBe(true);
  });

  test("should fail if name is empty", () => {
    const result = nameSchema.safeParse("");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(
      "あなたの名前をタイプしてみる"
    );
  });

  test("should fail if name is null", () => {
    const result = nameSchema.safeParse(null);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(
      "あなたの名前をタイプしてみる"
    );
  });

  test("should fail if name is longer than 16 characters", () => {
    const result = nameSchema.safeParse("12345678901234567890");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("16文字以下で入力する");
  });
});

describe("ログイン画面", () => {
  test("初期表示時に非活性になっているか", async () => {
    render(<Login />);

    await waitFor(async () => {
      const loginButton = screen.getByRole("button");
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
    });
  });
});
