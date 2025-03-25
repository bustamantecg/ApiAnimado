import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify"; // No olvides este componente
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from '../components/utils/notificationService'

import { useFavoritos } from "./context/FavoritosContext";


const Api_Personajes = () => {
    const [personajes, setpersonajes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Extraer la función addFavorito del contexto
    const { addToFavoritos } = useFavoritos();

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("https://rickandmortyapi.com/api/character/");
            setpersonajes(data.results);
            showSuccessToast('Datos obtenidos correctamente');
        } catch (err) {
            showErrorToast(`Error: ${err.message}`); // Mostrar el error con Toast            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="overflow-x-auto">
                {/* Componente ToastContainer para mostrar notificaciones */}
                <ToastContainer />
                {loading && <span className="loading loading-spinner text-primary"></span>}
                <table className="table">
                    {/* Cabecera de la tabla */}
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Especie</th>
                            <th>Estado</th>
                            <th>Género</th>
                            <th>Avatar</th>
                            <th>Favorito</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Iterar sobre los personajes */}
                        {personajes.map((personaje) => (
                            <tr key={personaje.id}>
                                <td>{personaje.name}</td>
                                <td>{personaje.species}</td>
                                <td>{personaje.status}</td>
                                <td>{personaje.gender}</td>
                                <td>
                                    <img
                                        src={personaje.image}
                                        alt={personaje.name}
                                        className="mask mask-squircle h-12 w-12"
                                    />
                                </td>
                                <td>
                                    {/* Conectar el botón con addFavorito */}
                                    <button
                                        className="btn btn-outline btn-primary"
                                        onClick={() => addToFavoritos(personaje)} // Llamar a addFavorito
                                    >
                                        +
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Api_Personajes;
