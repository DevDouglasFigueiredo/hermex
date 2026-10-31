import type { HTMLAttributes } from "react";
export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: "md" | "lg";
  tone?: "default" | "inverse";
};
export function Text({
  size = "md",
  tone = "default",
  className = "",
  ...props
}: TextProps) {
  return (
    <p
      {...props}
      className={`font-body leading-[1.2] ${size === "md" ? "text-base" : "text-xl"} ${tone === "inverse" ? "text-white" : "text-neutral-text"} ${className}`}
    />
  );
}
