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
                                    Sistema de Evaluación Basada en Proyectos
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

                <div className="historia-usuario-contenido">
                    <div className="hu-container">
                        <div className="hu-header">
                            <div className="hu-header-text">
                                <h1 className="hu-titulo">{historia.titulo}</h1>
                                <p className="hu-subtitulo">
                                    HISTORIA DE USUARIO
                                </p>
                            </div>
                            <button className="hu-edit-button">
                                Editar <i className="fas fa-edit"></i>
                            </button>
                        </div>

                        <div className="hu-section hu-contenido-unido">
                            <h3>Descripción</h3>
                            <p>{historia.descripcion}</p>

                            <h3>Criterios de aceptación:</h3>
                            <ul>
                                <li>
                                    Debe existir un formulario de registro
                                    específico.
                                </li>
                                <li>
                                    El formulario debe tener campos de nombre,
                                    correo, etc.
                                </li>
                                <li>Debe permitir subir una foto de perfil.</li>
                            </ul>
                            <button className="hu-edit-button">
                                Editar <i className="fas fa-edit"></i>
                            </button>
                        </div>

                        <div className="hu-section hu-adjuntos">
                            <div className="adjuntos-info">
                                <h3>
                                    {historia.adjuntos &&
                                    historia.adjuntos.length > 0
                                        ? `${historia.adjuntos.length} adjuntos`
                                        : "Adjuntos"}
                                </h3>
                                <button className="boton-adjuntar">
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <div className="adjuntos-container">
                                {historia.adjuntos &&
                                historia.adjuntos.length > 0 ? (
                                    historia.adjuntos.map((adjunto, index) => (
                                        <div
                                            key={index}
                                            className="drag-drop-zone-historia"
                                        >
                                            <img
                                                src={adjunto.url}
                                                alt="Adjunto"
                                                className="adjunto-imagen"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="drag-drop-zone-historia">
                                        <p className="drag-drop-text">
                                            ¡Arrastre los archivos adjuntos
                                            aquí!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="hu-section hu-tareas">
                            <div className="adjuntos-info">
                                <h3>Tareas</h3>
                                <button className="boton-adjuntar">
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <ul className="tareas-lista">
                                {historia.tareas &&
                                historia.tareas.length > 0 ? (
                                    historia.tareas.map((tarea, index) => (
                                        <li key={index} className="tarea-item">
                                            <div className="tarea-contenido">
                                                <span>{tarea}</span>
                                            </div>
                                            <div className="tarea-acciones">
                                                <i className="fas fa-trash-alt icono-eliminar"></i>
                                                <i className="fas fa-edit icono-editar"></i>
                                                <img
                                                    src="https://via.placeholder.com/40"
                                                    alt="Perfil"
                                                    className="tarea-perfil-imagen"
                                                />
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>No hay tareas disponibles</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoriaUsuario;
