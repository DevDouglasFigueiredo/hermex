"use client";
import { SelectField, type SelectFieldProps } from "../SelectField/SelectField";
export type CategoryFilterProps = Omit<
  SelectFieldProps,
  "placeholder" | "label"
> & { label?: string };
export function CategoryFilter({
  label = "Categoria do veículo",
  ...props
}: CategoryFilterProps) {
  return (
    <SelectField {...props} label={label} placeholder="Selecione a categoria" />
  );
}
