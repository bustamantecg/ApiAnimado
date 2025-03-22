import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify'; // No olvides este componente
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast } from './utils/notificationService'; // Importa la función

const GetApi = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://rickandmortyapi.com/api/character/');
      setCharacters(data.results);
    } catch (err) {
      showErrorToast(`Error: ${err.message}`); // Llama a la función para mostrar el error
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
                    {/* head */}
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
                        {characters.map((character) => (
                            <tr key={character.id}>
                                <td>{character.name}</td>
                                <td>{character.species}</td>
                                <td>{character.status}</td>
                                <td>{character.gender}</td>
                                <td>
                                    <img
                                        src={character.image}
                                        alt={character.name}
                                        className="mask mask-squircle h-12 w-12"
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-outline btn-primary">
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

export default GetApi;
