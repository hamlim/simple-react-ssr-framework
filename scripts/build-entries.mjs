import { existsSync } from "node:fs";
import { mkdir, readFile, rmdir, writeFile } from "node:fs/promises";
import { dirname, join as pathJoin } from "node:path";
import process from "node:process";
import oxc from "oxc-transform";
import { routes } from "../routes.gen.mjs";

try {
  await rmdir(pathJoin(process.cwd(), "./dist/app"), { recursive: true });
} catch {}

for (let [_, route] of routes) {
  let srcPath = pathJoin(process.cwd(), `./src/app${route.filePath}`);
  let distPath = pathJoin(process.cwd(), `./dist/app${route.filePath}`)
    .replace(".ts", ".js")
    .replace(".tsx", ".js")
    .replace(".jsx", ".js");

  let distDir = dirname(distPath);

  if (!existsSync(distDir)) {
    try {
      await mkdir(distDir, { recursive: true });
    } catch {}
  }

  let contents = await readFile(srcPath, "utf-8");

  let { code } = oxc.transform(srcPath, contents);

  await writeFile(distPath, code);
}
