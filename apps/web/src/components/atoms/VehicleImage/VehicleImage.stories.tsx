import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VehicleImage } from "./VehicleImage";

const meta = {
  title: "Átomos/VehicleImage",
  component: VehicleImage,
  tags: ["autodocs"],
  args: {
    src: "/design/home/imgHb20.png",
    alt: "Hyundai HB20 preto",
    placement: "hb20",
  },
} satisfies Meta<typeof VehicleImage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Contain: Story = {
  args: {
    src: "/design/home/imgHondaCity.png",
    alt: "Honda City azul",
    placement: "city",
  },
};
