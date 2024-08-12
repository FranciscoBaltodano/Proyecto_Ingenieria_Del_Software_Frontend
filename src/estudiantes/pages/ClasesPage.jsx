import React from "react";
import { EstudianteLayout } from "../layout/EstudianteLayout";


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {esESDateText} from '../../components/esESDateText';
import {es} from 'date-fns/locale'
import { ClasesList } from "../components/ClasesList";
import { Divider, Grid } from "@mui/material";
import { ClasesLayout } from "../layout/ClasesLayout";

export const ClasesPage = () => {

  return (

    <ClasesLayout titulo='Mis Clases'>
      <ClasesList/>
    </ClasesLayout>
   
  );
};

//   return (
//     <EstudianteLayout titulo="Mis Clases">

//     <Grid container justifyContent='center'>
//       <Grid container maxWidth='2000px' >
//         <Grid item xs={12} xl={9.5} maxWidth='2000px' >
//         <ClasesList/>
//         </Grid>

//         <Divider sx={{mx:1}} orientation="vertical" flexItem />
        
//         <Grid item xs={12} xl={1.5} >
//         <LocalizationProvider dateAdapter={AdapterDateFns} locale={es} localeText={esESDateText}>
//           <DateCalendar localetext={esESDateText} />
//         </LocalizationProvider>
//         </Grid>
//       </Grid>
//     </Grid>
    
//     </EstudianteLayout>
//   );
// };
