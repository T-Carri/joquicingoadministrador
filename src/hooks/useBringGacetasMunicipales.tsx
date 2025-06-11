import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
 
} from "firebase/firestore";

const useBringGacetasMunicipales = () => {
  const [gacetas, setGacetas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirestore();
    const mainCollectionRef = collection(db, "AyuntamientoJoquicingo2025-2027/gacetamunicipal");

    // Obtener todas las subcolecciones dinámicamente
    const fetchAllSubcollections = async () => {
      try {
        const mainSnapshots = await getDocs(mainCollectionRef);

        const allDocs: any[] = [];

        const promises = mainSnapshots.docs.map(async (subCollectionDoc) => {
          const subCollectionPath = `AyuntamientoJoquicingo2025-2027/gacetamunicipal/${subCollectionDoc.id}`;
          const subColRef = collection(db, subCollectionPath);
          const subColSnap = await getDocs(subColRef);

          subColSnap.forEach((doc) => {
            allDocs.push({
              id: doc.id,
              parentId: subCollectionDoc.id,
              ...doc.data(),
            });
          });
        });

        await Promise.all(promises);
        setGacetas(allDocs);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener gacetas:", err);
        setError("Ocurrió un error al obtener las gacetas.");
        setLoading(false);
      }
    };

    fetchAllSubcollections();
  }, []);

  return { gacetas, loading, error };
};

export default useBringGacetasMunicipales;
