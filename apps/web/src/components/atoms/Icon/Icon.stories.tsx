import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./Icon";

const meta = {
  title: "Átomos/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { name: "search" },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Todos: Story = {
  render: () => (
    <div className="flex gap-6">
      {(
        [
          "search",
          "account_circle",
          "login",
          "location_on",
          "calendar_month",
          "keyboard_arrow_down",
        ] as const
      ).map((name) => (
        <span key={name} title={name}>
          <Icon name={name} />
        </span>
      ))}
    </div>
  ),
};
