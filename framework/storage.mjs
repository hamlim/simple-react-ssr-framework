import { AsyncLocalStorage } from "node:async_hooks";
import { Router } from "../public/router.mjs";

let storage = new AsyncLocalStorage();

/**
 * @typedef {Object} Store
 * @property {Request} request
 * @property {Object} context
 * @property {import("../public/router.mjs").Route} route
 * @property {import("../public/router.mjs").Router} router
 */

/**
 * Get the current store.
 * @returns {Object} The store.
 */
export function getStore() {
  let store = storage.getStore();

  if (!store) {
    throw new Error("Store not found!");
  }

  return store;
}

export function makeStorageMiddleware(routes) {
  let router = new Router(routes.map(([_, route]) => route));
  return async function storageMiddleware(context, next) {
    let route = router.match(new URL(context.req.raw.url));
    return await storage.run(
      {
        request: context.req.raw,
        context,
        route,
        router,
      },
      async () => {
        return await next();
      },
    );
  };
}
