import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconLink } from "./IconLink";

const meta = {
  title: "Moléculas/IconLink",
  component: IconLink,
  tags: ["autodocs"],
  args: { href: "#cadastro", icon: "account_circle", children: "Cadastro" },
} satisfies Meta<typeof IconLink>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Login: Story = {
  args: { href: "#login", icon: "login", children: "Login" },
};
