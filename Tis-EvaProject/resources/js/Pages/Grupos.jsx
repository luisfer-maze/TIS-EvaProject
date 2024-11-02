import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderProyecto from "../Components/HeaderProyecto";
import "../../css/Proyectos.css"; // Reutiliza el CSS de Proyectos
import "../../css/Grupos.css"; // Reutiliza el CSS de Proyectos
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalConfirmacion from "../Components/ModalConfirmacion";
import ModalMensajeExito from "../Components/ModalMensajeExito";
import ModalError from "../Components/ModalError";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Grupos = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showCreateSuccessMessage, setShowCreateSuccessMessage] =
        useState(false);
    const [showEditSuccessMessage, setShowEditSuccessMessage] = useState(false);
    const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] =
        useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [groups, setGroups] = useState([]);
    const [groupToDelete, setGroupToDelete] = useState(null);
    const [groupToEdit, setGroupToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);
    const isModalOpen =
        showModal ||
        showConfirmModal ||
        showCreateSuccessMessage ||
        showEditSuccessMessage ||
        showDeleteSuccessMessage ||
        showErrorMessage;
    const [requirements, setRequirements] = useState([]);
    const [projectDetails, setProjectDetails] = useState({});

    useEffect(() => {
        // Lógica para cargar los detalles del proyecto
        fetch(`http://localhost:8000/api/proyectos/${projectId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Detalles del proyecto:", data);
                setProjectDetails(data); // Almacena los detalles en el estado
            })
            .catch((error) => console.error("Error al cargar el proyecto:", error));
    }, [projectId]);
    

    useEffect(() => {
        const docenteId = localStorage.getItem("ID_DOCENTE");
        const role = localStorage.getItem("ROLE");

        if (!docenteId || role !== "Docente") {
            // Si no hay un docente logueado, redirige al login
            navigate("/login");
        }
    }, [navigate]);

    const handleSaveGroup = () => {
        if (!groupName || !groupDescription) {
            setErrorMessage(
                "Por favor, complete todos los campos obligatorios."
            );
            setShowErrorMessage(true);
            return;
        }

        const newGroup = {
            NOMBRE_GRUPO: groupName,
            DESCRIP_GRUPO: groupDescription,
            PORTADA_GRUPO: image ? URL.createObjectURL(image) : null,
        };

        const updatedGroups = isEditing
            ? groups.map((group) => (group === groupToEdit ? newGroup : group))
            : [...groups, newGroup];

        setGroups(updatedGroups);
        setShowModal(false);
        setShowCreateSuccessMessage(!isEditing);
        setShowEditSuccessMessage(isEditing);
    };

    const handleOpenEditModal = (index) => {
        const group = groups[index];
        setGroupName(group.NOMBRE_GRUPO);
        setGroupDescription(group.DESCRIP_GRUPO);
        setGroupToEdit(group);
        setImage(null);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleOpenConfirmModal = (index) => {
        setGroupToDelete(index);
        setShowConfirmModal(true);
    };

    const handleDeleteGroup = () => {
        const updatedGroups = groups.filter(
            (_, index) => index !== groupToDelete
        );
        setGroups(updatedGroups);
        setShowConfirmModal(false);
        setGroupToDelete(null);
        setShowDeleteSuccessMessage(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (file && validTypes.includes(file.type)) {
            setImage(file);
        } else {
            alert(
                "Solo se permiten archivos de imagen en formato JPG, JPEG o PNG."
            );
        }
    };

    const getImagePreview = () => {
        if (image) {
            return URL.createObjectURL(image);
        }
        if (isEditing && groupToEdit && groupToEdit.PORTADA_GRUPO) {
            return groupToEdit.PORTADA_GRUPO;
        }
        return null;
    };
    const handleAddRequirement = () => {
        setRequirements([...requirements, { description: "" }]);
    };

    const handleRequirementChange = (index, value) => {
        const updatedRequirements = [...requirements];
        updatedRequirements[index].description = value;
        setRequirements(updatedRequirements);
    };

    const toggleEditRequirement = (index, isEditing) => {
        const updatedRequirements = [...requirements];
        updatedRequirements[index].isEditing = isEditing;
        setRequirements(updatedRequirements);
    };

    const handleDeleteRequirement = (index) => {
        setRequirements(requirements.filter((_, i) => i !== index));
    };

    return (
        <div>
            <HeaderProyecto isModalOpen={isModalOpen} />
            <div className={`container ${isModalOpen ? "disabled" : ""}`}>
                <div className="projects-header">
                    <h2>Mis grupos</h2>
                    <button
                        className="new-project-btn"
                        onClick={() => {
                            setIsEditing(false);
                            setShowModal(true);
                            setGroupName("");
                            setGroupDescription("");
                            setImage(null);
                        }}
                        disabled={isModalOpen}
                    >
                        <i className="fas fa-plus"></i> Nuevo grupo
                    </button>
                </div>

                <div className="project-list">
                    {groups.map((group, index) => (
                        <div key={index} className="project-item">
                            {group.PORTADA_GRUPO ? (
                                <img
                                    src={group.PORTADA_GRUPO}
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
                                <h3>{group.NOMBRE_GRUPO}</h3>
                                <p>{group.DESCRIP_GRUPO}</p>
                            </div>
                            <div className="project-actions">
                                <button
                                    className="action-btn"
                                    onClick={() => handleOpenEditModal(index)}
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        handleOpenConfirmModal(index)
                                    }
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="projects-header">
                    <h2>Requerimientos</h2>
                    <button
                        className="new-project-btn"
                        onClick={handleAddRequirement}
                        disabled={isModalOpen}
                    >
                        <i className="fas fa-plus"></i> Nuevo requerimiento
                    </button>
                </div>

                <div className="project-list requerimientos-list">
                    {requirements.map((requirement, index) => (
                        <div
                            key={index}
                            className="project-item requerimientos-list"
                        >
                            {requirement.isEditing ? (
                                <ReactQuill
                                    theme="snow"
                                    value={requirement.description}
                                    onChange={(value) =>
                                        handleRequirementChange(index, value)
                                    }
                                    className="requirement-quill-editor"
                                    placeholder="Descripción del requerimiento"
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                <div className="project-info requerimientos-list">
                                    <div className="requirement-number-container">
                                        <span className="requirement-number">{`${
                                            index + 1
                                        }.`}</span>
                                    </div>
                                    <div className="requirement-text-container">
                                        <span
                                            className="requirement-description"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    requirement.description ||
                                                    "Descripción del requerimiento",
                                            }}
                                        ></span>
                                    </div>
                                </div>
                            )}
                            <div className="project-actions requerimientos-list">
                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        toggleEditRequirement(
                                            index,
                                            !requirement.isEditing
                                        )
                                    }
                                >
                                    <i
                                        className={
                                            requirement.isEditing
                                                ? "fas fa-save"
                                                : "fas fa-pen"
                                        }
                                    ></i>
                                </button>
                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        handleDeleteRequirement(index)
                                    }
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para crear/editar grupos */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>
                            {isEditing ? "Editar grupo" : "Detalles del grupo"}
                        </h3>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Nombre del Grupo*"
                            className="input-field"
                        />
                        <div className="description-and-photo">
                            <textarea
                                value={groupDescription}
                                onChange={(e) =>
                                    setGroupDescription(e.target.value)
                                }
                                placeholder="Descripción del grupo*"
                                className="textarea-field"
                            />
                            <div className="upload-container">
                                <p className="upload-title">Incluya una foto</p>
                                <div
                                    className="upload-box"
                                    onClick={() =>
                                        document
                                            .getElementById("fileInput")
                                            .click()
                                    }
                                >
                                    {getImagePreview() ? (
                                        <img
                                            src={getImagePreview()}
                                            alt="Vista previa"
                                            className="image-preview"
                                        />
                                    ) : (
                                        <>
                                            <i className="fas fa-cloud-upload-alt"></i>
                                            <p>
                                                Pulsa aquí para añadir archivos
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                                {image && <p>{image.name}</p>}
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button
                                onClick={() => setShowModal(false)}
                                className="cancel-btn"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveGroup}
                                className="create-btn"
                            >
                                {isEditing ? "Guardar cambios" : "Crear grupo"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            {showConfirmModal && (
                <ModalConfirmacion
                    show={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleDeleteGroup}
                    title="Confirmar eliminación"
                    message="¿Está seguro de que desea eliminar este grupo?"
                />
            )}

            {/* Mensaje de éxito para creación */}
            {showCreateSuccessMessage && (
                <ModalMensajeExito
                    message="¡Se creo el grupo exitosamente!"
                    onClose={() => setShowCreateSuccessMessage(false)}
                />
            )}
            {/* Mensaje de éxito para edición */}
            {showEditSuccessMessage && (
                <ModalMensajeExito
                    message="¡Se guardaron los cambios exitosamente!"
                    onClose={() => setShowEditSuccessMessage(false)}
                />
            )}

            {/* Mensaje de éxito para eliminación */}
            {showDeleteSuccessMessage && (
                <ModalMensajeExito
                    message="¡Se eliminó el grupo correctamente!"
                    onClose={() => setShowDeleteSuccessMessage(false)}
                />
            )}

            {/* Modal de error */}
            {showErrorMessage && (
                <ModalError
                    errorMessage="Por favor, complete todos los campos."
                    closeModal={() => setShowErrorMessage(false)}
                />
            )}
        </div>
    );
};

export default Grupos;
