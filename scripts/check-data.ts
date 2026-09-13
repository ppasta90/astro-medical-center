import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { findCatalogErrors } from "../src/domain/doctor-catalog";
import { doctorSchema } from "../src/domain/doctor";

const imageDirectory = "public/doctors-images";
const maxImageBytes = 500 * 1024;
const source = JSON.parse(readFileSync("src/db/data.json", "utf8"));
const result = doctorSchema.array().safeParse(source);

if (!result.success) {
  throw new Error(
    result.error.issues
      .map(({ message, path }) => `${path.join(".")}: ${message}`)
      .join("\n"),
  );
}

const imageFiles = readdirSync(imageDirectory);
const imageSizes = Object.fromEntries(
  imageFiles.map((image) => [
    image,
    statSync(join(imageDirectory, image)).size,
  ]),
);
const errors = findCatalogErrors(result.data, {
  imageFiles,
  imageSizes,
  maxImageBytes,
});

if (errors.length > 0) throw new Error(errors.join("\n"));

console.log(
  `${result.data.length} medici validati; dati, route e immagini coerenti.`,
);
