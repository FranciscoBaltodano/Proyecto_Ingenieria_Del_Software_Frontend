import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Typography, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../contexts/AuthContext';
import { DocenteLayout } from '../../../layout/DocenteLayout';

export const FormRegistrarSeccionPage = () => {
  const { register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const asignatura = location.state?.asignatura || {};
  const { user } = useAuth();
  console.log("asignatura", asignatura);

  return (
    <DocenteLayout titulo='Formulario de Registro de Sección'>
    <form>
      <Typography variant="h5" component="h1" gutterBottom>
        Departamento: {user.departamento}
      </Typography>
      <Typography variant="h5" component="h1" gutterBottom>
        Id del departamento: {user.id_departamento}
      </Typography>

      <div>
        <Typography variant="h5" component="h1" gutterBottom>
          Asignatura seleccionada: {asignatura.nombre}
        </Typography>
      </div>
      <Divider sx={{ marginBottom: 2 }} />

      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2">
        <div className="lg:w-11/12 w-full">
          <div>
            <Typography variant="h7" component="h1" gutterBottom>
              Seleccione un docente
            </Typography>
          </div>
          <select id="" className="w-full p-2 border border-black rounded" defaultValue="">
            <option value="" disabled>Elegir</option>
          </select>
        </div>
      </div>
      <br />
      <Divider sx={{ marginBottom: 2 }} />

      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3" style={{ justifyContent: 'space-evenly' }}>
        <div className="xl:w-10/12 lg:w-10/12 w-full md:w-10/12">
          <Typography variant="h7" component="h1" gutterBottom>
            Seleccione un edificio
          </Typography>
          <select id="" className="w-full p-2 border border-black rounded" defaultValue="">
            <option value="" disabled>Elegir</option>
          </select>
        </div>
        <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
          <Typography variant="h7" component="h1" gutterBottom>
            Seleccione un aula
          </Typography>
          <select id="" className="w-full p-2 border border-black rounded" defaultValue="">
            <option value="" disabled>Elegir</option>
          </select>
        </div>
      </div>
      <br />
      <Divider sx={{ marginBottom: 2 }} />

      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3" style={{ justifyContent: 'space-evenly' }}>
        <div className="xl:w-10/12 lg:w-10/12 w-full md:w-10/12">
          <Typography variant="h7" component="h1" gutterBottom>
            Hora inicio
          </Typography>
          <input id="" type="time" className="w-full p-2 border border-black rounded" />
        </div>
        <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
          <Typography variant="h7" component="h1" gutterBottom>
            Hora final
          </Typography>
          <input id="" type="time" className="w-full p-2 border border-black rounded" />
        </div>
      </div>
      <br />
      <Divider sx={{ marginBottom: 2 }} />

      <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-3 mt-3" style={{ justifyContent: 'space-evenly' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2" style={{ justifyContent: 'space-evenly' }}>
          <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
            <Typography variant="h7" component="h1" gutterBottom>
              Cantidad de cupos
            </Typography>
            <input id="" type="text" className="w-full p-2 border border-black rounded" />
          </div>
          <div>
            <Typography variant="h7" component="h1" gutterBottom>
              UV: {asignatura.uv}
            </Typography>

            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
              <label>Dias:</label>
              <label>Lun <input type="checkbox" id="" /></label>
              <label>Mar <input type="checkbox" id="" /></label>
              <label>Mie <input type="checkbox" id="" /></label>
              <label>Jue <input type="checkbox" id="" /></label>
              <label>Vie <input type="checkbox" id="" /></label>
              <label>Sab <input type="checkbox" id="" /></label>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'flex-end' }}>
        <Stack direction="row" spacing={6}>
          <Button variant="contained" type="submit">
            Activar
          </Button>
          <Button variant="contained" style={{ backgroundColor: 'gray' }} onClick={() => navigate('/jefedepartamento/registrarSeccion')}>
            Cancelar
          </Button>
        </Stack>
      </div>
    </form>
    </DocenteLayout>
  );
};
