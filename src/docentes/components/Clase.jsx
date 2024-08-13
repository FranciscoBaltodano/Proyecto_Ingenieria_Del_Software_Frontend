

import React from 'react';
import { VideoInput } from './VideoInput';
import ListDownloader from './SaveList';
import { Grid } from '@mui/material';


export const Clase = ({ claseData = {}, fetchVideo }) => {
  return (
    <Grid container direction='column'>
        {/* <div>{JSON.stringify(claseData)}</div> */}
      <Grid item>
       <VideoInput id_Secciones={claseData.id_Secciones} fetchVideo={fetchVideo}/>
      </Grid>

      {claseData.urlVideo &&
        <iframe
          width="560"
          height="315"
          src={claseData.urlVideo}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      }
      
      <Grid item>
        <ListDownloader seccion={claseData?.id_Secciones} codigo={claseData?.Asignaturas?.nombre} />
      </Grid>
      
    </Grid>
  );
};
