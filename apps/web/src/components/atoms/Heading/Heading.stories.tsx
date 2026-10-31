import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "./Heading";

const meta = {
  title: "Átomos/Heading",
  component: Heading,
  tags: ["autodocs"],
  args: { children: "Siga nossas redes:" },
} satisfies Meta<typeof Heading>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Destaque: Story = {
  args: {
    size: "xxl",
    as: "h1",
    tone: "brand",
    children: "Encontre o carro ideal",
  },
};
