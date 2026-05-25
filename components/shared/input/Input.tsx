"use client";

import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full h-9 px-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 outline-none focus:border-[var(--primary)] transition-colors placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--card) 65%, transparent)",
        color: "var(--text)",
        ...props.style,
      }}
    />
  );
}
