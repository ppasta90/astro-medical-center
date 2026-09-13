import { describe, expect, it } from "vitest";
import { doctorSchema, getExternalBookingUrl } from "../../src/domain/doctor";

const validDoctor = {
  id: "rossi-cardiologa",
  order: 1,
  slug: "rossi-cardiologa",
  honorific: "Dott.ssa",
  professionTitle: "Cardiologa",
  name: "Maria",
  surname: "Rossi",
  image: "doctors-images/rossi.webp",
  bio: "Biografia professionale completa della specialista.",
  specialization: "Dermatologia",
  services: ["visita specialistica"],
  booking: { kind: "phone" },
};

describe("doctorSchema", () => {
  it("accetta la prenotazione telefonica", () => {
    expect(doctorSchema.safeParse(validDoctor).success).toBe(true);
  });

  it("accetta una prenotazione esterna con URL valido", () => {
    const doctor = {
      ...validDoctor,
      booking: { kind: "external", url: "https://example.com/booking" },
    };

    expect(doctorSchema.safeParse(doctor).success).toBe(true);
  });

  it("rifiuta una prenotazione esterna senza URL", () => {
    const doctor = {
      ...validDoctor,
      booking: { kind: "external" },
    };

    expect(doctorSchema.safeParse(doctor).success).toBe(false);
  });

  it.each(["javascript:alert(document.domain)", "http://example.com/booking"])(
    "rifiuta l'URL di prenotazione non HTTPS %s",
    (url) => {
      const doctor = {
        ...validDoctor,
        booking: { kind: "external", url },
      };

      expect(doctorSchema.safeParse(doctor).success).toBe(false);
    },
  );

  it("restituisce un errore Zod per un URL malformato senza lanciare", () => {
    const doctor = {
      ...validDoctor,
      booking: { kind: "external", url: "not a url" },
    };

    expect(() => doctorSchema.safeParse(doctor)).not.toThrow();
    expect(doctorSchema.safeParse(doctor).success).toBe(false);
  });

  it("rifiuta una specializzazione non registrata", () => {
    const doctor = {
      ...validDoctor,
      specialization: "Cardiologia inventata",
    };

    expect(doctorSchema.safeParse(doctor).success).toBe(false);
  });

  it("rifiuta ID e slug diversi", () => {
    const doctor = { ...validDoctor, slug: "rossi-cardiologia" };

    expect(doctorSchema.safeParse(doctor).success).toBe(false);
  });
});

describe("getExternalBookingUrl", () => {
  it("restituisce l'URL per la prenotazione esterna", () => {
    expect(
      getExternalBookingUrl({
        kind: "external",
        url: "https://example.com/booking",
      }),
    ).toBe("https://example.com/booking");
  });

  it("non restituisce un URL per la prenotazione telefonica", () => {
    expect(getExternalBookingUrl({ kind: "phone" })).toBeUndefined();
  });
});
