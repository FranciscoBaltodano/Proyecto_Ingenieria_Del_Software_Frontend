import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{   
        minHeight: '100vh',
        padding: 2
      }}
    >
      <Grid 
        item
        className="box-shadow"
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        xs={3}
        sx={{ 
          backgroundColor: '#fffffff2', 
          padding: 3, 
          borderRadius: 2, 
          width:{ sm: 450 }, 
          boxShadow:'1px 1px 5px 1px #00000030'
        }}        
      >
        <img 
          src="/assets/logoUNAHconLetras.webp" 
          alt="Logo UNAH" 
          width='180px' 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        />
        <Grid mt='20px'>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};
