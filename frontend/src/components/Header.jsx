// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button'; // shadcn/ui button

function Header({ userRole, isAuthenticated }) {
  const getDashboardPath = (role) => {
    switch (role) {
      case 'aspirante': return '/aspirant/dashboard';
      case 'director': return '/director/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Becas Ana María</Link>
      <nav>
        {isAuthenticated ? (
          <>
            <Link to={getDashboardPath(userRole)}>
              <Button variant="ghost" className="text-white hover:text-gray-300 mr-4">
                Panel de {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Button>
            </Link>
            {/* Aquí podrías tener un botón de cerrar sesión o más opciones */}
          </>
        ) : (
          <Link to="/auth">
            <Button variant="ghost" className="text-white hover:text-gray-300">
              Iniciar Sesión / Registrarse
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;