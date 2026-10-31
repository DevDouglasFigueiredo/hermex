import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "./Text";

const meta = {
  title: "Átomos/Text",
  component: Text,
  tags: ["autodocs"],
  args: { children: "O carro ideal para sua ocasião" },
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Grande: Story = { args: { size: "lg" } };
