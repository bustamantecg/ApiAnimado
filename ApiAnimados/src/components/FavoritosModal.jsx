import React from 'react';
import { useFavoritos } from "./context/FavoritosContext";

const FavoritosModal = ({ closeModal }) => {
    const { favoritos, clearFavoritos, removeFavorito } = useFavoritos();

    return (
        <div className="fixed inset-0 bg-amber-100 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-amber-600 p-6 rounded-lg shadow-lg w-96 max-h-[85vh] flex flex-col">
                <h2 className="text-2xl font-bold mb-4 text-blue-500 text-center">Mis Personajes Favoritos {favoritos.length }</h2>

                <div className="overflow-y-auto max-h-[70vh] p-2">
                    {favoritos.length === 0 ? (
                        <p className="text-gray-600 text-center">Favoritos está vacío.</p>
                    ) : (
                        favoritos.map((item) => (
                            <div key={item.id} className="card card-side bg-base-100 shadow-sm mb-3">
                                <figure className="px-3 pt-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="rounded-xl w-20 h-20"
                                    />
                                </figure>
                                <div className="card-body items-center text-center p-2">
                                    <h2 className="text-sm font-semibold">{item.name}</h2>
                                    <p className="text-xs">Sexo: {item.gender} - {item.species}</p>
                                    <p className="text-xs">{item.status}</p>
                                    <button className="btn btn-sm btn-error" onClick={() => removeFavorito(item.id)}>❌</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                    <button className="btn btn-sm btn-secondary" onClick={clearFavoritos}>
                        Vaciar Favoritos
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={closeModal}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavoritosModal;
