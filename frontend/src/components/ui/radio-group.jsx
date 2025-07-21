import React from 'react';

export function RadioGroup({ children, name, className = '', ...props }) {
  return (
    <div role="radiogroup" className={className} {...props}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { name })
      )}
    </div>
  );
}

export function RadioGroupItem({ children, value, name, className = '', ...props }) {
  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <input type="radio" name={name} value={value} {...props} />
      {children}
    </label>
  );
}
