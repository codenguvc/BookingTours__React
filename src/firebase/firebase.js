import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "api-firebase-react.firebaseapp.com",
  databaseURL: "https://api-firebase-react-default-rtdb.firebaseio.com",
  projectId: "api-firebase-react",
  storageBucket: "api-firebase-react.appspot.com",
  messagingSenderId: "190659728550",
  appId: "1:190659728550:web:7d76dbf1eff21a15cf5067",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, storage, database };


