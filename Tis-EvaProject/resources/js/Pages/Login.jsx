import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate
import "../../css/Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
    const [role, setRole] = useState("Docente");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Hook para navegar programáticamente

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Obtener el token CSRF desde el meta tag
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const response = await fetch("/login", {
                // Asegúrate de que la ruta es correcta
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken, // Incluye el token CSRF en los encabezados
                },
                body: JSON.stringify({
                    email,
                    password,
                    role,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Error en la respuesta del servidor"
                );
            }

            const data = await response.json();
            console.log("Login exitoso:", data);

            // Redirige según el rol
            if (data.role === "Docente") {
                navigate("/proyectos");
            } else if (data.role === "Estudiante") {
                navigate("/planificacion-estudiante");
            }
        } catch (error) {
            console.error("Error:", error.message);
            // Aquí puedes manejar el error y mostrar un mensaje al usuario
        }
    };

    return (
        <div
            className="app-background"
            style={{
                backgroundImage: `url('/assets/Background.png')`,
            }}
        >
            <div className="login-container">
                <h2>Iniciar Sesión</h2>

                {/* Línea divisoria */}
                <div className="divider"></div>
                <form onSubmit={handleLogin}>
                    {/* Select de rol con ícono de flecha */}
                    <div
                        className="input-group"
                        style={{ position: "relative" }}
                    >
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="select-role"
                        >
                            <option value="Docente">Docente</option>
                            <option value="Estudiante">Estudiante</option>
                        </select>
                        <span
                            className="toggle-select"
                            onClick={() =>
                                document.querySelector(".select-role").click()
                            }
                        >
                            <i className="fas fa-chevron-down"></i>{" "}
                            {/* Icono de flecha */}
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
                    <div
                        className="input-group"
                        style={{ position: "relative" }}
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña:"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <i className="fas fa-eye-slash"></i>
                            ) : (
                                <i className="fas fa-eye"></i>
                            )}
                        </span>
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </form>

                {/* Enlaces a otras páginas */}
                <div className="extra-links">
                    <Link to="/forgot-password">
                        ¿Has olvidado la contraseña?
                    </Link>
                    <Link to="/register">¿No tienes cuenta?</Link>
                </div>

                {/* Línea divisoria */}
                <div className="divider"></div>
                <div className="google-login">
                    <img src="/assets/LogoGoogle.png" alt="Google logo" />
                    <span>Continuar con Google</span>
                </div>
            </div>
        </div>
    );
}

export default App;
