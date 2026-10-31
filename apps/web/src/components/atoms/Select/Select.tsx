"use client";

import type { SelectHTMLAttributes } from "react";
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  tone?: "default" | "inverse";
};
export function Select({
  tone = "default",
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={`min-h-11 w-full min-w-0 appearance-none rounded-sm border bg-transparent px-4 py-3 pr-10 font-body text-base leading-[1.2] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_option]:bg-white [&_option]:text-neutral-text ${tone === "inverse" ? "border-white text-white focus-visible:ring-white" : "border-brand-secondary text-brand-secondary focus-visible:ring-brand-secondary"} ${className}`}
    />
  );
}
