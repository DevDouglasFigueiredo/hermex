import type { HTMLAttributes } from "react";
export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
  size?: "xs" | "xxl";
  tone?: "default" | "inverse" | "brand";
};
export function Heading({
  as: Tag = "h2",
  size = "xs",
  tone = "default",
  className = "",
  ...props
}: HeadingProps) {
  const tones = {
    default: "text-neutral-text",
    inverse: "text-white",
    brand: "text-brand-primary",
  };
  return (
    <Tag
      {...props}
      className={`font-heading font-bold leading-[1.25] ${size === "xs" ? "text-[25px]" : "text-[clamp(2.5rem,6vw,4.75rem)]"} ${tones[tone]} ${className}`}
    />
  );
}
