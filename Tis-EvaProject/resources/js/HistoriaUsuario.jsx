import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/HistoriaUsuario.css'; // Importa tu CSS específico

const HistoriaUsuario = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const historiaRecibida = location.state?.historia || { titulo: '', descripcion: '', adjuntos: [] };
    
    const [historia, setHistoria] = useState(historiaRecibida);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHistoria((prevHistoria) => ({
            ...prevHistoria,
            [name]: value,
        }));
    };

    const guardarCambios = () => {
        // Lógica para guardar cambios (ej: actualizar en la base de datos)
        console.log('Historia editada:', historia);
        navigate('/'); // Redireccionar al finalizar
    };

    const cancelarEdicion = () => navigate('/'); // Regresar sin guardar

    return (
        <div className="historia-usuario-container">
            <h2>Editar Historia de Usuario</h2>
            
            <div className="form-field">
                <label htmlFor="titulo">Título:</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={historia.titulo}
                    onChange={handleInputChange}
                    placeholder="Ingrese el título"
                />
            </div>

            <div className="form-field">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={historia.descripcion}
                    onChange={handleInputChange}
                    placeholder="Ingrese la descripción"
                />
            </div>

            <div className="botones">
                <button className="boton-cancelar" onClick={cancelarEdicion}>
                    Cancelar
                </button>
                <button className="boton-guardar" onClick={guardarCambios}>
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default HistoriaUsuario;
