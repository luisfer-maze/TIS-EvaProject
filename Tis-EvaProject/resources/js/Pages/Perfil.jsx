import React, { useState, useEffect } from "react";
import HeaderProyecto from "../Components/HeaderProyecto";
import "../../css/Perfil.css";

const Perfil = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("configuracion-usuario"); // Estado de la opción seleccionada

    const [userData, setUserData] = useState({
        nombre: "Usuario",
        email: "usuario@correo.com",
        foto: "https://via.placeholder.com/100",
        bio: "",
    });

    useEffect(() => {
        fetch("http://localhost:8000/api/usuario-logueado", {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.error) {
                    setUserData({
                        nombre: `${data.nombre} ${data.apellido}`,
                        email: data.email,
                        foto: data.foto || "https://via.placeholder.com/100",
                        bio: data.bio || "",
                    });
                }
            })
            .catch((error) =>
                console.error("Error al cargar los datos del usuario:", error)
            );
    }, []);

    // Función para renderizar el contenido en función de la opción seleccionada
    const renderContent = () => {
        if (selectedOption === "configuracion-usuario") {
            return (
                <div className="perfil-info">
                    <div className="perfil-foto-section">
                        <img
                            src={userData.foto}
                            alt="Foto de perfil"
                            className="perfil-foto"
                        />
                        <button className="change-photo-btn">
                            Cambiar Foto
                        </button>
                    </div>
                    <div className="perfil-form">
                        <label>Nombre completo</label>
                        <input type="text" value={userData.nombre} disabled />

                        <label>Email</label>
                        <input type="email" value={userData.email} disabled />

                        <label>Biografía (máx. 210 caracteres)</label>
                        <textarea
                            value={userData.bio}
                            maxLength="210"
                            placeholder="Cuéntanos algo sobre ti..."
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    bio: e.target.value,
                                })
                            }
                        ></textarea>
                        <button className="save-btn">Guardar</button>
                    </div>
                </div>
            );
        } else if (selectedOption === "cambiar-contrasena") {
            return (
                <div className="perfil-form">
                    <label>Contraseña actual</label>
                    <input
                        type="password"
                        placeholder="Tu contraseña actual"
                    />

                    <label>Nueva contraseña</label>
                    <input
                        type="password"
                        placeholder="Escribe una contraseña nueva"
                    />

                    <label>Reescribe la nueva contraseña</label>
                    <input
                        type="password"
                        placeholder="Reescribe la nueva contraseña"
                    />

                    <button className="save-btn">Guardar</button>
                </div>
            );
        }
    };

    return (
        <div className="perfil-container">
            <HeaderProyecto isModalOpen={isModalOpen} />
            <div className="perfil-content">
                <aside className="perfil-sidebar">
                    <ul>
                        <li
                            className={
                                selectedOption === "configuracion-usuario"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setSelectedOption("configuracion-usuario")
                            }
                        >
                            CONFIGURACIÓN DE USUARIO
                        </li>
                        <li
                            className={
                                selectedOption === "cambiar-contrasena"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setSelectedOption("cambiar-contrasena")
                            }
                        >
                            CAMBIAR CONTRASEÑA
                        </li>
                    </ul>
                </aside>
                <div className="perfil-main">
                    <h2>
                        {selectedOption === "configuracion-usuario"
                            ? "Configuración de Usuario"
                            : "Cambiar contraseña"}
                    </h2>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Perfil;
