"use client";

import type { InputHTMLAttributes } from "react";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  tone?: "default" | "inverse";
};
export function TextInput({
  tone = "default",
  className = "",
  ...props
}: TextInputProps) {
  return (
    <input
      {...props}
      className={`min-h-11 min-w-0 w-full rounded-sm border bg-transparent px-4 py-3 font-body text-base leading-[1.2] outline-none placeholder:text-current focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-700 ${tone === "inverse" ? "border-white text-white focus-visible:ring-white [color-scheme:dark]" : "border-neutral-details text-neutral-text focus-visible:ring-brand-secondary"} ${className}`}
    />
  );
}
