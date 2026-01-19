"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-10 px-3 py-2 bg-white flex items-center justify-between transition-colors border-1 cursor-pointer ${
          isOpen
            ? "border-[var(--color-primary)] rounded-t-lg"
            : "border-[var(--color-gray-600)] rounded-lg"
        }`}
      >
        <span className="text-text-dark font-normal text-base">{displayLabel}</span>
        <Image
          src={isOpen ? "/images/chevron-up-light.svg" : "/images/chevron-down-light.svg"}
          alt="Chevron"
          width={16}
          height={16}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-[var(--color-primary)] border-t-0 rounded-b-lg shadow-[0px_4px_4px_0px_#00000040] z-50 overflow-hidden">
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full p-4 text-left font-normal text-base text-text-dark hover:bg-[var(--color-bg)] transition-colors ${
                index < options.length - 1 ? "border-b border-[var(--color-border)]" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
