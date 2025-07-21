import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import useUserRole from "./hooks/useUserRole";
import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import PanelAspirante from "./pages/aspirante/Panel";
import PanelAdmin from "./pages/admin/Panel";
import PanelDirector from "./pages/director/Panel";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { role, loading } = useUserRole(session);

  if (session && loading) return <div className="p-4">Cargando usuario...</div>;

  return (
    <Router>
      <Header session={session} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!session ? <Register /> : <Navigate to="/" />} />

        {/* Paneles según rol */}
        <Route path="/panel/admin" element={role === "administrador" ? <PanelAdmin /> : <Navigate to="/" />} />
        <Route path="/panel/aspirante" element={role === "aspirante" ? <PanelAspirante /> : <Navigate to="/" />} />
        <Route path="/panel/director" element={role === "director" ? <PanelDirector /> : <Navigate to="/" />} />

        <Route path="*" element={<div className="p-4">Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;
