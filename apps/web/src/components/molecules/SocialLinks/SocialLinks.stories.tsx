import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SocialLinks } from "./SocialLinks";

const meta = {
  title: "Moléculas/SocialLinks",
  component: SocialLinks,
  tags: ["autodocs"],
  args: {
    links: [
      { network: "whatsapp", href: "#whatsapp" },
      { network: "instagram", href: "#instagram" },
      { network: "tiktok", href: "#tiktok" },
    ],
  },
} satisfies Meta<typeof SocialLinks>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
