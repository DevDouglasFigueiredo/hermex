import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DateField } from "./DateField";

const meta = {
  title: "Moléculas/DateField",
  component: DateField,
  tags: ["autodocs"],
  args: { label: "Data de retirada" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg bg-brand-primary-dark p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Preenchido: Story = { args: { defaultValue: "2026-11-10" } };
