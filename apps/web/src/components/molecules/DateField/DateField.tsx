"use client";
import { IconField, type IconFieldProps } from "../IconField/IconField";
export type DateFieldProps = Omit<IconFieldProps, "icon" | "type">;
/** Native date picker; browser and locale determine the date mask and popup. */
export function DateField({
  label,
  tone = "inverse",
  ...props
}: DateFieldProps) {
  return (
    <IconField
      {...props}
      label={label}
      tone={tone}
      icon="calendar_month"
      type="date"
    />
  );
}
