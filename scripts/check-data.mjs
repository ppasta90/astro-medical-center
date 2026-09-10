import { existsSync, readFileSync, readdirSync } from "node:fs";

const doctors = JSON.parse(readFileSync("src/db/data.json", "utf8"));
const uniqueFields = ["id", "order", "slug"];

for (const field of uniqueFields) {
  const values = doctors.map((doctor) => doctor[field]);
  if (new Set(values).size !== values.length) {
    throw new Error(`Valori duplicati nel campo "${field}"`);
  }
}

for (const doctor of doctors) {
  if (doctor.id !== doctor.slug) {
    throw new Error(
      `${doctor.name} ${doctor.surname}: id e slug non coincidono`,
    );
  }

  if (!existsSync(`public/${doctor.image}`)) {
    throw new Error(`${doctor.name} ${doctor.surname}: immagine mancante`);
  }

  if (doctor.link) new URL(doctor.link);
}

const referencedImages = new Set(
  doctors.map(({ image }) => image.split("/").at(-1)),
);
const orphanImages = readdirSync("public/doctors-images").filter(
  (image) => !referencedImages.has(image),
);

if (orphanImages.length > 0) {
  throw new Error(
    `Immagini medico non referenziate: ${orphanImages.join(", ")}`,
  );
}

console.log(
  `${doctors.length} medici validati; nessun ID o asset duplicato/orfano.`,
);
