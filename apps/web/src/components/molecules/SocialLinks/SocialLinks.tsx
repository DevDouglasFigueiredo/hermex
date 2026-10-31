import {
  SocialIcon,
  type SocialNetwork,
} from "../../atoms/SocialIcon/SocialIcon";
export type SocialLinksProps = {
  links: readonly { network: SocialNetwork; href: string }[];
};
const labels = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  tiktok: "TikTok",
};
export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <nav aria-label="Redes sociais" className="flex flex-wrap gap-2">
      {links.map(({ network, href }) => (
        <a
          key={network}
          href={href}
          aria-label={labels[network]}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <SocialIcon network={network} />
        </a>
      ))}
    </nav>
  );
}
