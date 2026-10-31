import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryFilter } from "./CategoryFilter";

const meta = {
  title: "Moléculas/CategoryFilter",
  component: CategoryFilter,
  tags: ["autodocs"],
  args: {
    options: [
      { value: "hatch", label: "Hatch" },
      { value: "suv", label: "SUV" },
    ],
  },
} satisfies Meta<typeof CategoryFilter>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Selecionado: Story = { args: { defaultValue: "suv" } };
