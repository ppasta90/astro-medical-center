import { existsSync } from "node:fs";
import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const doctors = defineCollection({
  loader: file("src/db/data.json"),
  schema: z
    .object({
      id: z.string().regex(slugPattern),
      order: z.number().int().positive(),
      slug: z.string().regex(slugPattern),
      honorific: z.enum(["Dott.", "Dott.ssa"]),
      professionTitle: z.string().trim().min(1),
      name: z.string().trim().min(1),
      surname: z.string().trim().min(1),
      image: z
        .string()
        .regex(/^doctors-images\/[a-z0-9-]+\.webp$/)
        .refine(
          (image) => existsSync(`public/${image}`),
          "Immagine medico mancante",
        ),
      bio: z.string().trim().min(20),
      specialization: z.string().trim().min(1),
      services: z.array(z.string().trim().min(1)),
      link: z.union([z.literal(""), z.string().url()]),
    })
    .refine(({ id, slug }) => id === slug, {
      message: "L'id della collection deve coincidere con lo slug stabile",
      path: ["slug"],
    }),
});

export const collections = { doctors };
