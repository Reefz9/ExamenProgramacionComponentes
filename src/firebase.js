import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyCndFovDb-F4uzE80l-qxg-S4l4Chm-0cM",
    authDomain: "examencomponente.firebaseapp.com",
    projectId: "examencomponente",
    storageBucket: "examencomponente.firebasestorage.app",
    messagingSenderId: "787305595262",
    appId: "1:787305595262:web:beeb343c264886f5cab32f"
};

const app = initializeApp(firebaseConfig);
const useEmulator = true; 

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
if (useEmulator) {
    connectFirestoreEmulator(db, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
    connectStorageEmulator(storage, "localhost", 9199);
}


