import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ViewerDocGacetaMunicipales from './Documentos/viewDocumentos/ViewerDocGacetaMunicipales';
//import useBringGacetasMunicipales from '../hooks/useBringGacetasMunicipales';




const Documentos = () => {
  const navigate = useNavigate();
  const location  = useLocation()
  //const { gacetas, loading, error } = useBringGacetasMunicipales();
  const [Selection, setSelection] = useState<string>('');



  // Sample data
  const sections: any[] = [
    {
      path: "addgacetasmunicipal",
      label: "Gacetas municipal"
    },
    {
      path: "",
      label: "Listado de tramites"
    },
    {
      path: "",
      label: "Registro municipal de inspectores"
    },
    {
      path: "",
      label: "Normativa"
    },
    {
      path: "",
      label: "Protesta ciudadana"
    },
    {
      path: "",
      label: "Edictos"
    }
  ]
   




;

  // console.log(gacetas)

  return (
    <div style={{ 
      height: '100vh', 
      padding: '20px',
      backgroundColor: '#f5f7fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#4a6fa5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>←</span> Regresar
        </button>
        
        <h1 style={{ 
          color: '#2c3e50',
          margin: 0,
          fontSize: '28px'
        }}>Gestor de Documentos</h1>
        
        <div style={{ width: '100px' }}></div> {/* Spacer para alinear */}
      </div>
      
      {/* Main Content - Horizontal Layout */}
      <div style={{
        display: 'flex',
        gap: '30px',
        height: 'calc(100% - 100px)'
      }}>
        {/* Left Panel - 40% */}
        <div style={{
          width: '40%',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '25px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflowY: 'auto'
        }}>
          <h2 style={{
            color: '#4a6fa5',
            marginTop: 0,
            marginBottom: '25px',
            fontSize: '22px'
          }}>Gestionar documentos</h2>
          
          {/* Filters */}
          <div style={{ marginBottom: '30px' }}>

        {/* CATEGORIAS DE DOCUMENTOS */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#34495e'
              }}>Seleccionar apartado:</label>
              <select 
                value={Selection}
              onChange={(e) => {
    const selectedPath = e.target.value;
    setSelection(selectedPath);
    if (selectedPath) {
      navigate(selectedPath);
    }
  }}
                style={{ 
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  backgroundColor: '#f8f9fa'
                }}
              >
              
                {sections.map((section, index) => (
                  <option key={index} value={section.path}>{section.label}</option>
                ))}
              </select>
            </div>

<Outlet />
            
        
          </div>
          
   

          
        </div>
        
{

  location.pathname=='/dashboard/documentos/addgacetasmunicipal'&&
 <ViewerDocGacetaMunicipales/>
}

      
  
      </div>
    </div>
  );
}

export default Documentos;