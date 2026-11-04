import { existsSync, readFileSync, readdirSync } from "node:fs";

const doctors = JSON.parse(readFileSync("src/db/data.json", "utf8"));
const uniqueFields = ["id", "slug"];
const expectedPublicContacts = {
  "bortot-urologa": { phone: undefined, email: "bgiulss88@gmail.com" },
  "cirillo-massofisioterapista": {
    phone: "3516592267",
    email: "jesjes@live.it",
  },
  "coppini-psicologa": {
    phone: "3508266621",
    email: "coppinicarlotta26@gmail.com",
  },
  "giannini-psicologa": {
    phone: "3294584304",
    email: "lauragiannini.psicologa@gmail.com",
  },
  "giovannuzzi-psichiatra": {
    phone: "3759043552",
    email: "irene.giovannuzzi3@gmail.com",
  },
  "marangella-psicologa-sessuologa": {
    phone: "3519834696",
    email: "marangelladalila@gmail.com",
  },
  "pellegrino-podologa": {
    phone: undefined,
    email: "dottssasandrapellegrino@gmail.com",
  },
};

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

  if (doctor.phone && !/^3\d{9}$/.test(doctor.phone)) {
    throw new Error(`${doctor.name} ${doctor.surname}: telefono non valido`);
  }

  if (doctor.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doctor.email)) {
    throw new Error(`${doctor.name} ${doctor.surname}: email non valida`);
  }
}

if (doctors.some(({ surname }) => surname === "Scandagli")) {
  throw new Error(
    "Scandagli deve essere rimossa dall'elenco degli specialisti",
  );
}

for (const [slug, expected] of Object.entries(expectedPublicContacts)) {
  const doctor = doctors.find((candidate) => candidate.slug === slug);

  if (!doctor) throw new Error(`Specialista atteso non trovato: ${slug}`);
  if (doctor.phone !== expected.phone || doctor.email !== expected.email) {
    throw new Error(`${slug}: recapiti pubblici non conformi`);
  }
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
