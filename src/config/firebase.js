import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { setProducts } from "../redux/productsSlice";
import { useDispatch } from "react-redux";

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

export const db = getFirestore(app);

export const producsRef = collection(db, "producs");

export const useProdutcListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return onSnapshot(producsRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      dispatch(setProducts(docs));
    });
  }, [dispatch]);
};
