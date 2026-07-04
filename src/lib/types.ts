export type MerchantCategory =
  | "cafes"
  | "restaurants"
  | "lash-lift"
  | "lash-extensions"
  | "brows"
  | "groceries"
  | "hawker"
  | "wellness"
  | "services";

export type VoucherType = "heartland" | "supermarket" | "both";

export type Merchant = {
  id: string;
  name: string;
  description: string;
  address: string;
  postalCode: string;
  district: string;
  lat: number;
  lng: number;
  categories: MerchantCategory[];
  tags: string[];
  openingHours: string;
  voucherType: VoucherType;
  phone?: string;
  website?: string;
  googlePlaceId?: string;
  updatedAt: string;
};

export type MerchantSearchParams = {
  query?: string;
  category?: MerchantCategory | "all";
  district?: string;
  voucherType?: VoucherType | "all";
  openNow?: boolean;
};

export type ChatMerchant = Pick<
  Merchant,
  "id" | "name" | "description" | "address" | "district" | "categories" | "tags" | "openingHours" | "voucherType"
>;
