import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Footer } from "./Footer";

const meta = {
  title: "Organismos/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Rodapé presentacional. Os links abaixo são exemplos de demonstração, não contas oficiais da Hermex. Cada rede abre em nova aba.",
      },
    },
  },
  args: {
    socialLinks: {
      whatsapp: "https://example.com/#whatsapp",
      instagram: "https://example.com/#instagram",
      tiktok: "https://example.com/#tiktok",
    },
  },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
export const LinksSociais: Story = {
  play: async ({ args, canvas }) => {
    await expect(canvas.getByRole("contentinfo")).toBeVisible();
    await expect(
      canvas.getByRole("img", { name: "Hermex locadora" }),
    ).toBeVisible();
    for (const [network, name] of [
      ["whatsapp", "WhatsApp"],
      ["instagram", "Instagram"],
      ["tiktok", "TikTok"],
    ] as const) {
      const link = canvas.getByRole("link", { name });
      await expect(link).toHaveAttribute("href", args.socialLinks[network]);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  },
};
