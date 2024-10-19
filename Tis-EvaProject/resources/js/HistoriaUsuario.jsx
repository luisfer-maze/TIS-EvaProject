import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Sidebar.css"; // Importa el CSS del sidebar
import "../css/PlanificacionEstudiante.css"; // Importa el CSS del header
import "../css/HistoriaUsuario.css"; // Importa tu CSS específico

const HistoriaUsuario = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const historiaRecibida = location.state?.historia || {
        titulo: "",
        descripcion: "",
        adjuntos: [],
    };

    const [historia, setHistoria] = useState(historiaRecibida);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHistoria((prevHistoria) => ({
            ...prevHistoria,
            [name]: value,
        }));
    };

    const guardarCambios = () => {
        console.log("Historia editada:", historia);
        navigate("/"); // Redireccionar al finalizar
    };

    const cancelarEdicion = () => {
        navigate(-1); // Navegar hacia la página anterior
    };

    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

    return (
        <div
            className={`historia-usuario ${
                isSidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
        >
            <div className="header-planificacion">
                <div className="logo"></div>
                <div className="iconos-usuario-planificacion">
                    <i className="fas fa-user-circle icono-usuario"></i>
                    <i className="fas fa-chevron-down icono-dropdown"></i>
                </div>
            </div>

            <div className="contenido-con-sidebar">
                <aside
                    className={`sidebar ${
                        isSidebarCollapsed ? "collapsed" : ""
                    }`}
                >
                    <div className="sidebar-header">
                        <div className="project-icon">
                            <i className="fas fa-project-diagram"></i>
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="project-info">
                                <h3>
                                    Sistema de Evaluación Basada en Proyecto
                                </h3>
                            </div>
                        )}
                    </div>
                    <hr className="divisor-side" />
                    <ul className="sidebar-menu">
                        <li className="menu-item">
                            <i className="fas fa-tasks icon-menu"></i>
                            <span className="menu-text">Product Backlog</span>
                        </li>
                        <li className="menu-item">
                            <i className="fas fa-users icon-menu"></i>
                            <span className="menu-text">Equipo</span>
                        </li>
                        <li className="menu-item">
                            <i className="fas fa-book-open icon-menu"></i>
                            <span className="menu-text">Tareas</span>
                        </li>
                    </ul>
                    <hr className="divisor-side" />
                    <button
                        className="sidebar-collapse"
                        onClick={toggleSidebar}
                    >
                        <i
                            className={`fas ${
                                isSidebarCollapsed
                                    ? "fa-angle-right"
                                    : "fa-angle-left"
                            }`}
                        ></i>
                    </button>
                </aside>

                {/* Contenido principal */}
                <div className="historia-usuario-wrapper">
                    <div className="historia-usuario-contenido">
                        <div className="hu-container">
                            <div className="hu-header">
                                <div className="hu-header-text">
                                    <h1 className="hu-titulo">
                                        {historia.titulo}
                                    </h1>
                                    <p className="hu-subtitulo">
                                        HISTORIA DE USUARIO
                                    </p>
                                </div>
                                <button className="hu-edit-button">
                                    Editar <i className="fas fa-edit"></i>
                                </button>
                            </div>

                            <div className="hu-section hu-description">
                                <h3>Descripción</h3>
                                <p>{historia.descripcion}</p>
                            </div>

                            <div className="hu-section hu-criterios">
                                <h3>Criterios de aceptación:</h3>
                                <ul>
                                    <li>
                                        Debe existir un formulario de registro
                                        específico.
                                    </li>
                                    <li>
                                        El formulario debe tener campos de
                                        nombre, correo, etc.
                                    </li>
                                    <li>
                                        Debe permitir subir una foto de perfil.
                                    </li>
                                </ul>
                                <button className="hu-edit-button">
                                    Editar
                                </button>
                            </div>

                            <div className="hu-section hu-adjuntos">
                                <h3>Adjuntos</h3>
                                <div className="adjuntos-container">
                                    {historia.adjuntos &&
                                    historia.adjuntos.length > 0 ? (
                                        historia.adjuntos.map(
                                            (adjunto, index) => (
                                                <img
                                                    key={index}
                                                    src={adjunto.url}
                                                    alt="Adjunto"
                                                    className="adjunto-imagen"
                                                />
                                            )
                                        )
                                    ) : (
                                        <p>No hay adjuntos disponibles</p>
                                    )}
                                </div>
                                <button className="hu-add-button">+</button>
                            </div>

                            <div className="hu-section hu-tareas">
                                <h3>Tareas</h3>
                                <ul className="tareas-lista">
                                    {historia.tareas &&
                                    historia.tareas.length > 0 ? (
                                        historia.tareas.map((tarea, index) => (
                                            <li
                                                key={index}
                                                className="tarea-item"
                                            >
                                                <span>{tarea}</span>
                                                <div className="tarea-acciones">
                                                    <i className="fas fa-edit icono-editar"></i>
                                                    <i className="fas fa-trash-alt icono-eliminar"></i>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No hay tareas disponibles</p>
                                    )}
                                </ul>
                                <button className="hu-add-button">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoriaUsuario;
