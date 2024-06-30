import React, { useState } from 'react';
import { AdmisionesLayout } from '../layout/AdmisionesLayout';
import { Button, Card, CardContent, Grid, Typography, TextField, InputAdornment } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { carreras } from '../data/carreras';
import SearchIcon from '@mui/icons-material/Search';

export const OfertaPage = () => {
  const [busquedaValue, setBusquedaValue] = useState('');
  const [carrerasFiltradas, setCarrerasFiltradas] = useState(carreras);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setBusquedaValue(value);
    filtrarCarreras(value);
  };

  const filtrarCarreras = (busquedaValue) => {
    const filtro = carreras.filter((carrera) =>
      carrera.nombre.toLowerCase().includes(busquedaValue.toLowerCase())
    );
    setCarrerasFiltradas(filtro);
  };

  return (
    <AdmisionesLayout>
      <Typography variant="h4" >
        Oferta Académica
      </Typography>

      {/* Campo de búsqueda */}
      <TextField
        placeholder="Buscar por nombre de carrera"
        variant="outlined"
        margin="normal"
        value={busquedaValue}
        onChange={handleSearchChange}
        sx={{ width: '100%', maxWidth: '300px', mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {/* Si no hay carreras mostrara el mensaje */}
        {carrerasFiltradas.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="textSecondary">
              No se encontraron carreras con el nombre "{busquedaValue}"
            </Typography>
          </Grid>
        ) : (
          carrerasFiltradas.map((carrera, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{
                borderRadius: 2,
                boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.3)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: carrerasFiltradas.length === 1 ? 320 : '100%', // Si solo hay una carrera, fijar el ancho a 300px, porque si no se aplasta 
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2">
                    {carrera.nombre}
                  </Typography>
                  <Typography>
                    <b>Grado:</b> {carrera.grado}
                  </Typography>
                  <Typography>
                    <b>Facultad:</b> {carrera.facultad}
                  </Typography>
                  <Typography>
                    <b>Modalidad:</b> {carrera.modalidad}
                  </Typography>
                  <Typography>
                    {carrera.centros && (
                      <>
                        <b>Centros:</b>{' '}
                        {carrera.centros.map((centro, index) => (
                          <span key={index}>{centro} </span>
                        ))}
                      </>
                    )}
                  </Typography>
                  <Typography>
                    {carrera.duracion && (
                      <>
                        <b>Duración:</b> {carrera.duracion} 
                      </>
                    )}
                  </Typography>
                  <Typography>
                    {carrera.indiceRequerido && (
                      <>
                        <b>Índice requerido:</b> PAA: {carrera.indiceRequerido.PAA}
                      </>
                    )}
                  </Typography>
                </CardContent>

                {/* Botón para descargar el plan de estudios */}
                <NavLink to={carrera.url} target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-end', marginBottom: '10px', marginRight: '10px' }}>
                  <Button variant="contained" color="primary">
                    Descargar Plan
                  </Button>
                </NavLink>

              </Card>
            </Grid>
          ))
        )}

      </Grid>
    </AdmisionesLayout>
  );
};
