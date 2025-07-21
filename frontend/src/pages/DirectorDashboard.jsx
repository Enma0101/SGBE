// src/pages/DirectorDashboard.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

function DirectorDashboard() {
  const [myInstitutionApplicants, setMyInstitutionApplicants] = useState([
    { id: 101, name: 'Laura Gómez', age: 17, promedio: 88, status: 'En revisión' },
    { id: 102, name: 'Marco Polo', age: 16, promedio: 92, status: 'Aprobada' },
    { id: 103, name: 'Sofia Ruiz', age: 15, promedio: 75, status: 'Recibida' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApplicants = myInstitutionApplicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Panel de Director</CardTitle>
          <CardDescription className="text-center">
            Visualización de aspirantes de tu unidad educativa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search">Buscar Aspirante por Nombre</Label>
            <Input
              id="search"
              placeholder="Escribe el nombre del aspirante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Aspirantes de mi Institución</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Promedio</TableHead>
                <TableHead>Estado Solicitud</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No hay aspirantes en tu institución que coincidan.</TableCell>
                </TableRow>
              ) : (
                filteredApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.age}</TableCell>
                    <TableCell>{applicant.promedio}</TableCell>
                    <TableCell>{applicant.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default DirectorDashboard;