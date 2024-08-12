import React, { useEffect, useState } from "react";
import { DocenteLayout } from "../../layout/DocenteLayout";
import { useAuth } from "../../../contexts/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Chip,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { esESLocaleText } from "../../../components/esESLocaleText";

export const SolicitudesPage = () => {
  const { user } = useAuth();
  const [solicitudesPendientes, setSolicitudesPendientes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchSolicitudesPendientes();
  }, []);

  const fetchSolicitudesPendientes = async () => {
    try {
      const res = await fetch(
        `/api/solicitudes/coordinadores/${user.numeroEmpleado}`
      );
      const data = await res.json();
      setSolicitudesPendientes(data || []);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const responderSolicitud = async (id_solicitud, data) => {
    const dataToSend = {
      id_coordinador: user.numeroEmpleado,
      respuesta: data.respuesta,
      nuevo_estado: data.nuevo_estado,
    };

    try {
      console.log(id_solicitud, dataToSend);
      // return;
      const res = await axios.put(
        `/api/solicitudes/${id_solicitud}/responder`,
        {
          id_coordinador: user.numeroEmpleado,
          respuesta: data.respuesta,
          nuevo_estado: data.nuevo_estado,
        }
      );
      if (res.status === 200) {
        fetchSolicitudesPendientes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      field: "tipoSolicitud",
      headerName: "Tipo",
      width: 220,
      renderCell: (params) => (
        <Chip
          variant="outlined"
          label={params.value[0]}
          color={
            params.value[1] == 1
              ? "info"
              : params.value[1] == 2
              ? "warning"
              : params.value[1] == 3
              ? "error"
              : "success"
          }
        />
      ),
    },
    {
      field: "imagen",
      headerName: "Foto",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="imagen"
          style={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            boxShadow: "0px 2px 3px 1px #818282",
          }}
        />
      ),
    },
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "numeroCuenta", headerName: "Número Cuenta", width: 150 },
    {
      field: "descargarArchivo",
      headerName: "Archivo Justificación",
      width: 200,
      renderCell: (params) =>
        params.row.urlDescarga ? (
          <Button
            variant="contained"
            color="primary"
            href={params.row.urlDescarga}
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar PDF
          </Button>
        ) : (
          "No Disponible"
        ),
    },
  ];

  // Formatea las filas para DataGrid
  const rows = solicitudesPendientes.map((solicitud) => ({
    id: solicitud.id,
    imagen: solicitud.estudiante.Usuario.Imagen,
    nombre: `${solicitud.estudiante.Usuario.Nombre} ${solicitud.estudiante.Usuario.Apellido}`,
    tipoSolicitud: [
      solicitud.tipo_solicitud.nombre,
      solicitud.tipo_solicitud.id,
    ],
    numeroCuenta: solicitud.estudiante.numeroCuenta,
    urlDescarga: solicitud.urlDescarga, // Agrega el campo urlDescarga

    id_estudiante: solicitud.id_estudiante,
    id_tipo_solicitud: solicitud.id_tipo_solicitud,
    estado: solicitud.estado,
    fecha_solicitud: new Date(solicitud.fecha_solicitud).toLocaleString(),
    fecha_respuesta: solicitud.fecha_respuesta
      ? new Date(solicitud.fecha_respuesta).toLocaleString()
      : "No Respondido",
    detalles: solicitud.detalles,
    respuesta: solicitud.respuesta,
    id_coordinador: solicitud.id_coordinador,
    motivo_cancelacion: solicitud.motivo_cancelacion,
    secciones_a_cancelar: solicitud.secciones_a_cancelar,
    documento_respaldo: solicitud.documento_respaldo,
  }));

  const handleRowClick = (params) => {
    setSelectedSolicitud(params.row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSolicitud(null);
    reset(); // Limpiar los campos cuando se cierra el modal
  };

  const onSubmit = (data) => {
    if (selectedSolicitud) {
      responderSolicitud(selectedSolicitud.id, data);
      handleCloseModal();
    }
  };

  return (
    <DocenteLayout titulo="Solicitudes">
      <Typography variant="h6" style={{ marginBottom: 20 }}>
        Haz clic en una solicitud para ver más detalles.
      </Typography>

      <div
        style={{
          height: 600,
          width: "100%",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: 600,
            width: "1000px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            overflowX: "auto",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            localeText={esESLocaleText}
            rowsPerPageOptions={[20]}
            disableSelectionOnClick
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{ paddingX: { md: "100px", lg: "300px", xl: "400px" } }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Detalles de la Solicitud
        </DialogTitle>
        <DialogContent>
          {selectedSolicitud && (
 <Grid container spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12} sm={6}>
              <Grid container direction="column">
                <Grid mb={2} container justifyContent="space-between">
                  <Typography
                    color="info"
                    variant="outlined"
                  >
                    {selectedSolicitud.fecha_solicitud}
                  </Typography>
                </Grid>

                <Typography>
                  <strong>Nombre:</strong> {selectedSolicitud.nombre}
                </Typography>
                <Typography>
                  <strong>Cuenta:</strong> {selectedSolicitud.numeroCuenta}
                </Typography>

                {selectedSolicitud.id_tipo_solicitud == 1 && (
                  <>
                    <Typography>
                      <strong>Motivo:</strong>{" "}
                      {selectedSolicitud.detalles.motivo}
                    </Typography>
                    <Typography>
                      <strong>Carrera actual:</strong>{" "}
                      {selectedSolicitud.detalles.departamento_actual}
                    </Typography>
                    <Typography>
                      <strong>Carrera Deseada:</strong>{" "}
                      {selectedSolicitud.detalles.departamento_deseado}
                    </Typography>
                  </>
                )}

                {selectedSolicitud.id_tipo_solicitud == 2 && (
                  <>
                    <Typography>
                      <strong>Secciones a Cancelar:</strong>
                    </Typography>
                    {(() => {
                      // Verifica si es un string JSON
                      try {
                        const parsedArray = JSON.parse(
                          selectedSolicitud.secciones_a_cancelar
                        );
                        if (Array.isArray(parsedArray)) {
                          return (
                            <Grid container my={1} spacing={1}>
                              {parsedArray.length > 0 ? (
                                parsedArray.map((seccion) => (
                                  <Chip
                                    color="error"
                                    variant="outlined"
                                    key={seccion.id_seccion}
                                    label={seccion.nombre}
                                  />
                                ))
                              ) : (
                                <Typography>
                                  No hay secciones a cancelar.
                                </Typography>
                              )}
                            </Grid>
                          );
                        } else {
                          return (
                            <Typography color="error">
                              Formato incorrecto para secciones a cancelar.
                            </Typography>
                          );
                        }
                      } catch (error) {
                        return (
                          <Typography color="error">
                            Error al obtener las secciones a cancelar.
                          </Typography>
                        );
                      }
                    })()}
                  </>
                )}

                {(selectedSolicitud.id_tipo_solicitud == 2 ||
                  selectedSolicitud.id_tipo_solicitud == 4) && (
                  <>
                    <Typography>
                      <strong>Motivo:</strong>{" "}
                      {selectedSolicitud.motivo_cancelacion}
                    </Typography>

                    <Grid container>
                      <Button
                        variant="contained"
                        color="error"
                        href={selectedSolicitud.urlDescarga}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Descargar PDF
                      </Button>
                    </Grid>
                  </>
                )}

                {selectedSolicitud.id_tipo_solicitud == 3 && (
                  <>
                    <Typography>
                      <strong>Motivo:</strong>{" "}
                      {selectedSolicitud.detalles.motivo}
                    </Typography>
                    <Typography>
                      <strong>Centro actual:</strong>{" "}
                      {selectedSolicitud.detalles.centro_actual}
                    </Typography>
                    <Typography>
                      <strong>Centro Deseado:</strong>{" "}
                      {selectedSolicitud.detalles.centro_deseado}
                    </Typography>
                  </>
                )}

                {/* <Typography><strong>Documento Respaldo:</strong> <a href={selectedSolicitud.documento_respaldo} target="_blank" rel="noopener noreferrer">Ver Documento</a></Typography> */}
              </Grid>
              </Grid>

              <Divider orientation="vertical" flexItem />


              <Grid item xs={12} sm={5}>

              <FormControl
                component="fieldset"
                margin="normal"
                fullWidth
                error={!!errors.nuevo_estado}
              >
                <FormLabel component="legend">Estado de la solicitud</FormLabel>
                <Controller
                  name="nuevo_estado"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Debe seleccionar una opción" }} // Validación obligatoria
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="aceptada"
                        control={<Radio />}
                        label="Aceptar"
                      />
                      <FormControlLabel
                        value="rechazada"
                        control={<Radio />}
                        label="Rechazar"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.nuevo_estado && (
                  <FormHelperText>{errors.nuevo_estado.message}</FormHelperText>
                )}
              </FormControl>

              <TextField
                {...register("respuesta", {
                  required: "El campo respuesta es obligatorio",
                })}
                label="Respuesta"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.respuesta}
                helperText={errors.respuesta?.message}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
              >
                Responder Solicitud
              </Button>
              </Grid>
            </Grid>
          )}
          <Typography variant="body2" color="textSecondary">
            {/* Mensaje opcional o detalles adicionales */}
          </Typography>
        </DialogContent>
      </Dialog>
    </DocenteLayout>
  );
};
