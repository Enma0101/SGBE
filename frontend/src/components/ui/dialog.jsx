import React, { useState } from 'react';

export function Dialog({ children, open, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(open || false);
  const handleOpenChange = (val) => {
    setIsOpen(val);
    if (onOpenChange) onOpenChange(val);
  };
  return (
    <div>{React.Children.map(children, child => React.cloneElement(child, { isOpen, handleOpenChange }))}</div>
  );
}

export function DialogTrigger({ children, handleOpenChange }) {
  return React.cloneElement(children, {
    onClick: () => handleOpenChange(true),
  });
}

export function DialogContent({ children, isOpen, handleOpenChange, className = '', ...props }) {
  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${className}`} {...props}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => handleOpenChange(false)} />
      <div className="bg-white rounded shadow-lg p-6 relative z-10">
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-bold mb-2">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-gray-600 mb-4">{children}</p>;
}

export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
