import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function PanelDirector() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel del Director</h1>
      <p className="mb-4">Desde este panel puedes revisar las postulaciones y aprobar documentos.</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
