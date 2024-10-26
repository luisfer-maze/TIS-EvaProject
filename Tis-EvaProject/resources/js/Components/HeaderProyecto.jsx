import React, { useState, useRef } from "react";
import "../../css/Proyectos.css";

const HeaderProyecto = ({ isModalOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownTimeoutRef = useRef(null);

    const profileImageUrl = localStorage.getItem("PROFILE_IMAGE") || "https://via.placeholder.com/50";
    const userName = localStorage.getItem("USER_NAME") || "Usuario";
    const userEmail = localStorage.getItem("USER_EMAIL") || "usuario@correo.com";

    const handleMouseEnter = () => {
        clearTimeout(dropdownTimeoutRef.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 200);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        if (option === "logout") {
            const role = localStorage.getItem("ROLE");
            fetch("http://localhost:8000/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
                body: JSON.stringify({ role }),
                credentials: "include",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al cerrar sesión");
                    }
                    return response.json();
                })
                .then(() => {
                    localStorage.clear();
                    window.location.href = "/";
                })
                .catch((error) => console.error("Error al cerrar sesión:", error));
        } else if (option === "profile") {
            window.location.href = "/perfil";
        }
        setIsDropdownOpen(false);
    };

    const handleProfileImageClick = () => {
        window.location.href = "/perfil";
    };

    return (
        <div className={`header ${isModalOpen ? "disabled" : ""}`}>
            <div
                className="user-icon-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={profileImageUrl}
                    alt="Foto de perfil"
                    className="profile-image"
                    onClick={handleProfileImageClick}
                />
                <i className="fas fa-chevron-down dropdown-icon" onClick={toggleDropdown}></i>

                {isDropdownOpen && (
                    <div
                        className="dropdown-menu"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="dropdown-header">
                            <div className="profile-container">
                                <img
                                    src={profileImageUrl}
                                    alt="Foto de perfil"
                                    className="perfil-image"
                                />
                                <div className="profile-info">
                                    <span className="user-name">{userName}</span>
                                    <span className="user-email">{userEmail}</span>
                                    <button
                                        className="edit-profile-button"
                                        onClick={() => handleOptionClick("profile")}
                                    >
                                        Editar perfil
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-divider"></div>
                        <ul className="dropdown-options">
                            <li
                                className="dropdown-button"
                                onClick={() => handleOptionClick("settings")}
                            >
                                Configuración de cuenta
                            </li>
                            <li
                                className="dropdown-button"
                                onClick={() => handleOptionClick("notifications")}
                            >
                                Notificaciones
                            </li>
                        </ul>
                        <div className="dropdown-divider"></div>
                        <button
                            className="logout-button"
                            onClick={() => handleOptionClick("logout")}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderProyecto;
