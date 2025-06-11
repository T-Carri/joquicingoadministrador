import { useState } from "react";
import ViewerDocGacetaMunicipalesPeriod from "./ViewerDocGacetaMunicipalesPeriod";

const gacetasPeriodos = [
  {
periodo: '2027',
  },
   {
periodo: '2026'
  },
   {
periodo: '2025'
  },
   {
periodo: '2024'
  },
   {
periodo: '2023'
  },
   {
periodo: '2022'
  },
   {
periodo: '2021'
  },
    {
periodo: '2020'
  },


]


const ViewerDocGacetaMunicipales = () => {
       const [DocsPeriod, setDocsPeriod] = useState<string|null>(null);
  return (
     <div style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <h2 style={{
              color: '#4a6fa5',
              margin: 0,
              fontSize: '22px'
            }}>
              Documentos 
            </h2>
            
            <div style={{
              color: '#7f8c8d',
              fontSize: '14px'
            }}>
             {/*  {filteredDocuments.length} documento{filteredDocuments.length !== 1 ? 's' : ''} encontrado{filteredDocuments.length !== 1 ? 's' : ''} */}
            </div>
          </div>
           <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>

{
    DocsPeriod == null?
  gacetasPeriodos.map((periodo, index)=>{

    return(
<div  key={index}

onClick={()=>setDocsPeriod(periodo.periodo)}

style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  padding: '20px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                  }
                } as React.CSSProperties}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#e3f2fd',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '15px',
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: '24px' }}>📅</span>
                    </div>
                    <div>
                      <h3 style={{
                        margin: 0,
                        color: '#2c3e50',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>{periodo.periodo}</h3>
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        fontSize: '12px',
                        color: '#7f8c8d'
                      }}>
                        <span>Consulta documentos del año {periodo.periodo}</span>
              
                      </div>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#34495e',
                    fontSize: '14px',
                    marginBottom: '15px'
                  }}>Documentos de la gaceta municipal de joquicingo</p>
                  
                
                </div>
    )

  })
  :
  <ViewerDocGacetaMunicipalesPeriod periodo={DocsPeriod} />
}


              

               
      

              

        </div>
          
   
        </div>
  )
}

export default ViewerDocGacetaMunicipales