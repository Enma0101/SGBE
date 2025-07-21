import React from 'react';

export function Alert({ children, className = '', ...props }) {
  return (
    <div className={`border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = '', ...props }) {
  return (
    <div className={`font-bold text-yellow-800 mb-1 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = '', ...props }) {
  return (
    <div className={`text-yellow-700 ${className}`} {...props}>
      {children}
    </div>
  );
}
