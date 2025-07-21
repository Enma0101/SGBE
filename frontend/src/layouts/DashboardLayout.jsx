// src/layouts/DashboardLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card'; // shadcn/ui card

const DashboardLayout = ({ children, userRole }) => {
  const getNavLinks = (role) => {
    switch (role) {
      case 'aspirante':
        return [
          { name: 'Mi Solicitud', path: '/aspirant/dashboard' },
          { name: 'Solicitar Beca', path: '/apply' },
        ];
      case 'director':
        return [
          { name: 'Aspirantes de mi Unidad', path: '/director/dashboard' },
        ];
      case 'admin':
        return [
          { name: 'Panel Principal', path: '/admin/dashboard' },
          { name: 'Gestión Instituciones', path: '/admin/institutions' },
          { name: 'Asignación de Becas', path: '/admin/assign-scholarships' },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks(userRole);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Panel de {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Usuario'}</h2>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path} className="mb-4">
                <Link to={link.path} className="block text-lg hover:text-blue-400 transition-colors duration-200">
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="mb-4">
              <Link to="/auth" className="block text-lg hover:text-red-400 transition-colors duration-200">
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;