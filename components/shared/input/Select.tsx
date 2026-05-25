"use client";

import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[]; // Pre-defined options
  children?: React.ReactNode; // Or raw <option> children
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  startContent?: React.ReactNode; // Icon/Element on the left
}

export default function Select(props: SelectProps) {
  const {
    value,
    onChange,
    options,
    children,
    disabled,
    className,
    placeholder,
    startContent,
  } = props;

  return (
    <div className={`relative w-full ${className || ""}`}>
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{ color: "var(--text)", opacity: 0.5 }}
      >
        {startContent}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full h-9 pr-8 appearance-none rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed ${
          startContent ? "pl-9" : "pl-3"
        }`}
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--card) 65%, transparent)", // Semi-transparent card bg
          color: "var(--text)",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options && options.length > 0
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>

      {/* Custom Chevron */}
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--muted)" }}
      >
        <ChevronDownIcon className="w-4 h-4" strokeWidth={2} />
      </div>
    </div>
  );
}
