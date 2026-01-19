import { FieldError } from 'react-hook-form';
import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({ label, error, required = false, children }: FormFieldProps) {
  return (
    <div className="form-group">
      <div className="flex gap-2 items-center">
        <span
          className={`font-medium text-lg leading-[22px] align-bottom ${
            error ? 'text-[var(--color-error)]' : 'text-accent'
          }`}
        >
          {label}
        </span>
        {required && (
          <span
            className="form-required-label"
            style={error ? { color: 'var(--color-error)' } : undefined}
          >
            (Obrigatório)
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-1 text-sm text-[var(--color-error-strong)] font-normal leading-[22px]">
          {error.message}
        </p>
      )}
    </div>
  );
}
