import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Forum from "../routes/forum.$forumId";

test("掲示板のタイトルが表示されているか", () => {
  render(<Forum />);
  const headerElement = screen.getByDisplayValue("サンプルプロジェクト1");
  expect(headerElement).toBeInTheDocument();
});
