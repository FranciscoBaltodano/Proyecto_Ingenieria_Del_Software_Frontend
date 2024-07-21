import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Badge, Tooltip, Paper, Typography, Box } from '@mui/material';
import { es } from 'date-fns/locale';
import axios from 'axios';

const EventCalendar = ({ eventType }) => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [matriculaRes, cancelacionRes] = await Promise.all([
          axios.get('http://localhost:3000/api/admin/matricula'),
          axios.get('http://localhost:3000/api/admin/cancelaciones')
        ]);

        console.log('Matricula Response:', matriculaRes.data);
        console.log('Cancelacion Response:', cancelacionRes.data);

        const matriculaEvents = matriculaRes.data.flatMap(config => [
          { date: new Date(config.fecha_inicioMatri), type: 'matricula', description: 'Inicio de matrícula' },
          { date: new Date(config.fecha_finMatri), type: 'matricula', description: 'Fin de matrícula' },
          { date: new Date(config.fecha_matri1), type: 'matricula', description: `Matrícula para índice ${config.indice_desdeMatri1}-${config.indice_hastaMatri1}` },
          { date: new Date(config.fecha_matri2), type: 'matricula', description: `Matrícula para índice ${config.indice_desdeMatri2}-${config.indice_hastaMatri2}` },
          { date: new Date(config.fecha_matri3), type: 'matricula', description: `Matrícula para índice ${config.indice_desdeMatri3}-${config.indice_hastaMatri3}` },
          { date: new Date(config.fecha_matri4), type: 'matricula', description: `Matrícula para índice ${config.indice_desdeMatri4}-${config.indice_hastaMatri4}` },
          { date: new Date(config.fecha_matri5), type: 'matricula', description: `Matrícula para índice ${config.indice_desdeMatri5}-${config.indice_hastaMatri5}` },
        ]);

        const cancelacionEvents = cancelacionRes.data.map(cancel => ({
          date: new Date(cancel.fecha_inicioCancel),
          type: 'cancelacion',
          description: 'Inicio de cancelación excepcional'
        }));

        console.log('Cancelacion Events:', cancelacionEvents);

        // Combine all events and then filter based on eventType
        const allEvents = [...matriculaEvents, ...cancelacionEvents];
        console.log('Combined Events:', allEvents);
        const filteredEvents = eventType ? allEvents.filter(event => event.type === eventType) : allEvents;
        console.log('Filtered Events:', filteredEvents);
        setEvents(filteredEvents);

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [eventType]);

  const renderDayInPicker = (date, selectedDates, pickersDayProps) => {
    const dateEvents = events.filter(
      event => event.date.toDateString() === date.toDateString()
    );

    console.log('Date Events:', dateEvents);

    const matriculaCount = dateEvents.filter(event => event.type === 'matricula').length;
    const cancelacionCount = dateEvents.filter(event => event.type === 'cancelacion').length;

    return (
      <Badge
        key={date.toString()}
        overlap="circular"
        badgeContent={
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {matriculaCount > 0 && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'blue',
                  mb: cancelacionCount > 0 ? 0.5 : 0
                }}
              />
            )}
            {cancelacionCount > 0 && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'red'
                }}
              />
            )}
          </Box>
        }
      >
        <Tooltip title={dateEvents.map(event => event.description).join(', ')}>
          <div {...pickersDayProps} />
        </Tooltip>
      </Badge>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Calendario de Eventos
        </Typography>
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          renderDay={renderDayInPicker}
        />
        {selectedDate && (
          <Box mt={2}>
            <Typography variant="subtitle1">Eventos para {selectedDate.toLocaleDateString()}:</Typography>
            {events
              .filter(event => event.date.toDateString() === selectedDate.toDateString())
              .map((event, index) => (
                <Typography key={index} variant="body2" sx={{ color: event.type === 'matricula' ? 'blue' : 'red' }}>
                  - {event.description} ({event.type === 'matricula' ? 'Matrícula' : 'Cancelación'})
                </Typography>
              ))
            }
          </Box>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default EventCalendar;