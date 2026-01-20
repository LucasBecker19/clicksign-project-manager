"use client";

import React from "react";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
}

export default function CustomSwitch({
  checked,
  onChange,
  disabled = false,
}: CustomSwitchProps) {
  const handleToggle = () => {
    const event = {
      target: { checked: !checked },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event, !checked);
  };

  return (
    <label
      className="relative inline-flex items-center cursor-pointer"
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
        className="sr-only"
      />

      <div
        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
          checked
            ? "bg-[var(--color-accent-strong)]"
            : "bg-[var(--color-gray-600)]"
        } ${disabled ? "opacity-50" : ""}`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ml-[2px] ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
    </label>
  );
}