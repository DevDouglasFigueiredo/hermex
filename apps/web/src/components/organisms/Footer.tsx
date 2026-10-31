import { Logo } from "../atoms/Logo/Logo";
import { SocialIcon, type SocialNetwork } from "../atoms/SocialIcon/SocialIcon";
import { Text } from "../atoms/Text/Text";

export type FooterProps = {
  socialLinks: Readonly<Record<SocialNetwork, string>>;
};

const networks = [
  { network: "whatsapp", label: "WhatsApp" },
  { network: "instagram", label: "Instagram" },
  { network: "tiktok", label: "TikTok" },
] as const;

export function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className="w-full bg-brand-secondary px-6 py-8 text-white">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <div className="flex shrink-0 flex-col gap-6">
          <Logo variant="inverse" />
          <Text tone="inverse">O carro ideal para sua ocasião</Text>
        </div>
        <Text tone="inverse" className="max-w-[460px] lg:pt-1">
          Desenvolvido por Alura. Projeto fictício sem fins comerciais.
        </Text>
        <div className="shrink-0">
          <p className="font-heading text-[25px] font-bold leading-[1.25]">
            Siga nossas redes:
          </p>
          <nav aria-label="Redes sociais" className="mt-2 flex flex-wrap gap-2">
            {networks.map(({ network, label }) => (
              <a
                key={network}
                href={socialLinks[network]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                <SocialIcon network={network} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
