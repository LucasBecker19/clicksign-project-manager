import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('should render button with title', () => {
    render(<Button title="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render button with type submit', () => {
    const { container } = render(<Button title="Submit" type="submit" />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should be disabled when disabled prop is true', () => {
    const { container } = render(<Button title="Disabled" disabled={true} />);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(<Button title="Click" onClick={handleClick} />);
    const button = container.querySelector('button');
    button?.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('should accept width prop', () => {
    const { container } = render(<Button title="Wide" width="300px" />);
    const button = container.querySelector('button');
    expect(button).toHaveStyle({ maxWidth: '300px' });
  });

  it('should apply wfull class when wfull is true', () => {
    const { container } = render(<Button title="Full" wfull={true} />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('w-full');
  });
});
