import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Document {
  id: number;
  name: string;
  section: string;
  subSection: string;
  description: string;
}

interface NewDocument {
  file: File | null;
  name: string;
  description: string;
  section: string;
  subSection: string;
}

interface SubSections {
  [key: string]: string[];
}

const Documentos = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedSubSection, setSelectedSubSection] = useState<string>('');
  const [newDocument, setNewDocument] = useState<NewDocument>({
    file: null,
    name: '',
    description: '',
    section: '',
    subSection: ''
  });

  // Sample data
  const sections: string[] = ['Listado de tramites', 'Registro municipal de inspectores', 'Normativa', 'Protesta ciudadana', 'Gaceta Municipal', 'Edictos'];
  const subSections: SubSections = {
    'Listado de tramites': ['Catastro', 'Contraloria', 'Cultura', 'Desarrollo económico', ' Dirección de la mujer', 'Dirección del campo', 'Ecología', 'Educación', 'Juzgado cívico', 'Obras públicas y desarrollo urbano', 'Prevención del delito', 'Registro civíl', 'Secretaria del ayuntamiento', 'Seguridad pública', 'Servicios públicos'],
    'Registro municipal de inspectores': ['Catastro', 'Desarrollo económico', 'Desarrollo urbano', 'Ecologia', 'Proteccion civíl', 'Servicios públicos'],
    'Normativa': ['Federales', 'Estatales', 'Municipales'],
    'Protesta ciudadana': ['Protesta PDF'],
    'Gaceta Municipal': ['Gacetas mensuales', 'Programas', 'Manuales', 'Otros'],
    
  };

  const documents: Document[] = [
    { id: 1, name: 'Manual de Branding.pdf', section: 'Marketing', subSection: 'Branding', description: 'Guía de identidad corporativa' },
    { id: 2, name: 'Política de Teletrabajo.pdf', section: 'Recursos Humanos', subSection: 'Políticas', description: 'Reglas para trabajo remoto' },
    { id: 3, name: 'Contrato Modelo.pdf', section: 'Legal', subSection: 'Contratos', description: 'Plantilla para nuevos clientes' },
  ];

  const filteredDocuments = documents.filter(doc => 
    (!selectedSection || doc.section === selectedSection) &&
    (!selectedSubSection || doc.subSection === selectedSubSection)
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocument({...newDocument, file: e.target.files[0]});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDocument({...newDocument, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para subir el documento
    console.log('Documento a subir:', newDocument);
    alert(`Documento ${newDocument.name} preparado para subir`);
    // Reset form
    setNewDocument({
      file: null,
      name: '',
      description: '',
      section: '',
      subSection: ''
    });
  };

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
          }}>Filtros y Carga</h2>
          
          {/* Filters */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#34495e'
              }}>Seleccionar categoría:</label>
              <select 
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setSelectedSubSection('');
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
                <option value="">Todas las categorías</option>
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
            
            {selectedSection && subSections[selectedSection] && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#34495e'
                }}>Subcategoría:</label>
                <select 
                  value={selectedSubSection}
                  onChange={(e) => setSelectedSubSection(e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <option value="">Todas las subcategorías</option>
                  {subSections[selectedSection].map(subSection => (
                    <option key={subSection} value={subSection}>{subSection}</option>
                  ))}
                </select>
              </div>
            )}
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
            }}>Cargar Nuevo Documento</h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#34495e'
                }}>Nombre del documento:</label>
                <input
                  type="text"
                  name="name"
                  value={newDocument.name}
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
                  name="description"
                  value={newDocument.description}
                  onChange={handleInputChange}
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
              
    
              {newDocument.section && subSections[newDocument.section] && (
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
              )}
              
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
        </div>
        
        {/* Right Panel - Documents List */}
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
              Documentos {selectedSection && `> ${selectedSection}`} {selectedSubSection && `> ${selectedSubSection}`}
            </h2>
            
            <div style={{
              color: '#7f8c8d',
              fontSize: '14px'
            }}>
              {filteredDocuments.length} documento{filteredDocuments.length !== 1 ? 's' : ''} encontrado{filteredDocuments.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          {filteredDocuments.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {filteredDocuments.map(doc => (
                <div key={doc.id} style={{
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
                      <span style={{ fontSize: '24px' }}>📄</span>
                    </div>
                    <div>
                      <h3 style={{
                        margin: 0,
                        color: '#2c3e50',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>{doc.name}</h3>
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        fontSize: '12px',
                        color: '#7f8c8d'
                      }}>
                        <span>{doc.section}</span>
                        {doc.subSection && <span>• {doc.subSection}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#34495e',
                    fontSize: '14px',
                    marginBottom: '15px'
                  }}>{doc.description}</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#e3f2fd',
                      color: '#4a6fa5',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}>
                      Ver
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#f5f5f5',
                      color: '#7f8c8d',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}>
                      Descargar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              color: '#95a5a6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📂</div>
              <h3 style={{ margin: 0, fontSize: '18px', marginBottom: '10px' }}>No se encontraron documentos</h3>
              <p style={{ margin: 0 }}>Prueba ajustando los filtros o sube un nuevo documento</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Documentos;