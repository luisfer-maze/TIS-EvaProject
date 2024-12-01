import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import HeaderProyecto from "../Components/HeaderProyecto";
import SidebarPrueba from "../Components/SidebarPrueba";
import "../../css/HeaderProyecto.css";
import "../../css/SidebarPrueba.css";
import "../../css/PlanillaDeSeguimiento.css";
import axios from "axios";

const PlanillaDeSeguimiento = () => {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState({});
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        if (projectId) {
            const fetchProjectDetails = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/proyectos/${projectId}`,
                        { withCredentials: true }
                    );
                    setProjectDetails(response.data);
                } catch (error) {
                    console.error("Error al cargar el proyecto:", error);
                }
            };

            const fetchProjectData = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/proyectos/${projectId}/grupos`,
                        { withCredentials: true }
                    );
                    setProjectData(response.data.groups || []);
                } catch (error) {
                    console.error(
                        "Error al obtener los datos del proyecto:",
                        error
                    );
                }
            };

            fetchProjectDetails();
            fetchProjectData();
        } else {
            console.error("No se pudo obtener el projectId");
        }
    }, [projectId]);

    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

    const handleGroupSelection = async (event) => {
        const groupId = event.target.value;
        setSelectedGroup(groupId);

        if (groupId) {
            try {
                const [notasResponse, gruposResponse] = await Promise.all([
                    axios.get(
                        `http://localhost:8000/api/grupos/${groupId}/notas`,
                        { withCredentials: true }
                    ),
                    axios.get(
                        `http://localhost:8000/api/proyectos/${projectId}/grupos`,
                        { withCredentials: true }
                    ),
                ]);

                const studentsData = notasResponse.data || [];
                setStudentsData(studentsData);
                console.log("Datos de estudiantes:", studentsData);

                const gruposData = gruposResponse.data.groups || [];
                console.log("Datos de grupos:", gruposData);

                // Buscar el grupo seleccionado y sus fechas de defensa
                const selectedGrupo = gruposData.find(
                    (group) => group.ID_GRUPO === parseInt(groupId)
                );
                console.log("Grupo seleccionado:", selectedGrupo);

                const fechasDefensa = selectedGrupo?.fechas_defensa || [];
                console.log(
                    "Fechas de defensa del grupo seleccionado:",
                    fechasDefensa
                );

                // Procesar columnas dinámicas (agrupadas por etapas)
                const etapasMap = {}; // Usaremos esto para crear columnas dinámicas
                studentsData.forEach((student) => {
                    student.notas.forEach((nota) => {
                        const diaDefensa =
                            fechasDefensa.length > 0
                                ? fechasDefensa[0].DIA
                                : "Sin día";

                        const columnKey = `${nota.ETAPA_TITULO}_${nota.FECHA_REVISION}`;
                        if (!etapasMap[columnKey]) {
                            etapasMap[columnKey] = {
                                title: (
                                    <div>
                                        <div>{nota.FECHA_REVISION}</div>
                                        <div>{diaDefensa}</div>
                                    </div>
                                ),
                                parent: `${nota.ETAPA_TITULO} (${nota.ETAPA_PUNTUACION})`,
                                dataIndex: columnKey,
                                key: columnKey,
                                align: "center", // Centrar texto en celdas
                                render: (value) => value || "-",
                            };
                            
                        }
                    });
                });

                console.log(
                    "Mapa de etapas para columnas dinámicas:",
                    etapasMap
                );

                // Generar columnas agrupadas
                const dynamicColumns = Object.values(etapasMap).reduce(
                    (acc, column) => {
                        const parentIndex = acc.findIndex(
                            (col) => col.title === column.parent
                        );
                        if (parentIndex === -1) {
                            acc.push({
                                title: column.parent,
                                align: "center", // Centra el encabezado
                                className: "ant-table-grouped-column-title",
                                children: [column],
                            });
                            
                        } else {
                            acc[parentIndex].children.push(column);
                        }
                        return acc;
                    },
                    []
                );

                // Columnas principales
                const fixedColumns = [
                    {
                        title: "Estudiantes",
                        dataIndex: "nombreCompleto",
                        key: "nombreCompleto",
                        fixed: "left",
                        width: 200,
                    },
                ];

                const totalColumn = {
                    title: "Nota Sumativa",
                    dataIndex: "total",
                    key: "total",
                    fixed: "right",
                    width: 150,
                    align: "center",
                    render: (_, row) => {
                        const total = Object.keys(row)
                            .filter((key) => key.includes("_"))
                            .reduce(
                                (sum, key) => sum + (parseFloat(row[key]) || 0),
                                0
                            );
                        return total.toFixed(2);
                    },
                };

                // Columnas adicionales
                const retrasoColumn = {
                    title: "Retraso",
                    dataIndex: "retraso",
                    key: "retraso",
                    fixed: "right",
                    width: 100,
                    align: "center",
                    render: (value) => value || 0,
                };

                const ausenciaInjustificadaColumn = {
                    title: "Ausencia Injustificada",
                    dataIndex: "ausenciaInjustificada",
                    key: "ausenciaInjustificada",
                    fixed: "right",
                    width: 150,
                    align: "center",
                    render: (value) => value || 0, // Muestra 0 si no hay ausencias injustificadas
                };

                const ausenciaJustificadaColumn = {
                    title: "Ausencia Justificada",
                    dataIndex: "ausenciaJustificada",
                    key: "ausenciaJustificada",
                    fixed: "right",
                    width: 150,
                    align: "center",
                    render: (value) => value || 0, // Muestra 0 si no hay ausencias justificadas
                };

                setColumns([
                    ...fixedColumns,
                    ...dynamicColumns,
                    totalColumn,
                    retrasoColumn,
                    ausenciaInjustificadaColumn,
                    ausenciaJustificadaColumn,
                ]);
            } catch (error) {
                console.error(
                    "Error al obtener datos de los estudiantes o del grupo:",
                    error
                );
                setStudentsData([]);
                setColumns([]);
            }
        } else {
            setStudentsData([]);
            setColumns([]);
        }
    };
    // Transforma los datos de estudiantes para la tabla
    const dataForTable = studentsData.map((student) => {
        const row = {
            key: student.estudiante.ID_ESTUDIANTE,
            nombreCompleto: `${student.estudiante.NOMBRE} ${student.estudiante.APELLIDO}`,
            retraso: student.notas.filter((nota) => nota.RETRASO).length, // Cuenta las veces que hay retrasos
            ausenciaInjustificada: student.notas.filter(
                (nota) => nota.FALTA === true // Cuenta las veces que hay faltas (ausencias injustificadas)
            ).length,
            ausenciaJustificada: student.notas.filter(
                (nota) =>
                    nota.FALTA === false &&
                    parseFloat(nota.PUNTUACION_TOTAL) === 0 // Ausencias justificadas
            ).length,
        };

        // Agrega las puntuaciones por etapa a las columnas dinámicas
        student.notas.forEach((nota) => {
            const columnKey = `${nota.ETAPA_TITULO}_${nota.FECHA_REVISION}`;
            row[columnKey] = nota.PUNTUACION_TOTAL;
        });

        return row;
    });

    return (
        <div
            className={`planilla-seguimiento-container ${
                isSidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
        >
            <HeaderProyecto />
            <div className="planilla-seguimiento-sidebar-content">
                <SidebarPrueba
                    isSidebarCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                    nombreProyecto={projectDetails?.NOMBRE_PROYECTO}
                    fotoProyecto={`http://localhost:8000/storage/${projectDetails?.PORTADA_PROYECTO}`}
                    projectId={projectId}
                />
                <div className="container">
                    <div className="projects-header">
                        <h2>Planilla de Seguimiento</h2>
                        <button className="new-project-btn">Exportar a Excel</button>
                    </div>
                    <div className="dropdown-container">
                        <label htmlFor="groupDropdown">
                            Selecciona un grupo:
                        </label>
                        <select
                            id="groupDropdown"
                            value={selectedGroup || ""}
                            onChange={handleGroupSelection}
                        >
                            <option value="" disabled>
                                Seleccionar grupo
                            </option>
                            {Array.isArray(projectData) &&
                                projectData.map((group) => (
                                    <option
                                        key={group.ID_GRUPO}
                                        value={group.ID_GRUPO}
                                    >
                                        {group.NOMBRE_GRUPO}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {selectedGroup && (
                        <div className="group-details">
                            <h3>Estudiantes y Notas</h3>
                            {dataForTable.length > 0 ? (
                                <Table
                                className="custom-table"
                                columns={columns}
                                dataSource={dataForTable}
                                pagination={false}
                                bordered
                                scroll={{ x: "max-content" }}
                                size="middle"
                                rowClassName={(record) => (record.total >= 50 ? "highlight-row" : "")}
                                onRow={(record) => ({
                                    style: { textAlign: "center" }, // Centra el contenido de todas las filas
                                })}
                            />
                            
                            ) : (
                                <p>
                                    No hay estudiantes registrados o notas
                                    disponibles.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlanillaDeSeguimiento;
