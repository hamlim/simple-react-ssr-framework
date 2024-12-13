import React from "react";
import { getStore } from "#framework/storage";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function IndexPage() {
	let store = getStore();
	console.log(Object.keys(store));
	return _jsxs("html", {
		lang: "en",
		className: "h-full",
		children: [_jsxs("head", { children: [_jsx("title", { children: "Hello World" }), _jsx("link", {
			rel: "stylesheet",
			href: "/static/style.css"
		})] }), _jsx("body", { children: _jsx("marquee", {
			className: "text-4xl",
			children: "Hello World"
		}) })]
	});
}
