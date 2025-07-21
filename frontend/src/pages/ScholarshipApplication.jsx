// src/pages/ScholarshipApplication.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

function ScholarshipApplication() {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: '',
    correo: '',
    nivelEducativo: '',
    promedio: '',
    institucionActual: '',
    ingresosFamiliares: '',
    dependientes: '',
    // Documentos serán File objetos en el futuro
    cedulaDoc: null,
    notasDoc: null,
    constanciaEstudiosDoc: null,
    constanciaIngresosDoc: null,
    servicioPublicoDoc: null,
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value, id) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({ ...prev, [id]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de la solicitud:', formData);
    setSubmissionMessage('Simulación: Solicitud enviada. Puedes revisar el estado en tu panel.');
    // Aquí iría la lógica para enviar datos a Supabase y subir archivos a Storage
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Solicitud de Beca "Ana María"</CardTitle>
          <CardDescription className="text-center">
            Completa el formulario y adjunta los documentos requeridos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold border-b pb-2">Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input id="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="cedula">Cédula</Label>
                <Input id="cedula" value={formData.cedula} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" value={formData.direccion} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" value={formData.telefono} onChange={handleChange} required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input id="correo" type="email" value={formData.correo} onChange={handleChange} required />
              </div>
            </div>

            <h3 className="text-xl font-semibold border-b pb-2">Información Académica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nivelEducativo">Nivel Educativo</Label>
                <Select id="nivelEducativo" value={formData.nivelEducativo} onValueChange={(val) => handleSelectChange(val, 'nivelEducativo')} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primaria">Primaria</SelectItem>
                    <SelectItem value="secundaria">Secundaria</SelectItem>
                    <SelectItem value="universitario">Universitario</SelectItem>
                    <SelectItem value="postgrado">Postgrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="promedio">Promedio General</Label>
                <Input id="promedio" type="number" step="0.01" value={formData.promedio} onChange={handleChange} required />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="institucionActual">Institución Actual</Label>
                <Input id="institucionActual" value={formData.institucionActual} onChange={handleChange} required />
              </div>
            </div>

            <h3 className="text-xl font-semibold border-b pb-2">Información Socioeconómica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ingresosFamiliares">Ingresos Familiares Mensuales (estimado)</Label>
                <Input id="ingresosFamiliares" type="number" step="0.01" value={formData.ingresosFamiliares} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="dependientes">Número de Dependientes</Label>
                <Input id="dependientes" type="number" value={formData.dependientes} onChange={handleChange} required />
              </div>
            </div>

            <h3 className="text-xl font-semibold border-b pb-2">Carga de Documentos</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cedulaDoc">Cédula de Identidad</Label>
                <Input id="cedulaDoc" type="file" onChange={handleFileChange} required />
              </div>
              <div>
                <Label htmlFor="notasDoc">Notas Certificadas</Label>
                <Input id="notasDoc" type="file" onChange={handleFileChange} required />
              </div>
              <div>
                <Label htmlFor="constanciaEstudiosDoc">Constancia de Estudios</Label>
                <Input id="constanciaEstudiosDoc" type="file" onChange={handleFileChange} required />
              </div>
              <div>
                <Label htmlFor="constanciaIngresosDoc">Constancia de Ingresos Familiares</Label>
                <Input id="constanciaIngresosDoc" type="file" onChange={handleFileChange} required />
              </div>
              <div>
                <Label htmlFor="servicioPublicoDoc">Recibo de Servicio Público (prueba de residencia)</Label>
                <Input id="servicioPublicoDoc" type="file" onChange={handleFileChange} required />
              </div>
            </div>

            <Button type="submit" className="w-full">Enviar Solicitud</Button>
            {submissionMessage && <p className="text-center text-sm mt-4 text-green-600">{submissionMessage}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ScholarshipApplication;