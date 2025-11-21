import React, { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import Productos from "./Products";
import Carrito from "./Carrito";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
    const [carrito, setCarrito] = useState([]);

    const [usuario, setUsuario] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });

        return () => unsubscribe();
    }, []);

    const login = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
        } catch (error) {
            alert("Error al iniciar sesion: " + error.message);
        }
    };

    const registrar = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
        } catch (error) {
            alert("Error al registrarse: " + error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    return (
        <div className="container mt-4 text-center">

            <h1 className="mb-4">Gestion de Productos</h1>

            {!usuario && (
                <div className="card mx-auto p-4" style={{ maxWidth: "400px" }}>
                    <h3>Iniciar sesion</h3>

                    <form onSubmit={login}>
                        <input
                            type="email"
                            className="form-control mt-3"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            className="form-control mt-3"
                            placeholder="Clave"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="btn btn-primary mt-3 w-100" type="submit">
                            Entrar
                        </button>
                    </form>

                    <button className="btn btn-secondary mt-3 w-100" onClick={registrar}>
                        Crear cuenta
                    </button>
                </div>
            )}

            {usuario && (
                <>
                    <p className="mt-2">
                        Sesion iniciada como: <strong>{usuario.email}</strong>
                    </p>
                    <button className="btn btn-danger mb-4" onClick={logout}>
                        Cerrar sesion
                    </button>

                    <div className="mb-5">
                        <FormProducto />
                    </div>

                    <div className="mb-5">
                        <Productos agregarAlCarrito={agregarAlCarrito} />
                    </div>

                    <div className="mb-5">
                        <Carrito carrito={carrito} />
                    </div>
                </>
            )}

        </div>
    );
}

export default App;


