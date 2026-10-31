import type { AnchorHTMLAttributes } from "react";
import { Icon, type IconName } from "../../atoms/Icon/Icon";
export type IconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  icon: IconName;
};
export function IconLink({
  icon,
  className = "",
  children,
  ...props
}: IconLinkProps) {
  return (
    <a
      {...props}
      className={`inline-flex min-h-11 items-center gap-2 rounded-sm font-body text-base text-neutral-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary ${className}`}
    >
      <Icon name={icon} />
      {children}
    </a>
  );
}
