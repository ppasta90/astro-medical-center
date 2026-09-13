import { z } from "astro/zod";

export const SPECIALIZATIONS = [
  "Dermatologia",
  "Dietistica",
  "Ecografia",
  "Endocrinologia",
  "Fisioterapia",
  "Ginecologia",
  "Massofisioterapia",
  "Nutrizione",
  "Podologia",
  "Psichiatria",
  "Psicologia",
  "Psicologia e sessuologia",
  "Urologia",
] as const;

export type Specialization = (typeof SPECIALIZATIONS)[number];

const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const bookingSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("external"),
    url: z.string().url().refine(isHttpsUrl, {
      message: "L'URL di prenotazione deve usare HTTPS",
    }),
  }),
  z.object({ kind: z.literal("phone") }),
]);

export type DoctorBooking = z.infer<typeof bookingSchema>;

export const getExternalBookingUrl = (booking: DoctorBooking) => {
  switch (booking.kind) {
    case "external":
      return booking.url;
    case "phone":
      return undefined;
    default:
      return booking satisfies never;
  }
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const doctorSchema = z
  .object({
    id: z.string().regex(slugPattern),
    order: z.number().int().positive(),
    slug: z.string().regex(slugPattern),
    honorific: z.enum(["Dott.", "Dott.ssa"]),
    professionTitle: z.string().trim().min(1),
    name: z.string().trim().min(1),
    surname: z.string().trim().min(1),
    image: z.string().regex(/^doctors-images\/[a-z0-9-]+\.webp$/),
    bio: z.string().trim().min(20),
    specialization: z.enum(SPECIALIZATIONS),
    services: z.array(z.string().trim().min(1)),
    booking: bookingSchema,
  })
  .refine(({ id, slug }) => id === slug, {
    message: "L'id della collection deve coincidere con lo slug stabile",
    path: ["slug"],
  });

export type DoctorData = z.infer<typeof doctorSchema>;
