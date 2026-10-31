import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimeSelect } from "./TimeSelect";

const meta = {
  title: "Moléculas/TimeSelect",
  component: TimeSelect,
  tags: ["autodocs"],
  args: {
    label: "Horário de retirada",
    options: [
      { value: "09:00", label: "09:00" },
      { value: "10:00", label: "10:00" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg bg-brand-primary-dark p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TimeSelect>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Preenchido: Story = { args: { defaultValue: "09:00" } };
