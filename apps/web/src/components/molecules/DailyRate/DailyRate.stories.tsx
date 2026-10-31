import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DailyRate } from "./DailyRate";

const meta = {
  title: "Moléculas/DailyRate",
  component: DailyRate,
  tags: ["autodocs"],
  args: { amount: 120 },
} satisfies Meta<typeof DailyRate>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const ComCentavos: Story = { args: { amount: 130.5 } };
