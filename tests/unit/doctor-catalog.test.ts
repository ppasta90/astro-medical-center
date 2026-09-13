import { describe, expect, it } from "vitest";
import {
  findCatalogErrors,
  findMissingDoctorRoutes,
} from "../../src/domain/doctor-catalog";

const doctor = {
  id: "rossi-dermatologa",
  order: 1,
  slug: "rossi-dermatologa",
  name: "Maria",
  surname: "Rossi",
  image: "doctors-images/rossi.webp",
};

const validOptions = {
  imageFiles: ["rossi.webp"],
  imageSizes: { "rossi.webp": 100_000 },
  maxImageBytes: 500 * 1024,
};

describe("findCatalogErrors", () => {
  it.each(["id", "slug", "order"] as const)(
    "segnala valori duplicati per %s",
    (field) => {
      const duplicate = {
        ...doctor,
        id: "bianchi-dermatologo",
        slug: "bianchi-dermatologo",
        name: "Andrea",
        surname: "Bianchi",
        order: 2,
        [field]: doctor[field],
      };

      expect(findCatalogErrors([doctor, duplicate], validOptions)).toContain(
        `Valore duplicato nel campo "${field}": "${doctor[field]}" (Maria Rossi [rossi-dermatologa], Andrea Bianchi [${duplicate.id}])`,
      );
    },
  );

  it("segnala ID e slug diversi", () => {
    const invalid = { ...doctor, slug: "rossi-dermatologia" };

    expect(findCatalogErrors([invalid], validOptions)).toContain(
      "Maria Rossi: id e slug non coincidono",
    );
  });

  it("segnala un'immagine mancante", () => {
    expect(
      findCatalogErrors([doctor], { ...validOptions, imageFiles: [] }),
    ).toContain("Maria Rossi: immagine mancante (rossi.webp)");
  });

  it("segnala un'immagine orfana", () => {
    expect(
      findCatalogErrors([doctor], {
        ...validOptions,
        imageFiles: ["rossi.webp", "orfana.webp"],
      }),
    ).toContain("Immagini medico non referenziate: orfana.webp");
  });

  it("segnala un'immagine oltre il budget", () => {
    expect(
      findCatalogErrors([doctor], {
        ...validOptions,
        imageSizes: { "rossi.webp": 500 * 1024 + 1 },
      }),
    ).toContain("Maria Rossi: immagine oltre 500 KiB (rossi.webp)");
  });

  it("non produce errori per un catalogo valido", () => {
    expect(findCatalogErrors([doctor], validOptions)).toEqual([]);
  });
});

describe("findMissingDoctorRoutes", () => {
  it("segnala la pagina statica mancante per uno slug", () => {
    expect(findMissingDoctorRoutes([doctor], [])).toEqual([
      "Route medico mancante: dist/rossi-dermatologa.html",
    ]);
  });

  it("accetta la pagina statica generata per lo slug", () => {
    expect(
      findMissingDoctorRoutes([doctor], ["rossi-dermatologa.html"]),
    ).toEqual([]);
  });
});
