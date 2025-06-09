import { useState } from "react"
import { addPeriodo } from "../../firebase/gacetasmunicipal";
import { useGacetaPeriodosGacetasMunicipal } from "../../hooks/usePeriodosGacetasMunicipal";


const AddGacetasMunicipales = () => {
  const {periodos} = useGacetaPeriodosGacetasMunicipal() 
  const [AgregaPeriodo, setAgregaPeriodo] = useState<boolean>(false)
  const [Period, setPeriod] = useState<string >("")
  const [Leyenda, setLeyenda]= useState<string>("")



const handlePeriod = (e:  React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  if (/^\d{0,4}$/.test(value)) {
    // Si ya tiene 4 dígitos, validamos el rango
    if (value.length === 4) {
      const year = parseInt(value);
      if (year >= 1900 && year <= 2100) {
        setPeriod(value);
      }
    } else {
      // Aún no tiene 4 dígitos, lo dejamos pasar
      setPeriod(value);
    }
  }
};


const addingPeriod = async (period:string) => {

const result = addPeriodo(period)

if ((await result).success){

  setLeyenda((await result).message)
setPeriod("")
setAgregaPeriodo(false)
} else{
  
  console.log(result)
}

}


console.log('periodos', periodos)

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
                  /* value={selectedSubSection}
                  onChange={(e) => setSelectedSubSection(e.target.value)} */
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
                 {/*  {subSections[selectedSection].map(subSection => (
                    <option key={subSection} value={subSection}>{subSection}</option>
                  ))} */}
                </select>

                {Leyenda&&
                <div style={{ marginTop:'2rem'}}>

                  <span style={{color:"green", fontWeight:'600'}}>{Leyenda}</span>
                </div>
                }
              </div>
 <div style={{width:'100%', display:'flex', justifyContent:'end', marginBottom:'1rem'}}>
<button 

style={{borderRadius:'10px', 
background: !AgregaPeriodo?'#213555':'#FCB454', 
color:'white', 
height:'3rem', 
width:'8rem', 
fontWeight:'700'}}

onClick={()=>{
  setAgregaPeriodo(!AgregaPeriodo)
  setPeriod("")
  }}
> {!AgregaPeriodo? 'Agregar nuevo periodo': 'Ocultar'}</button>
  </div>           

            {AgregaPeriodo&&
              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#FCB454'
                }}>Agrega Nuevo Periodo en <strong>Gacetas</strong>:</label>
                <input
                  type="text"
                  name="period"
                  value={Period}
                  onChange={handlePeriod} 
                pattern="\d{4}"
  maxLength={4}
                  style={{
                    width: '30%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px'
                  }}
                />
              </div>
            }

            {

              Period!=="" && AgregaPeriodo?
Period!=="" &&<div style={{marginBottom:'3rem', display:"flex", alignItems:'center', flexDirection:'row', gap:'3%'}}>

<button style={{
  background:'black', 
  borderRadius:'10px', 
  color:'white', 
  border:'none', 
  height:'3rem', 
  width:'5rem'}}
  onClick={()=>addingPeriod(Period)
  }
  >Agregar Periodo</button>
        <span style={{color:'grey'}}>Agregando Periodo de Gaceta Municipal: <span style={{color:'GRAY', fontWeight:'700'}}>{Period}</span></span>
</div>
: null
            }


  


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
            
            <form /* onSubmit={handleSubmit} */>
           

           <div style={{marginBottom:'5px'}}>
                    <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#34495e'
                }}>Titulo de documento:</label>
                <input
                  type="text"
                  name="name"
             /*      value={newDocument.name}
                  onChange={handleInputChange} */
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
                  name="description"
           /*        value={newDocument.description}
                  onChange={handleInputChange} */
                  required
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
              
    
            {/*   {newDocument.section && subSections[newDocument.section] && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#34495e'
                  }}>Subcategoría:</label>
                  <select 
                    name="subSection"
                    value={newDocument.subSection}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Seleccionar subcategoría</option>
                    {subSections[newDocument.section].map(subSection => (
                      <option key={subSection} value={subSection}>{subSection}</option>
                    ))}
                  </select>
                </div>
              )} */}
              
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
                 /*  onChange={handleFileChange} */
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