import { describe, expect, it } from "vitest";
import { normalizePathname } from "../../src/lib/routes";

describe("normalizePathname", () => {
  it.each([
    ["/", "/"],
    ["/index.html", "/"],
    ["/specializzazioni.html", "/specializzazioni"],
    ["/specializzazioni/", "/specializzazioni"],
  ])("normalizza %s in %s", (pathname, expected) => {
    expect(normalizePathname(pathname)).toBe(expected);
  });
});
