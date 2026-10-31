"use client";
import { IconField, type IconFieldProps } from "../IconField/IconField";
export type SearchFieldProps = Omit<IconFieldProps, "icon">;
export function SearchField({
  label = "Buscar veículos",
  placeholder = "O que você procura?",
  ...props
}: SearchFieldProps) {
  return (
    <IconField
      {...props}
      label={label}
      placeholder={placeholder}
      icon="search"
      type="search"
    />
  );
}
