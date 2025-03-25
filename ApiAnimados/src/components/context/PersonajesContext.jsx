import { createContext, useContext, useEffect, useState } from "react"
import { ToastContainer } from "react-toastify" 
import 'react-toastify/dist/ReactToastify.css'
import { showSuccessToast } from './utils/notificationService'; // Importa la función

// Creamos el contexto
const PersonajesContext = createContext();

export const PersonajesProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para indicar si está cargando

    // Cargar personajes animados favoritos desde localStorage al iniciar
    useEffect(() => {
        const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")|| []);
        if (storedFavoritos) {
            setFavoritos(storedFavoritos);
        }
        setLoading(false); // Marcar como cargado
    }, []);

    // Guardar personajes favoritos en localStorage cada vez que se actualicen
    useEffect(() => {
        if (!loading) { // Solo guardar cuando no esté cargando
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }, [favoritos, loading]);

    const addFavorito = (personaje) => {
        setFavoritos((prevFavoritos) => {
            const exists = prevFavoritos.some((item) => item.id === personaje.id);
            if (exists) {                
                alert(`El personaje ${personaje.name} ya está en tus favoritos.`);
                return ;//prevFavoritos; // No hacemos cambios si ya existe
            } else {
                const updatedFavoritos = [...prevFavoritos, personaje];
                localStorage.setItem("favoritos", JSON.stringify(updatedFavoritos)); // Guardar en localStorage
                return updatedFavoritos; // Actualizar el estado
            }
        });
    };



    return (
        <PersonajesContext.Provider value={{ favoritos, addFavorito }}>
            {children}
        </PersonajesContext.Provider>
    );
};

// Hook para acceder al contexto
export const usePersonajes = () => {
    return useContext(PersonajesContext);
};
