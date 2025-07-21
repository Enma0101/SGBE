// src/components/auth/RegisterForm.jsx
import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("Error al registrarse: " + error.message);
    else alert("Registro exitoso. Revisa tu correo.");
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Registro</h2>
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Registrarse</button>
    </form>
  );
}
