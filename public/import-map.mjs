export let importMap = {
  imports: {
    react: "https://esm.sh/react@experimental",
    "react/": "https://esm.sh/react@experimental/",
    "react-dom": "https://esm.sh/react-dom@experimental",
    "react-dom/": "https://esm.sh/react-dom@experimental/",
    "#framework/storage": "./static/client-storage.mjs",
    "#framework/router": "./static/router.mjs",
    "#framework/import-map": "./static/import-map.mjs",
    "#client/import-map": "./static/import-map.mjs",
    "#dist/": "./static/dist/",
  },
};
