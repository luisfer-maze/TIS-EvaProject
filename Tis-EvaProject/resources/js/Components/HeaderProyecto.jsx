import React, { useState } from "react";
import "../../css/Proyectos.css";

const HeaderProyecto = ({ isModalOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const profileImageUrl = localStorage.getItem('PROFILE_IMAGE') || 'https://via.placeholder.com/50'; // Obtener la imagen del perfil desde el localStorage o usar un placeholder

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        if (option === "logout") {
            localStorage.removeItem("ID_DOCENTE");
            localStorage.removeItem("PROFILE_IMAGE"); // Limpiar la imagen del perfil
            window.location.href = "/";
        } else if (option === "profile") {
            window.location.href = "/perfil";
        }
        setIsDropdownOpen(false);
    };

    const goToProfile = () => {
        window.location.href = "/perfil"; // Redirigir a la página de perfil al hacer clic en la imagen
    };

    return (
        <div className={`header ${isModalOpen ? "disabled" : ""}`}>
            <div className="logo"></div>
            <div className="user-icon-container">
                {/* La imagen ahora redirige al perfil al hacer clic */}
                <img
                    src={profileImageUrl}
                    alt="Foto de perfil"
                    className="profile-image"
                    onClick={goToProfile} // Redirigir al perfil
                />
                <i className="fas fa-chevron-down dropdown-icon" onClick={toggleDropdown}></i>
            </div>

            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <button className="dropdown-button" onClick={() => handleOptionClick("profile")}>
                        Perfil
                    </button>
                    <button className="dropdown-button" onClick={() => handleOptionClick("settings")}>
                        Configuración
                    </button>
                    <button className="dropdown-button" onClick={() => handleOptionClick("logout")}>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeaderProyecto;
