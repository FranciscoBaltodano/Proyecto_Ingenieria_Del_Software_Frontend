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
} from "../components/FormulariosSolicitudes";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
export const SolicitudesPage = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
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
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const idEstudiante = await obtenerIdEstudiante(user.id);
        const response = await axios.get(
          `/api/solicitudes/estudiantes/${idEstudiante}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSolicitudes(response.data);
        console.log("Solicitudes:", response.data);
      } catch (error) {
        console.error("Error fetching solicitudes:", error);
      }
    };
    fetchSolicitudes();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <EstudianteLayout titulo="Solicitudes">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            Cancelaciones Ecepcionales
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormularioCancelacion />
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
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            Cambio de Departamento
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormularioCambioDepartamento />
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
          <Typography sx={{ width: "50%", flexShrink: 0 }}>
            Cambio de centro
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormularioCambioCentro />
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      {solicitudes.length > 0 && (
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
                <TableCell>{solicitud.estado}</TableCell>
                <TableCell>{solicitud.fecha_solicitud}</TableCell>
                <TableCell>
                  {solicitud.respuesta
                    ? solicitud.respuesta
                    : "Sin respuesta aún"}
                </TableCell>
                <TableCell>
                  {solicitud.fecha_respuesta
                    ? solicitud.fecha_respuesta
                    : "Sin respuesta aún"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </EstudianteLayout>
  );
};
