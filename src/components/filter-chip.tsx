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
        "h-10 rounded border px-4 text-sm font-semibold transition",
        active
          ? "border-gov-blue bg-gov-blue text-white"
          : "border-gov-line bg-white text-gov-ink hover:border-gov-blue hover:text-gov-blue",
      )}
    >
      {children}
    </button>
  );
}
