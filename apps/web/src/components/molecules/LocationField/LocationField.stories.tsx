import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LocationField } from "./LocationField";

const meta = {
  title: "Moléculas/LocationField",
  component: LocationField,
  tags: ["autodocs"],
  args: { label: "Local de retirada" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg bg-brand-primary-dark p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LocationField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Devolucao: Story = { args: { label: "Local de devolução" } };
export const Desabilitado: Story = { args: { disabled: true } };
