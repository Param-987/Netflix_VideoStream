// import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app";
import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfg8OjeQWT7RntlX0F9kNJb8Jlo6yDTy8",
  authDomain: "netflix-3c26a.firebaseapp.com",
  projectId: "netflix-3c26a",
  storageBucket: "netflix-3c26a.appspot.com",
  messagingSenderId: "281815424646",
  appId: "1:281815424646:web:696a34cb5398b75dedfb07",
  measurementId: "G-N53F1PYW2M"
};

// const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig)

// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage(firebaseApp);
const storage = getStorage(app)

export default storage