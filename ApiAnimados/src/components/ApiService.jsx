import axios from "axios";

// URL base de la API
const API_URL = "https://rickandmortyapi.com/api/character/";

// Función para obtener todos los personajes
export const fetchCharacters = async () => {
    try {
        const { data } = await axios.get(API_URL);
        
        // Agregar un campo extra "edad" de manera ficticia
        const personajesConEdad = data.results.map(personaje => ({
            ...personaje,
            edad: Math.floor(Math.random() * (80 - 20) + 20) // Edad aleatoria entre 20 y 80
        }));

        return personajesConEdad;
    } catch (error) {
        console.error("Error obteniendo personajes:", error);
        throw error;
    }
};

// Función para buscar personajes animados por nombre
export const searchCharacterByName = async (name) => {
    try {        
        const { data } = await axios.get(`${API_URL}?name=${name}`);

        // Agego campo con una edad aleatoria de 20 a80 años
        const personajesConEdad = data.results.map(personaje => ({
            ...personaje,
            edad: Math.floor(Math.random() * (80 - 20) + 20)
        }));

        return personajesConEdad;
    } catch (error) {
        console.error(`Error buscando personaje: ${name}`, error);
        throw error;
    }
};

// Función para buscar personajes animados por Id
export const searchCharacterById = async (id) => {
    try {
        console.log(`Buscando personaje con ID: ${id}`);
        const { data } = await axios.get(`${API_URL}${id}`);

        // Si la API devuelve un objeto y no un array, lo convertimos en un array
        const personaje = {
            ...data,
            edad: Math.floor(Math.random() * (80 - 20) + 20), // Edad aleatoria entre 20 y 80 años
        };

        return [personaje]; // Devuelve un array con un solo objeto
    } catch (error) {
        console.error(`Error buscando personaje con Id: ${id}`, error);
        throw error;
    }
};

