export const normalizePathname = (pathname: string) => {
  const withoutIndex = pathname.replace(/\/index\.html$/, "/");
  const withoutExtension = withoutIndex.replace(/\.html$/, "");

  if (withoutExtension === "/") return "/";
  return withoutExtension.replace(/\/+$/, "");
};
