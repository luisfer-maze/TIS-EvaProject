import React, { useState } from 'react';
import '../css/Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [role, setRole] = useState('Docente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login:', { role, email, password });
  };

  return (
    <div
      className="app-background"
      style={{
        backgroundImage: `url('/assets/Background.jpg')`,
      }}
    >
      <div className="login-container">
        <h2>Inicio Sesión</h2>
        <form onSubmit={handleLogin}>
          {/* Select de rol con ícono de flecha */}
          <div className="input-group" style={{ position: 'relative' }}>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Docente">Docente</option>
              <option value="Estudiante">Estudiante</option>
            </select>
            <span className="toggle-select">
              <i className="fas fa-chevron-down"></i> {/* Icono de flecha */}
            </span>
          </div>

          {/* Input de correo */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input de contraseña con ícono de ojo */}
          <div className="input-group" style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña:"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
            </span>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <div className="extra-links">
          <a href="#">¿Has olvidado la contraseña?</a>
          <a href="#">¿No tienes cuenta?</a>
        </div>
        <div className="google-login">
          <img src="/assets/LogoGoogle.png" alt="Google logo" />
          <span>Continuar con Google</span>
        </div>
      </div>
    </div>
  );
}

export default App;
