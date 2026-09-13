import { describe, expect, it } from "vitest";
import { sortDoctors } from "../../src/domain/sort-doctors";

describe("sortDoctors", () => {
  it("ordina per il campo editoriale order senza mutare l'input", () => {
    const doctors = [{ order: 3 }, { order: 1 }, { order: 2 }] as const;

    expect(sortDoctors(doctors).map(({ order }) => order)).toEqual([1, 2, 3]);
    expect(doctors.map(({ order }) => order)).toEqual([3, 1, 2]);
  });
});
