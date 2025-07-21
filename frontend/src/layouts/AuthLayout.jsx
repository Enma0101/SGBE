// src/layouts/AuthLayout.jsx
import React from 'react';

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
export default AuthLayout;