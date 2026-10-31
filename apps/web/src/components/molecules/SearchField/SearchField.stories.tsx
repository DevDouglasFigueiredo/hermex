import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { SearchField } from "./SearchField";

const meta = {
  title: "Moléculas/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  args: { label: "Buscar veículos" },
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Digitar: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("searchbox"), "HB20");
    await expect(canvas.getByRole("searchbox")).toHaveValue("HB20");
  },
};
