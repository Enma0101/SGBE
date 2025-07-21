// src/components/auth/LoginForm.jsx
import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Error al iniciar sesión: " + error.message);
    else window.location.href = "/";
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Iniciar Sesión</h2>
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Entrar</button>
    </form>
  );
}
