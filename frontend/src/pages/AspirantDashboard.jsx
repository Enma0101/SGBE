// src/pages/AspirantDashboard.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge'; // Necesitarías añadir Badge con shadcn/ui add badge
import { Button } from '../components/ui/button';

function AspirantDashboard() {
  const [applicantData, setApplicantData] = useState({
    name: 'Emma Flores',
    cedula: 'V-12.345.678',
    email: 'emma.flores@example.com',
    status: 'En revisión', // Puede ser 'Recibida', 'En revisión', 'Aprobada', 'Rechazada'
    details: 'Tu solicitud ha sido recibida y se encuentra en proceso de evaluación. Recibirás una notificación cuando cambie de estado.'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Recibida': return 'bg-blue-500 text-white';
      case 'En revisión': return 'bg-yellow-500 text-black';
      case 'Aprobada': return 'bg-green-500 text-white';
      case 'Rechazada': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Panel de Aspirante</CardTitle>
          <CardDescription className="text-center">
            Consulta el estado de tu solicitud de beca.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Estado de tu Postulación</h3>
            <Badge className={`text-lg px-4 py-2 ${getStatusColor(applicantData.status)}`}>
              {applicantData.status}
            </Badge>
            <p className="text-center text-gray-600 mt-2">{applicantData.details}</p>
          </div>

          <h3 className="text-xl font-semibold border-t pt-6 mt-6">Tus Datos Personales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nombre Completo:</p>
              <p className="font-medium">{applicantData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cédula:</p>
              <p className="font-medium">{applicantData.cedula}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Correo Electrónico:</p>
              <p className="font-medium">{applicantData.email}</p>
            </div>
            {/* Aquí podrías añadir más campos de datos personales/académicos */}
          </div>

          <div className="flex justify-center mt-6">
            <Button className="mr-4">Actualizar Datos (Simulación)</Button>
            <Button variant="outline">Ver Documentos Adjuntos (Simulación)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AspirantDashboard;