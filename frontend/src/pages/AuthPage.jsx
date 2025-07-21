// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    // Simulación de autenticación
    if (isLogin) {
      console.log('Intentando iniciar sesión con:', email, password);
      setMessage('Simulación: Iniciando sesión...');
      setTimeout(() => setMessage('Simulación: Sesión iniciada como ' + email), 1500);
      // Aquí iría la lógica de Supabase auth.signInWithPassword
    } else {
      console.log('Intentando registrar con:', email, password);
      setMessage('Simulación: Registrando usuario...');
      setTimeout(() => setMessage('Simulación: Usuario registrado. Revisa tu correo.'), 1500);
      // Aquí iría la lógica de Supabase auth.signUp
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</CardTitle>
        <CardDescription className="text-center">
          {isLogin ? 'Ingresa tus credenciales para acceder.' : 'Crea una cuenta para solicitar tu beca.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </Button>
          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="p-0 h-auto ml-1">
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}

export default AuthPage;