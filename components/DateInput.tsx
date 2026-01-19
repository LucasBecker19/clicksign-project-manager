'use client';

import Image from 'next/image';
import { useState } from 'react';

interface DateInputProps {
  id: string;
  label: string;
  iconSrc: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

export default function DateInput({ 
  id, 
  label, 
  iconSrc, 
  required = false,
  value: externalValue,
  onChange: externalOnChange,
  onBlur,
  hasError = false,
  errorMessage = ''
}: DateInputProps) {
  const [internalValue, setInternalValue] = useState('');
  
  const value = externalValue !== undefined ? externalValue : internalValue;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className="form-group">
      <div className="flex gap-2 items-center">
        <span className={`font-medium text-lg leading-[22px] align-bottom ${hasError ? 'text-[var(--color-error)]' : 'text-accent'}`}>
          {label}
        </span>
        {required && (
            <span
              className="form-required-label"
              style={hasError ? { color: 'var(--color-error)' } : undefined}
            >
              (Obrigatório)
            </span>
        )}
      </div>

      <div className="relative">
        <input 
          id={id}
          type="date" 
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          className={`form-input pr-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 ${!value ? '[&::-webkit-datetime-edit-text]:opacity-0 [&::-webkit-datetime-edit-month-field]:opacity-0 [&::-webkit-datetime-edit-day-field]:opacity-0 [&::-webkit-datetime-edit-year-field]:opacity-0' : ''}`}
          style={{ border: hasError ? '1px solid var(--color-error-strong)' : undefined }}
          autoComplete="off"
          required={required}
        />
        <Image 
          src={iconSrc}
          alt="Calendar" 
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          width={0}
          height={0}
        />
      </div>
      {hasError && errorMessage && (
        <p className="mt-1 text-sm text-[var(--color-error-strong)] font-normal leading-[22px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
