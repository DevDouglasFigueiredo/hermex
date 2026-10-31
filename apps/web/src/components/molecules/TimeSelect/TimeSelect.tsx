"use client";
import { SelectField, type SelectFieldProps } from "../SelectField/SelectField";
export type TimeSelectProps = Omit<SelectFieldProps, "placeholder">;
export function TimeSelect({ tone = "inverse", ...props }: TimeSelectProps) {
  return <SelectField {...props} tone={tone} placeholder="Horário" />;
}
