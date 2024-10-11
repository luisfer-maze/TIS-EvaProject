import React from 'react';
import { createRoot } from 'react-dom/client';  // Importa createRoot
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';  // Asegúrate de que la ruta sea correcta
import Proyecto from './Proyecto';  // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/proyecto" element={<Proyecto />} />
      </Routes>
    </Router>
  );
}

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);  // Usando createRoot para renderizar
root.render(<App />);  // Renderiza el componente
