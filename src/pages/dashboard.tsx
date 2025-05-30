import { Outlet, Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <>
      <style>{`
        .dashboard-container {
          display: flex;
          height: 100vh;
          font-family: sans-serif;
        }

        .sidebar {
          width: 220px;
          background-color: #1e1e2f;
          color: white;
          padding: 20px;
          box-sizing: border-box;
        }

        .sidebar h2 {
          margin-bottom: 24px;
          font-size: 20px;
        }

        .sidebar a {
          display: block;
          color: white;
          text-decoration: none;
          margin: 10px 0;
          padding: 8px;
          border-radius: 4px;
        }

        .sidebar a:hover {
          background-color: #33334d;
        }

        .main-content {
          flex: 1;
          background-color: #f4f4f4;
          display: flex;
          flex-direction: column;
        }

        .header {
          background-color: white;
          padding: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        .outlet {
          padding: 20px;
          flex-grow: 1;
          overflow-y: auto;
        }
      `}</style>

      <div className="dashboard-container">
        <div className="sidebar">
          <img src='/IMG_0864.PNG' width={150} />
          <Link to="/dashboard/home">Inicio</Link>
          <Link to="/dashboard/perfil">Perfil</Link>
          <Link to="/dashboard/config">Configuración</Link>
        </div>

        <div className="main-content">
          <div className="header">
            <h3>Panel de Administrador para sitio web Joquicingo 2025-2027</h3>
          </div>
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
