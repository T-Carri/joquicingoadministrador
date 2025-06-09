import { useEffect, useState } from "react";
import {
  collection,

  onSnapshot,

 
} from "firebase/firestore";
import { db } from "../config/firebase";
 // Ajusta la ruta según tu proyecto

type Periodo = string;

export const useGacetaPeriodosGacetasMunicipal = () => {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
const collectionRef = collection(db, "AyuntamientoJoquicingo2025-2027/gacetamunicipal");

const unsubscribe = onSnapshot(
  collectionRef,
  (snapshot) => {
    const periodosActivos: Periodo[] = snapshot.docs.map((doc) => doc.id);
    setPeriodos(periodosActivos);
    setLoading(false);
  },
  (err) => {
    console.error("Error al obtener los periodos:", err);
    setError("No se pudieron cargar los periodos.");
    setLoading(false);
  }
);

    return () => unsubscribe();
  }, []);

  return { periodos, loading, error };
};
