export interface DoctorCatalogEntry {
  id: string;
  order: number;
  slug: string;
  name: string;
  surname: string;
  image: string;
}

export interface CatalogValidationOptions {
  imageFiles: readonly string[];
  imageSizes: Readonly<Record<string, number>>;
  maxImageBytes: number;
}

const fileName = (path: string) => path.split("/").at(-1) ?? path;

export const findCatalogErrors = (
  doctors: readonly DoctorCatalogEntry[],
  options: CatalogValidationOptions,
) => {
  const errors: string[] = [];

  for (const field of ["id", "order", "slug"] as const) {
    const doctorsByValue = new Map<string | number, DoctorCatalogEntry[]>();

    for (const doctor of doctors) {
      const value = doctor[field];
      doctorsByValue.set(value, [...(doctorsByValue.get(value) ?? []), doctor]);
    }

    for (const [value, conflicts] of doctorsByValue) {
      if (conflicts.length < 2) continue;

      const labels = conflicts
        .map(({ id, name, surname }) => `${name} ${surname} [${id}]`)
        .join(", ");
      errors.push(
        `Valore duplicato nel campo "${field}": "${value}" (${labels})`,
      );
    }
  }

  const availableImages = new Set(options.imageFiles);

  for (const doctor of doctors) {
    if (doctor.id !== doctor.slug) {
      errors.push(`${doctor.name} ${doctor.surname}: id e slug non coincidono`);
    }

    const image = fileName(doctor.image);
    if (!availableImages.has(image)) {
      errors.push(
        `${doctor.name} ${doctor.surname}: immagine mancante (${image})`,
      );
      continue;
    }

    if ((options.imageSizes[image] ?? 0) > options.maxImageBytes) {
      errors.push(
        `${doctor.name} ${doctor.surname}: immagine oltre ${options.maxImageBytes / 1024} KiB (${image})`,
      );
    }
  }

  const referencedImages = new Set(doctors.map(({ image }) => fileName(image)));
  const orphanImages = options.imageFiles
    .filter((image) => !referencedImages.has(image))
    .sort((first, second) => first.localeCompare(second, "it"));

  if (orphanImages.length > 0) {
    errors.push(`Immagini medico non referenziate: ${orphanImages.join(", ")}`);
  }

  return errors;
};

export const findMissingDoctorRoutes = (
  doctors: readonly Pick<DoctorCatalogEntry, "slug">[],
  outputFiles: readonly string[],
) => {
  const availableFiles = new Set(outputFiles);

  return doctors.flatMap(({ slug }) => {
    const outputFile = `${slug}.html`;
    return availableFiles.has(outputFile)
      ? []
      : [`Route medico mancante: dist/${outputFile}`];
  });
};
