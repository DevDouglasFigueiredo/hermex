import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SocialIcon } from "./SocialIcon";

const meta = {
  title: "Átomos/SocialIcon",
  component: SocialIcon,
  tags: ["autodocs"],
  args: { network: "whatsapp" },
} satisfies Meta<typeof SocialIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Instagram: Story = { args: { network: "instagram" } };
export const TikTok: Story = { args: { network: "tiktok" } };
