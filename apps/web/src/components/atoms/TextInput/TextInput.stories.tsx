import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { TextInput } from "./TextInput";

const meta = {
  title: "Átomos/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  args: { "aria-label": "Local de retirada", placeholder: "Local de retirada" },
} satisfies Meta<typeof TextInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Desabilitado: Story = { args: { disabled: true } };
export const Invalido: Story = { args: { "aria-invalid": true } };
export const Digitar: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("textbox"), "São Paulo");
    await expect(canvas.getByRole("textbox")).toHaveValue("São Paulo");
  },
};
