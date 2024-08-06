import "@testing-library/jest-dom";
import { installGlobals } from "@remix-run/node";
import type React from "react";
import { vi } from "vitest";

installGlobals();

vi.mock("@remix-run/react", () => {
	const useNavigate = vi.fn();
	const form = vi
		.fn()
		.mockImplementation(({ children }: { children: React.ReactElement }) => {
			return children;
		});
	return {
		useNavigate,
		Form: form,
	};
});
