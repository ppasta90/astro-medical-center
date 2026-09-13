import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { doctorSchema } from "@/domain/doctor";

const doctors = defineCollection({
  loader: file("src/db/data.json"),
  schema: doctorSchema,
});

export const collections = { doctors };
