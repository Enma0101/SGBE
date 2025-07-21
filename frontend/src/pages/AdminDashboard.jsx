// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

function AdminDashboard() {
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'Juan Pérez', institution: 'Colegio A', age: 16, promedio: 85, status: 'En revisión' },
    { id: 2, name: 'María López', institution: 'Universidad X', age: 20, promedio: 70, status: 'Recibida' },
    { id: 3, name: 'Carlos García', institution: 'Instituto B', age: 18, promedio: 90, status: 'Aprobada' },
    { id: 4, name: 'Ana Rojas', institution: 'Colegio A', age: 15, promedio: 78, status: 'Rechazada' },
    { id: 5, name: 'Pedro Díaz', institution: 'Universidad Y', age: 22, promedio: 82, status: 'En revisión' },
  ]);
  const [filters, setFilters] = useState({
    search: '',
    institution: '',
    minAge: '',
    maxAge: '',
    minPromedio: '',
    maxPromedio: '',
  });

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectFilterChange = (value, id) => {
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const filteredApplicants = applicants.filter(applicant => {
    let matches = true;
    if (filters.search && !applicant.name.toLowerCase().includes(filters.search.toLowerCase())) {
      matches = false;
    }
    if (filters.institution && applicant.institution !== filters.institution) {
      matches = false;
    }
    if (filters.minAge && applicant.age < parseInt(filters.minAge)) {
      matches = false;
    }
    if (filters.maxAge && applicant.age > parseInt(filters.maxAge)) {
      matches = false;
    }
    if (filters.minPromedio && applicant.promedio < parseFloat(filters.minPromedio)) {
      matches = false;
    }
    if (filters.maxPromedio && applicant.promedio > parseFloat(filters.maxPromedio)) {
      matches = false;
    }
    return matches;
  });

  // Extraer instituciones únicas para el filtro
  const uniqueInstitutions = [...new Set(applicants.map(app => app.institution))];

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Panel de Administrador</CardTitle>
          <CardDescription className="text-center">
            Gestión y visualización de todos los aspirantes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Filtros de Aspirantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="search">Buscar por Nombre</Label>
              <Input id="search" value={filters.search} onChange={handleFilterChange} placeholder="Nombre del aspirante..." />
            </div>
            <div>
              <Label htmlFor="institution">Institución Educativa</Label>
              <Select id="institution" value={filters.institution} onValueChange={(val) => handleSelectFilterChange(val, 'institution')}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona institución" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  {uniqueInstitutions.map(inst => (
                    <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="minAge">Edad Mínima</Label>
              <Input id="minAge" type="number" value={filters.minAge} onChange={handleFilterChange} placeholder="Min" />
            </div>
            <div>
              <Label htmlFor="maxAge">Edad Máxima</Label>
              <Input id="maxAge" type="number" value={filters.maxAge} onChange={handleFilterChange} placeholder="Max" />
            </div>
            <div>
              <Label htmlFor="minPromedio">Promedio Mínimo</Label>
              <Input id="minPromedio" type="number" step="0.01" value={filters.minPromedio} onChange={handleFilterChange} placeholder="Min" />
            </div>
            <div>
              <Label htmlFor="maxPromedio">Promedio Máximo</Label>
              <Input id="maxPromedio" type="number" step="0.01" value={filters.maxPromedio} onChange={handleFilterChange} placeholder="Max" />
            </div>
          </div>

          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Listado de Aspirantes</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Institución</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Promedio</TableHead>
                <TableHead>Estado Solicitud</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No hay aspirantes que coincidan con los filtros.</TableCell>
                </TableRow>
              ) : (
                filteredApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.institution}</TableCell>
                    <TableCell>{applicant.age}</TableCell>
                    <TableCell>{applicant.promedio}</TableCell>
                    <TableCell>{applicant.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">Ver Detalles</Button>
                      <Button variant="outline" size="sm">Cambiar Estado</Button>
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

export default AdminDashboard;