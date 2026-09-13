import { describe, expect, it } from "vitest";
import { findBuildBudgetErrors } from "../../src/quality/build-budget";

describe("findBuildBudgetErrors", () => {
  it("segnala quando il JavaScript generato supera il limite complessivo", () => {
    const files = [
      { path: "dist/_astro/one.js", bytes: 60 * 1024 },
      { path: "dist/_astro/two.js", bytes: 41 * 1024 },
      { path: "dist/_astro/styles.css", bytes: 500 * 1024 },
    ];

    expect(findBuildBudgetErrors(files, 100 * 1024)).toEqual([
      "JavaScript generato oltre 100 KiB (101 KiB)",
    ]);
  });

  it("ignora gli asset non JavaScript", () => {
    const files = [{ path: "dist/_astro/image.webp", bytes: 2_000_000 }];

    expect(findBuildBudgetErrors(files, 100 * 1024)).toEqual([]);
  });
});
