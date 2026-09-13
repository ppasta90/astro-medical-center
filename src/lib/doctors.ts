import { getCollection } from "astro:content";
import { sortDoctors } from "@/domain/sort-doctors";

export const getDoctors = async () => {
  const entries = await getCollection("doctors");

  return sortDoctors(entries.map(({ data }) => data));
};
