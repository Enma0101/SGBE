import React from 'react';

export function Button({ children, variant = 'default', className = '', ...props }) {
  // Basic variant support (ghost, default, etc.)
  let base = 'px-4 py-2 rounded focus:outline-none transition';
  let variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent text-inherit hover:bg-blue-800/20',
  };
  const variantClass = variants[variant] || variants.default;

  return (
    <button className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
