import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderProyecto from "../Components/HeaderProyecto";
import SidebarPrueba from "../Components/SidebarPrueba";
import "../../css/Proyectos.css"; // Reutiliza el CSS de Proyectos
import "../../css/Grupos.css"; // Reutiliza el CSS de Proyectos
import "../../css/HeaderProyecto.css";
import "../../css/SidebarPrueba.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

const Grupos = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
        useState(false);
    const [groups, setGroups] = useState([]);
    const [projectDetails, setProjectDetails] = useState({});
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);
    useEffect(() => {
        // Lógica para cargar los detalles del proyecto
        fetch(`http://localhost:8000/api/proyectos/${projectId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Detalles del proyecto:", data);
                setProjectDetails(data); // Almacena los detalles en el estado
            })
            .catch((error) =>
                console.error("Error al cargar el proyecto:", error)
            );
    }, [projectId]);

    useEffect(() => {
        if (!projectId) {
            console.error("projectId no está definido");
            return;
        }

        const obtenerDatosProyecto = async () => {
            {
                const response = await axios.get(
                    `http://localhost:8000/api/proyectos/${projectId}`,
                    { withCredentials: true }
                );
            
            }
        };

        const obtenerGrupos = async () => {
            {
                const response = await axios.get(
                    `http://localhost:8000/api/proyectos/${projectId}/grupos`,
                    { withCredentials: true }
                );

                setGroups(response.data.grupos);
            }
        };

        obtenerDatosProyecto();
        obtenerGrupos();
    }, [projectId]);

    useEffect(() => {
        const docenteId = localStorage.getItem("ID_DOCENTE");
        const role = localStorage.getItem("ROLE");

        if (!docenteId || role !== "Docente") {
            // Si no hay un docente logueado, redirige al login
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div
            className={`grupos-container ${
                isSidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
        >
            {/* Header */}
            <HeaderProyecto/>

            <div className="grupos-sidebar-content">
                {/* Sidebar */}
                <SidebarPrueba
                    isSidebarCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                    nombreProyecto={projectDetails?.NOMBRE_PROYECTO}
                    fotoProyecto={`http://localhost:8000/storage/${projectDetails?.PORTADA_PROYECTO}`}
                    projectId={projectId}
                />

                {/* Contenedor del contenido principal */}
                <div className={`container`}>
                    <div className="projects-header">
                        <h2>Grupos</h2>
                    </div>

                    <div className="project-list">
                        {groups.map((group, index) => (
                            <div key={index} className="project-item">
                                {group.PORTADA_GRUPO ? (
                                    <img
                                        src={`http://localhost:8000/storage/${group.PORTADA_GRUPO}`}
                                        alt="Icono del grupo"
                                        width="50"
                                        height="50"
                                    />
                                ) : (
                                    <img
                                        src="https://via.placeholder.com/50"
                                        alt="Icono del grupo"
                                    />
                                )}
                                <div className="project-info">
                                    <h3
                                        onClick={() =>
                                            navigate(
                                                `/proyectos/${projectId}/grupos/${group.ID_GRUPO}/estudiantes`
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {group.NOMBRE_GRUPO}
                                    </h3>
                                    <p>{group.DESCRIP_GRUPO}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grupos;
