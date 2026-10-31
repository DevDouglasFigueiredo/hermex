"use client";
import {
  VehicleImage,
  type VehicleImageProps,
} from "../../atoms/VehicleImage/VehicleImage";
import { Button } from "../../atoms/Button/Button";
import { Text } from "../../atoms/Text/Text";
import { DailyRate } from "../DailyRate/DailyRate";
export type VehicleCardProps = {
  name: string;
  category: string;
  dailyRate: number;
  image: VehicleImageProps;
  onDetails: () => void;
  disabled?: boolean;
};
export function VehicleCard({
  name,
  category,
  dailyRate,
  image,
  onDetails,
  disabled,
}: VehicleCardProps) {
  return (
    <article
      aria-label={name}
      className="flex w-full max-w-[360px] flex-col items-center gap-4 rounded-sm bg-white p-8 shadow-card"
    >
      <VehicleImage {...image} />
      <div className="flex w-full max-w-[278px] flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-body text-xl leading-[1.25] text-black">
            {name}
          </h3>
          <Text className="min-h-[25px] text-black">{category}</Text>
        </div>
        <DailyRate amount={dailyRate} />
        <Button
          onClick={onDetails}
          disabled={disabled}
          aria-label={`Ver detalhes de ${name}`}
          className="w-full"
        >
          Ver detalhes
        </Button>
      </div>
    </article>
  );
}
