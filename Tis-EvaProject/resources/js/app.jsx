import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Proyectos from './Proyectos';
import HomePage from './HomePage';
import Register from './Register';  // Importamos Register
import ForgotPassword from './ForgotPassword';  // Importamos ForgotPassword
import ProyectoEstudiante from  './ProyectoEstudiante';   // Importamos ProyectoEstudiante
import PlanificacionEstudiante from  './PlanificacionEstudiante';  // Importamos PlanificacionEstudiante
import HistoriaUsuario from   './HistoriaUsuario';  // Importamos HistoriaUsuario

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/register" element={<Register />} />  {/* Nueva ruta para Register */}
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Nueva ruta para Forgot Password */}
        <Route path="/proyecto-estudiante" element={<ProyectoEstudiante />} />   {/* Nueva ruta para ProyectoEstudiante */}
        <Route path="/planificacion-estudiante" element={<PlanificacionEstudiante />} />   {/* Nueva ruta para PlanificacionEstudiante */}
        <Route path="/historia-usuario/:id" element={<HistoriaUsuario />} />
      </Routes>
    </Router>
  );
}

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);
root.render(<App />);
