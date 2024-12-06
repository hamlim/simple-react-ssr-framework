import { readFile } from "node:fs/promises";
import { join as pathJoin } from "node:path";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getMimeType } from "hono/utils/mime";
import { handler } from "#framework/handler";
import { makeStorageMiddleware } from "#framework/storage";
import { routes } from "./public/routes.gen.mjs";

let app = new Hono();

app.use(makeStorageMiddleware(routes));

app.use("/static/*", async (c, next) => {
  try {
    console.log(c.req.path);
    if (c.req.path.startsWith("/static/")) {
      if (c.req.path.startsWith("/static/dist/")) {
        let path = c.req.path.replace("/static/dist/", "./dist/");
        let contents = await readFile(pathJoin(process.cwd(), path), "utf8");
        return c.text(contents, 200, {
          "content-type": getMimeType(path),
        });
      }
      let path = c.req.path.replace("/static/", "./public/");
      let contents = await readFile(pathJoin(process.cwd(), path), "utf8");
      return c.text(contents, 200, {
        "content-type": getMimeType(path),
      });
    }
  } catch (e) {
    console.warn(`Could not find file ${c.req.path}`);
    await next();
  }
});

app.use("*", handler);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`); // Listening on http://localhost:3000
});
