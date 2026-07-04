import type { MerchantCategory, VoucherType } from "./types";

export const categoryLabels: Record<MerchantCategory, string> = {
  cafes: "Cafes",
  restaurants: "Restaurants",
  "lash-lift": "Lash lift",
  "lash-extensions": "Lash extensions",
  brows: "Brows",
  groceries: "Groceries",
  hawker: "Hawker",
  wellness: "Wellness",
  services: "Services",
};

export const voucherTypeLabels: Record<VoucherType | "all", string> = {
  all: "All vouchers",
  heartland: "Heartland merchants",
  supermarket: "Supermarkets",
  both: "Both",
};
