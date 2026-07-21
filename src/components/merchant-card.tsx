import { Clock, ExternalLink, MapPin, Phone, Ticket } from "lucide-react";

import { categoryLabels, voucherTypeLabels } from "@/lib/category-labels";
import type { Merchant } from "@/lib/types";

type MerchantCardProps = {
  merchant: Merchant;
};

export function MerchantCard({ merchant }: MerchantCardProps) {
  return (
    <article className="group rounded-2xl border border-gov-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-panel sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-extrabold tracking-tight text-gov-navy transition group-hover:text-gov-blue">{merchant.name}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{merchant.description}</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-gov-red">
          <Ticket size={14} aria-hidden />
          {voucherTypeLabels[merchant.voucherType]}
        </span>
      </div>

      <div className="mt-5 grid gap-2.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <p className="flex gap-2">
          <MapPin className="mt-0.5 shrink-0 text-gov-blue" size={16} aria-hidden />
          <span>
            {merchant.address}, Singapore {merchant.postalCode}
          </span>
        </p>
        <p className="flex gap-2">
          <Clock className="mt-0.5 shrink-0 text-gov-blue" size={16} aria-hidden />
          <span>{merchant.openingHours}</span>
        </p>
        {merchant.phone ? (
          <p className="flex gap-2">
            <Phone className="mt-0.5 shrink-0 text-gov-blue" size={16} aria-hidden />
            <a className="font-semibold text-gov-blue hover:underline" href={`tel:${merchant.phone}`}>
              {merchant.phone}
            </a>
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {merchant.categories.map((category) => (
          <span key={category} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-gov-blue">
            {categoryLabels[category]}
          </span>
        ))}
        {merchant.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-gov-blue px-4 text-sm font-bold text-white transition hover:bg-gov-navy"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${merchant.name} ${merchant.address}`)}`}
          target="_blank"
          rel="noreferrer"
        >
          View map
          <ExternalLink size={15} aria-hidden />
        </a>
        {merchant.website ? (
          <a
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-gov-line bg-white px-4 text-sm font-bold text-gov-ink transition hover:border-gov-blue hover:text-gov-blue"
            href={merchant.website}
            target="_blank"
            rel="noreferrer"
          >
            Website
            <ExternalLink size={15} aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  );
}
