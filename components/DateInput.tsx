'use client';

import Image from 'next/image';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  
  const parseLocalDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const handleDateChange = (date: Date | null) => {
    const newValue = date ? formatLocalDate(date) : '';
    if (externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className="form-group">
      <style jsx>{`
        .date-input-error :global(.react-datepicker__input-container input) {
          border: 1px solid var(--color-error-strong) !important;
        }
      `}</style>
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

      <div className={`relative ${hasError ? 'date-input-error' : ''}`}>
        <DatePicker
          id={id}
          selected={value ? parseLocalDate(value) : null}
          onChange={handleDateChange}
          onBlur={onBlur}
          className={`form-input pr-10 ${!value ? '[&::-webkit-datetime-edit-text]:opacity-0' : ''}`}
          wrapperClassName="w-full"
          autoComplete="off"
          required={required}
          dateFormat="yyyy-MM-dd"
          
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
