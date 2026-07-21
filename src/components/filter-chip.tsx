"use client";

import { cn } from "@/lib/utils";

type FilterChipProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

export function FilterChip({ active, children, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-9 rounded-full border px-4 text-sm font-semibold transition",
        active
          ? "border-gov-navy bg-gov-navy text-white shadow-sm"
          : "border-gov-line bg-slate-50 text-slate-600 hover:border-gov-blue hover:bg-blue-50 hover:text-gov-blue",
      )}
    >
      {children}
    </button>
  );
}
