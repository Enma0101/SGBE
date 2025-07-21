import React from 'react';

export function Select({ children, className = '', ...props }) {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SelectTrigger({ children, className = '', ...props }) {
  return (
    <button className={`w-full border rounded px-3 py-2 bg-white text-left ${className}`} {...props}>
      {children}
    </button>
  );
}

export function SelectValue({ children, className = '', ...props }) {
  return (
    <span className={className} {...props}>{children}</span>
  );
}

export function SelectContent({ children, className = '', ...props }) {
  return (
    <div className={`absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SelectItem({ children, className = '', ...props }) {
  return (
    <div className={`px-3 py-2 hover:bg-blue-100 cursor-pointer ${className}`} {...props}>
      {children}
    </div>
  );
}
