import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Proyectos from './Pages/Proyectos';
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import ProyectoEstudiante from './Pages/ProyectoEstudiante';
import PlanificacionEstudiante from './Pages/PlanificacionEstudiante';
import HistoriaUsuario from './Pages/HistoriaUsuario';
import Perfil from "./Pages/Perfil";
import ApproveAccounts from './Pages/ApproveAccounts';
import AddGrupo from './Pages/Grupos';
import Grupos from './Pages/Grupos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/grupo" element={<Grupos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/proyecto-estudiante" element={<ProyectoEstudiante />} />
        <Route path="/planificacion-estudiante" element={<PlanificacionEstudiante />} />
        <Route path="/historia-usuario/:id" element={<HistoriaUsuario />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/approve-accounts" element={<ApproveAccounts />} />
      </Routes>
    </Router>
  );
}

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);
root.render(<App />);
