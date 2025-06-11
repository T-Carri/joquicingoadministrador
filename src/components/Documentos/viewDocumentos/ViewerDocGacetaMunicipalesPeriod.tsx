import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";

interface Props {
  periodo: string;
}

const ViewerDocGacetaMunicipalesPeriod = ({ periodo }: Props) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocUrl, setSelectedDocUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!periodo) return;

    const colRef = collection(db, `AyuntamientoJoquicingo2025-2027/gacetamunicipal/${periodo}`);
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      setDocuments(docs);
    });

    return () => unsubscribe();
  }, [periodo]);

  const openModal = (url: string) => {
    setSelectedDocUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDocUrl(null);
    setIsModalOpen(false);
  };

  return (
    <>
    
        {documents.map((doc) => (
          <div key={doc.id} style={{
           
           padding: '15px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            justifyContent:'start',
            gap:'5px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#34495e' }}>📄{doc.data.Titulo || "Sin título"}</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>{doc.data.Descripcion || "Sin descripción"}</p>
            <button 
            style={{background:'grey', border:'none', borderRadius:'5px', padding:'8px', color:'white'}}
            onClick={() => openModal(doc.data.Documento)}>Ver documento</button>
          </div>
        ))}
  

      {/* Modal */}
      {isModalOpen && selectedDocUrl && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            height: '80%',
            position: 'relative'
          }}>
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '10px', right: '10px',
              padding: '5px 10px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Cerrar</button>
            <iframe
              src={selectedDocUrl}
              title="Documento"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewerDocGacetaMunicipalesPeriod;
