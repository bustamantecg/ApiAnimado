import { createContext, useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from '../utils/notificationService';



// Creamos el contexto

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para indicar si está cargando

  // Cargar personajes animados favoritos desde localStorage al iniciar
  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(storedFavoritos);
    setLoading(false); // Marcar como cargado
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }, [favoritos, loading]);

  //--------------------------------------------  
  const addToFavoritos = (personaje) => {    
    const existe = favoritos.some((p) => p.id === personaje.id);
    if (existe) {
      showSuccessToast('El personaje ya existe en tu lista de favoritos.'); // por esta linea me da error
      return; // Evita que se agregue duplicada
    }

    // Si no existe, se agrega
    const nuevosFavoritos = [...favoritos, personaje];
    setFavoritos(nuevosFavoritos);
    showSuccessToast("Tu personaje fue agregado correctamente a tu lista de favoritos.");
  };

  //--------------------------------------------  
  const removeFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);
    setFavoritos(nuevosFavoritos);
    showSuccessToast("Personaje eliminado correctamente de tu lista de favoritos.");
  };

  //--------------------------------------------
  const clearFavoritos = () => {
    setFavoritos([]);
    showSuccessToast("Todos los personajes favoritos han sido eliminados.");
  };

  //--------------------------------------------
  return (
    <FavoritosContext.Provider value={{ favoritos, addToFavoritos, removeFavorito, clearFavoritos }}>
      {children}
      <ToastContainer />
    </FavoritosContext.Provider>
  );
};

// Hook para acceder al contexto
export const useFavoritos = () => {
  return useContext(FavoritosContext);
};
