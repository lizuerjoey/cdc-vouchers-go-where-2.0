import { describe, expect, it } from "vitest";

import { retrieveMerchantsForPrompt, searchMerchants } from "./merchant-search";

describe("searchMerchants", () => {
  it("filters cafes", () => {
    const results = searchMerchants({ category: "cafes" });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((merchant) => merchant.categories.includes("cafes"))).toBe(true);
  });

  it("filters lash lift merchants", () => {
    const results = searchMerchants({ category: "lash-lift" });

    expect(results.map((merchant) => merchant.name)).toContain("Serangoon Lash Studio");
  });

  it("combines query and category filters", () => {
    const results = searchMerchants({ query: "Katong", category: "cafes" });

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Katong Sourdough");
  });

  it("keeps optional Google place IDs optional", () => {
    const results = searchMerchants({ query: "Tampines" });

    expect(results[0]).toHaveProperty("googlePlaceId");
  });
});

describe("retrieveMerchantsForPrompt", () => {
  it("retrieves grounded merchants for chat", () => {
    const results = retrieveMerchantsForPrompt("lash lift near Serangoon");

    expect(results[0].name).toBe("Serangoon Lash Studio");
  });
});
