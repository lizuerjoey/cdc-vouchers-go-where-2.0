"use client";

import { ArrowRight, MapPin, Search, ShieldCheck, SlidersHorizontal, Sparkles, TicketCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { ChatPanel } from "@/components/chat-panel";
import { FilterChip } from "@/components/filter-chip";
import { MerchantCard } from "@/components/merchant-card";
import { categoryLabels, voucherTypeLabels } from "@/lib/category-labels";
import { getDistricts, searchMerchants } from "@/lib/merchant-search";
import type { MerchantCategory, VoucherType } from "@/lib/types";

const primaryCategories: Array<MerchantCategory | "all"> = [
  "all", "cafes", "restaurants", "lash-lift", "lash-extensions", "brows", "groceries",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MerchantCategory | "all">("all");
  const [district, setDistrict] = useState("all");
  const [voucherType, setVoucherType] = useState<VoucherType | "all">("all");
  const districts = useMemo(() => getDistricts(), []);
  const results = useMemo(() => searchMerchants({ query, category, district, voucherType }), [category, district, query, voucherType]);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setDistrict("all");
    setVoucherType("all");
  }

  return (
    <main className="min-h-screen bg-gov-mist text-gov-ink">
      <div className="h-1 bg-gov-red" />
      <header className="border-b border-white/10 bg-gov-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-black text-gov-navy">SG</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">Community discovery</p>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">CDC Vouchers GoWhere</h1>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs font-semibold text-blue-100 sm:flex">
            <ShieldCheck size={16} aria-hidden />
            Secure community service
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gov-navy text-white">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="absolute -right-24 top-4 h-80 w-80 rounded-full bg-gov-blue/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
              <Sparkles size={14} aria-hidden /> Built for everyday Singapore
            </div>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.06] tracking-[-0.04em] sm:text-6xl">
              Make every voucher <span className="text-gov-sky">go further.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-blue-100/80 sm:text-lg">
              Discover participating heartland merchants, neighbourhood favourites and daily essentials near you.
            </p>
            <a href="#find-merchants" className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-gov-red px-5 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:bg-red-600">
              Find a merchant <ArrowRight size={17} aria-hidden />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-gov-blue/20" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white p-6 text-gov-ink shadow-2xl shadow-black/25 sm:p-8">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-gov-red"><TicketCheck size={25} aria-hidden /></span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">CDC 2026</span>
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Community vouchers</p>
              <p className="mt-1 text-3xl font-black tracking-tight text-gov-navy">Spend local. Live well.</p>
              <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-semibold text-slate-500">
                <MapPin size={17} className="text-gov-blue" aria-hidden /> Participating merchants islandwide
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="find-merchants" className="mx-auto grid max-w-7xl scroll-mt-4 gap-7 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:py-14">
        <div className="space-y-7">
          <section className="rounded-2xl border border-gov-line bg-white p-5 shadow-card sm:p-6" aria-label="Merchant filters">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-gov-blue"><SlidersHorizontal size={19} aria-hidden /></span>
                <div><h2 className="font-bold text-gov-navy">Find what you need</h2><p className="text-xs text-slate-500">Search by category, area or voucher type</p></div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {primaryCategories.map((item) => <FilterChip key={item} active={category === item} onClick={() => setCategory(item)}>{item === "all" ? "All places" : categoryLabels[item]}</FilterChip>)}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_170px_170px]">
              <label className="relative block">
                <span className="sr-only">Search merchants</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Merchant, postal code or keyword" className="control pl-11" />
              </label>
              <label><span className="sr-only">District</span><select value={district} onChange={(event) => setDistrict(event.target.value)} className="control px-3 font-semibold text-slate-700"><option value="all">All districts</option>{districts.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
              <label><span className="sr-only">Voucher type</span><select value={voucherType} onChange={(event) => setVoucherType(event.target.value as VoucherType | "all")} className="control px-3 font-semibold text-slate-700">{Object.entries(voucherTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            </div>
          </section>

          <section aria-label="Merchant results">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div><h2 className="text-2xl font-black tracking-tight text-gov-navy">{results.length} merchants found</h2><p className="mt-1 text-sm text-slate-500">Explore verified prototype listings near you.</p></div>
              <button type="button" onClick={resetFilters} className="shrink-0 text-sm font-bold text-gov-blue hover:underline">Reset all</button>
            </div>
            {results.length > 0 ? <div className="grid gap-4">{results.map((merchant) => <MerchantCard key={merchant.id} merchant={merchant} />)}</div> : <div className="rounded-2xl border border-dashed border-gov-line bg-white p-10 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-gov-blue"><Search size={21} /></span><h3 className="mt-4 text-lg font-bold text-gov-navy">No merchants found</h3><p className="mt-1 text-sm text-slate-500">Try a different neighbourhood, category or keyword.</p></div>}
          </section>
        </div>
        <div className="lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]"><ChatPanel /></div>
      </section>

      <footer className="border-t border-gov-line bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p>CDC Vouchers GoWhere · Community merchant discovery prototype</p><p>Seeded demonstration data · Not an official government service</p></div></footer>
    </main>
  );
}
