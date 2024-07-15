import React, { useEffect, useState } from "react";
import { Box,  Button,  Grid,  TextField,  Typography,  Snackbar,  Alert,  Backdrop,  CircularProgress,  Switch,  FormControlLabel,  FormHelperText,  Checkbox,
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

export const DocentesForm2 = () => {
  const {
    register,
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

  const [centroSeleccionado, setCentroSeleccionado] = useState("");

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

  useEffect(() => {
    fetchCentros();
  }, []);

  <Box>
    <FormControl fullWidth error={!!errors.id_Centros}>
      <InputLabel id="centros">Centro</InputLabel>
      <Select
        labelId="centros"
        id="centros"
        value={centroSeleccionado}
        label="Centro"
        onChange={(e) => setCentroSeleccionado(e.target.value)}
        {...register("id_Centros", { required: "El centro es obligatorio" })}
      >
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
  </Box>;

  useEffect(() => {
    const fetchDocentes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/empleados"
        );
        setDocentes(response.data);
      } catch (error) {
        console.error("Error al obtener los docentes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocentes();
  }, []);

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

  const onSubmit = async (formData) => {
    setLoading(true);

    //convertir roles a array
    const roles = [];

    if (formData.Docente) roles.push("Docente");
    if (formData.Coordinador) roles.push("Coordinador");
    if (formData.JefeDepartamento) roles.push("JefeDepartamento");

    //agregando roles

    const dataToSend = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      identidad: formData.identidad,
      telefono: formData.telefono,
      correo: formData.correo,
      contrasena: formData.contrasena,
      roles: roles,
      id_Centros: formData.id_Centros,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/empleados",
        dataToSend
      );
      console.log("Respuesta del servidor:", response.data);

      if (response.status === 201) {
        setSnackbarMessage("Docente creado exitosamente");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        reset();
      } else {
        setSnackbarMessage("Error al crear el docente");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSnackbarMessage("Error al crear el docente");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "numeroEmpleado", headerName: "Numero Empleado", width: 100 },
    { field: "Nombre", headerName: "Nombre", width: 100 },
    { field: "Apellido", headerName: "Apellido", width: 100 },
    { field: "Correo", headerName: "Correo", width: 100 },
    { field: "Telefono", headerName: "Telefono", width: 100 },
    { field: "Identidad", headerName: "Identidad", width: 100 },
    { field: "Centro", headerName: "Centro", width: 100 },
    {
      field: "imagen",
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
      width: 150,
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
    { field: "roles", headerName: "Roles", width: 100 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleEditar(params.row)}
          disabled={
            docenteSeleccionado &&
            docenteSeleccionado.numeroEmpleado === params.row.numeroEmpleado
          }
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];
  //   const Centros = () => (
  //     <Box>
  //       <FormControl fullWidth error={!!errors.centro}>
  //         <InputLabel id="centros">Centro</InputLabel>
  //         <Select
  //           labelId="centros"
  //           id="centros"
  //           value={centro}
  //           label="Centro"
  //           onChange={(e) => setCentros(e.target.value)}
  //           inputProps={{ ...register("id_Centros", { required: 'El centro es obligatorio' }) }}
  //         >
  //           <MenuItem value={1}>UNAH-CU</MenuItem>
  //           <MenuItem value={2}>UNAH-VS</MenuItem>
  //           <MenuItem value={3}>UNAH-CURC</MenuItem>
  //           <MenuItem value={4}>UNAH-CURLA</MenuItem>
  //           <MenuItem value={5}>UNAH-CURLP</MenuItem>
  //           <MenuItem value={6}>UNAH-CUROC</MenuItem>
  //           <MenuItem value={7}>UNAH-CURNO</MenuItem>
  //           <MenuItem value={8}>UNAH-TEC-DANLI</MenuItem>
  //           <MenuItem value={9}>UNAH-TEC-AGUÁN</MenuItem>
  //         </Select>
  //         {errors.centro && <FormHelperText>{errors.centro.message}</FormHelperText>}
  //       </FormControl>
  //     </Box>
  //   );

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

  const onSubmit1 = async (formData) => {
    setLoading(true);

    const roles = [];
    if (formData.Docente) roles.push("Docente");
    if (formData.Coordinador) roles.push("Coordinador");
    if (formData.JefeDepartamento) roles.push("JefeDepartamento");

    const dataToSend = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      identidad: formData.identidad,
      telefono: formData.telefono,
      correo: formData.correo,
      contrasena: formData.contrasena,
      roles: roles,
      centro: formData.centro,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/empleados",
        dataToSend
      );
      if (response.status === 201) {
        setSnackbarMessage("Docente creado exitosamente");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        reset();
      } else {
        setSnackbarMessage("Error al crear el docente");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSnackbarMessage("Error al crear el docente");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
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
        Agregar Docente
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
            {...register("nombre", { required: "El nombre es obligatorio" })}
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

        <Grid item xs={12}>
          <div>
            <label htmlFor="id_Centro" className="block font-medium">
              Centro Regional
            </label>
            <select
              id="id_Centro"
              {...register("id_Centros", {
                required: "El Cento es obligatorio",
              })}
              className="w-full p-2 border border-input rounded"
            >
              <option value="" disabled selected>
                Elige el centro
              </option>
              {centros.map((centro) => (
                <option key={centro.id_Centros} value={centro.id_Centros}>
                  {centro.Nombre}
                </option>
              ))}
            </select>
            {errors.id_Centro && (
              <span className="text-red-500">{errors.id_Centro.message}</span>
            )}
          </div>
        </Grid>

        {/* 
    <Grid item xs={12} sm={6}>    <FormControl fullWidth error={!!errors.id_Centros}>
        <InputLabel id="centros">Centro</InputLabel>
        <Select
        labelId="centros"
        id="centros"
        value={centroSeleccionado}
        label="Centro"
        onChange={(e) => setCentroSeleccionado(e.target.value)}
        {...register("id_Centros", { required: 'El centro es obligatorio' })}
        >
        {centros.map((centro) => (
            <MenuItem key={centro.id_Centros} value={centro.id_Centros}>
            {centro.Nombre}
            </MenuItem>
        ))}
        </Select>
        {errors.id_Centros && <FormHelperText>{errors.id_Centros.message}</FormHelperText>}
    </FormControl>
    </Grid> */}

        <Grid item xs={12} sm={6}>
          <Button variant="contained" component="label" fullWidth>
            Subir Imagen
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Grid>
      </Grid>

      <Box mt={2} textAlign="center">
        <Button type="submit" variant="contained" color="primary">
          Agregar Docente
        </Button>
      </Box>

      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box mt={4}>
        <Typography variant="h6" component="h2" gutterBottom>
          Lista de Docentes
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={docentes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </div>
      </Box>
    </Box>
  );
};
