import { getCollection } from "astro:content";

export const getDoctors = async () => {
  const entries = await getCollection("doctors");

  return entries
    .map(({ data }) => data)
    .sort((first, second) => first.order - second.order);
};
