import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<App />, document.getElementById('app'));
