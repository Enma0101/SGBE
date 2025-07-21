import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Header({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-blue-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Beca Ana María Campos</Link>
      </h1>
      <nav className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-sm">Hola, {session.user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline text-sm">
              Iniciar sesión
            </Link>
            <Link to="/register" className="hover:underline text-sm">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
