import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, TextField, Typography, Snackbar, Alert, Backdrop, CircularProgress, Switch, FormControlLabel, FormHelperText, Checkbox, Divider, InputLabel, MenuItem, FormControl, Select, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { AdministradorLayout } from "../layout/AdministradorLayout";
import { esESLocaleText } from "../../components/esESLocaleText";

export const DocentesPage = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm();

  // Estados para el manejo de los datos de la página
  const [docentes, setDocentes] = useState([]);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [centros, setCentros] = useState([]);
  const centroSelectRef = useRef(null);
  const [isCoordinador, setIsCoordinador] = useState(false);
  const [isJefeDepartamento, setIsJefeDepartamento] = useState(false);

  // Estados para el manejo de la carga y visualización de mensajes
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (docenteSeleccionado) {
      console.log("Docente seleccionado:", docenteSeleccionado);
      console.log(departamentos);
      console.log(centros);

      setValue("nombre", docenteSeleccionado.Nombre);
      setValue("apellido", docenteSeleccionado.Apellido);
      setValue("identidad", docenteSeleccionado.Identidad);
      setValue("telefono", docenteSeleccionado.Telefono);
      setValue("id_Centros", docenteSeleccionado.CentroId);
      setValue("id_Departamento", docenteSeleccionado.DepartamentoId);
            setValue("Docente", true);
      setIsCoordinador(docenteSeleccionado.roles.includes("Coordinador"));
      setIsJefeDepartamento(docenteSeleccionado.roles.includes("JefeDepartamento"));
      setSelectedImage(null);
    } else {
      reset();
      setSelectedImage(null);
    }
  }, [docenteSeleccionado, setValue, reset]);
  const handleCoordinadorChange = (event) => {
    const { checked } = event.target;
    setIsCoordinador(checked);
    if (checked) {
      setIsJefeDepartamento(false);
      setValue("JefeDepartamento", false);
    }
    setValue("Coordinador", checked);
  };

  const handleJefeDepartamentoChange = (event) => {
    const { checked } = event.target;
    setIsJefeDepartamento(checked);
    if (checked) {
      setIsCoordinador(false);
      setValue("Coordinador", false);
    }
    setValue("JefeDepartamento", checked);
  };
  const columns = [
    { field: 'Departamento', headerName: 'Departamento', width: 150 },
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
              params.row.roles.includes("Administrador") ||
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

  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await axios.get("/api/admin/centros");
        setCentros(response.data);
      } catch (error) {
        console.error("Error al obtener los centros:", error);
      }
    };
    const fetchDocentes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/empleados");
        setDocentes(response.data);
        handleLimpiar();
      } catch (error) {
        console.error("Error al obtener los docentes:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get("/api/admin/departamentos");
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };
    fetchDocentes();
    fetchCentros();
    fetchDepartamentos();
  }, []);

  const onPostSubmit = async (formData) => {
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
      id_Departamento: formData.id_Departamento,
    };

    console.log("Datos a enviar:", dataToSend);

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
        "/api/admin/empleados",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Asegúrate de que el encabezado esté configurado
        }
      );

      if (response.status === 201) {
        setSnackbarMessage("Docente creado exitosamente");
        setSnackbarSeverity("success");
        // Refresca la lista de docentes
        const docentesResponse = await axios.get("/api/admin/empleados");
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

  const onUpdateSubmit = async (formData) => {
    setLoading(true);

    // Construye el array de roles
    // const roles = [];
    // if (formData.Docente) roles.push("Docente");
    // if (formData.Coordinador || isCoordinador) roles.push("Coordinador");
    // if (formData.JefeDepartamento || isJefeDepartamento) roles.push("JefeDepartamento");
    const roles = [];
    if (formData.Docente) roles.push("Docente");
    if (isCoordinador) roles.push("Coordinador");
    if (isJefeDepartamento) roles.push("JefeDepartamento");

    // Construye el objeto de datos a enviar
    const dataToSend = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      identidad: formData.identidad,
      telefono: formData.telefono,
      // correo: formData.correo,
      roles: JSON.stringify(roles), // Convierte el array de roles a una cadena JSON
      id_Centros: formData.id_Centros,
      id_Departamento: formData.id_Departamento,
    };

    console.log("Datos a enviar:", dataToSend);

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
      // Realiza la solicitud PUT
      const response = await axios.put(
        `/api/admin/empleados/${docenteSeleccionado.numeroEmpleado}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Asegúrate de que el encabezado esté configurado
        }
      );

      if (response.status === 200) {
        setSnackbarMessage("Docente actualizado exitosamente");
        setSnackbarSeverity("success");
        // Refresca la lista de docentes
        const docentesResponse = await axios.get("/api/admin/empleados");
        setDocentes(docentesResponse.data);
        handleLimpiar();
      } else {
        setSnackbarMessage("Error al actualizar el docente");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error al actualizar el docente";
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

      const updatedDocente = {
        estado: nuevoEstado,
        nombre: docente.Nombre,
        // nu: docente.NumeroEmpleado,
        correo: docente.Correo,
        roles: docente.Roles,
        id_Centros: docente.CentroId,
        id_Departamento: docente.DepartamentoId,
        identidad: docente.Identidad,
        telefono: docente.Telefono,
      };

      console.log("Datos enviados:", updatedDocente);
      const response = await axios.put(
        `/api/admin/empleados/${numeroEmpleado}`,
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
      setSelectedImage(file);
    } else {
      console.log("No se ha seleccionado ninguna imagen.");
      setSelectedImage(null);
    }
  };

  const handleLimpiar = () => {
    reset({
      id_Centros: "",
      id_Departamento: "",
      Coordinador: false,
      JefeDepartamento: false
    });
    setSelectedImage(null);
    setDocenteSeleccionado(null);
    
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }

    if (centroSelectRef.current) {
      centroSelectRef.current.value = "";
    }

    setIsCoordinador(false);
    setIsJefeDepartamento(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const onHandleSubmit = docenteSeleccionado ? onUpdateSubmit : onPostSubmit;

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
          onSubmit={handleSubmit(onHandleSubmit)}
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
            control={
              <Checkbox
                {...register("Coordinador")}
                checked={isCoordinador}
                onChange={handleCoordinadorChange}
              />
            }
            label="Coordinador"
            disabled={isJefeDepartamento}
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("JefeDepartamento")}
                checked={isJefeDepartamento}
                onChange={handleJefeDepartamentoChange}
              />
            }
            label="Jefe de Departamento"
            disabled={isCoordinador}
          />
          </div>

          <Divider sx={{ margin: "15px 30px 30px" }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "El nombre solo puede contener letras",
                  },
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
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "El Apellido solo puede contener letras",
                  },
                })}
                error={!!errors.apellido}
                helperText={errors.apellido?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identidad"
                placeholder="Sin guiones ni espacios (ej. 0801199901234)"
                {...register("identidad", {
                  required: "La identidad es obligatoria",
                  maxLength: { value: 13, message: "Máximo 13 caracteres" },
                  pattern: {
                    value: /^[0-9]{13}$/,
                    message:
                      "La identidad debe contener solo 13 dígitos, sin guiones ni espacios",
                  },
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
                  pattern: {
                    value: /^[0-9]+$/, // Permite solo dígitos
                    message: "El campo solo puede contener números",
                  },
                })}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            </Grid>

        {!docenteSeleccionado && (
          <>
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
                      minLength: {
                        value: 8,
                        message:
                          "La contraseña debe tener al menos 8 caracteres",
                      },
                      pattern: {
                        value:
                          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
                        message:
                          "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
                      },
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
              </>
            )}

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.id_Centros}>
                <InputLabel id="id_Centros-label">Centro</InputLabel>
                <Select
                  labelId="id_Centros-label"
                  id="id_Centros"
                  {...register("id_Centros", { required: "El centro es obligatorio" })}
                  defaultValue=""
                  inputRef={centroSelectRef}
                  value={watch('id_Centros')} // Controlando el valor del select
                  onChange={(e) => setValue("id_Centros", e.target.value)}
                >
                  {centros.map((centro) => (
                    <MenuItem key={centro.id_Centros} value={centro.id_Centros}>
                      {centro.Nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.id_Centros?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.id_Departamento}>
                <InputLabel id="id_Departamento-label">Departamento</InputLabel>
                <Select
                  labelId="id_Departamento-label"
                  id="id_Departamento"
                  {...register("id_Departamento", { required: "El departamento es obligatorio" })}
                  defaultValue=""
                  value={watch('id_Departamento')} // Controlando el valor del select
                  onChange={(e) => setValue("id_Departamento", e.target.value)}
                >
                  {departamentos.map((departamento) => (
                    <MenuItem key={departamento.id_Departamento} value={departamento.id_Departamento}>
                      {departamento.Nombre}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.id_Departamento?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                style={{ display: "none" }}
                id="upload-image"
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <Button variant="outlined" color="primary" component="span" sx={{height:'55px'}}>
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
              { docenteSeleccionado && !selectedImage && docenteSeleccionado.Imagen && (
                <img src={ docenteSeleccionado.Imagen} alt={ docenteSeleccionado.Imagen} style={{width:'200px', marginTop:'20px'}} />
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} mt={2} display="flex" justifyContent="center">
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
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              variant="filled"
            >
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
            rowHeight={40}
            localeText={esESLocaleText}
          />
        </div>
      </Box>
    </AdministradorLayout>
  );
};