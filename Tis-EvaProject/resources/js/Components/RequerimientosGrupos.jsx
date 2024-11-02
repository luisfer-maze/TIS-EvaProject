import React, { useState } from "react";

const RequerimientosGrupos = ({
    requirements,
    onAddRequirement,
    onEditRequirement,
    onDeleteRequirement,
    isModalOpen
}) => {
    const [requirementDescription, setRequirementDescription] = useState("");

    const handleAddRequirement = () => {
        if (requirementDescription.trim() !== "") {
            onAddRequirement(requirementDescription);
            setRequirementDescription("");
        } else {
            alert("Por favor, ingrese una descripción para el requerimiento.");
        }
    };

    return (
        <div className="projects-header">
            <h2>Requerimientos</h2>
            <button
                className="new-project-btn"
                onClick={handleAddRequirement}
                disabled={isModalOpen}
            >
                <i className="fas fa-plus"></i> Añadir Requerimiento
            </button>

            <div className="project-list">
                {requirements.length > 0 ? (
                    requirements.map((requirement, index) => (
                        <div key={index} className="project-item">
                            <div className="project-info">
                                <h3>Requerimiento {index + 1}</h3>
                                <p>{requirement.description}</p>
                            </div>
                            <div className="project-actions">
                                <button
                                    className="action-btn"
                                    onClick={() => onEditRequirement(index)}
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                                <button
                                    className="action-btn"
                                    onClick={() => onDeleteRequirement(index)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay requerimientos añadidos.</p>
                )}
            </div>

            <input
                type="text"
                placeholder="Descripción del requerimiento"
                value={requirementDescription}
                onChange={(e) => setRequirementDescription(e.target.value)}
                className="requirement-input"
            />
        </div>
    );
};

export default RequerimientosGrupos;
