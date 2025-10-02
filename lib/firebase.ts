import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"

//firebase config data
const firebaseConfig = {
  apiKey: "AIzaSyDBPdHsYKMd9DiFaiGTdnI56LUsyN0O2eY",
  authDomain: "the-night-crew-club-app.firebaseapp.com",
  projectId: "the-night-crew-club-app",
  storageBucket: "the-night-crew-club-app.firebasestorage.app",
  messagingSenderId: "999586333527",
  appId: "1:999586333527:web:1f7845624176e9d8447412"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);