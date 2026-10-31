/* eslint-disable @next/next/no-img-element */
export type SocialNetwork = "whatsapp" | "instagram" | "tiktok";
export type SocialIconProps = { network: SocialNetwork };
const files = {
  whatsapp: "imgWhatsapp",
  instagram: "imgInstragam",
  tiktok: "imgTiktok",
};
export function SocialIcon({ network }: SocialIconProps) {
  return (
    <img
      src={`/design/home/${files[network]}.svg`}
      alt=""
      aria-hidden="true"
      width={32}
      height={32}
      className="block shrink-0"
    />
  );
}
