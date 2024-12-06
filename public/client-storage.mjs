import { Router } from "#framework/router";
import { routes } from "./routes.gen.mjs";

function makeStore() {
  let router = new Router(routes.map(([_, route]) => route));

  return {
    request: new Request(window.location.href),
    // @TODO: What should be supported?
    context: {},
    route: router.match(new URL(window.location.href)),
    router: router,
  };
}

export function getStore() {
  return makeStore();
}
