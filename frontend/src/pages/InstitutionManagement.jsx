// src/pages/InstitutionManagement.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

function InstitutionManagement() {
  const [institutions, setInstitutions] = useState([
    { id: 1, name: 'Universidad Ejemplo', address: 'Calle Falsa 123', contact: 'info@ejemplo.com', type: 'Universitario', spaces: 50 },
    { id: 2, name: 'Colegio Moderno', address: 'Av. Siempre Viva 45', contact: 'sec@colegio.com', type: 'Secundaria', spaces: 20 },
  ]);
  const [newInstitution, setNewInstitution] = useState({ name: '', address: '', contact: '', type: '', spaces: '' });
  const [editInstitution, setEditInstitution] = useState(null); // null para añadir, objeto para editar
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [institutionToDelete, setInstitutionToDelete] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const filteredInstitutions = institutions.filter(inst =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEditSubmit = (e) => {
    e.preventDefault();
    if (editInstitution) {
      // Simular edición
      setInstitutions(institutions.map(inst =>
        inst.id === editInstitution.id ? { ...editInstitution, ...newInstitution, id: inst.id } : inst
      ));
      setAlert({ type: 'success', message: `Institución "${newInstitution.name}" actualizada.` });
    } else {
      // Simular añadir
      setInstitutions([...institutions, { id: Date.now(), ...newInstitution, spaces: parseInt(newInstitution.spaces) }]);
      setAlert({ type: 'success', message: `Institución "${newInstitution.name}" añadida.` });
    }
    setNewInstitution({ name: '', address: '', contact: '', type: '', spaces: '' });
    setEditInstitution(null);
    setDialogOpen(false);
    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  const handleDeleteClick = (inst) => {
    setInstitutionToDelete(inst);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    setInstitutions(institutions.filter(inst => inst.id !== institutionToDelete.id));
    setAlert({ type: 'success', message: `Institución "${institutionToDelete.name}" eliminada.` });
    setDeleteConfirmationOpen(false);
    setInstitutionToDelete(null);
    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  const handleEditClick = (inst) => {
    setEditInstitution(inst);
    setNewInstitution({
      name: inst.name,
      address: inst.address,
      contact: inst.contact,
      type: inst.type,
      spaces: inst.spaces.toString(),
    });
    setDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Gestión de Instituciones Educativas</CardTitle>
          <CardDescription className="text-center">
            Administra las instituciones elegibles para las becas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {alert.message && (
            <Alert className={`mb-4 ${alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <AlertTitle>{alert.type === 'success' ? 'Éxito' : 'Error'}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Buscar por nombre o tipo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditInstitution(null); setNewInstitution({ name: '', address: '', contact: '', type: '', spaces: '' }); }}>
                  Añadir Institución
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editInstitution ? 'Editar Institución' : 'Añadir Nueva Institución'}</DialogTitle>
                  <DialogDescription>
                    {editInstitution ? 'Actualiza los datos de la institución.' : 'Completa los datos para añadir una nueva institución.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddEditSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nombre</Label>
                    <Input id="name" value={newInstitution.name} onChange={(e) => setNewInstitution({ ...newInstitution, name: e.target.value })} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">Dirección</Label>
                    <Input id="address" value={newInstitution.address} onChange={(e) => setNewInstitution({ ...newInstitution, address: e.target.value })} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">Contacto</Label>
                    <Input id="contact" value={newInstitution.contact} onChange={(e) => setNewInstitution({ ...newInstitution, contact: e.target.value })} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Tipo de Estudio</Label>
                    <Input id="type" value={newInstitution.type} onChange={(e) => setNewInstitution({ ...newInstitution, type: e.target.value })} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="spaces" className="text-right">Cupos Disponibles</Label>
                    <Input id="spaces" type="number" value={newInstitution.spaces} onChange={(e) => setNewInstitution({ ...newInstitution, spaces: e.target.value })} className="col-span-3" />
                  </div>
                  <DialogFooter>
                    <Button type="submit">{editInstitution ? 'Guardar Cambios' : 'Añadir Institución'}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Tipo de Estudio</TableHead>
                <TableHead>Cupos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstitutions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No hay instituciones que coincidan con la búsqueda.</TableCell>
                </TableRow>
              ) : (
                filteredInstitutions.map((inst) => (
                  <TableRow key={inst.id}>
                    <TableCell className="font-medium">{inst.name}</TableCell>
                    <TableCell>{inst.address}</TableCell>
                    <TableCell>{inst.contact}</TableCell>
                    <TableCell>{inst.type}</TableCell>
                    <TableCell>{inst.spaces}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(inst)}>Editar</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(inst)}>Eliminar</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Dialogo de Confirmación de Eliminación */}
          <Dialog open={deleteConfirmationOpen} onOpenChange={setDeleteConfirmationOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro que deseas eliminar la institución "{institutionToDelete?.name}"? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteConfirmationOpen(false)}>Cancelar</Button>
                <Button variant="destructive" onClick={confirmDelete}>Eliminar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default InstitutionManagement;