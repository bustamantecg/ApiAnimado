import React, { useEffect, useState } from "react";
import { fetchCharacters, searchCharacterByName, searchCharacterById } from "./ApiService";
import { showErrorToast, showSuccessToast } from "../components/utils/notificationService";
import { useFavoritos } from "./context/FavoritosContext";

const Api_Personajes = () => {
    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermId, setSearchTermId] = useState("");

    const { addToFavoritos } = useFavoritos();

    // Función para obtener todos los personajes
    const loadCharacters = async () => {
        setLoading(true);
        try {
            const data = await fetchCharacters();
            setPersonajes(data);
            showSuccessToast("Datos obtenidos correctamente");
        } catch (error) {
            showErrorToast(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Función para buscar por nombre
    const handleSearch = async () => {
        if (!searchTerm) {
            loadCharacters();
            return;
        }

        setLoading(true);
        try {
            const data = await searchCharacterByName(searchTerm);
            setPersonajes(data);
        } catch (error) {
            showErrorToast("Personaje no encontrado");
        } finally {
            setLoading(false);
        }
    };

    // Función para buscar por ID
    const handleSearchId = async () => {        
        if (!searchTermId) {
            loadCharacters();
            return;
        }
    
        setLoading(true);
        try {
            const data = await searchCharacterById(searchTermId);
            setPersonajes(data); // data ya es un array, así que no necesita más cambios
        } catch (error) {
            showErrorToast("Id no encontrado");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCharacters();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
<div className="flex flex-wrap gap-4 mb-4 bg-amber-100">
        {/* Búsqueda por ID */}
        <div className="flex gap-2">
        <input
            type="number"
            placeholder="Buscar ID..."
            value={searchTermId}
            onChange={(e) => setSearchTermId(e.target.value)}
            className="input input-bordered input-primary"
        />
        <button className="btn btn-primary" onClick={handleSearchId} title="Buscar por ID">
            Buscar
        </button>
    </div>
    {/* Búsqueda por Nombre */}
    <div className="flex gap-2">
        <input
            type="text"
            placeholder="Buscar personaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-info"
        />
        <button className="btn btn-primary" onClick={handleSearch} title="Buscar por Nombre">
            Buscar
        </button>
    </div>
    </div>

</div>

            <div className="overflow-x-auto">
                {loading && <span className="loading loading-spinner text-primary"></span>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Especie</th>
                            <th>Estado</th>
                            <th>Género</th>
                            <th>Ubicación</th>
                            <th>Edad</th>
                            <th>Avatar</th>
                            <th>Favorito</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personajes.map((personaje, index) => (
                            <tr key={personaje.id ? personaje.id : `personaje-${index}`}> 
                                <td>{personaje.id}</td>
                                <td>{personaje.name}</td>
                                <td>{personaje.species}</td>
                                <td>{personaje.status}</td>
                                <td>{personaje.gender}</td>
                                <td>{personaje.location?.name || "Desconocido"}</td>
                                <td>{personaje.edad || "Desconocida"}</td>
                                <td>
                                    <img src={personaje.image} alt={personaje.name} className="mask mask-squircle h-12 w-12" />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline btn-primary"
                                        onClick={() => addToFavoritos(personaje)}
                                        title="Agregar a Mis Favoritos"
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
