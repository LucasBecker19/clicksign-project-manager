import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from '@/components/FormField';

describe('FormField', () => {
  it('should render label', () => {
    render(<FormField label="Test Label"><input /></FormField>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render required label when required is true', () => {
    render(<FormField label="Required" required><input /></FormField>);
    expect(screen.getByText('(Obrigatório)')).toBeInTheDocument();
  });

  it('should not render required label when required is false', () => {
    render(<FormField label="Optional" required={false}><input /></FormField>);
    expect(screen.queryByText('(Obrigatório)')).not.toBeInTheDocument();
  });

  it('should render error message when error is provided', () => {
    const error = { message: 'This field is required' } as never;
    render(<FormField label="Field" error={error}><input /></FormField>);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(<FormField label="Field"><input data-testid="test-input" /></FormField>);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });
});
