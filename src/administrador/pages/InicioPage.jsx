import { AdministradorLayout } from '../layout/AdministradorLayout';
import { Typography, Divider, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

// Definir los íconos SVG
const noticiasIcon = (
  <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" viewBox="0 0 512 512"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M235.686,174.813h30.604v30.604c0,11.28,9.145,20.426,20.426,20.426s20.426-9.145,20.426-20.426v-30.604h30.603 c11.28,0,20.426-9.145,20.426-20.426s-9.145-20.426-20.426-20.426h-30.603v-30.604c0-11.28-9.145-20.426-20.426-20.426 s-20.426,9.145-20.426,20.426v30.604h-30.604c-11.28,0-20.426,9.145-20.426,20.426S224.406,174.813,235.686,174.813z"></path> <path d="M474.609,0C460.251,0,51.705,0,37.391,0c-11.28,0-20.426,9.145-20.426,20.426v471.149 c0,11.28,9.145,20.426,20.426,20.426h61.43h375.788c11.28,0,20.426-9.145,20.426-20.426V20.426 C495.035,9.145,485.889,0,474.609,0z M78.396,471.149H57.817V40.851h20.579V471.149z M454.183,471.149H119.247V40.851h334.936 V471.149z"></path> <path d="M172.968,309.855h113.747c11.28,0,20.426-9.145,20.426-20.426s-9.145-20.426-20.426-20.426H172.968 c-11.28,0-20.426,9.145-20.426,20.426S161.687,309.855,172.968,309.855z"></path> <path d="M172.968,372.54h227.495c11.28,0,20.426-9.145,20.426-20.426s-9.145-20.425-20.426-20.425H172.968 c-11.28,0-20.426,9.145-20.426,20.425S161.687,372.54,172.968,372.54z"></path> <path d="M172.968,435.225h227.495c11.28,0,20.426-9.145,20.426-20.426s-9.145-20.426-20.426-20.426H172.968 c-11.28,0-20.426,9.145-20.426,20.426S161.687,435.225,172.968,435.225z"></path> </g> </g> </g> </g></svg>
 );

const docentesIcon = (
  <svg viewBox="0 0 24 24" fill="none">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path opacity="0.4" d="M18.3791 12.8401V17.7701C18.3791 19.0401 17.3891 20.4001 16.1991 20.8001L13.0091 21.8601C12.4491 22.0501 11.5391 22.0501 10.9891 21.8601L7.79914 20.8001C6.59914 20.4001 5.61914 19.0401 5.61914 17.7701L5.62914 12.8401L10.0491 15.7201C11.1291 16.4301 12.9091 16.4301 13.9891 15.7201L18.3791 12.8401Z" fill="#292D32"></path>
    <path d="M19.9795 6.46006L13.9895 2.53006C12.9095 1.82006 11.1295 1.82006 10.0495 2.53006L4.02953 6.46006C2.09953 7.71006 2.09953 10.5401 4.02953 11.8001L5.62953 12.8401L10.0495 15.7201C11.1295 16.4301 12.9095 16.4301 13.9895 15.7201L18.3795 12.8401L19.7495 11.9401V15.0001C19.7495 15.4101 20.0895 15.7501 20.4995 15.7501C20.9095 15.7501 21.2495 15.4101 21.2495 15.0001V10.0801C21.6495 8.79006 21.2395 7.29006 19.9795 6.46006Z" fill="#292D32"></path>
  </g>
</svg>
);

const planificacionIcon = (
  <svg fill="#2010f4" height="200px" width="200px" version="1.1" viewBox="0 0 512 512" stroke="#2010f4"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M480.6,11H31.4C20.1,11,11,20.1,11,31.4v350.7c0,11.3,9.1,20.4,20.4,20.4h204.2v57.7h-29.8c-11.3,0-20.4,9.1-20.4,20.4 c0,11.3,9.1,20.4,20.4,20.4h100.5c11.3,0,20.4-9.1,20.4-20.4c0-11.3-9.1-20.4-20.4-20.4h-29.8v-57.7h204.2 c11.3,0,20.4-9.1,20.4-20.4V31.4C501,20.1,491.9,11,480.6,11z M460.2,361.7H51.8V51.8h408.3V361.7z"></path> <path d="m162.6,227.1c2.5,11.3 6.9,21.9 13,31.3-7,8.2-8.5,22.2-1,29.7 7.6,7.6 21.5,6 29.7-1 9.4,6.1 20,10.5 31.3,13 0.9,10.7 9.6,21.7 20.3,21.7 10.7,0 19.5-10.9 20.3-21.7 11.3-2.5 21.9-6.9 31.3-13 8.2,7 22.2,8.5 29.7,1 7.6-7.6 6-21.5-1-29.7 6.1-9.4 10.5-20 13-31.3 10.7-0.9 21.7-9.6 21.7-20.3 0-10.7-10.9-19.5-21.7-20.3-2.5-11.3-6.9-21.9-13-31.3 7-8.2 8.5-22.2 1-29.7-7.6-7.6-21.5-6-29.7,1-9.4-6.1-20-10.5-31.3-13-0.9-10.7-9.6-21.7-20.3-21.7-10.7,0-19.5,10.9-20.3,21.7-11.3,2.5-21.9,6.9-31.3,13-8.2-7-22.2-8.5-29.7-1-7.6,7.6-6,21.5 1,29.7-6.1,9.4-10.5,20-13,31.3-10.7,0.9-21.7,9.6-21.7,20.3 2.84217e-14,10.6 10.9,19.4 21.7,20.3zm93.4-70.6c27.7,0 50.3,22.6 50.3,50.3 0,27.7-22.6,50.3-50.3,50.3-27.7,0-50.3-22.5-50.3-50.3 0-27.8 22.6-50.3 50.3-50.3z"></path> </g> </g> </g></svg>
);

const cancelacionesIcon = (
  <svg fill="#f50a0a" height="200px" width="200px" version="1.1" viewBox="0 0 512 512" stroke="#f50a0a"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g> <path d="m284.9,314.8l30.6-30.6c8-8 8-20.9 0-28.9-8-8-20.9-8-28.9,0l-30.6,30.6-30.6-30.6c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l30.6,30.6-30.5,30.5c-8.4,8.9-7.9,20.8 0,28.9 4.3,4.4 17.3,10.7 28.9,0l30.5-30.5 30.5,30.5c11.5,10.7 24.6,4.4 28.9,0 7.9-8.1 8.4-20 0-28.9l-30.5-30.5z"></path> <path d="m458.5,93h-84.2v-28.2c0-11.3-9.1-20.4-20.4-20.4h-77.4v-13c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v13h-77.4c-11.3,0-20.4,9.1-20.4,20.4v28.2h-84.4c-11.3,0-20.4,9.1-20.4,20.4v339.7c0,26.4 21.5,47.9 47.9,47.9h350c26.4,0 47.9-21.5 47.9-47.9v-339.6c0-11.3-9.2-20.5-20.4-20.5zm-279.9-7.8h154.8v53.7h-154.8v-53.7zm259.5,367.9c0,3.9-3.2,7-7,7h-350.1c-3.9,0-7-3.2-7-7v-319.2h63.8v25.5c0,11.3 9.1,20.4 20.4,20.4h195.7c11.3,0 20.4-9.1 20.4-20.4v-25.5h63.8v319.2z"></path> </g> </g></svg>
);

const admisionesIcon = (
  <svg fill="#e56748" height="200px" width="200px" version="1.1" id="Layer_1" viewBox="0 0 512 512" stroke="#e56748"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M213.3,384c0-87,65.2-158.7,149.3-169.2c0-0.9,0-1.5,0-1.5c5.5-8,21.3-21.3,21.3-42.7s-21.3-42.7-21.3-53.3 C362.7,32,319.2,0,256,0c-60.5,0-106.7,32-106.7,117.3c0,10.7-21.3,32-21.3,53.3s15.2,35.4,21.3,42.7c0,0,0,21.3,10.7,53.3 c0,10.7,21.3,21.3,32,32c0,10.7,0,21.3-10.7,42.7L64,362.7C21.3,373.3,0,448,0,512h271.4C235.9,480.7,213.3,435,213.3,384z M384,256 c-70.7,0-128,57.3-128,128s57.3,128,128,128s128-57.3,128-128S454.7,256,384,256z M469.3,405.3h-64v64h-42.7v-64h-64v-42.7h64v-64 h42.7v64h64V405.3z"></path> </g></svg>

);
 
const gestionIcon = (
  <svg viewBox="0 0 48 48" id="Layer_4" version="1.1" fill="#0ced27" stroke="#0ced27"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M20.367,26.263l1.485-1.484l-2.693-2.694l-1.484,1.486c-0.864-0.572-1.828-0.999-2.858-1.267v-2.22h-4.781 v2.22c-1.053,0.272-2.039,0.711-2.917,1.302l-1.425-1.425L3,24.873l1.449,1.449c-0.554,0.849-0.97,1.793-1.23,2.8H1v4.776h2.218 c0.267,1.031,0.694,1.998,1.267,2.862L3,38.245l2.693,2.691l1.485-1.484c0.866,0.573,1.834,1.002,2.867,1.269v2.216h4.761v-2.216 c1.01-0.26,1.957-0.678,2.808-1.231l1.544,1.543l2.693-2.691l-1.521-1.522c0.594-0.883,1.034-1.876,1.306-2.934h2.215v-4.747 h-2.215C21.371,28.103,20.943,27.131,20.367,26.263z M12.426,35.428c-2.163,0-3.917-1.754-3.917-3.917s1.754-3.917,3.917-3.917 s3.917,1.754,3.917,3.917S14.589,35.428,12.426,35.428z" fill="#0ced27"></path> <path d="M42.264,26.271V24.5h-2.876v1.771h-4.426V24.5h-2.877v1.771h-4.734v0.797v2.39v3.142v0.13v1.902v1.154 v9.028V48h2.876h6.352h0.796h6.75H47v-3.187v-9.028v-1.154v-1.902v-0.13v-3.142v-2.39v-0.797H42.264z M44.124,35.785v9.028H30.227 v-9.028H44.124z M30.227,32.599v-3.142h1.858v1.549h2.877v-1.549h4.426v1.549h2.876v-1.549h1.86v3.142H30.227z" fill="#0ced27"></path> <polygon fill="#0ced27" points="36.938,11.984 36.938,13 36.938,14.083 36.938,16.5 36.938,18.084 36.938,21 40.842,21 40.842,18.084 40.842,16.5 40.842,14.083 40.842,13 40.842,11.984 40.842,9.422 31.446,0.025 28.884,0.025 4.967,0.025 4.967,17.766 8.875,17.766 8.875,5.672 8.875,4.797 8.875,3.859 27.766,3.859 28.812,3.859 28.884,3.859 28.884,4.81 28.884,5.828 28.884,11.984 31.75,11.984 36.059,11.984 "></polygon> </g> </g></svg>

);

export const InicioPage = () => {
  const menuItems = [
    { text: 'Noticias', to: '/admin/noticias', description: 'Gestión de noticias', icon: noticiasIcon },
    { text: 'Docentes', to: '/admin/docentes', description: 'Administrar docentes', icon: docentesIcon },
    { text: 'Cancelaciones', to: '/admin/cancelaciones', description: 'Manejo de cancelaciones', icon: cancelacionesIcon },
    { text: 'Admisiones', to: '/admin/admisiones', description: 'Administrar admisiones', icon: admisionesIcon },
    { text: 'Matrícula', to: '/admin/matricula', description: 'Gestión de matrículas', icon: gestionIcon },
  ];

  return (
    <AdministradorLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido Administrador
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />
      <Grid container justifyContent='center' spacing={6}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.text}>
            <NavLink to={item.to} style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-details">
                  {item.icon} {/* Mostrar el ícono SVG aquí */}
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
    </AdministradorLayout>
  );
};
