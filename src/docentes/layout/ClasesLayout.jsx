/*
import React from "react";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {esESDateText} from '../../components/esESDateText';
import {es} from 'date-fns/locale'
import { ClasesList } from "../components/ClasesList";
import { Divider, Grid } from "@mui/material";
import { DocenteLayout } from "./DocenteLayout";

export const ClasesLayout = ({ children, titulo}) => {

  return (
    <DocenteLayout titulo={titulo}>

    <Grid container justifyContent='center'>
      <Grid container maxWidth='2000px' >
        <Grid item xs={12} xl={9.5} maxWidth='2000px' >
        {children}
        </Grid>

        <Divider sx={{mx:1}} orientation="vertical" flexItem />
        
        <Grid item xs={12} xl={1.5} >
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={es} localeText={esESDateText}>
          <DateCalendar localetext={esESDateText} />
        </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
    
    </DocenteLayout>
  );
};
*/

import React from "react";
import { DocenteLayout } from "./DocenteLayout";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es'; // Importa el idioma español
import { Divider, Grid } from "@mui/material";

export const ClasesLayout = ({ children, titulo}) => {

  return (
    <DocenteLayout titulo={titulo}>

<Grid container justifyContent='center'>
        <Grid container maxWidth='2000px'>
          <Grid item xs={12} xl={9.5} maxWidth='2000px'>
            {children}
          </Grid>

          <Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
          
          <Grid item xs={12} xl={1.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DateCalendar />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
    
    </DocenteLayout>
  );
};
