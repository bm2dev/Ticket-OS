import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { Enviroment } from "./environment";

const firebaseConfig = {
  apiKey: Enviroment.FIREBASE_API_KEY,
  authDomain: Enviroment.FIREBASE_AUTH_DOMAIN,
  projectId: Enviroment.FIREBASE_PROJECT_ID,
  storageBucket: Enviroment.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Enviroment.FIREBASE_MESSAGING_SENDER_ID,
  appId: Enviroment.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


