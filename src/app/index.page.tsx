import { getStore } from "#framework/storage";

export default async function IndexPage() {
  let store = getStore();

  return (
    <html lang="en" className="h-full">
      <head>
        <title>Hello World</title>
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <marquee className="text-4xl">Hello World</marquee>
      </body>
    </html>
  );
}
