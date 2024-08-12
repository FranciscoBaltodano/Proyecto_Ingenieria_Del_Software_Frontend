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
  Divider,
} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Checkbox, FormControlLabel, Typography,Input } from '@mui/material';

import { useAuth } from "../../contexts/AuthContext";
import { id } from "date-fns/locale";
import axios from "axios";
import { Delete, ForwardRounded, PictureAsPdf } from "@mui/icons-material";




export const FormularioCancelacion = ({ fetchSolicitudes }) => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [selectedAsignaturas, setSelectedAsignaturas] = useState([]);
  const [file, setFile] = useState(null); // Estado para manejar el archivo
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const handleCheckboxChange = (event, asignatura) => {
    if (event.target.checked) {
      setSelectedAsignaturas(prev => [...prev, asignatura]);
    } else {
      setSelectedAsignaturas(prev => prev.filter(a => a.id_matricula !== asignatura.id_matricula));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      if(file.size > 500000){
        setSnackbarMessage('El archivo PDF seleccionado es muy grande, por favor seleccione un archivo PDF menor a 500KB.');
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setFile( null);
        return;
      }
      setFile(file);
      setSnackbarSeverity("success");
      setSnackbarMessage('Archivo PDF seleccionado.');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Por favor, seleccione un archivo PDF.');
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setFile(null);
    }
  };

  const handleClearFile = () => {
    setFile(null);
  };

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

  const onSubmit = async (data) => {
    
    if (!file) {
      setSnackbarMessage('Por favor, seleccione un archivo PDF.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Abre el Snackbar
      return;
    }


    setLoading(true);
    const asignaturasSeleccionadas = selectedAsignaturas.map(asignatura => ({
      'nombre': asignatura.Secciones.Asignaturas.nombre,
      'id_seccion': asignatura.id_seccion,
    }));

    // Construye el objeto de datos a enviar
    const dataToSend = {
      id_estudiante: await obtenerIdEstudiante(user.id),
      id_tipo_solicitud: 2,
      ...data,
      secciones_a_cancelar: JSON.stringify(asignaturasSeleccionadas),
    };

    console.log('Datos a enviar:', dataToSend);
    
    // Crea un FormData
    const formDataToSend = new FormData();

    // Agrega campos al FormData
    Object.keys(dataToSend).forEach((key) => {
      formDataToSend.append(key, dataToSend[key]);
    });

    // Agrega archivo al FormData si existe
    if (file) {
      formDataToSend.append("documento_respaldo", file);
    }

    try {
      // Realiza la solicitud POST
      const response = await axios.post("/api/solicitudes", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }, // Asegúrate de que el encabezado esté configurado
      });

      setSnackbarMessage("Solicitud enviada exitosamente");
      setSnackbarSeverity("success");
      fetchSolicitudes(); 
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setSnackbarMessage("Error al enviar la solicitud");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
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

      <Divider sx={{ mb: 1 }} />
      <Typography variant="h6" gutterBottom>Selecciona las asignaturas que deseas cancelar</Typography>
      <Grid container direction='column' display='flex'>
        {asignaturas.map((asignatura) => (
          <FormControlLabel
            key={asignatura.id_matricula}
            control={
              <Checkbox
                onChange={(event) => handleCheckboxChange(event, asignatura)}
              />
            }
            label={`${asignatura.Secciones.Asignaturas.codigo} - ${asignatura.Secciones.Asignaturas.nombre}`}
          />
        ))}
      </Grid>

      {selectedAsignaturas.length > 0 && (
        <div>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6" gutterBottom>Asignaturas Seleccionadas</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cod.</TableCell>
                  <TableCell>Asignatura</TableCell>
                  <TableCell>Sección</TableCell>
                  <TableCell>HI</TableCell>
                  <TableCell>HF</TableCell>
                  <TableCell>Días</TableCell>
                  <TableCell>Edificio</TableCell>
                  <TableCell>Aula</TableCell>
                  <TableCell>UV</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedAsignaturas.map((asignatura) => (
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
          </TableContainer>


      <Divider sx={{ my: 1 }} />
      <Typography variant="h6" gutterBottom>Justificación</Typography>

      <Grid container display="flex" spacing={2}>

        <Grid item xs={12} md={4} sx={{display:'flex', alignItems:'center', justifyContent:'center'}} >
          <FormControl >
            <label htmlFor="file-upload">
              <Input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                sx={{ display: 'none' }}
              />
              <Button variant="contained" color="primary" component="span" sx={{mr:'10px'}}>
                { file ? file.name: 'Subir PDF'}
                <PictureAsPdf sx={{ ml: 1 }} />
              </Button>
            </label>
          </FormControl>
          {file && (
            <Button color="error" variant="outlined" onClick={handleClearFile}><Delete/></Button>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            label="Motivo"
            {...register("motivo_cancelacion", { required: "El motivo es obligatorio" })}
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            error={!!errors.motivo_cancelacion}
            helperText={errors.motivo_cancelacion?.message}
          />
        </Grid>
        <Grid mt={2} container direction='row-reverse'  display='flex'>
          <Button type="submit" variant="contained" disabled={loading} color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>

      </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
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



















export const FormularioCambioDepartamento = ({ fetchSolicitudes }) => {
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
      fetchSolicitudes(); 
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
            label="Carrera actual"
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
              Seleccionar carrera
            </InputLabel>
            <Select
              labelId="select-input-label"
              label="Seleccionar carrera"
              {...register("id_departamento_deseado", {
                required: "La carrera es obligatoria",
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
        autoHideDuration={2000}
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




















export const FormularioCambioCentro = ({ fetchSolicitudes }) => {
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
      fetchSolicitudes(); 
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
        autoHideDuration={2000}
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




















export const FormularioPagoDeReposición = ({ fetchSolicitudes }) => {
  const [file, setFile] = useState(null); // Estado para manejar el archivo
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    
    if (file && file.type === 'application/pdf') {
      if(file.size > 500000){
        setSnackbarMessage('El archivo PDF seleccionado es muy grande, por favor seleccione un archivo PDF menor a 500KB.');
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setFile( null);
        return;
      }
      console.log('tamaño PDF seleccionado:', file.size);
      setFile(file);
      setSnackbarSeverity("success");
      setSnackbarMessage('Archivo PDF seleccionado.');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Por favor, seleccione un archivo PDF.');
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setFile(null);
    }
  };

  const handleClearFile = () => {
    setFile(null);
  };

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

  const onSubmit = async (data) => {
    
    if (!file) {
      setSnackbarMessage('Por favor, seleccione un archivo PDF.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Abre el Snackbar
      return;
    }


    setLoading(true);


    // Construye el objeto de datos a enviar
    const dataToSend = {
      id_estudiante: await obtenerIdEstudiante(user.id),
      id_tipo_solicitud: 4,
      ...data,
    };

    console.log('Datos a enviar:', dataToSend);
    
    // Crea un FormData
    const formDataToSend = new FormData();

    // Agrega campos al FormData
    Object.keys(dataToSend).forEach((key) => {
      formDataToSend.append(key, dataToSend[key]);
    });

    // Agrega archivo al FormData si existe
    if (file) {
      formDataToSend.append("documento_respaldo", file);
    }

    try {
      // Realiza la solicitud POST
      const response = await axios.post("/api/solicitudes", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }, // Asegúrate de que el encabezado esté configurado
      });

      setSnackbarMessage("Solicitud enviada exitosamente");
      setSnackbarSeverity("success");
      fetchSolicitudes(); 
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setSnackbarMessage("Error al enviar la solicitud");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
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

      <Grid container display="flex" direction='column' spacing={2}>

        <Grid item xs={12} md={4} sx={{display:'flex' ,alignItems:'center', justifyContent:'center'}} >
          <FormControl >
            <label htmlFor="file-upload">
              <Input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                sx={{ display: 'none' }}
              />
              <Button variant="contained" color="primary" component="span" sx={{mr:'10px'}}>
                { file ? file.name: 'Subir Boleta de Pago'}
                <PictureAsPdf sx={{ ml: 1 }} />
              </Button>
            </label>
          </FormControl>
          {file && (
            <Button color="error" variant="outlined" onClick={handleClearFile}><Delete/></Button>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            label="Motivo"
            {...register("motivo_cancelacion", { required: "El motivo es obligatorio" })}
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            error={!!errors.motivo_cancelacion}
            helperText={errors.motivo_cancelacion?.message}
          />
        </Grid>
        <Grid mt={2} container direction='row-reverse'  display='flex'>
          <Button type="submit" variant="contained" disabled={loading} color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
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

