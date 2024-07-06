
import { Grid, Typography, Avatar, IconButton, Box } from '@mui/material';
import { Edit } from '@mui/icons-material';

export const Profile = () => {
  return (
    <Box sx={{ padding: '20px', flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" alignItems="center">
          <Avatar alt="User Photo" src="user-photo.jpg" sx={{ width: 80, height: 80 }} />
          <Typography variant="h5" sx={{ marginLeft: 2 }}>DOCENTE Enrique Alfonzo Lopez Gonzales</Typography>
          <IconButton>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1"><strong>Carrera:</strong> Ingeniería en Sistemas</Typography>
          <Typography variant="subtitle1"><strong>Indice:</strong> 85</Typography>
          <Typography variant="subtitle1"><strong>Cuenta:</strong> 20141002303</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1"><strong>Mi descripción</strong></Typography>
          <Typography variant="body1">Me llamo Enrique, estoy cursando la carrera de ingeniería en sistemas porque me apasiona la tecnología. Actualmente estoy aprendiendo Java y C++.</Typography>
          <IconButton>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1"><strong>Mi galería</strong></Typography>
          <IconButton>
            <Edit />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div style={{ width: '100%', paddingTop: '100%', backgroundColor: '#f0f0f0', position: 'relative' }}>
                <img src="photo1.jpg" alt="Gallery" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ width: '100%', paddingTop: '100%', backgroundColor: '#f0f0f0', position: 'relative' }}>
                <img src="photo2.jpg" alt="Gallery" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ width: '100%', paddingTop: '100%', backgroundColor: '#f0f0f0', position: 'relative' }}>
                <img src="photo3.jpg" alt="Gallery" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
