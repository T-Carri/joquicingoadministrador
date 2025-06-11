import { useState } from "react"
import { addDocGacetaMunicipal } from "../../firebase/gacetasmunicipal"
import type { addingDocGacetaMunicipal } from "../../interfaces"
//import { addPeriodo } from "../../firebase/gacetasmunicipal";
//import { useGacetaPeriodosGacetasMunicipal } from "../../hooks/usePeriodosGacetasMunicipal";


const AddGacetasMunicipales = () => {
const [Periodo, setPeriodo] = useState<string>("")
const [Documento, setDocumento] = useState<addingDocGacetaMunicipal>({
    Titulo: "",
    Descripcion: "",
    Documento: null
})



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDocumento((prev) => ({
      ...prev,
      [name === "Titulo" ? "Titulo" : "Descripcion"]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDocumento((prev) => ({
      ...prev,
      Documento: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Periodo || !Documento.Titulo  || !Documento.Documento) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      await addDocGacetaMunicipal(Periodo, Documento);
      alert("Documento subido exitosamente");
      setDocumento({ Titulo: "", Descripcion: "", Documento: null });
      setPeriodo("");
    } catch (error) {
      console.error("Error al subir el documento:", error);
      alert("Ocurrió un error al subir el documento");
    }
  };




console.log('periodos', Periodo) 

  return (
    <>
   
  
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#34495e'
                }}>Periodo:</label>
                <select 
                   value={Periodo}
                  onChange={(e) => setPeriodo(e.target.value)} 
                  style={{ 
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <option value="">Seleccione periodo</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  </select>
              </div>


            
       {/* Upload Form */}
          <div style={{
            borderTop: '1px solid #eee',
            paddingTop: '25px'
          }}>
            <h3 style={{
              color: '#4a6fa5',
              marginTop: 0,
              marginBottom: '20px',
              fontSize: '18px'
            }}>Cargar Nuevo Documento para Gacetas Municipal</h3>
            
            <form  onSubmit={handleSubmit} >
           

           <div style={{marginBottom:'5px'}}>
                    <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#34495e'
                }}>Titulo de documento:</label>
                <input
                  type="text"
                  name="Titulo"
                 value={Documento.Titulo}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px'
                  }}
                />
           </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#34495e'
                }}>Descripción:</label>
                <textarea
                  name="Descripcion"
             value={Documento.Descripcion}
                  onChange={handleInputChange} 
               
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    minHeight: '80px'
                  }}
                />
              </div>
              
    
       
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#34495e'
                }}>Archivo PDF:</label>
                <input
                  type="file"
                  accept=".pdf"
                   onChange={handleFileChange} 
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    backgroundColor: '#f8f9fa'
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#4a6fa5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3a5a8f'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#4a6fa5'}
              >
                Subir Documento
              </button>
            </form>
          </div>
</>



  )
}

export default AddGacetasMunicipales