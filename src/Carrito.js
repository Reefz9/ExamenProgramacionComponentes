import React from "react";

function Carrito({ carrito }) {
    return (
        <div className="container mt-4 text-center">
            <h2>Carrito</h2>

            {carrito.length === 0 ? (
                <p>No hay productos en el carrito</p>
            ) : (
                carrito.map((item, index) => (
                    <div key={index} className="border p-2 rounded mb-2">
                        <h5>{item.nombre}</h5>
                        <p>${item.precio}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Carrito;
