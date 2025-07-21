import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function useUserRole(session) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from("usuario")
        .select("rol")
        .eq("id_auth", session.user.id)
        .single();

      if (error) {
        console.error("Error al obtener el rol:", error.message);
      } else {
        setRole(data.rol);
      }

      setLoading(false);
    };

    fetchRole();
  }, [session]);

  return { role, loading };
}
