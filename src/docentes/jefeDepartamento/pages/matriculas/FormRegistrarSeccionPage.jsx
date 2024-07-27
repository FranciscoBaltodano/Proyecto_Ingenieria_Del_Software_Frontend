import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Typography, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../contexts/AuthContext';
import { DocenteLayout } from '../../../layout/DocenteLayout';
import axios from 'axios';

export const FormRegistrarSeccionPage = () => {
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const asignatura = location.state?.asignatura || {};
  const { user } = useAuth();
  const [dias, setDias] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [docente, setDocente] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [selectedDias, setSelectedDias] = useState([]); // Arreglo para almacenar los días seleccionados
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [value, setValue] = useState('');
  const startRangeStart = 6;
  const startRangeEnd = 21;
  const endRangeStart = 7;
  const endRangeEnd = 22;
  const horaInicio = watch('Hora_Inicio');

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
      setValue(newValue);
    }
  };

  const handleCheckboxChange = (e, diaId) => {
    if (e.target.checked) {
      setSelectedDias([...selectedDias, diaId]);
    } else {
      setSelectedDias(selectedDias.filter(id => id !== diaId));
    }
  };

  console.log("asignatura", asignatura);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diasRes, edificioRes, docenteRes, aulasRes] = await Promise.all([
          axios.get('http://localhost:3000/api/department-head/dias'),
          axios.get('http://localhost:3000/api/department-head/edificios'),
          axios.post('http://localhost:3000/api/department-head/docentes/activos', { id_Departamento: user.id_departamento }),
          axios.get('http://localhost:3000/api/department-head/aulas')
        ]);

        setDias(diasRes.data.data);
        setEdificios(edificioRes.data.data);
        setDocente(docenteRes.data.data);
        setAulas(aulasRes.data.data);
      } catch (error) {
        console.log('Error al conseguir la data', error);
      }
    };
    fetchData();
  }, [user.id_departamento]);



  const onSubmit = async (data) => {
    try {
      const payload = {
        id_Docentes: data.numeroEmpleado,
        id_Aula: data.id_Aula,
        id_Edificios: data.id_Edficios,
        Hora_inicio: data.Hora_inicio,
        Hora_Final: data.Hora_Final,
        Cupos: data.Cupos,
        codigoAsignatura: asignatura.codigo,
        dias: selectedDias
      };
      console.log('datos enviados', payload);
      const response = await axios.post('http://localhost:3000/api/department-head/crear/secciones', payload);
      console.log('Sección registrada:', response.data);
      navigate('/jefedepartamento/registrarSeccion');
    } catch (error) {
      console.error('Error al registrar la sección:', error);
    }
  };

  return (
    <DocenteLayout titulo='Formulario de Registro de Sección'>
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
            <select {...register('numeroEmpleado', {required:"Necesita seleccionar el docente a impartir la seccion" })}
             id="numeroEmpleado" className="w-full p-2 border border-black rounded" defaultValue="">

              <option value="" disabled>Elegir</option>
              {docente.map((docent) => (
                <option key={docent.numeroEmpleado} value={docent.numeroEmpleado}>{docent.Nombre_docente}</option>
              ))}
            </select>
            {errors.numeroEmpleado && <span className="text-red-500">{errors.numeroEmpleado.message}</span>}
          </div>
        </div>
        <br />
        <Divider sx={{ marginBottom: 2 }} />

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 mt-3" style={{ justifyContent: 'space-evenly' }}>
          <div className="xl:w-10/12 lg:w-10/12 w-full md:w-10/12">
            <Typography variant="h7" component="h1" gutterBottom>
              Seleccione un edificio
            </Typography>
            <select {...register('id_Edficios', {required:"Necesita seleccionar el edifico donde se impartira la seccion" })}
              id="id_Edficios" className="w-full p-2 border border-black rounded" defaultValue="">
              <option value="" disabled>Elegir</option>
              {edificios.map((edificio) => (
                <option key={edificio.id_Edficios} value={edificio.id_Edficios}>{edificio.Nombre}</option>
              ))}
            </select>
            {errors.id_Edficios && <span className="text-red-500">{errors.id_Edficios.message}</span>}

          </div>
          <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
            <Typography variant="h7" component="h1" gutterBottom>
              Seleccione un aula
            </Typography>
            <select {...register('id_Aula', {required:"Necesita seleccionar el aula del edificio donde se impartira la seccion" })} 
            id="id_Aula" className="w-full p-2 border border-black rounded" defaultValue="">
              <option value="" disabled>Elegir</option>
              {aulas.map((aula) => (
                <option key={aula.id_Aula} value={aula.id_Aula}>{aula.Nombre}</option>
              ))}
            </select>
            {errors.id_Aula && <span className="text-red-500">{errors.id_Aula.message}</span>}

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
              {...register('Hora_Inicio', {required:"Necesita establecer la hora de inicio de la seccion" })}
              id="Hora_Inicio"
              type="time"
              className="w-full p-2 border border-black rounded"
              value={startTime}
              onChange={(e) => handleTimeChange(e, setStartTime, startRangeStart, startRangeEnd)}
              step="3600"
              min="06:00"
              max="22:00"
            />
            {errors.Hora_Inicio && <span className="text-red-500">{errors.Hora_Inicio.message}</span>}

          </div>
          <div className="xl:w-10/12 lg:w-10/12 sm:w-full md:w-10/12">
            <Typography variant="h7" component="h1" gutterBottom>
              Hora final
            </Typography>
            <input
             {...register('Hora_Final', {required:"Necesita establecer la hora de fin de la seccion" ,validate: value=>{
              if (value<horaInicio){
                  return 'La hora de finalizacion no puede ser anterior a la hora de inicio'
              }
              return true;
              } })}
              id="Hora_Final"
              type="time"
              className="w-full p-2 border border-black rounded"
              value={endTime}
              onChange={(e) => handleTimeChange(e, setEndTime, endRangeStart, endRangeEnd)}
              step="3600"
              min="07:00"
              max="22:00"
            />
            {errors.Hora_Final && <span className="text-red-500">{errors.Hora_Final.message}</span>}

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
                {...register('Cupos', {required:"Necesita establecer los cupos de la seccion" })}
                id="Cupos"
                type="text"
                className="w-full p-2 border border-black rounded"
                onChange={handleChange}
                value={value}
              />
              {errors.Cupos && <span className="text-red-500">{errors.Cupos.message}</span>}

            </div>
            <div>
              <Typography variant="h7" component="h1" gutterBottom>
                UV: {asignatura.uv}
              </Typography>

              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
                
                {dias.map((dia) => (
                  <div key={dia.id_Dia} className="flex items-center"
                  {...register('id_Dia', {required:"Necesita establecer los cupos de la seccion" })}
>

                    <input

                      type="checkbox"
                      id={`dias.${dia.id_Dia}`}
                      value={dia.id_Dia}
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
