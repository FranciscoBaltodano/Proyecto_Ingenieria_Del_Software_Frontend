import { Typography, Divider, Grid, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Assignment, Settings, Home, Queue } from '@mui/icons-material';

export const MatriculaMenu = () => {
  const menuItems = [
    { text: 'Registrar Sección', to: '/jefeDepartamento/registrarSeccion', description: 'Registra nuevas secciones para tu departamento', icon: <Assignment sx={{ color:'orange'}} /> },
    { text: 'Configurar Secciones', to: '/jefeDepartamento/configurarSecciones', description: 'Configura las secciones de tu departamento', icon: <Settings sx={{ color:'blue'}} /> },
    { text: 'Infraestructura', to: '/jefeDepartamento/infraestructura', description: 'Maneja y controla la infraestructura', icon: <Home sx={{ color:'green'}} /> },
    { text: 'Lista de Espera', to: '/jefeDepartamento/listaDeEspera', description: 'Revisa las listas de espera de las secciones', icon: <Queue sx={{ color:'red'}} /> },
  ];

  return (
    <Box>
      <Grid container justifyContent="center" spacing={6}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} xl={3} key={item.text}>
            <NavLink to={item.to} style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-details">
                  {item.icon}
                  <p className="text-title">{item.text}</p>
                  <p className="text-body">{item.description}</p>
                </div>
              </div>
            </NavLink>
          </Grid>
        ))}
      </Grid>

      <style>{`
        .card {
          width: 100%;
          height: 280px;
          border-radius: 20px;
          position: relative;
          padding: 1.5rem;
          border: 2px solid #c3c6ce;
          background-color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin: auto;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
          transition: border-color 2s ease;
        }

        .card-details {
          color: black;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.5em;
        }

        .card-details svg {
          width: 50px; 
          height: 50px;
          margin-bottom: 0.5rem;
        }

        .text-body {
          color: rgb(134, 134, 134);
        }

        .text-title {
          font-size: 1.5em;
          font-weight: bold;
        }

        .card:hover {
          border-color: #008bf8;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }

        .card:hover .card-button {
          opacity: 1;
          transform: translateX(-50%) translateY(-5px);
        }

        .card:hover .text-title {
          color: #008bf8;
          transition: color 0.3s ease;
        }
      `}</style>
    </Box>
  );
};
