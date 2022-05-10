import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateCurrentUser,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyb4-zbHv9UWLinsM_7-aEST3jme25BHM",
  authDomain: "morphosium-case.firebaseapp.com",
  projectId: "morphosium-case",
  storageBucket: "morphosium-case.appspot.com",
  messagingSenderId: "1046777725747",
  appId: "1:1046777725747:web:14a0fb4b7a9cd22c0b7446",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
