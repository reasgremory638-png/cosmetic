'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium uppercase tracking-wider transition-all cursor-pointer border';
    
    const variants = {
      primary: 'bg-black text-white border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed',
      secondary: 'bg-transparent text-black border-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
      ghost: 'bg-transparent text-black border-transparent hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
