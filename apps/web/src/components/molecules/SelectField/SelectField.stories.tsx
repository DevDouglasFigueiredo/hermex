import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { SelectField } from "./SelectField";

const meta = {
  title: "Moléculas/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  args: {
    label: "Categoria",
    placeholder: "Selecione a categoria",
    options: [
      { value: "hatch", label: "Hatch" },
      { value: "suv", label: "SUV" },
    ],
  },
} satisfies Meta<typeof SelectField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Selecionar: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.selectOptions(canvas.getByRole("combobox"), "suv");
    await expect(canvas.getByRole("combobox")).toHaveValue("suv");
  },
};
