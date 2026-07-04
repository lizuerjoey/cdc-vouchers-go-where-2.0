import { NextResponse } from "next/server";

import { searchMerchants } from "@/lib/merchant-search";
import type { MerchantCategory, VoucherType } from "@/lib/types";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const merchants = searchMerchants({
    query: searchParams.get("query") ?? undefined,
    category: (searchParams.get("category") as MerchantCategory | "all" | null) ?? "all",
    district: searchParams.get("district") ?? "all",
    voucherType: (searchParams.get("voucherType") as VoucherType | "all" | null) ?? "all",
  });

  return NextResponse.json({ merchants });
}
