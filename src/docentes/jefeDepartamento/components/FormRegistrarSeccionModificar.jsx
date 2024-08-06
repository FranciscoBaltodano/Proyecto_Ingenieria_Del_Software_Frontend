import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Typography, Button, Stack ,Snackbar,Alert} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/AuthContext'; 
import axios from 'axios';


export const FormRegistrarSeccionModificar = ({ section, asignatura, onClose }) => {
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [redirectToSeccionPage, setRedirectToSeccionPage] = useState(false);
  const [dias, setDias] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [docente, setDocente] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [selectedDias, setSelectedDias] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [value, setValue2] = useState('');
  const startRangeStart = 6;
  const startRangeEnd = 21;
  const endRangeStart = 7;
  const endRangeEnd = 22;
  const [seccionData, setSeccionData] = useState(null);

  const handleTimeChange = (e, setter, rangeStart, rangeEnd) => {
    const value = e.target.value;
    const [hours] = value.split(':').map(Number);

    if (hours < rangeStart) {
      setter(`${String(rangeStart).padStart(2, '0')}:00`);
    } else if (hours > rangeEnd) {
      setter(`${String(rangeEnd).padStart(2, '0')}:00`);
    } else {
      setter(`${String(hours).padStart(2, '0')}:00`);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setValue2(newValue);
    }
  };

  const handleCheckboxChange = (e, diaId) => {
    if (e.target.checked) {
      setSelectedDias([...selectedDias, diaId]);
    } else {
      setSelectedDias(selectedDias.filter(id => id !== diaId));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diasRes, edificioRes, docenteRes] = await Promise.all([
          axios.get('http://localhost:3000/api/department-head/dias'),
          axios.get(`http://localhost:3000/api/department-head/edificios/${user.id_centro}`),
          axios.post('http://localhost:3000/api/department-head/docentes/activos', { id_Departamento: user.id_departamento })
        ]);

        setDias(diasRes.data.data);
        setEdificios(edificioRes.data.data);
        setDocente(docenteRes.data.data);

        const seccionResponse = await axios.get(`http://localhost:3000/api/department-head/seccionesFiltro/${section}`);
        setSeccionData(seccionResponse.data.data);

        // Actualiza los valores del formulario con los datos de seccionData
        if (seccionResponse.data.data) {
          const data = seccionResponse.data.data;
          setValue('id_Docentes', data.id_Docentes || '');
          setValue('id_Aula', data.id_Aula || '');
          setValue('id_Edificio', data.id_Edificio || '');
          setStartTime(data.HoraInicio || '');
          setEndTime(data.HoraFinal || '');
          setSelectedDias(data.Dias || []);
          setValue('Cupos', data.Cupos || '');
        }
      } catch (error) {
        console.log('Error al conseguir la data', error);
      }
    };
    fetchData();
  }, [section, setValue, user.id_centro, user.id_departamento]);

  useEffect(() => {
    if (seccionData) {
      setValue('id_Docentes', seccionData.id_Docentes || '');
      setValue('id_Aula', seccionData.id_Aula || '');
      setValue('id_Edificio', seccionData.id_Edificio || '');
      setStartTime(seccionData.HoraInicio || '');
      setEndTime(seccionData.HoraFinal || '');
      setSelectedDias(seccionData.Dias || []);
      setValue('Cupos', seccionData.Cupos || '');
    }
  }, [seccionData, setValue]);

  const fetchAulas = async (idEdificio) => {
    try {
      const aulasRes = await axios.get(`http://localhost:3000/api/department-head/aulas/${idEdificio}`);
      setAulas(aulasRes.data.data);
    } catch (error) {
      console.log('Error al conseguir las aulas', error);
    }
  };

  const onEdificioChange = (e) => {
    const idEdificio = e.target.value;
    fetchAulas(idEdificio);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (redirectToSeccionPage) {
    return navigate('/jefedepartamento/registrarSeccion');
  }

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(() => {})}>
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
            <select {...register('id_Docentes')} id="id_Docentes" className="w-full p-2 border border-black rounded" defaultValue="">
              <option value="" disabled>Elegir</option>
              {docente.map((docent) => (
                <option key={docent.numeroEmpleado} value={docent.numeroEmpleado}>
                  {docent.numeroEmpleado} &nbsp; {docent.Nombre_docente}
                </option>
              ))}
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
            <select {...register('id_Edificio')} id="id_Edificio" className="w-full p-2 border border-black rounded" defaultValue="" onChange={onEdificioChange}>
              <option value="" disabled>Elegir</option>
              {edificios.map((edificio) => (
                <option key={edificio.id_Edificio} value={edificio.id_Edificio}>
                  {edificio.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
            <Typography variant="h7" component="h1" gutterBottom>
              Seleccione un aula
            </Typography>
            <select {...register('id_Aula')} id="id_Aula" className="w-full p-2 border border-black rounded" defaultValue="">
              <option value="" disabled>Elegir</option>
              {aulas.map((aula) => (
                <option key={aula.id_Aula} value={aula.id_Aula}>
                  {aula.Nombre}
                </option>
              ))}
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
            <input
              {...register('HoraInicio')}
              id="Hora_Inicio"
              type="time"
              className="w-full p-2 border border-black rounded"
              value={startTime}
              onChange={(e) => handleTimeChange(e, setStartTime, startRangeStart, startRangeEnd)}
              step="3600"
              min="06:00"
              max="22:00"
            />
          </div>
          <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
            <Typography variant="h7" component="h1" gutterBottom>
              Hora final
            </Typography>
            <input
              {...register('HoraFinal')}
              id="Hora_Final"
              type="time"
              className="w-full p-2 border border-black rounded"
              value={endTime}
              onChange={(e) => handleTimeChange(e, setEndTime, endRangeStart, endRangeEnd)}
              step="3600"
              min="07:00"
              max="22:00"
            />
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
              <input
                {...register('Cupos')}
                id="Cupos"
                type="text"
                className="w-full p-2 border border-black rounded"
                onChange={handleChange}
                value={value}
              />
            </div>
            <div>
              <Typography variant="h7" component="h1" gutterBottom>
                UV: {asignatura.uv}
              </Typography>

              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
                {dias.map((dia) => (
                  <div key={dia.id_Dia} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`dias.${dia.id_Dia}`}
                      value={dia.id_Dia}
                      checked={selectedDias.includes(dia.id_Dia)}
                      onChange={(e) => handleCheckboxChange(e, dia.id_Dia)}
                    />
                    <label htmlFor={`dias.${dia.id_Dia}`} className="ml-2">{dia.Nombre}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <br />
        <center>
          <Typography variant="h9" component="h1" gutterBottom>
            Debe seleccionar los dias conforme a las horas previstas para la seccion y a las UV de la clase.
          </Typography>
        </center>
        <br />

        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Stack direction="row" spacing={6}>
            <Button variant="contained" type="submit">
              Activar
            </Button>
            <Button variant="contained" style={{ backgroundColor: 'gray' }} onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Stack>
        </div>
        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} variant='filled' severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};