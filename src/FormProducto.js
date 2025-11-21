import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function FormProducto() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState(null);

    const validator = new SimpleReactValidator();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validator.allValid()) {
            validator.showMessages();
            return;
        }

        try {
            let imageUrl = "";

            if (imagen) {
                const imageRef = ref(storage, `imagenes/${imagen.name}`);
                await uploadBytes(imageRef, imagen);
                imageUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, "productos"), {
                nombre,
                descripcion,
                precio,
                imagen: imageUrl,
                fecha: new Date(),
            });

            alert("Producto agregado correctamente");

            setNombre("");
            setDescripcion("");
            setPrecio("");
            setImagen(null);

        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("Error al agregar el producto.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Nuevo Producto</h2>

            <form onSubmit={handleSubmit} className="mt-3">

                <label className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                {validator.message("nombre", nombre, "required|min:3")}

                <label className="form-label mt-3">Descripcion</label>
                <textarea
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
                {validator.message("descripcion", descripcion, "required|min:5")}

                <label className="form-label mt-3">Precio</label>
                <input
                    type="number"
                    className="form-control"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                {validator.message("precio", precio, "required|numeric")}

                <label className="form-label mt-3">Imagen</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImagen(e.target.files[0])}
                />

                <button type="submit" className="btn btn-primary mt-4 w-100">
                    Guardar Producto
                </button>
            </form>
        </div>
    );
}

export default FormProducto;

