// src/pages/ScholarshipAssignment.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Checkbox } from '../components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';

function ScholarshipAssignment() {
  const [eligibilityCriteria, setEligibilityCriteria] = useState({
    minPromedio: 75,
    maxIngresos: 1000,
  });
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Juan Pérez', promedio: 85, ingresos: 800, eligible: true },
    { id: 2, name: 'María López', promedio: 70, ingresos: 900, eligible: false },
    { id: 3, name: 'Carlos García', promedio: 90, ingresos: 700, eligible: true },
    { id: 4, name: 'Ana Rojas', promedio: 78, ingresos: 1200, eligible: false },
    { id: 5, name: 'Pedro Díaz', promedio: 82, ingresos: 600, eligible: true },
  ]);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [quotaEnabled, setQuotaEnabled] = useState(false);
  const [quotas, setQuotas] = useState({ basica: 30, superior: 70 });
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCriteriaChange = (e) => {
    const { id, value } = e.target;
    setEligibilityCriteria((prev) => ({ ...prev, [id]: parseFloat(value) }));
  };

  const generateCandidateList = () => {
    const updatedCandidates = candidates.map(c => ({
      ...c,
      eligible: c.promedio >= eligibilityCriteria.minPromedio && c.ingresos <= eligibilityCriteria.maxIngresos
    }));
    setCandidates(updatedCandidates);
    setDialogMessage('Lista de candidatos elegibles generada y actualizada.');
    setIsDialogOpen(true);
  };

  const performRandomAssignment = () => {
    const eligibleCandidates = candidates.filter(c => c.eligible);
    if (eligibleCandidates.length === 0) {
      setDialogMessage('No hay candidatos elegibles para asignar.');
      setIsDialogOpen(true);
      setSelectedBeneficiaries([]);
      return;
    }

    // Simular un sorteo (ej. seleccionar 2 beneficiarios)
    const numToSelect = Math.min(2, eligibleCandidates.length); // Limitar a un número razonable
    const shuffled = eligibleCandidates.sort(() => 0.5 - Math.random());
    const newBeneficiaries = shuffled.slice(0, numToSelect);

    setSelectedBeneficiaries(newBeneficiaries);
    setDialogMessage(`Asignación completada. Se seleccionaron ${newBeneficiaries.length} beneficiarios.`);
    setIsDialogOpen(true);

    // Aquí iría la lógica para notificar a los beneficiarios via Supabase
  };

  const handleQuotaChange = (e) => {
    const { id, value } = e.target;
    setQuotas((prev) => ({ ...prev, [id]: parseInt(value) }));
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Asignación Aleatoria de Becas</CardTitle>
          <CardDescription className="text-center">
            Define criterios, genera candidatos y asigna becas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">1. Criterios de Elegibilidad</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minPromedio">Promedio Mínimo Requerido</Label>
              <Input id="minPromedio" type="number" step="0.01" value={eligibilityCriteria.minPromedio} onChange={handleCriteriaChange} />
            </div>
            <div>
              <Label htmlFor="maxIngresos">Ingresos Familiares Máximos (USD)</Label>
              <Input id="maxIngresos" type="number" step="0.01" value={eligibilityCriteria.maxIngresos} onChange={handleCriteriaChange} />
            </div>
          </div>
          <Button onClick={generateCandidateList}>Generar Listado de Candidatos</Button>

          <h3 className="text-xl font-semibold border-b pb-2">2. Listado de Candidatos</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Promedio</TableHead>
                <TableHead>Ingresos</TableHead>
                <TableHead>Elegible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.promedio}</TableCell>
                  <TableCell>${c.ingresos}</TableCell>
                  <TableCell>
                    <Checkbox checked={c.eligible} disabled />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h3 className="text-xl font-semibold border-b pb-2">3. Configuración de Cuotas (Opcional)</h3>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="quotaEnabled" checked={quotaEnabled} onCheckedChange={setQuotaEnabled} />
            <Label htmlFor="quotaEnabled">Habilitar Cuotas por Categoría</Label>
          </div>
          {quotaEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basica">Porcentaje para Educación Básica</Label>
                <Input id="basica" type="number" value={quotas.basica} onChange={handleQuotaChange} />
              </div>
              <div>
                <Label htmlFor="superior">Porcentaje para Educación Superior</Label>
                <Input id="superior" type="number" value={quotas.superior} onChange={handleQuotaChange} />
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold border-b pb-2">4. Asignación Aleatoria</h3>
          <Button onClick={performRandomAssignment} className="w-full">Realizar Asignación Aleatoria</Button>

          {selectedBeneficiaries.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold border-b pb-2">5. Beneficiarios Asignados</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Promedio</TableHead>
                    <TableHead>Ingresos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedBeneficiaries.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell>{b.id}</TableCell>
                      <TableCell className="font-medium">{b.name}</TableCell>
                      <TableCell>{b.promedio}</TableCell>
                      <TableCell>${b.ingresos}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button className="mt-4 w-full">Generar Reporte de Asignación</Button>
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Notificación</DialogTitle>
                <DialogDescription>{dialogMessage}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setIsDialogOpen(false)}>Ok</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default ScholarshipAssignment;