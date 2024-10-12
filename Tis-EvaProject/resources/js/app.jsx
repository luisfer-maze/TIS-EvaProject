import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Proyecto from './Proyecto';
import HomePage from './HomePage';
import Register from './Register';  // Importamos Register
import ForgotPassword from './ForgotPassword';  // Importamos ForgotPassword

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/register" element={<Register />} />  {/* Nueva ruta para Register */}
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Nueva ruta para Forgot Password */}
      </Routes>
    </Router>
  );
}

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);
root.render(<App />);
