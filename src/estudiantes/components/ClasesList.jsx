import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";


import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Skeleton,
} from "@mui/material";

export const ClasesList = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchAsignaturasMatriculadas();
    }
  }, [user]);

  const fetchAsignaturasMatriculadas = async () => {
    try {
      const response = await axios.get(
        `/api/matricula/estudiantes/${user.id}/asignatura`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setAsignaturas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching asignaturas matriculadas:", error);
    }
  };

  return (
    <>
      <style>{estilosDeLasClases}</style>

      {loading && 
        <Grid container >
            <Grid item  xs={12}  sm={5.7}  md={5.7} mb='20px' mr='20px' sx={{boxShadow:'2px 2px 10px 0px #D0D0D0', borderRadius:'10px', padding:'10px' }}>
                <Skeleton variant="rectangular" height='60px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Grid container display='flex' direction='row-reverse' sx={{backgroundColor:'white'}}>
                    <Skeleton variant="text" width='40%' />
                </Grid>
            </Grid>
            <Grid item  xs={12}  sm={5.7}  md={5.7} mb='20px' mr='20px' sx={{boxShadow:'2px 2px 10px 0px #D0D0D0', borderRadius:'10px', padding:'10px' }}>
                <Skeleton variant="rectangular" height='60px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Grid container display='flex' direction='row-reverse' sx={{backgroundColor:'white'}}>
                    <Skeleton variant="text" width='40%' />
                </Grid>
            </Grid>
            <Grid item  xs={12}  sm={5.7}  md={5.7} mb='20px' mr='20px' sx={{boxShadow:'2px 2px 10px 0px #D0D0D0', borderRadius:'10px', padding:'10px' }}>
                <Skeleton variant="rectangular" height='60px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Grid container display='flex' direction='row-reverse' sx={{backgroundColor:'white'}}>
                    <Skeleton variant="text" width='40%' />
                </Grid>
            </Grid>
            <Grid item  xs={12}  sm={5.7}  md={5.7} mb='20px' mr='20px' sx={{boxShadow:'2px 2px 10px 0px #D0D0D0', borderRadius:'10px', padding:'10px' }}>
                <Skeleton variant="rectangular" height='60px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Skeleton variant="text" width='40%' height='40px' />
                <Grid container display='flex' direction='row-reverse' sx={{backgroundColor:'white'}}>
                    <Skeleton variant="text" width='40%' />
                </Grid>
            </Grid>
        </Grid>
        }
          {/* <Grid display='flex' item xs={12} md={8.5} sx={{ borderRadius: '15px',boxShadow:'2px 2px 10px 0px #D0D0D0', padding:'30px',  backgroundColor:'#FCFDFD' }} > */}

        {
          !loading && asignaturas.length === 0 && (
            <Grid container display='flex' justifyContent="center" alignItems='center' sx={{ padding:'30px', mb:'100px'  }} >
            <Grid container maxWidth='400px' justifyContent="center" sx={{ borderRadius: '15px',boxShadow:'2px 2px 10px 0px #D0D0D0', padding:'30px', pt:'20px', backgroundColor:'#FCFDFD' }}>
            <Typography variant="h5" sx={{ mt: 3 }}>
              No tienes clases matriculadas
            </Typography>

            </Grid>
            </Grid>
          )
        }

      <Grid container spacing={3}>
        {asignaturas.map((asignatura) => (
          <Grid
            className="card"
            item
            xs={12}
            sm={6}
            md={6}
            key={asignatura.id_matricula}
            component={Link}
            to={`/estudiantes/clase/${asignatura.id_seccion}`}

          >
            <Card className="card1" sx={{ paddingRight : 2 ,boxShadow:'2px 2px 10px 0px #D0D0D0'}} >
              <div className="go-corner" href="#">
                <div className="go-arrow">→</div>
              </div>
              <CardContent>
                <Typography  mb={2} variant="h6">
                  {asignatura.Secciones.Asignaturas.codigo}{" "}
                  {asignatura.Secciones.Asignaturas.nombre}
                </Typography>
                <Chip sx={{ mb: 1}} className="chipAula" label={`Aula: ${asignatura.Secciones.Aula.Nombre}`} variant="outlined" color="warning" />
                <br />
                <Chip sx={{ mb: 1}} className="chipEdificio" label={`Edificio: ${asignatura.Secciones.Edificios.Nombre}`} variant="outlined" color="warning" />
                <br />
                <Chip sx={{ mb: 1}} className="chipHorario" label={`Horario: ${asignatura.Secciones.Hora_inicio} - ${asignatura.Secciones.Hora_Final}` } variant="outlined" />
              </CardContent>
              <Grid direction="row-reverse" container display="flex" className="dias">
                <Typography color="textSecondary">
                  {asignatura.Secciones.Dias.map((dia) =>
                    dia.Dia.Nombre.slice(0, 2)
                  ).join(", ")}
                </Typography>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>


    </>
  );
};

const estilosDeLasClases = `
  /* From Uiverse.io by Prince4fff */ 
  .card p {
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    color: #666;
  }

  .card p.small {
    font-size: 14px;
  }
  
.chipAula {
  color: #03A9F4; /* Azul Cielo */
  border-color: #03A9F4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chipEdificio {
  color: #0678ae; /* Azul Claro */
  border-color: #0678ae;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.chipHorario {
  color: #0288D1; /* Azul Marino */
  border-color: #0288D1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card1:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}


/* Estilo del go-corner y go-arrow */
.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  top: 0;
  right: 0;
  background-color: #66aaff;
  border-radius: 0 4px 0 32px;
  transition: background-color 0.3s ease;
}

.card1:hover .go-corner {
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.go-arrow {
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans;
  transition: color 0.3s ease;
}

.go-corner:hover {
  background-color: #79d3ff;
}

.go-arrow:hover {
  color: #e0e0e0;
}

/* Estilo de la tarjeta */
.card1 {
  display: block;
  position: relative;
  background-color: #f2f8f9;
  border-radius: 10px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card1:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card1:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: linear-gradient(45deg, 
    #cce4ff 0%,   /* Azul muy claro */
    #99c2ff 25%,  /* Azul claro */
    #66aaff 50%,  /* Azul medio */
    #4a90e2 75%,  /* Azul intenso */
    #0073e6 100%  /* Azul oscuro */
  );
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.45s ease-out;
}


.card1:hover:before {
  transform: scale(60);
}
  
.card1:hover .chipHorario ,
.card1:hover .chipAula,
.card1:hover .chipEdificio {
    transition: all 0.3s ease-out;
    border-color: rgba(255, 255, 255);
    background-color: #66aaff;
    color: rgba(255, 255, 255);
  }


/* Estilo del texto dentro de la tarjeta al hacer hover */
.card1:hover h6,
.card1:hover p {
  color: #fff;
  transition: color 0.3s ease;
}

`;
