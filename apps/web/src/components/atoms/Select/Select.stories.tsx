import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./Select";

const meta = {
  title: "Átomos/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    "aria-label": "Categoria",
    children: (
      <>
        <option value="">Selecione a categoria</option>
        <option value="hatch">Hatch</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Desabilitado: Story = { args: { disabled: true } };
