import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const specializationToProfession: { [key: string]: string } = {
  "Oculistica": "oculista",
  "Endocrinologia": "endocrinologo",
  "Ginecologia": "ginecologo",
  "Podologia": "podologo",
  "Dermatologia": "dermatologo",
  "Urologia": "urologo",
  "Psicologia": "psicologo",
  "Psichiatria": "psichiatra",
  "Senologia": "senologo",
  "Ostetricia": "ostetrico",
  "Nutrizione": "nutrizionista",
  "Dietistica": "dietista",
  "Ecografia": "ecografista",
  "Massofisioterapia": "massofisioterapista",
  "Psiocologia e sessuologia": "psicologo-sessuologo"
};

export const generateDoctorSlug = (surname: string, specialization: string) => {
  const normalizedSurname = surname.toLowerCase().replace(/\s+/g, '-');
  const profession = specializationToProfession[specialization] || specialization.toLowerCase();
  const normalizedProfession = profession.replace(/\s+/g, '-');
  return `${normalizedSurname}-${normalizedProfession}`;
}
