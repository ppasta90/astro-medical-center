import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  findBuildBudgetErrors,
  type BuildAsset,
} from "../src/quality/build-budget";

const collectAssets = (directory: string): BuildAsset[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? collectAssets(path)
      : [{ path, bytes: statSync(path).size }];
  });

const maxScriptBytes = 100 * 1024;
const errors = findBuildBudgetErrors(collectAssets("dist"), maxScriptBytes);

if (errors.length > 0) throw new Error(errors.join("\n"));

console.log("JavaScript generato entro il budget di 100 KiB.");
