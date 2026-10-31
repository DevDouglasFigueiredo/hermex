import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./Logo";

const meta = {
  title: "Átomos/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Inverso: Story = {
  args: { variant: "inverse" },
  decorators: [
    (Story) => (
      <div className="bg-brand-secondary-dark p-4">
        <Story />
      </div>
    ),
  ],
};
