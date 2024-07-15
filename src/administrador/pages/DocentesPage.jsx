import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Switch,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { AdministradorLayout } from "../layout/AdministradorLayout";

export const DocentesPage = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [docentes, setDocentes] = useState([]);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [centros, setCentros] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/centros"
        );
        setCentros(response.data);
      } catch (error) {
        console.error("Error al obtener los centros:", error);
      }
    };
    fetchCentros();
  }, []);

  useEffect(() => {
    const fetchDocentes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/empleados"
        );
        setDocentes(response.data);
        handleLimpiar();
      } catch (error) {
        console.error("Error al obtener los docentes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocentes();
  }, []);

  
  const onSubmit = async (formData) => {
    setLoading(true);
  
    // Construye el array de roles
    const roles = [];
    if (formData.Docente) roles.push("Docente");
    if (formData.Coordinador) roles.push("Coordinador");
    if (formData.JefeDepartamento) roles.push("JefeDepartamento");
  
    // Construye el objeto de datos a enviar
    const dataToSend = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      identidad: formData.identidad,
      telefono: formData.telefono,
      correo: formData.correo,
      contrasena: formData.contrasena,
      roles: JSON.stringify(roles), // Convierte el array de roles a una cadena JSON
      id_Centros: formData.id_Centros,
    };
  
    // Crea un FormData
    const formDataToSend = new FormData();
  
    // Agrega campos al FormData
    Object.keys(dataToSend).forEach((key) => {
      formDataToSend.append(key, dataToSend[key]);
    });
  
    // Agrega imagen al FormData si existe
    if (selectedImage) {
      formDataToSend.append("imagen", selectedImage);
    }
  
  
    try {
      // Realiza la solicitud POST
      const response = await axios.post(
        "http://localhost:3000/api/admin/empleados",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" } // Asegúrate de que el encabezado esté configurado
        }
      );
  
      if (response.status === 201) {
        setSnackbarMessage("Docente creado exitosamente");
        setSnackbarSeverity("success");
        // Refresca la lista de docentes
        const docentesResponse = await axios.get("http://localhost:3000/api/admin/empleados");
        setDocentes(docentesResponse.data);
        reset();
      } else {
        setSnackbarMessage("Error al crear el docente");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error al crear el docente";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };
  
  const handleChangeEstado = async (numeroEmpleado, nuevoEstado) => {
    setLoading(true);
    try {
      const docente = docentes.find(
        (docente) => docente.numeroEmpleado === numeroEmpleado
      );
      console.log("Docente encontrado:", docente);
      if (!docente) {
        throw new Error(`Docente con número ${numeroEmpleado} no encontrado`);
      }

      // Validar que todos los datos necesarios están definidos

      const updatedDocente = {
        estado: nuevoEstado,
        nombre: docente.Nombre,
      };

      console.log("Datos enviados:", updatedDocente);
      console.log("Enviando Actualizacion");
      const response = await axios.put(
        `http://localhost:3000/api/admin/empleados/${numeroEmpleado}`,
        updatedDocente
      );
      console.log("Response:", response);
      if (response.status === 200) {
        setDocentes((prevDocentes) =>
          prevDocentes.map((d) =>
            d.numeroEmpleado === numeroEmpleado
              ? { ...d, estado: nuevoEstado }
              : d
          )
        );
        setSnackbarMessage("Empleado actualizado exitosamente");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Error al actualizar el empleado");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error(
        "Error al actualizar el empleado:",
        error.response ? error.response.data : error.message
      );
      setSnackbarMessage("Error al actualizar el empleado");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Imagen seleccionada:", file);
      setSelectedImage(file);
    } else {
      console.log("No se ha seleccionado ninguna imagen.");
      setSelectedImage(null);
    }
  };

  const handleLimpiar = () => {
    reset();
    setSelectedImage(null);
    setDocenteSeleccionado(null);
    document.getElementById("upload-image").value = "";
  };

  const columns = [
    { field: "numeroEmpleado", headerName: "Numero Empleado", width: 150 },
    { field: "Nombre", headerName: "Nombre", width: 150 },
    { field: "Apellido", headerName: "Apellido", width: 150 },
    { field: "Correo", headerName: "Correo", width: 200 },
    { field: "Telefono", headerName: "Telefono", width: 120 },
    { field: "Identidad", headerName: "Identidad", width: 150 },
    { field: "Centro", headerName: "Centro", width: 150 },
    { field: "roles", headerName: "Roles", width: 200 },
    {
      field: "Imagen",
      headerName: "Imagen",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.value}
          style={{ width: "auto", height: "100%" }}
        />
      ),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 90,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={(event) =>
            handleChangeEstado(params.row.numeroEmpleado, event.target.checked)
          }
          disabled={params.row.roles.includes("Administrador")}
        />
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 80,
      renderCell: (params) => (
        <Grid container justifyContent="center">
          <IconButton
            color="primary"
            onClick={() => {
              setDocenteSeleccionado(params.row);
              setShowForm(true);
            }}
            disabled={
              docenteSeleccionado &&
              docenteSeleccionado.numeroEmpleado === params.row.numeroEmpleado
            }
          >
            <EditIcon />
          </IconButton>
        </Grid>
      ),
    },
  ];


  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <AdministradorLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Docentes
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Button variant="contained" color="primary" onClick={handleToggleForm}>
        {showForm ? "Cancelar" : "Nuevo Docente"}
      </Button>

      {showForm && (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            maxWidth: "800px",
            margin: "auto",
            padding: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            {docenteSeleccionado ? "Actualizar Docente" : "Agregar Docente"} 
          </Typography>
          <div>
            <FormControlLabel
              control={<Checkbox {...register("Docente")} defaultChecked />}
              label="Docente"
              sx={{ pointerEvents: "none", opacity: 0.5 }}
            />
            <FormControlLabel
              control={<Checkbox {...register("Coordinador")} />}
              label="Coordinador"
              disabled={watch("JefeDepartamento")}
            />
            <FormControlLabel
              control={<Checkbox {...register("JefeDepartamento")} />}
              label="Jefe de Departamento"
              disabled={watch("Coordinador")}
            />
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                {...register("apellido", {
                  required: "El apellido es obligatorio",
                })}
                error={!!errors.apellido}
                helperText={errors.apellido?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identidad"
                {...register("identidad", {
                  required: "La identidad es obligatoria",
                })}
                error={!!errors.identidad}
                helperText={errors.identidad?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                })}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo"
                {...register("correo", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo no es válido",
                  },
                })}
                error={!!errors.correo}
                helperText={errors.correo?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Contraseña"
                {...register("contrasena", {
                  required: "La contraseña es obligatoria",
                })}
                error={!!errors.contrasena}
                helperText={errors.contrasena?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirmar contraseña"
                type="password"
                variant="outlined"
                fullWidth
                {...register("confirmarContrasena", {
                  required: "La confirmación de contraseña es obligatoria",
                  validate: (value) =>
                    value === watch("contrasena") ||
                    "Las contraseñas no coinciden",
                })}
                error={!!errors.confirmarContrasena}
                helperText={errors.confirmarContrasena?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.id_Centros}>
                <InputLabel id="id_Centro-label">Elige el centro</InputLabel>
                <Select
                  id="id_Centro"
                  labelId="id_Centro-label"
                  {...register("id_Centros", {
                    required: "El Centro es obligatorio",
                  })}
                  defaultValue=""
                  label="Elige el centro"
                >
                  <MenuItem value="" >
                    Elige el centro
                  </MenuItem>
                  {centros.map((centro) => (
                    <MenuItem key={centro.id_Centros} value={centro.id_Centros}>
                      {centro.Nombre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.id_Centros && (
                  <FormHelperText>{errors.id_Centros.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="upload-image"
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <Button variant="outlined" color="primary" component="span">
                  Subir Imagen
                </Button>
              </label>
              {selectedImage && (
                <Typography
                  variant="body2"
                  sx={{ marginLeft: 2, display: "inline" }}
                >
                  {selectedImage.name}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color={docenteSeleccionado ? "warning" : "primary"}
              disabled={loading}
            >
              {docenteSeleccionado ? "Actualizar Docente" : "Agregar Docente"}
            </Button>
            {docenteSeleccionado && (
              <Button
                variant="contained"
                color="inherit"
                onClick={handleLimpiar}
                sx={{ ml: 2 }}
              >
                Cancelar
              </Button>
            )}
          </Grid>

          <Backdrop
            open={loading}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      )}
      <Box mt={4} sx={{ marginTop: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Lista de Docentes
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={docentes}
            columns={columns}
            pageSize={5}
            autoHeight
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </div>
      </Box>
    </AdministradorLayout>
  );
};


