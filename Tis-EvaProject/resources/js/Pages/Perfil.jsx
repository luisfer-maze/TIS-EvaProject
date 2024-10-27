import React, { useState, useEffect } from "react";
import HeaderProyecto from "../Components/HeaderProyecto";
import "../../css/Perfil.css";

const Perfil = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        "configuracion-usuario"
    );
    const [userData, setUserData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        foto: "https://via.placeholder.com/100",
        bio: "",
    });
    const [newPhoto, setNewPhoto] = useState(null);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    // Cargar datos del usuario
    useEffect(() => {
        fetch("http://localhost:8000/api/usuario-logueado", {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.error) {
                    setUserData({
                        nombre: data.nombre || "",
                        apellido: data.apellido || "",
                        email: data.email || "",
                        foto: data.foto
                            ? `http://localhost:8000/storage/${data.foto}`
                            : "https://via.placeholder.com/100",
                        bio: data.bio || "",
                    });
                }
            })
            .catch((error) =>
                console.error("Error al cargar los datos del usuario:", error)
            );
    }, []);

    // Manejar cambios en los campos de texto
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar carga de nueva imagen
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setNewPhoto(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData((prevState) => ({
                    ...prevState,
                    foto: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Guardar cambios en el backend
    const handleSaveChanges = () => {
        const formData = new FormData();
        formData.append("nombre", userData.nombre);
        formData.append("apellido", userData.apellido);
        formData.append("email", userData.email);
        if (newPhoto) {
            formData.append("foto", newPhoto);
        }

        fetch("http://localhost:8000/api/usuario-logueado/update", {
            method: "POST",
            body: formData,
            credentials: "include",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error(
                        "Error en la respuesta del servidor:",
                        response
                    );
                    throw new Error("Respuesta del servidor no válida");
                }
            })
            .then((data) => {
                console.log("Perfil actualizado con éxito:", data);
                // Actualiza los datos del usuario después de guardar
                setUserData((prevState) => ({
                    ...prevState,
                    nombre: data.nombre || prevState.nombre,
                    apellido: data.apellido || prevState.apellido,
                    foto: data.foto || prevState.foto,
                }));
            })
            .catch((error) =>
                console.error("Error al actualizar el perfil:", error)
            );
    };

    // Renderizar contenido en función de la opción seleccionada
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
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handlePhotoChange}
                        />
                        <button
                            className="change-photo-btn"
                            onClick={() =>
                                document.getElementById("fileInput").click()
                            }
                        >
                            Cambiar Foto
                        </button>
                    </div>
                    <div className="perfil-form">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={userData.nombre}
                            onChange={handleChange}
                        />

                        <label>Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={userData.apellido}
                            onChange={handleChange}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />

                        <label>Biografía (máx. 210 caracteres)</label>
                        <textarea
                            name="bio"
                            value={userData.bio}
                            maxLength="210"
                            placeholder="Cuéntanos algo sobre ti..."
                            onChange={handleChange}
                        ></textarea>
                        <button
                            className="save-btn"
                            onClick={handleSaveChanges}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            );
        } else if (selectedOption === "cambiar-contrasena") {
            return (
                <div className="perfil-form">
                    <label>Contraseña actual</label>
                    <input type="password" placeholder="Tu contraseña actual" />

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
