import { Divider, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


export const Calendario = () => {
  return (
    <div  >
      <Typography variant="h5" component="h1" gutterBottom>
        Calendario
      </Typography>
      <div style={{ justifyContent: 'center',  display: 'flex',flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }} >
        <Card className=" w-4/6 p-2 border border-black rounded">
        <CardActionArea >
          <CardContent >
            <div >
              <div>
              <Typography gutterBottom variant="h6" component="div">
              Calendario Matricula I PAC 2024 
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
              Todas Las Carreras
              </Typography>
              </div>
              </div>
              <Typography gutterBottom variant="h6" component="div">
              Todas Las Carreras
              </Typography>
              <div>
                
              </div>
            
            
            
          </CardContent>
        </CardActionArea>
      </Card>
        
    </div>
  </div>
      
   
  )
}