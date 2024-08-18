import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Typography, Button, Stack, Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/AuthContext'; 
import axios from 'axios';

export const FormRegistrarSeccionModificar = ({ section, asignatura, onClose,onUpdateSecciones  }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { user } = useAuth();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dias, setDias] = useState([]);
  const [diasSecciones, setDiasSecciones] = useState([]);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [diasRes, edificioRes, docenteRes, seccionResponse, diasSeccionesRes] = await Promise.all([
          axios.get('http://localhost:3000/api/department-head/dias'),
          axios.get(`http://localhost:3000/api/department-head/edificios/${user.id_centro}`),
          axios.post('http://localhost:3000/api/department-head/docentes/activos', { id_Departamento: user.id_departamento }),
          axios.get(`http://localhost:3000/api/department-head/seccionesFiltro/${section}`),
          axios.get(`http://localhost:3000/api/department-head/dias/${section}`)
        ]);

        setDias(diasRes.data.data);
        setEdificios(edificioRes.data.data);
        setDocente(docenteRes.data.data);
        setDiasSecciones(diasSeccionesRes.data.data);

        if (diasSeccionesRes.data.data) {
          const selectedDiasIds = diasSeccionesRes.data.data.map(dia => dia.id_dia);
          setSelectedDias(selectedDiasIds);
        }

        if (seccionResponse.data.data && seccionResponse.data.data.length > 0) {
          const seccion = seccionResponse.data.data[0];
          setSeccionData(seccion);
          
          setValue('id_Docentes', seccion.id_Docentes);
          setValue('id_Aula', seccion.id_Aula);
          setValue('Hora_inicio', seccion.Hora_inicio);
          setValue('Hora_final', seccion.Hora_Final);
          setValue('idEdificio', seccion.id_Edificios);
          
          setStartTime(seccion.Hora_inicio); 
          setEndTime(seccion.Hora_Final); 
          setValue2(seccion.Cupos);
  
          console.log('que muestra esta seccion',seccion.id_Edificios)
          if (seccion.id_Edificios) {
            await fetchAulas(seccion.id_Edificios);
          }
        } else {
          console.log('No se encontraron datos de sección');
        }
      } catch (error) {
        console.error('Error al conseguir la data', error);
        setSnackbarMessage('Error al cargar los datos. Por favor, intente de nuevo.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [section, setValue, user.id_centro, user.id_departamento]);

  const fetchAulas = async (idEdificio) => {
    try {
      console.log('Fetching aulas for edificio:', idEdificio);
      const aulasRes = await axios.get(`http://localhost:3000/api/department-head/aulas/${idEdificio}`);
      console.log('Aulas response:', aulasRes.data);
      setAulas(aulasRes.data.data);
    } catch (error) {
      console.error('Error al conseguir las aulas', error.response?.data || error.message);
    }
  };

  const onEdificioChange = async (e) => {
    const idEdificio = e.target.value;
    setValue('id_Aula', ''); // Resetear el aula seleccionada
    await fetchAulas(idEdificio);
  };

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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!seccionData) {
    return <div>No se encontraron datos de la sección</div>;
  }

  const onSubmit = async (data) => {
    try {
      // Preparar los datos para enviar
      const updatedData = {
        id_Secciones: section,
        id_Docentes: data.id_Docentes,
        id_Aula: data.id_Aula,
        id_Edificios: edificios.find(edificio => edificio.Nombre === data.id_Edificio).id_Edificio,        Hora_inicio: startTime,
        Hora_Final: endTime,
        Cupos: value,
        dias: selectedDias
      };
  
      console.log('Datos a enviar:', updatedData);
      console.log('URL de la petición:', 'http://localhost:3000/api/department-head/useccion');
  
      // Realizar la petición PUT
      const response = await axios.put('http://localhost:3000/api/department-head/useccion', updatedData);
  
      console.log('Respuesta del servidor:', response);
      console.log('Datos a enviar:', {
        id_Secciones: section,
        id_Docentes: data.id_Docentes,
        id_Aula: data.id_Aula,
        id_Edificios: data.id_Edificio, // Enviar el ID del edificio
        Hora_inicio: startTime,
        Hora_Final: endTime,
        Cupos: value,
        dias: selectedDias
      });
      console.log('Form data:', data);
      console.log('Edificio ID:', data.id_Edificio);
  
      if (response.status === 200) {
        setSnackbarMessage('Sección modificada exitosamente');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        // Llama a la función de actualización
        onUpdateSecciones();

        // Cerrar el modal después de un breve retraso
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Error al modificar la sección:', error);
      console.error('Detalles del error:', error.response);
      setSnackbarMessage('Error al modificar la sección. Por favor, intente de nuevo.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <select {...register('id_Docentes')} 
            id="id_Docentes"
            defaultValue={seccionData.id_Docentes}
            className="w-full p-2 border border-black rounded">
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
            <select {...register('id_Edificio')} 
            id="id_Edificio" 
            defaultValue={seccionData.id_Edificios}
            className="w-full p-2 border border-black rounded"  onChange={onEdificioChange}>
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
            <select {...register('id_Aula')} id="id_Aula" className="w-full p-2 border border-black rounded" 
            defaultValue={seccionData.id_Aula}
            >
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
                      id={`id_dia`}
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
            Debe seleccionar los días conforme a las horas previstas para la sección y a las UV de la clase.
          </Typography>
        </center>
        <br />

        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Stack direction="row" spacing={6}>
            <Button variant="contained" type="submit">
              Modificar
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
