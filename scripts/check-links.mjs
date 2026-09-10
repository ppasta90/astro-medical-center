import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";

const htmlFiles = readdirSync("dist").filter((file) => file.endsWith(".html"));
const errors = [];

const outputPathFor = (pathname) => {
  if (pathname === "/") return "dist/index.html";
  if (extname(pathname)) return join("dist", pathname.slice(1));
  return join("dist", `${pathname.slice(1)}.html`);
};

for (const htmlFile of htmlFiles) {
  const sourcePath = join("dist", htmlFile);
  const html = readFileSync(sourcePath, "utf8");
  const attributes = html.matchAll(/(?:href|src)="([^"]+)"/g);

  for (const [, value] of attributes) {
    if (!value.startsWith("/")) continue;

    const url = new URL(value, "https://local.test");
    const targetPath = outputPathFor(decodeURIComponent(url.pathname));

    if (!existsSync(targetPath)) {
      errors.push(`${htmlFile}: ${value} non risolve a ${targetPath}`);
      continue;
    }

    if (url.hash && targetPath.endsWith(".html")) {
      const targetHtml = readFileSync(targetPath, "utf8");
      const id = decodeURIComponent(url.hash.slice(1));
      if (!targetHtml.includes(`id="${id}"`)) {
        errors.push(
          `${htmlFile}: destinazione #${id} assente in ${targetPath}`,
        );
      }
    }
  }
}

if (errors.length > 0) throw new Error(errors.join("\n"));
console.log(
  `Link e asset interni verificati in ${htmlFiles.length} pagine HTML.`,
);
