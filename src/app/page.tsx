"use client";

import { Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { ChatPanel } from "@/components/chat-panel";
import { FilterChip } from "@/components/filter-chip";
import { MerchantCard } from "@/components/merchant-card";
import { merchants } from "@/data/merchants";
import { categoryLabels, voucherTypeLabels } from "@/lib/category-labels";
import { getDistricts, searchMerchants } from "@/lib/merchant-search";
import type { MerchantCategory, VoucherType } from "@/lib/types";

const primaryCategories: Array<MerchantCategory | "all"> = [
  "all",
  "cafes",
  "restaurants",
  "lash-lift",
  "lash-extensions",
  "brows",
  "groceries",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MerchantCategory | "all">("all");
  const [district, setDistrict] = useState("all");
  const [voucherType, setVoucherType] = useState<VoucherType | "all">("all");
  const districts = useMemo(() => getDistricts(), []);

  const results = useMemo(
    () =>
      searchMerchants({
        query,
        category,
        district,
        voucherType,
      }),
    [category, district, query, voucherType],
  );

  return (
    <main className="min-h-screen bg-gov-mist">
      <header className="border-b border-gov-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-gov-red">Personal prototype</p>
            <h1 className="text-xl font-extrabold text-gov-ink sm:text-2xl">CDC Vouchers GoWhere</h1>
          </div>
          <div className="hidden items-center gap-2 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm font-bold text-green-800 sm:flex">
            <ShieldCheck size={17} aria-hidden />
            Seeded v1 data
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-gov-blue">Search participating merchants</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-extrabold leading-tight text-gov-ink sm:text-5xl">
              Find places that match how you actually spend.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              A GoWhere-inspired prototype with sharper filters for cafes, restaurants, lash services, brows,
              groceries, and neighbourhood essentials.
            </p>
          </div>
          <div
            className="min-h-[260px] rounded-lg bg-cover bg-center shadow-panel"
            role="img"
            aria-label="Singapore neighbourhood shops and food street"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(18,84,165,0.12), rgba(215,25,32,0.22)), url('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1100&q=80')",
            }}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-5">
          <section className="rounded-lg border border-gov-line bg-white p-5 shadow-sm" aria-label="Merchant filters">
            <div className="flex items-center gap-2 text-gov-ink">
              <SlidersHorizontal size={19} aria-hidden />
              <h2 className="text-lg font-bold">Filter merchants</h2>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {primaryCategories.map((item) => (
                <FilterChip key={item} active={category === item} onClick={() => setCategory(item)}>
                  {item === "all" ? "All" : categoryLabels[item]}
                </FilterChip>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_180px]">
              <label className="relative block">
                <span className="sr-only">Search merchants</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by merchant, postal code, neighbourhood, tag..."
                  className="h-12 w-full rounded border border-gov-line bg-white pl-10 pr-3 text-sm"
                />
              </label>

              <label>
                <span className="sr-only">District</span>
                <select
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  className="h-12 w-full rounded border border-gov-line bg-white px-3 text-sm font-semibold text-slate-700"
                >
                  <option value="all">All districts</option>
                  {districts.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="sr-only">Voucher type</span>
                <select
                  value={voucherType}
                  onChange={(event) => setVoucherType(event.target.value as VoucherType | "all")}
                  className="h-12 w-full rounded border border-gov-line bg-white px-3 text-sm font-semibold text-slate-700"
                >
                  {Object.entries(voucherTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section aria-label="Merchant results">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-gov-ink">{results.length} merchants found</h2>
                <p className="text-sm text-slate-600">Showing {merchants.length} seeded prototype records.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setDistrict("all");
                  setVoucherType("all");
                }}
                className="h-10 w-fit rounded border border-gov-line bg-white px-4 text-sm font-bold text-gov-blue hover:border-gov-blue"
              >
                Reset filters
              </button>
            </div>

            {results.length > 0 ? (
              <div className="grid gap-4">
                {results.map((merchant) => (
                  <MerchantCard key={merchant.id} merchant={merchant} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gov-line bg-white p-8 text-center">
                <h3 className="text-lg font-bold text-gov-ink">No seeded merchants match this filter.</h3>
                <p className="mt-2 text-sm text-slate-600">Try another neighbourhood, category, or keyword.</p>
              </div>
            )}
          </section>
        </div>

        <div className="lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
          <ChatPanel />
        </div>
      </section>
    </main>
  );
}
