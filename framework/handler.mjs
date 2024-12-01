import { createElement } from "react";
import rds from "react-dom/server.browser";
import { getStore } from "./storage.mjs";

let { renderToReadableStream } = rds;

export async function handler(context) {
  let { route, request } = getStore();

  if (!route) {
    return new Response("Not found", { status: 404 });
  }

  let resolvedModule = await route.mod();

  if (route.type === "page") {
    // SSR
    let Component = resolvedModule.default;
    let stream = await renderToReadableStream(createElement(Component), {
      bootstrapScripts: ["/static/main.js"],
    });
    context.status(200);
    context.header("content-type", "text/html");
    return context.body(stream);
  }

  // API

  let handler = resolvedModule.default;
  return context.body(
    await handler(request, {
      params: route.matchedParams,
    }),
  );
}
