"use client";
import { IconField, type IconFieldProps } from "../IconField/IconField";
export type LocationFieldProps = Omit<IconFieldProps, "icon" | "type">;
export function LocationField({
  label,
  placeholder = label,
  tone = "inverse",
  ...props
}: LocationFieldProps) {
  return (
    <IconField
      {...props}
      label={label}
      placeholder={placeholder}
      tone={tone}
      icon="location_on"
      type="text"
    />
  );
}
