import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { VehicleCard } from "./VehicleCard";

const meta = {
  title: "Moléculas/VehicleCard",
  component: VehicleCard,
  tags: ["autodocs"],
  args: {
    name: "Hyundai HB20 1.0",
    category: "Hatch Manual",
    dailyRate: 120,
    image: {
      src: "/design/home/imgHb20.png",
      alt: "Hyundai HB20 preto",
      placement: "hb20",
    },
    onDetails: fn(),
  },
} satisfies Meta<typeof VehicleCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padrao: Story = {};
export const Desabilitado: Story = { args: { disabled: true } };
export const VerDetalhes: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Ver detalhes/ }));
    await expect(args.onDetails).toHaveBeenCalledOnce();
  },
};

export const HondaCity: Story = {
  args: {
    name: "Honda City",
    category: "Hatch Automático",
    dailyRate: 130,
    image: {
      src: "/design/home/imgHondaCity.png",
      alt: "Honda City",
      placement: "city",
    },
  },
};

export const Renegade: Story = {
  args: {
    name: "Jeep Renegade 1.3",
    category: "Suv Automático",
    dailyRate: 140,
    image: {
      src: "/design/home/imgRenegade.png",
      alt: "Jeep Renegade 1.3",
      placement: "contain",
    },
  },
};

export const Cronos: Story = {
  args: {
    name: "Fiat Cronos",
    category: "Sedan Manual",
    dailyRate: 130,
    image: {
      src: "/design/home/imgFiatCronos.png",
      alt: "Fiat Cronos",
      placement: "contain",
    },
  },
};

export const Onix: Story = {
  args: {
    name: "Onix LTZ 1.0",
    category: "Hatch Automático",
    dailyRate: 130,
    image: {
      src: "/design/home/imgOnix.png",
      alt: "Onix LTZ 1.0",
      placement: "contain",
    },
  },
};

export const Spin: Story = {
  args: {
    name: "GM Spin 1.8",
    category: "Minivan Automática 7 Lugares",
    dailyRate: 320,
    image: {
      src: "/design/home/imgGmSpin.png",
      alt: "GM Spin 1.8",
      placement: "spin",
    },
  },
};

export const TCross: Story = {
  args: {
    name: "VW T-Cross 1.0 Turbo",
    category: "Suv Automático",
    dailyRate: 150,
    image: {
      src: "/design/home/imgVwTCross.png",
      alt: "VW T-Cross 1.0 Turbo",
      placement: "contain",
    },
  },
};

export const CitySedan: Story = {
  args: {
    name: "Honda City Sedan AT",
    category: "Intermediário Automático",
    dailyRate: 150,
    image: {
      src: "/design/home/imgHondaCitySedan.png",
      alt: "Honda City Sedan AT",
      placement: "contain",
    },
  },
};

export const Mobi: Story = {
  args: {
    name: "Fiat Mobi 1.0",
    category: "Compacto com Ar",
    dailyRate: 100,
    image: {
      src: "/design/home/imgFiatMobi.png",
      alt: "Fiat Mobi 1.0",
      placement: "mobi",
    },
  },
};
