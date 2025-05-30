import { useNavigate } from 'react-router-dom';
import '../assets/styles/Contenido.css'; // Archivo CSS para estilos personalizados

const Contenido = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "DOCUMENTOS",
      icon: "📄",
      color: "primary",
      description: "Gestión de documentos administrativos",
      path: "documentos" // Ruta a la que navegará
    },
    {
      title: "TRANSMISIONES EN VIVO",
      icon: "🎥",
      color: "danger",
      description: "Transmisiones en tiempo real",
      path: "transmisionesenvivo"
    },
    {
      title: "CAROUSEL ANUNCIOS",
      icon: "📢",
      color: "success",
      description: "Administración de anuncios y noticias",
      path: "carousselanuncios"
    },
    {
      title: "CONVOCATORIAS",
      icon: "📣",
      color: "warning",
      description: "Publicación y gestión de convocatorias",
      path: "convocatorias"
    },
    {
      title: "DIF",
      icon: "🏛️",
      color: "info",
      description: "Sistema de Desarrollo Integral Familiar",
      path: "dif"
    }
  ];

  const handleItemClick = (path:any) => {
    navigate(path);
  };

  return (
    <div className="menu-container">
      {menuItems.map((item, index) => (
        <div 
          className="menu-item" 
          key={index}
          onClick={() => handleItemClick(item.path)}
          style={{ cursor: 'pointer' }} // Cambia el cursor para indicar que es clickeable
        >
          <div className="menu-icon" style={{ color: item.color }}>
            {item.icon}
          </div>
          <h3 className="menu-title">{item.title}</h3>
          <p className="menu-description">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Contenido;