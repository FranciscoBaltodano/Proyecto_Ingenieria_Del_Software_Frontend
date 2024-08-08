import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  FormHelperText,
  Grid,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { useAuth } from "../../contexts/AuthContext";
import { id } from "date-fns/locale";
import axios from "axios";
import { ForwardRounded } from "@mui/icons-material";

export const FormularioCambioDepartamento = () => {
  const { user, token } = useAuth();
  const [departamentos, setDepartamentos] = useState([]);
  const [nombreDepartamento, setNombreDepartamento] = useState("");

    // estados para los errores y mensajes del snackbar   
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const obtenerIdEstudiante = async (id_user) => {
    try {
      const response = await axios.get(`/api/matricula/estudiante/${id_user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.id;
    } catch (error) {
      console.error("Error fetching student ID:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get("/api/admin/departamentos");
        const departamentos = response.data.filter(
          (departamento) =>
            departamento.id_Departamento !== user.id_departamento
        );

        setDepartamentos(departamentos);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };
    fetchDepartamentos();
  }, []);

  // Función para manejar el submit del formulario
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const dataParaEnviar = {
        id_estudiante: await obtenerIdEstudiante(user.id),
        id_tipo_solicitud: 1,
        detalles: {
          ...data,
          id_departamento_actual: user.id_departamento,
          departamento_deseado: nombreDepartamento,
        },
      };
      const response = await axios.post("/api/solicitudes", dataParaEnviar, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage("Solicitud enviada exitosamente");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setSnackbarMessage("Error al enviar la solicitud");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  // Manejo de cambios en el select
  const handleSelectChange = (event) => {
    setValue("id_departamento_deseado", event.target.value);
    console.log(event.target.value);
    const departamentoSeleccionado = departamentos.find(
      (departamento) => departamento.id_Departamento === event.target.value
    );
    setNombreDepartamento(departamentoSeleccionado.Nombre);
    console.log(departamentoSeleccionado.Nombre);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 800,
        margin: "auto",
        padding: 2,
      }}
    >
        {loading && <LinearProgress />}
      <Grid container display="flex" spacing={2}>
        <Grid item xs={12} md={5.5}>
          {/* Input deshabilitado */}
          <TextField
            fullWidth
            label="Departamento actual"
            {...register("departamento_actual")}
            defaultValue={user.departamento}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid
          alignItems="center"
          justifyContent="center"
          display="flex"
          item
          md={1}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <ForwardRounded color="primary" fontSize="large" sx={{ mb: 1 }} />
        </Grid>

        <Grid item xs={12} md={5.5}>
          {/* Select */}
          <FormControl fullWidth error={!!errors.id_departamento_deseado}>
            <InputLabel id="select-input-label">
              Seleccionar departamento
            </InputLabel>
            <Select
              labelId="select-input-label"
              label="Seleccionar departamento"
              {...register("id_departamento_deseado", {
                required: "El departamento es obligatorio",
              })}
              value={watch("id_departamento_deseado") || ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">Ninguno</MenuItem>
              {departamentos.map((departamento) => (
                <MenuItem
                  key={departamento.id_Departamento}
                  value={departamento.id_Departamento}
                >
                  {departamento.Nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.id_departamento_deseado?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      {/* TextField multiline */}
      <TextField
        label="Motivo"
        {...register("motivo", { required: "El motivo es obligatorio" })}
        multiline
        rows={4}
        variant="outlined"
        error={!!errors.motivo}
        helperText={errors.motivo?.message}
      />

      {/* Botón de submit */}
      <Button type="submit" variant="contained" disabled={loading} color="primary">
        Enviar
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const FormularioCambioCentro = () => {
  const { user, token } = useAuth();
  const [centros, setCentros] = useState([]);
  const [nombreCentro, setNombreCentro] = useState("");
    // estados para los errores y mensajes del snackbar 
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const obtenerIdEstudiante = async (id_user) => {
    try {
      const response = await axios.get(`/api/matricula/estudiante/${id_user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.id;
    } catch (error) {
      console.error("Error fetching student ID:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await axios.get("/api/admin/centros");
        const centros = response.data.filter(
          (centro) => centro.id_Centros !== user.id_centro
        );
        setCentros(centros);
      } catch (error) {
        console.error("Error al obtener los centros:", error);
      }
    };

    fetchCentros();
  }, []);

  // Función para manejar el submit del formulario
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const dataParaEnviar = {
        id_estudiante: await obtenerIdEstudiante(user.id),
        id_tipo_solicitud: 3,
        detalles: {
          ...data,
          id_centro_actual: user.id_centro,
          centro_deseado: nombreCentro,
        },
      };
      const response = await axios.post("/api/solicitudes", dataParaEnviar, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage("Solicitud enviada exitosamente");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setSnackbarMessage("Error al enviar la solicitud");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  // Manejo de cambios en el select
  const handleSelectChange = (event) => {
    setValue("id_centro_deseado", event.target.value);
    console.log(event.target.value);
    const centroSeleccionado = centros.find(
      (centro) => centro.id_Centros === event.target.value
    );
    setNombreCentro(centroSeleccionado.Nombre);
    console.log(centroSeleccionado.Nombre);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 800,
        margin: "auto",
        padding: 2,
      }}
    >
        {loading && <LinearProgress />}
      <Grid container display="flex" spacing={2}>
        <Grid item xs={12} md={5.5}>
          {/* Input deshabilitado */}
          <TextField
            fullWidth
            label="Centro actual"
            {...register("centro_actual")}
            defaultValue={user.centro}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid
          alignItems="center"
          justifyContent="center"
          display="flex"
          item
          md={1}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <ForwardRounded color="primary" fontSize="large" sx={{ mb: 1 }} />
        </Grid>

        <Grid item xs={12} md={5.5}>
          {/* Select */}
          <FormControl fullWidth error={!!errors.id_centro_deseado}>
            <InputLabel id="select-input-label">Seleccionar centro</InputLabel>
            <Select
              labelId="select-input-label"
              label="Seleccionar centro"
              {...register("id_centro_deseado", {
                required: "El centro es obligatorio",
              })}
              value={watch("id_centro_deseado") || ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">Ninguno</MenuItem>
              {centros.map((centro) => (
                <MenuItem key={centro.id_Centros} value={centro.id_Centros}>
                  {centro.Nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.id_centro_deseado?.message}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      {/* TextField multiline */}
      <TextField
        label="Motivo"
        {...register("motivo", { required: "El motivo es obligatorio" })}
        multiline
        rows={4}
        variant="outlined"
        error={!!errors.motivo}
        helperText={errors.motivo?.message}
      />

      {/* Botón de submit */}
      <Button type="submit" variant="contained" disabled={loading} color="primary">
        Enviar
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const FormularioCancelacion = () => {
    const [asignaturas, setAsignaturas] = useState([]);
    const { user, token } = useAuth();

    useEffect(() => {
        if (user && user.id) {
            fetchAsignaturasMatriculadas(user.id);
        }
    }, [user]);
    const fetchAsignaturasMatriculadas = async (idEstudiante) => {
        try {
            const response = await axios.get(`/api/matricula/estudiantes/${idEstudiante}/asignatura`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAsignaturas(response.data);
        } catch (error) {
            console.error('Error fetching asignaturas matriculadas:', error);
        }
    };

  return <div>  <TableContainer component={Paper}>
               
  <Table>
  <TableHead>
      <TableRow>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>Cod.</TableCell>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>Asignatura</TableCell>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>Sección</TableCell>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>HI</TableCell>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>HF</TableCell>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>Días</TableCell>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>Edificio</TableCell>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>Aula</TableCell>
        <TableCell sx={{ color: 'white', backgroundColor: '#2196f3' }}>UV</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {asignaturas.map((asignatura) => (
        <TableRow key={asignatura.id_matricula}>
          <TableCell>{asignatura.Secciones.Asignaturas.codigo}</TableCell>
          <TableCell>{asignatura.Secciones.Asignaturas.nombre}</TableCell>
          <TableCell>{asignatura.Secciones.Hora_inicio}</TableCell>
          <TableCell>{asignatura.Secciones.Hora_inicio}</TableCell>
          <TableCell>{asignatura.Secciones.Hora_Final}</TableCell>
          <TableCell>{asignatura.Secciones.Dias.map(dia => dia.Dia.Nombre).join(', ')}</TableCell>
          <TableCell>{asignatura.Secciones.Edificios.Nombre}</TableCell>
          <TableCell>{asignatura.Secciones.Aula.Nombre}</TableCell>
          <TableCell>{asignatura.Secciones.Asignaturas.uv}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer></div>;
};

