import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importación de useNavigate
import "../css/PlanificacionEstudiante.css";
import "../css/Sidebar.css";
import "../css/Proyecto.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const PlanificacionEstudiante = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sprints, setSprints] = useState([]); // Inicia como lista vacía
    const [historiasUsuario, setHistoriasUsuario] = useState([]);
    const [requerimientos, setRequerimientos] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Nuevo estado para modo edición
    const [sprintEditIndex, setSprintEditIndex] = useState(null); // Índice del sprint en edición
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Modal de confirmación de eliminación
    const [elementTypeToDelete, setElementTypeToDelete] = useState(""); // Tipo de elemento a eliminar
    const [elementToDeleteIndex, setElementToDeleteIndex] = useState(null); // Índice del elemento a eliminar
    const [nuevoSprint, setNuevoSprint] = useState({
        nombre: "",
        fechaInicio: "",
        fechaFin: "",
    });
    const [isReqModalOpen, setReqModalOpen] = useState(false);
    const [isModalOpenHU, setIsModalOpenHU] = useState(false);
    const [nuevoReq, setNuevoReq] = useState("");
    const [nuevaHU, setNuevaHU] = useState({ titulo: "", descripcion: "" });
    const [archivos, setArchivos] = useState([]);
    const fileInputRef = useRef(null);
    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);
    const abrirModal = () => {
        setIsModalOpen(true);
        setIsEditing(false); // No es edición
        setNuevoSprint({ nombre: "", fechaInicio: "", fechaFin: "" }); // Limpia el formulario
    };
    const abrirModalReq = () => setReqModalOpen(true);
    const abrirModalHU = () => setIsModalOpenHU(true);
    const cerrarModal = () => {
        setIsModalOpen(false);
        setNuevoSprint({ nombre: "", fechaInicio: "", fechaFin: "" });
    };

    const editarRequerimiento = (index) => {
        const req = requerimientos[index];
        setNuevoReq(req); // Cargar el valor actual en el input del modal
        abrirModalReq(); // Abrir el modal para editar
    };

    const editarHistoriaUsuario = (index) => {
        navigate(`/historia-usuario/${index}`, {
            state: { historia: historiasUsuario[index] },
        });
    };

    const editarSprint = (index) => {
        const sprint = sprints[index];
        setIsEditing(true); // Activa modo edición
        setSprintEditIndex(index); // Guarda el índice del sprint
        setNuevoSprint(sprint); // Carga los datos del sprint en el formulario
        setIsModalOpen(true); // Abre el modal
    };

    const eliminarArchivo = (index) => {
        const updatedFiles = archivos.filter((_, i) => i !== index);
        setArchivos(updatedFiles);
    };

    const cerrarModalReq = () => {
        setReqModalOpen(false);
        setNuevoReq("");
    };

    const handleHUInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaHU((prevHU) => ({
            ...prevHU,
            [name]: value,
        }));
    };

    const handleFileUpload = (e) => {
        const newFiles = Array.from(e.target.files).filter((file) =>
            ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
        );

        const filesWithPreview = newFiles.map((file) => ({
            ...file,
            preview: URL.createObjectURL(file),
        }));

        setArchivos([...archivos, ...filesWithPreview]);
    };

    const cerrarModalHU = () => {
        setIsModalOpenHU(false);
        setNuevaHU({ titulo: "", descripcion: "" });
        setArchivos([]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoSprint({ ...nuevoSprint, [name]: value });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
            ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
        );

        const filesWithPreview = newFiles.map((file) => ({
            ...file,
            preview: URL.createObjectURL(file),
        }));

        setArchivos([...archivos, ...filesWithPreview]);
    };

    const guardarSprint = () => {
        if (
            nuevoSprint.nombre &&
            nuevoSprint.fechaInicio &&
            nuevoSprint.fechaFin
        ) {
            if (isEditing) {
                // Si es edición, actualiza el sprint correspondiente
                const updatedSprints = [...sprints];
                updatedSprints[sprintEditIndex] = { ...nuevoSprint };
                setSprints(updatedSprints);
            } else {
                // Si no es edición, crea un nuevo sprint
                setSprints([...sprints, { ...nuevoSprint, historias: [] }]);
            }
            cerrarModal(); // Cierra el modal
        }
    };

    const guardarRequerimiento = () => {
        if (nuevoReq) {
            setRequerimientos([...requerimientos, nuevoReq]);
            cerrarModalReq();
        }
    };

    const guardarHU = () => {
        if (nuevaHU.titulo && nuevaHU.descripcion) {
            // Almacenamos solo el título en historiasUsuario (o cambia según lo que desees mostrar)
            setHistoriasUsuario([...historiasUsuario, nuevaHU]);
            cerrarModalHU();
        }
    };

    const onDragStart = (e, historia) =>
        e.dataTransfer.setData("historia", historia);
    const onDrop = (e, sprintIndex) => {
        const historia = e.dataTransfer.getData("historia");
        const newSprints = [...sprints];
        newSprints[sprintIndex].historias.push(historia);
        setSprints(newSprints);
    };

    const onDragOver = (e) => e.preventDefault();
    const removeItem = (list, setList, index) =>
        setList(list.filter((_, i) => i !== index));
    const removeHistoriaFromSprint = (sprintIndex, historiaIndex) => {
        const newSprints = [...sprints];
        newSprints[sprintIndex].historias.splice(historiaIndex, 1);
        setSprints(newSprints);
    };
    const removeSprint = (index) => {
        const newSprints = [...sprints];
        newSprints.splice(index, 1);
        setSprints(newSprints);
    };

    const abrirModalConfirmacion = (type, index) => {
        setElementTypeToDelete(type); // Establece el tipo de elemento (requerimiento, sprint, historia)
        setElementToDeleteIndex(index); // Establece el índice del elemento a eliminar
        setIsConfirmModalOpen(true); // Abre el modal de confirmación
    };

    const eliminarElemento = () => {
        if (elementTypeToDelete === "requerimiento") {
            setRequerimientos(
                requerimientos.filter((_, i) => i !== elementToDeleteIndex)
            );
        } else if (elementTypeToDelete === "sprint") {
            setSprints(sprints.filter((_, i) => i !== elementToDeleteIndex));
        } else if (elementTypeToDelete === "historia") {
            setHistoriasUsuario(
                historiasUsuario.filter((_, i) => i !== elementToDeleteIndex)
            );
        }
        setIsConfirmModalOpen(false); // Cierra el modal de confirmación
    };

    return (
        <div
            className={`planificacion-estudiante ${
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

                <div className="contenido-principal">
                    <div className="contenedor-titulo-planificacion">
                        <h1 className="titulo-planificacion">
                            Product Backlog
                        </h1>
                        <hr className="divisor-planificacion" />
                    </div>

                    <div className="contenedor-principal">
                        <div className="contenedor-requerimientos">
                            <h2 className="titulo-requerimientos">
                                Requerimientos
                            </h2>
                            <div className="lista-requerimientos">
                                {requerimientos.map((req, index) => (
                                    <div
                                        key={index}
                                        className="item-requerimiento"
                                    >
                                        <span className="texto-item">
                                            {req}
                                        </span>
                                        <div className="iconos-acciones">
                                            <i
                                                className="fas fa-edit icono-editar"
                                                onClick={() =>
                                                    editarRequerimiento(index)
                                                }
                                            ></i>
                                            <i
                                                className="fas fa-trash-alt icono-eliminar"
                                                onClick={() =>
                                                    abrirModalConfirmacion(
                                                        "requerimiento",
                                                        index
                                                    )
                                                }
                                            ></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="boton-agregar"
                                onClick={abrirModalReq}
                            >
                                + Requerimiento
                            </button>
                        </div>

                        <div className="contenedor-historias">
                            <h2 className="titulo-historias">
                                Historias de Usuario
                            </h2>
                            {historiasUsuario.length === 0 ? (
                                <p className="sprint-mensaje-vacio">
                                    No hay Historias de Usuario. Añade una para
                                    empezar.
                                </p>
                            ) : (
                                <div className="lista-historias">
                                    {historiasUsuario.map((historia, index) => (
                                        <div
                                            key={index}
                                            className="item-historia"
                                            draggable
                                            onDragStart={(e) =>
                                                onDragStart(e, historia.titulo)
                                            }
                                        >
                                            <span>{historia.titulo}</span>
                                            <div className="iconos-acciones">
                                                <i
                                                    className="fas fa-edit icono-editar"
                                                    onClick={() =>
                                                        editarHistoriaUsuario(
                                                            index
                                                        )
                                                    }
                                                ></i>
                                                <i
                                                    className="fas fa-trash-alt icono-eliminar"
                                                    onClick={() =>
                                                        abrirModalConfirmacion(
                                                            "historia",
                                                            index
                                                        )
                                                    }
                                                ></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button
                                className="boton-agregar"
                                onClick={abrirModalHU}
                            >
                                + Historia de usuario
                            </button>
                        </div>

                        <div className="contenedor-sprints">
                            <h2 className="titulo-sprints">Sprints</h2>
                            {sprints.length === 0 ? (
                                <p className="sprint-mensaje-vacio">
                                    No hay sprints. Añade uno para empezar.
                                </p>
                            ) : (
                                <div className="lista-sprints">
                                    {sprints.map((sprint, index) => (
                                        <div
                                            key={index}
                                            className="sprint"
                                            onDrop={(e) => onDrop(e, index)}
                                            onDragOver={onDragOver}
                                        >
                                            <div className="sprint-header">
                                                <h3 className="sprint-titulo">
                                                    {sprint.nombre}
                                                </h3>
                                                <div className="iconos-acciones">
                                                    <i
                                                        className="fas fa-edit icono-editar"
                                                        onClick={() =>
                                                            editarSprint(index)
                                                        }
                                                    ></i>
                                                    <i
                                                        className="fas fa-trash-alt icono-eliminar"
                                                        onClick={() =>
                                                            abrirModalConfirmacion(
                                                                "sprint",
                                                                index
                                                            )
                                                        }
                                                    ></i>
                                                </div>
                                            </div>

                                            <p className="sprint-fecha">
                                                {sprint.fechaInicio} -{" "}
                                                {sprint.fechaFin}
                                            </p>
                                            <hr className="divisor-titulo-sprints" />
                                            <div className="sprint-contenido">
                                                {sprint.historias.length > 0 ? (
                                                    sprint.historias.map(
                                                        (historia, i) => (
                                                            <div
                                                                key={i}
                                                                className="item-historia-sprint"
                                                            >
                                                                <span>
                                                                    {historia}
                                                                </span>
                                                                <i
                                                                    className="fas fa-trash-alt icono-eliminar"
                                                                    onClick={() =>
                                                                        removeHistoriaFromSprint(
                                                                            index,
                                                                            i
                                                                        )
                                                                    }
                                                                ></i>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <p>
                                                        Arrastra aquí las
                                                        historias de usuario
                                                    </p>
                                                )}
                                            </div>
                                            <button className="boton-panel">
                                                Panel de tareas
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button
                                className="boton-anadir-sprint"
                                onClick={abrirModal}
                            >
                                + Sprint
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="sprint-modal-overlay">
                    <div className="sprint-modal">
                        <h2>{isEditing ? "Editar Sprint" : "Nuevo Sprint"}</h2>
                        <div className="field-container">
                            <label htmlFor="nombre">Nombre del sprint:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre del sprint"
                                value={nuevoSprint.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="modale-date-fields">
                            <div className="field-container">
                                <label>Fecha Inicio:</label>
                                <input
                                    type="date"
                                    name="fechaInicio"
                                    value={nuevoSprint.fechaInicio}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field-container">
                                <label>Fecha Fin:</label>
                                <input
                                    type="date"
                                    name="fechaFin"
                                    value={nuevoSprint.fechaFin}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="modale-buttons">
                            <button
                                className="modale-button modale-button-cancelar"
                                onClick={cerrarModal}
                            >
                                Cancelar
                            </button>
                            <button
                                className="modale-button modale-button-guardar"
                                onClick={guardarSprint}
                            >
                                {isEditing ? "Guardar" : "Añadir"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isReqModalOpen && (
                <div className="requerimiento-modal-overlay">
                    <div className="requerimiento-modal">
                        <h2>Nuevo Requerimiento</h2>
                        <div className="field-container">
                            <label htmlFor="requerimiento">
                                Requerimiento:
                            </label>
                            <input
                                type="text"
                                id="requerimiento"
                                placeholder="Requerimiento"
                                value={nuevoReq}
                                onChange={(e) => setNuevoReq(e.target.value)}
                            />
                        </div>
                        <div className="modale-buttons">
                            <button
                                onClick={cerrarModalReq}
                                className="modale-button modale-button-cancelar"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={guardarRequerimiento}
                                className="modale-button modale-button-guardar"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpenHU && (
                <div className="hu-modal-overlay">
                    <div className="hu-modal">
                        <h2>Nueva Historia de Usuario</h2>

                        <div className="modal-field">
                            <label htmlFor="titulo">Título:</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                placeholder="Ingrese el título"
                                value={nuevaHU.titulo}
                                onChange={handleHUInputChange}
                            />
                        </div>

                        <div className="modal-field">
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                placeholder="Ingrese la descripción"
                                value={nuevaHU.descripcion}
                                onChange={handleHUInputChange}
                            />
                        </div>

                        <div className="adjuntos-container">
                            <div className="adjuntos-info">
                                <span>{archivos.length} Adjuntos</span>
                                <button
                                    className="boton-adjuntar"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileUpload}
                                    multiple
                                    accept="image/jpeg, image/jpg, image/png"
                                />
                            </div>

                            <div
                                className={`drag-drop-zone ${
                                    archivos.length > 0 ? "with-files" : ""
                                }`}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                {archivos.length === 0 && (
                                    <p className="drag-drop-text">
                                        ¡Arrastre los archivos adjuntos aquí!
                                    </p>
                                )}

                                <div className="preview-container">
                                    {archivos.map((file, index) => (
                                        <div
                                            key={index}
                                            className="preview-item"
                                        >
                                            <img
                                                src={file.preview}
                                                alt={`preview-${index}`}
                                            />
                                            <button
                                                className="boton-eliminar"
                                                onClick={() =>
                                                    eliminarArchivo(index)
                                                }
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="hu-modal-buttons">
                            <button
                                className="hu-modal-button hu-modal-button-cancelar"
                                onClick={cerrarModalHU}
                            >
                                Cancelar
                            </button>
                            <button
                                className="hu-modal-button hu-modal-button-crear"
                                onClick={guardarHU}
                            >
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isConfirmModalOpen && (
                <div className="confirm-modal">
                    <div className="confirm-modal-content">
                        <h2>Confirmar eliminación</h2>
                        <p>
                            ¿Está seguro de que desea eliminar{" "}
                            {elementTypeToDelete === "historia"
                                ? "esta historia de usuario"
                                : `este ${elementTypeToDelete}`}
                            ?
                        </p>
                        <div className="confirm-modal-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setIsConfirmModalOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="delete-btn"
                                onClick={eliminarElemento}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanificacionEstudiante;
