import React from 'react';
import { useFavoritos } from "./context/FavoritosContext";

const FavoritosModal = ({ closeModal }) => {
    const { favoritos, clearFavoritos, removeFavorito } = useFavoritos();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-gradient-to-b from-blue-700 to-purple-800 p-6 rounded-2xl shadow-2xl w-96 max-h-[85vh] flex flex-col border border-gray-300">
                <h2 className="text-2xl font-bold mb-4 text-white text-center">
                    Mis Personajes Favoritos <span className="text-yellow-300">({favoritos.length})</span>
                </h2>

                <div className="overflow-y-auto max-h-[60vh] p-2 space-y-3">
                    {favoritos.length === 0 ? (
                        <p className="text-gray-300 text-center">No tienes personajes favoritos.</p>
                    ) : (
                        favoritos.map((item) => (
                            <div key={item.id} className="flex items-center bg-gray-900 bg-opacity-50 rounded-lg shadow-md p-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-full border-2 border-yellow-300"
                                />
                                <div className="ml-3 flex-1 text-white">
                                    <h2 className="text-sm font-semibold">{item.name}</h2>
                                    <p className="text-xs text-gray-300">Sexo: {item.gender} - {item.species}</p>
                                    <p className="text-xs text-gray-400">{item.status}</p>
                                </div>
                                <button className="text-red-400 hover:text-red-600 text-lg" onClick={() => removeFavorito(item.id)}>❌</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <button className="btn bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg" onClick={clearFavoritos}>
                        Vaciar Favoritos
                    </button>
                    <button className="btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg" onClick={closeModal}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavoritosModal;
