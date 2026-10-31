import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";
import {
  VehicleGrid,
  type VehicleGridProps,
  type VehicleGridVehicle,
} from "./VehicleGrid";

const vehicles: VehicleGridVehicle[] = [
  {
    id: "hb20",
    name: "Hyundai HB20 1.0",
    category: "Hatch Manual",
    dailyRate: 120,
    image: {
      src: "/design/home/imgHb20.png",
      alt: "Hyundai HB20 preto",
      placement: "hb20",
    },
  },
  {
    id: "city",
    name: "Honda City",
    category: "Hatch Automático",
    dailyRate: 130,
    image: {
      src: "/design/home/imgHondaCity.png",
      alt: "Honda City azul",
      placement: "city",
    },
  },
  {
    id: "renegade",
    name: "Jeep Renegade 1.3",
    category: "Suv Automático",
    dailyRate: 140,
    image: {
      src: "/design/home/imgRenegade.png",
      alt: "Jeep Renegade preto",
      placement: "contain",
    },
  },
  {
    id: "cronos",
    name: "Fiat Cronos",
    category: "Sedan Manual",
    dailyRate: 130,
    image: {
      src: "/design/home/imgFiatCronos.png",
      alt: "Fiat Cronos preto",
      placement: "contain",
    },
  },
  {
    id: "onix",
    name: "Onix LTZ 1.0",
    category: "Hatch Automático",
    dailyRate: 130,
    image: {
      src: "/design/home/imgOnix.png",
      alt: "Onix vermelho",
      placement: "contain",
    },
  },
  {
    id: "spin",
    name: "GM Spin 1.8",
    category: "Minivan Automática 7 Lugares",
    dailyRate: 320,
    image: {
      src: "/design/home/imgGmSpin.png",
      alt: "GM Spin azul",
      placement: "spin",
    },
  },
  {
    id: "tcross",
    name: "VW T-Cross 1.0 Turbo",
    category: "Suv Automático",
    dailyRate: 150,
    image: {
      src: "/design/home/imgVwTCross.png",
      alt: "VW T-Cross azul",
      placement: "contain",
    },
  },
  {
    id: "city-sedan",
    name: "Honda City Sedan AT",
    category: "Intermediário Automático",
    dailyRate: 150,
    image: {
      src: "/design/home/imgHondaCitySedan.png",
      alt: "Honda City Sedan cinza",
      placement: "contain",
    },
  },
  {
    id: "mobi",
    name: "Fiat Mobi 1.0",
    category: "Compacto com Ar",
    dailyRate: 100,
    image: {
      src: "/design/home/imgFiatMobi.png",
      alt: "Fiat Mobi vermelho",
      placement: "mobi",
    },
  },
];

function ControlledGrid(args: VehicleGridProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    args.selectedCategoryId,
  );
  return (
    <VehicleGrid
      {...args}
      selectedCategoryId={selectedCategoryId}
      onCategoryChange={(id) => {
        args.onCategoryChange(id);
        setSelectedCategoryId(id);
      }}
    />
  );
}

const meta = {
  title: "Organismos/VehicleGrid",
  component: VehicleGrid,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    vehicles,
    categories: [
      { id: "hatch", name: "Hatch" },
      { id: "sedan", name: "Sedan" },
      { id: "suv", name: "SUV" },
      { id: "minivan", name: "Minivan" },
      { id: "picape", name: "Picape" },
    ],
    selectedCategoryId: null,
    onCategoryChange: fn(),
    onDetailsClick: fn(),
  },
  render: (args) => (
    <ControlledGrid key={args.selectedCategoryId ?? ""} {...args} />
  ),
} satisfies Meta<typeof VehicleGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
export const CategoriaSelecionada: Story = {
  args: {
    selectedCategoryId: "suv",
    vehicles: vehicles.filter(({ id }) => id === "renegade" || id === "tcross"),
  },
};
export const Vazio: Story = {
  args: { vehicles: [] },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Nenhum veículo encontrado")).toBeVisible();
    await expect(canvas.queryAllByRole("article")).toHaveLength(0);
    await expect(
      canvas.getByRole("combobox", { name: "Categoria do veículo" }),
    ).toBeVisible();
  },
};
export const Interacoes: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const select = canvas.getByRole("combobox", {
      name: "Categoria do veículo",
    });
    await userEvent.selectOptions(select, "suv");
    await expect(args.onCategoryChange).toHaveBeenLastCalledWith("suv");
    await expect(select).toHaveValue("suv");
    await userEvent.selectOptions(select, "");
    await expect(args.onCategoryChange).toHaveBeenLastCalledWith(null);
    await expect(select).toHaveValue("");
    await expect(canvas.getAllByRole("article")).toHaveLength(9);
    await userEvent.click(
      canvas.getByRole("button", { name: "Ver detalhes de Honda City" }),
    );
    await expect(args.onDetailsClick).toHaveBeenCalledOnce();
    await expect(args.onDetailsClick).toHaveBeenCalledWith("city");
  },
};
