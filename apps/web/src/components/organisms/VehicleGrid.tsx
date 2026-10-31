"use client";

import { CategoryFilter } from "../molecules/CategoryFilter/CategoryFilter";
import {
  VehicleCard,
  type VehicleCardProps,
} from "../molecules/VehicleCard/VehicleCard";

export type VehicleGridVehicle = Omit<VehicleCardProps, "onDetails"> & {
  id: string;
};
export type VehicleGridCategory = { id: string; name: string };
export type VehicleGridProps = {
  vehicles: readonly VehicleGridVehicle[];
  categories: readonly VehicleGridCategory[];
  selectedCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onDetailsClick: (vehicleId: string) => void;
};

export function VehicleGrid({
  vehicles,
  categories,
  selectedCategoryId,
  onCategoryChange,
  onDetailsClick,
}: VehicleGridProps) {
  return (
    <section aria-label="Catálogo de veículos" className="bg-white px-4 py-14">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <CategoryFilter
          className="w-full md:w-fit"
          options={categories.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          value={selectedCategoryId ?? ""}
          onChange={(event) => onCategoryChange(event.target.value || null)}
        />
        {vehicles.length === 0 ? (
          <p className="py-8 text-center font-body text-base text-neutral-text">
            Nenhum veículo encontrado
          </p>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map(({ id, ...vehicle }) => (
              <VehicleCard
                key={id}
                {...vehicle}
                onDetails={() => onDetailsClick(id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
