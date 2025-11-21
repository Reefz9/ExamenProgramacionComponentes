import React, { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SubirImagen() {
    const [archivo, setArchivo] = useState(null);
    const [url, setUrl] = useState("");

    const subir = async () => {
        if (!archivo) {
            alert("Selecciona un archivo");
            return;
        }

        const ruta = ref(storage, "imagenes/" + archivo.name);

        await uploadBytes(ruta, archivo);

        const urlDescarga = await getDownloadURL(ruta);

        setUrl(urlDescarga);

        alert("Imagen subida con éxito");
    };

    return (
        <div className="container mt-4">
            <h3>Subir imagen a Storage</h3>

            <input
                type="file"
                className="form-control"
                onChange={(e) => setArchivo(e.target.files[0])}
            />

            <button className="btn btn-primary mt-3" onClick={subir}>
                Subir Imagen
            </button>

            {url && (
                <div className="mt-3">
                    <h5>URL generada:</h5>
                    <a href={url} target="_blank" rel="noreferrer">
                        {url}
                    </a>
                    <img src={url} alt="preview" className="img-fluid mt-2" />
                </div>
            )}
        </div>
    );
}
