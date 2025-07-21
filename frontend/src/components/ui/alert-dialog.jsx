import React, { useState } from 'react';

export function AlertDialog({ children, open, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(open || false);
  const handleOpenChange = (val) => {
    setIsOpen(val);
    if (onOpenChange) onOpenChange(val);
  };
  return (
    <div>{React.Children.map(children, child => React.cloneElement(child, { isOpen, handleOpenChange }))}</div>
  );
}

export function AlertDialogTrigger({ children, handleOpenChange }) {
  return React.cloneElement(children, {
    onClick: () => handleOpenChange(true),
  });
}

export function AlertDialogContent({ children, isOpen, handleOpenChange, className = '', ...props }) {
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

export function AlertDialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-bold mb-2">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="text-gray-600 mb-4">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}

export function AlertDialogAction({ children, handleOpenChange, ...props }) {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => handleOpenChange(false)} {...props}>
      {children}
    </button>
  );
}

export function AlertDialogCancel({ children, handleOpenChange, ...props }) {
  return (
    <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded" onClick={() => handleOpenChange(false)} {...props}>
      {children}
    </button>
  );
}
