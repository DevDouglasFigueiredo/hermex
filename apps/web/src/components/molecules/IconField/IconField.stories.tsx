import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconField } from "./IconField";

const meta = {
  title: "Moléculas/IconField",
  component: IconField,
  tags: ["autodocs"],
  args: { label: "Busca", icon: "search", placeholder: "O que você procura?" },
} satisfies Meta<typeof IconField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const ComErro: Story = {
  args: { error: "Informe o local de retirada." },
};
