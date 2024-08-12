// import React from 'react'
import { EstudianteLayout } from "../layout/EstudianteLayout";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormularioCambioCentro,
  FormularioCambioDepartamento,
  FormularioCancelacion,
  FormularioPagoDeReposición,
} from "../components/FormulariosSolicitudes";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import {
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
export const SolicitudesPage = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  const obtenerIdEstudiante = async (id_user) => {
    try {
      const response = await axios.get(`/api/matricula/estudiante/${id_user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.id);
      return response.data.id;
    } catch (error) {
      console.error("Error fetching student ID:", error);
      throw error;
    }
  };
  const fetchSolicitudes = async () => {
    try {
      const idEstudiante = await obtenerIdEstudiante(user.id);
      const response = await axios.get(
        `/api/solicitudes/estudiantes/${idEstudiante}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsLoading(false);
      setSolicitudes(response.data);
      console.log("Solicitudes:", response.data);
    } catch (error) {
      console.error("Error fetching solicitudes:", error);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <EstudianteLayout titulo="Solicitudes">
    {/* <Box sx={{ flexGrow: 1, borderRadius:'15px', padding:'30px' , width:'100%', boxShadow:'2px 2px 10px 0px #D0D0D0', backgroundColor:'#F9F9F9' }}> */}

      <Grid container  spacing={2} sx={{ flexGrow: 1, borderRadius:'15px', padding:'20px' , width:'100%', boxShadow:'0px 0px 15px 0px #C6C6C6', backgroundColor:'#F9F9F9' }}>
        <Grid item xs={12} lg={6} sx={{ flexGrow: 1, borderRadius:'15px', padding:'20px' , width:'100%', boxShadow:'0px 0px 5px 0px #C6C6C6', backgroundColor:'#ffffff' }}>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography color={expanded === "panel1" && '#060270'} variant="h5" sx={{ width: "50%", flexShrink: 0 }}>
                        Cancelaciones Excepcionales
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormularioCancelacion fetchSolicitudes={fetchSolicitudes} />
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography color={expanded === "panel2" && '#060270'} variant="h5" sx={{ width: "50%", flexShrink: 0 }}>
                        Cambio de Carrera
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormularioCambioDepartamento fetchSolicitudes={fetchSolicitudes}/>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <Typography color={expanded === "panel3" && '#060270'} variant="h5" sx={{ width: "50%", flexShrink: 0 }}>
                        Cambio de Centro
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormularioCambioCentro fetchSolicitudes={fetchSolicitudes} />
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography color={expanded === "panel4" && '#060270'} variant="h5" sx={{ width: "50%", flexShrink: 0 }}>
                        Pago de Reposición
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormularioPagoDeReposición fetchSolicitudes={fetchSolicitudes} />
                    </AccordionDetails>
                  </Accordion>
      </Grid>

      <Divider orientation="vertical" flexItem sx={{ mx:2}} />

      <Grid display={ (isLoading || solicitudes.length == 0) && 'flex'} justifyContent={ (isLoading || solicitudes.length == 0) && 'center'} alignItems={ (isLoading || solicitudes.length == 0) && 'center'} item xs={12} lg={5.5} sx={{ flexGrow: 1, borderRadius:'15px', padding:'20px' , width:'100%', boxShadow:'0px 0px 5px 0px #C6C6C6', backgroundColor:'#ffffff', overflowX:'auto' }}>
      
      {isLoading && <CircularProgress />}
      
      {/* {solicitudes.length > 0 && ( */}
      {solicitudes.length > 0  ? (
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", backgroundColor: "#060270" }}>
                Tipo
              </TableCell>
              <TableCell sx={{ color: "white", backgroundColor: "#060270" }}>
                Estado
              </TableCell>
              <TableCell sx={{ color: "white", backgroundColor: "#060270" }}>
                Fecha Solicitud
              </TableCell>
              <TableCell sx={{ color: "white", backgroundColor: "#060270" }}>
                Respuesta
              </TableCell>
              <TableCell sx={{ color: "white", backgroundColor: "#060270" }}>
                Fecha Respuesta
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell>{solicitud.tipo_solicitud.nombre}</TableCell>
                <TableCell>
                <Chip variant="outlined" color={solicitud.estado == 'aceptada' ? 'success' : solicitud.estado == 'rechazada' ? 'error':'default' } label = {solicitud.estado} />

                </TableCell>

                <TableCell>
                  {new Date(solicitud.fecha_solicitud).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  {solicitud.respuesta
                    ? solicitud.respuesta
                    : "Sin respuesta aún"}
                </TableCell>
                <TableCell>
                  {solicitud.fecha_respuesta
                    ? (new Date(solicitud.fecha_respuesta).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }))
                    : "Sin respuesta aún"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        ):(
          <Typography variant="h6">{!isLoading && 'No hay solicitudes'}</Typography>
        ) 
      }

      </Grid>
      </Grid>
    </EstudianteLayout>
  );
};
