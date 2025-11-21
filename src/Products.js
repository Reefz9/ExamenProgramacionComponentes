import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

function Productos({ agregarAlCarrito }) {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "productos"), orderBy("fecha", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProductos(lista);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="container mt-4 text-center">

            <h2 className="mb-3">Productos Disponibles</h2>

            <div className="row justify-content-center">
                {productos.map((p) => (
                    <div className="col-md-4 mb-3" key={p.id}>
                        <div className="card shadow">

                            {p.imagen && (
                                <img
                                    src={p.imagen}
                                    className="card-img-top"
                                    alt={p.nombre}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            )}

                            <div className="card-body">

                                <h5 className="card-title">{p.nombre}</h5>
                                <p>{p.descripcion}</p>
                                <p className="fw-bold">${p.precio}</p>

                                <button
                                    className="btn btn-success w-100"
                                    onClick={() => agregarAlCarrito(p)}
                                >
                                    Agregar al carrito
                                </button>

                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Productos;
