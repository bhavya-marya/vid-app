import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyAl_qFYKwP9q78ja1PFcVVuideiWn1TrGQ",
    authDomain: "video-app-b7f2f.firebaseapp.com",
    projectId: "video-app-b7f2f",
    storageBucket: "video-app-b7f2f.appspot.com",
    messagingSenderId: "41249958637",
    appId: "1:41249958637:web:2b6ef3f0294d9987ab3ae4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;