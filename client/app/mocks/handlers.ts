import { http, HttpResponse } from "msw";
import POSTS_DATA from "./response/POSTS_DATA.json";

export const handlers = [
	http.get("https://sample_domain/posts/1", () => {
		return HttpResponse.json(POSTS_DATA);
	}),
];
