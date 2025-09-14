import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const specializationToProfession: { [key: string]: { male: string; female: string } } = {
  "Audiologia": { male: "audiologo", female: "audiologa" },
  "Oculistica": { male: "oculista", female: "oculista" },
  "Endocrinologia": { male: "endocrinologo", female: "endocrinologa" },
  "Ginecologia": { male: "ginecologo", female: "ginecologa" },
  "Podologia": { male: "podologo", female: "podologa" },
  "Dermatologia": { male: "dermatologo", female: "dermatologa" },
  "Urologia": { male: "urologo", female: "urologa" },
  "Psicologia": { male: "psicologo", female: "psicologa" },
  "Psichiatria": { male: "psichiatra", female: "psichiatra" },
  "Senologia": { male: "senologo", female: "senologa" },
  "Ostetricia": { male: "ostetrico", female: "ostetrica" },
  "Nutrizione": { male: "nutrizionista", female: "nutrizionista" },
  "Dietistica": { male: "dietista", female: "dietista" },
  "Ecografia": { male: "ecografista", female: "ecografista" },
  "Massofisioterapia": { male: "massofisioterapista", female: "massofisioterapista" },
  "Psiocologia e sessuologia": { male: "psicologo-sessuologo", female: "psicologa-sessuologa" }
};

const detectGender = (name: string): 'male' | 'female' => {
  // Common Italian female names
  const femaleNames = ['alessia', 'giulia', 'anna', 'ilaria', 'linda', 'sandra', 'francesca', 'dalila', 'jessica', 'marianna', 'laura', 'ilenia', 'serena', 'rachele', 'carlotta'];
  // Names that end with 'a' are typically female in Italian, except for some exceptions
  const maleExceptions = ['andrea', 'luca', 'nicola', 'mattia'];

  const normalizedName = name.toLowerCase().trim();

  // Check if it's a known female name
  if (femaleNames.includes(normalizedName)) {
    return 'female';
  }

  // Check if it's a male exception
  if (maleExceptions.includes(normalizedName)) {
    return 'male';
  }

  // If name ends with 'a' and is not a male exception, it's likely female
  if (normalizedName.endsWith('a')) {
    return 'female';
  }

  // Default to male for other cases
  return 'male';
};

export const generateDoctorSlug = (surname: string, specialization: string, name?: string) => {
  const normalizedSurname = surname.toLowerCase().replace(/\s+/g, '-');

  let profession: string;
  if (name && specializationToProfession[specialization]) {
    const gender = detectGender(name);
    profession = specializationToProfession[specialization][gender];
  } else {
    profession = specializationToProfession[specialization]?.male || specialization.toLowerCase();
  }

  const normalizedProfession = profession.replace(/\s+/g, '-');
  return `${normalizedSurname}-${normalizedProfession}`;
}
