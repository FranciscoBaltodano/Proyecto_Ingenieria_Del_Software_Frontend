import React, { useEffect, useState } from "react";
import { EstudianteLayout } from "../layout/EstudianteLayout";
import Matricula from "../components/Matricula";
import { ClaseMatriculadas } from "../components/ClaseMatriculadas";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


export const ClasesPage = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const { user, token } = useAuth();

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
      setAsignaturas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching asignaturas matriculadas:", error);
    }
  };

  return (
    <EstudianteLayout titulo="Clases">
      <style>{estilosDeLasClases}</style>

      <Grid container spacing={3}>
        {asignaturas.map((asignatura) => (
          <Grid
            className="card"
            item
            xs={12}
            sm={6}
            md={4}
            key={asignatura.id_matricula}
          >
            <Card className="card1">
              <div className="go-corner" href="#">
                <div className="go-arrow">→</div>
              </div>
              <CardContent>
                <Typography mb={2} variant="h6">
                  {asignatura.Secciones.Asignaturas.codigo}{" "}
                  {asignatura.Secciones.Asignaturas.nombre}
                </Typography>
                <Typography mb={1} color="textSecondary">
                  Aula: {asignatura.Secciones.Aula.Nombre}
                </Typography>
                <Typography mb={1} color="textSecondary">
                  Edificio: {asignatura.Secciones.Edificios.Nombre}
                </Typography>
                <Typography mb={1} color="textSecondary">
                  Horario: {asignatura.Secciones.Hora_inicio} -{" "}
                  {asignatura.Secciones.Hora_Final}
                </Typography>
              </CardContent>
              <Grid direction="row-reverse" display="flex" className="dias">
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
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider> */}
    </EstudianteLayout>
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
    background-color: #00208c;
    border-radius: 0 4px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
  }

  .card1 {
    display: block;
    position: relative;
    background-color: #f2f8f9;
    border-radius: 4px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
  }

  .card1:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00208c;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.45s ease-out;
  }

  .card1:hover:before {
    transform: scale(50);
  }

  .card1:hover p {
    transition: all 0.3s ease-out;
    color: rgba(255, 255, 255, 0.8);
  }

  .card1:hover h6 {
    transition: all 0.3s ease-out;
    color: #ffffff;
  }

  .card1:hover h3 {
    transition: all 0.3s ease-out;
    color: #fff;
  }
`;
