// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'; // Lo crearemos más tarde
import AuthPage from './pages/AuthPage';
import AspirantDashboard from './pages/AspirantDashboard';
import DirectorDashboard from './pages/DirectorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ScholarshipApplication from './pages/ScholarshipApplication';
import InstitutionManagement from './pages/InstitutionManagement';
import ScholarshipAssignment from './pages/ScholarshipAssignment';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Este es un placeholder simple para el estado de autenticación y rol
// En una app real, usarías un Context API o algo como Redux/Zustand
const currentUser = {
  isAuthenticated: true, // Cambia a true para simular estar logueado
  role: 'aspirante' // 'aspirante', 'director', 'admin'
};

const PrivateRoute = ({ children, allowedRoles }) => {
  if (!currentUser.isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" />; // Página de "no autorizado"
  }
  return children;
};

function App() {
  return (
    <Router>
      <Header userRole={currentUser.role} isAuthenticated={currentUser.isAuthenticated} />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/auth" element={<AuthLayout><AuthPage /></AuthLayout>} />
        <Route path="/" element={<Navigate to="/auth" />} /> {/* Redirige por defecto a auth */}
        <Route path="/unauthorized" element={
          <div className="flex justify-center items-center min-h-screen bg-red-100">
            <h1 className="text-3xl text-red-700">Acceso no autorizado</h1>
          </div>
        } />

        {/* Módulo 1: Autenticación y Control de Acceso (implementado arriba, los paneles serán privados) */}

        {/* Módulo 2: Solicitud de Becas (Aspirante) */}
        <Route path="/apply" element={
          <PrivateRoute allowedRoles={['aspirante']}>
            <DashboardLayout userRole={currentUser.role}>
              <ScholarshipApplication />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/aspirant/dashboard" element={
          <PrivateRoute allowedRoles={['aspirante']}>
            <DashboardLayout userRole={currentUser.role}>
              <AspirantDashboard />
            </DashboardLayout>
          </PrivateRoute>
        } />

        {/* Módulo 3: Gestión de Instituciones Educativas (Administrador) */}
        <Route path="/admin/institutions" element={
          <PrivateRoute allowedRoles={['admin']}>
            <DashboardLayout userRole={currentUser.role}>
              <InstitutionManagement />
            </DashboardLayout>
          </PrivateRoute>
        } />

        {/* Módulo 4: Asignación Aleatoria de Becas (Administrador) */}
        <Route path="/admin/assign-scholarships" element={
          <PrivateRoute allowedRoles={['admin']}>
            <DashboardLayout userRole={currentUser.role}>
              <ScholarshipAssignment />
            </DashboardLayout>
          </PrivateRoute>
        } />

        {/* Módulo 5: Panel de Administrador */}
        <Route path="/admin/dashboard" element={
          <PrivateRoute allowedRoles={['admin']}>
            <DashboardLayout userRole={currentUser.role}>
              <AdminDashboard />
            </DashboardLayout>
          </PrivateRoute>
        } />

        {/* Módulo 6: Panel de Director */}
        <Route path="/director/dashboard" element={
          <PrivateRoute allowedRoles={['director']}>
            <DashboardLayout userRole={currentUser.role}>
              <DirectorDashboard />
            </DashboardLayout>
          </PrivateRoute>
        } />

        {/* Módulo 7: Panel de Aspirante (implementado en /aspirant/dashboard) */}

        {/* Ruta comodín para 404 */}
        <Route path="*" element={
            <div className="flex justify-center items-center min-h-screen bg-gray-200">
                <h1 className="text-4xl text-gray-800">404 - Página no encontrada</h1>
            </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;