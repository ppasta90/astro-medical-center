import { getCollection } from "astro:content";

export const getDoctors = async () => {
  const entries = await getCollection("doctors");

  return entries
    .map(({ data }) => data)
    .sort(
      (first, second) =>
        first.surname.localeCompare(second.surname, "it") ||
        first.name.localeCompare(second.name, "it"),
    );
};
