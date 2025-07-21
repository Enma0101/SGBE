// src/pages/Login.jsx
import LoginForm from "../components/auth/LoginForm";
export default function Login() {


  const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Error al iniciar sesión: " + error.message);
    return;
  }

  const { user } = data;
  const { data: userData } = await supabase
    .from("usuario")
    .select("rol")
    .eq("id_auth", user.id)
    .single();

  const rol = userData?.rol;
  if (rol === "aspirante") navigate("/panel/aspirante");
  else if (rol === "director") navigate("/panel/director");
  else if (rol === "administrador") navigate("/panel/admin");
  else navigate("/");
};

  return <div className="p-4"><LoginForm /></div>;
}