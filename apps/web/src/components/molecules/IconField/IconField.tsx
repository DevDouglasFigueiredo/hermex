"use client";
import { useId } from "react";
import { Icon, type IconName } from "../../atoms/Icon/Icon";
import {
  TextInput,
  type TextInputProps,
} from "../../atoms/TextInput/TextInput";
export type IconFieldProps = Omit<TextInputProps, "aria-label"> & {
  label: string;
  icon: IconName;
  error?: string;
};
export function IconField({
  label,
  icon,
  error,
  id,
  tone = "default",
  className = "",
  "aria-describedby": describedBy,
  ...props
}: IconFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <span
          className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 ${tone === "inverse" ? "text-white" : "text-neutral-text"}`}
        >
          <Icon name={icon} />
        </span>
        <TextInput
          {...props}
          id={inputId}
          tone={tone}
          className="pl-10"
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={
            [describedBy, error ? errorId : undefined]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
      </div>
      {error && (
        <p
          id={errorId}
          className={`mt-1 font-body text-sm ${tone === "inverse" ? "text-white" : "text-red-700"}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
