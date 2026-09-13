export interface BuildAsset {
  path: string;
  bytes: number;
}

export const findBuildBudgetErrors = (
  assets: readonly BuildAsset[],
  maxScriptBytes: number,
) => {
  const scriptBytes = assets
    .filter(({ path }) => path.endsWith(".js"))
    .reduce((total, { bytes }) => total + bytes, 0);

  if (scriptBytes <= maxScriptBytes) return [];

  return [
    `JavaScript generato oltre ${maxScriptBytes / 1024} KiB (${Math.ceil(scriptBytes / 1024)} KiB)`,
  ];
};
