import { merchants } from "@/data/merchants";
import type { ChatMerchant, Merchant, MerchantSearchParams } from "@/lib/types";

const searchableText = (merchant: Merchant) =>
  [
    merchant.name,
    merchant.description,
    merchant.address,
    merchant.postalCode,
    merchant.district,
    merchant.voucherType,
    merchant.categories.join(" "),
    merchant.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

export function getDistricts() {
  return Array.from(new Set(merchants.map((merchant) => merchant.district))).sort();
}

export function searchMerchants(params: MerchantSearchParams = {}) {
  const query = params.query?.trim().toLowerCase();

  return merchants.filter((merchant) => {
    if (query && !searchableText(merchant).includes(query)) {
      return false;
    }

    if (params.category && params.category !== "all" && !merchant.categories.includes(params.category)) {
      return false;
    }

    if (params.district && params.district !== "all" && merchant.district !== params.district) {
      return false;
    }

    if (params.voucherType && params.voucherType !== "all" && merchant.voucherType !== params.voucherType) {
      return false;
    }

    return true;
  });
}

export function getMerchantById(id: string) {
  return merchants.find((merchant) => merchant.id === id);
}

export function retrieveMerchantsForPrompt(prompt: string, limit = 4): ChatMerchant[] {
  const normalizedPrompt = prompt.toLowerCase();
  const terms = normalizedPrompt
    .split(/[^a-z0-9]+/i)
    .map((term) => term.trim())
    .filter((term) => term.length > 2);

  const scored = merchants.map((merchant) => {
    const haystack = searchableText(merchant);
    const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
    return { merchant, score };
  });

  const matching = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ merchant }) => merchant);

  const fallback = merchants.filter((merchant) => !matching.includes(merchant));

  return [...matching, ...fallback].slice(0, limit).map(({ id, name, description, address, district, categories, tags, openingHours, voucherType }) => ({
    id,
    name,
    description,
    address,
    district,
    categories,
    tags,
    openingHours,
    voucherType,
  }));
}
