import { AdministradorLayout } from '../layout/AdministradorLayout';
import { Typography, Divider, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const InicioPage = () => {
  const menuItems = [
    { text: 'Noticias', to: '/admin/noticias', description: 'Gestión de noticias' },
    { text: 'Docentes', to: '/admin/docentes', description: 'Administrar docentes' },
    { text: 'Planificación', to: '/admin/planificacion', description: 'Planificación académica' },
    { text: 'Cancelaciones', to: '/admin/cancelaciones', description: 'Manejo de cancelaciones' },
    { text: 'Admisiones', to: '/admin/admisiones', description: 'Administrar admisiones' },
    { text: 'Matrícula', to: '/admin/matricula', description: 'Gestión de matrículas' },
  ];

  return (
    <AdministradorLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido Administrador
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />
      <Grid container spacing={6}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.text}>
            <NavLink to={item.to} style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-details">
                  <p className="text-title">{item.text}</p>
                  <p className="text-body">{item.description}</p>
                </div>
                <button className="card-button">Ir</button>
              </div>
            </NavLink>
          </Grid>
        ))}
      </Grid>

      <style jsx>{`
        .card {
          width: 100%;
          height: 254px;
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

        .card-button {
          width: 40%;
          height: 40px;
          border-radius: 1rem;
          border: none;
          background-color: #008bf8;
          color: #fff;
          font-size: 1.2rem;
          padding: 0.5rem;
          position: absolute;
          left: 50%;
          bottom: 10px;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.3s ease-out, transform 0.3s ease;
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
    </AdministradorLayout>
  );
};

