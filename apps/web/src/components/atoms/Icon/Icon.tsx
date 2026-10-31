import type { HTMLAttributes } from "react";

export type IconName =
  | "search"
  | "account_circle"
  | "login"
  | "location_on"
  | "calendar_month"
  | "keyboard_arrow_down";
export type IconProps = HTMLAttributes<HTMLSpanElement> & { name: IconName };

/** Decorative Material Icons glyph; the parent control supplies its accessible name. */
export function Icon({ name, className = "", ...props }: IconProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={`inline-block shrink-0 font-['Material_Icons'] text-base leading-none font-normal normal-case not-italic tracking-normal whitespace-nowrap [font-feature-settings:'liga'] [word-wrap:normal] ${className}`}
    >
      {name}
    </span>
  );
}
