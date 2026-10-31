"use client";
import { useId } from "react";
import { Icon } from "../../atoms/Icon/Icon";
import { Select, type SelectProps } from "../../atoms/Select/Select";
export type SelectOption = { value: string; label: string; disabled?: boolean };
export type SelectFieldProps = Omit<SelectProps, "children"> & {
  label: string;
  placeholder: string;
  options: readonly SelectOption[];
};
export function SelectField({
  label,
  placeholder,
  options,
  id,
  tone = "default",
  className = "",
  ...props
}: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return (
    <div className={`relative min-w-0 ${className}`}>
      <label htmlFor={selectId} className="sr-only">
        {label}
      </label>
      <Select {...props} id={selectId} tone={tone}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </Select>
      <span
        className={`pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 ${tone === "inverse" ? "text-white" : "text-brand-secondary"}`}
      >
        <Icon name="keyboard_arrow_down" />
      </span>
    </div>
  );
}
