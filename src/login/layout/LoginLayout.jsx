import { Grid, Typography } from "@mui/material"

export const LoginLayout = ( { children } ) => {
    return (
        <Grid
            container
            spacing={ 0 }
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{   
                minHeight: '100vh',
                backgroundImage: {xs:'none', sm:'url(./assets/login_bg.svg)'} ,
                backgroundSize: 'cover',
                backgroundPosition: 'center', // Centra la imagen
                padding: 4
            }}
        >
            <Grid 
                item
                className="box-shadow"
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                xs={ 3 }
                sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, width:{ sm: 450 } }}        
            >
                <img src="/assets/logoUNAHconLetras.png" alt="" width='180px'  />
                { children }
            </Grid>

        </Grid>
    )
}

