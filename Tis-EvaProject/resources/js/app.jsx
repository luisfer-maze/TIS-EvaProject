import React from 'react';
import { createRoot } from 'react-dom/client';  // Importa createRoot
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';  // Asegúrate de que la ruta sea correcta
import Proyecto from './Proyecto';  // Asegúrate de que la ruta sea correcta
import HomePage from './HomePage';  // Importa tu página de inicio

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Ruta para la página principal */}
        <Route path="/login" element={<Login />} />
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/homepage" element={<HomePage />} /> {/* Extra route for /homepage if needed */}
      </Routes>
    </Router>
  );
}

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);  // Usando createRoot para renderizar
root.render(<App />);  // Renderiza el componente
