/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

async function prepareApp() {
	// if (process.env.NODE_ENV === "development") {
	//   const { worker } = await import("./mocks/browser");
	//   return worker.start();
	// }

	return Promise.resolve();
}

prepareApp().then(() => {
	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<RemixBrowser />
			</StrictMode>,
		);
	});
});
