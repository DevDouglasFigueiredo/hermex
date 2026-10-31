/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
export type VehicleImageProps = {
  src: string;
  alt: string;
  placement?: "contain" | "city" | "hb20" | "spin" | "mobi";
  className?: string;
};
const placements: Record<
  NonNullable<VehicleImageProps["placement"]>,
  CSSProperties
> = {
  contain: { width: "100%", height: "100%", objectFit: "contain" },
  city: { width: "75.16%", height: "71.93%", left: "12.24%", top: "15.63%" },
  hb20: { width: "79.68%", height: "67.11%", left: "10.32%", top: "18.12%" },
  spin: { width: "73.77%", height: "84.96%", left: "10.87%", top: "7.54%" },
  mobi: { width: "76.43%", height: "68.39%", left: "12.86%", top: "15.18%" },
};
export function VehicleImage({
  src,
  alt,
  placement = "contain",
  className = "",
}: VehicleImageProps) {
  return (
    <div
      className={`relative aspect-[7/4] w-full max-w-[280px] overflow-hidden bg-neutral-details ${className}`}
    >
      <img
        src={src}
        alt={alt}
        style={placements[placement]}
        className="absolute object-contain"
      />
    </div>
  );
}
