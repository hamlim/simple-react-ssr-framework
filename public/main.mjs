import { createElement } from "react";
import { hydrateRoot } from "react-dom/client";
import { getStore } from "#framework/storage";

let store = getStore();

if (store.route.type === "page") {
  let component = (await store.route.mod()).default;
  hydrateRoot(document, createElement(component));
} else {
  throw new Error("Unsupported route type");
}
