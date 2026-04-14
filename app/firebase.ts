import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "여기에",
  authDomain: "여기에",
  projectId: "여기에",
  storageBucket: "여기에",
  messagingSenderId: "여기에",
  appId: "여기에",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
