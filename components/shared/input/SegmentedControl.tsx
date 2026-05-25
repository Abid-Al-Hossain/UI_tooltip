"use client";

import React from "react";

export function SegmentedControl(props: {
  value: string;
  onChange: (v: string) => void;
  items: { value: string; label: string }[];
}) {
  return (
    <div
      className="inline-flex w-full rounded-xl border p-1"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 65%, transparent)",
      }}
    >
      {props.items.map((it) => (
        <button
          key={it.value}
          type="button"
          onClick={() => props.onChange(it.value)}
          className="w-full rounded-lg px-3 py-2 text-sm font-semibold uf-clickable transition-all"
          style={{
            background:
              props.value === it.value ? "var(--primary)" : "transparent",
            color: props.value === it.value ? "white" : "var(--text)",
            boxShadow:
              props.value === it.value ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
