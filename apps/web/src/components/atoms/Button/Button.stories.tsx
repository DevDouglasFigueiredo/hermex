import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Átomos/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Ver detalhes", onClick: fn() },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Secundario: Story = {
  args: { variant: "secondary", children: "Buscar" },
};
export const Desabilitado: Story = { args: { disabled: true } };
export const Clicar: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
