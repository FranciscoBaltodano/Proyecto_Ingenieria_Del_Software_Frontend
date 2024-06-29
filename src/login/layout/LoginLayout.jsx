import { Grid, Typography } from "@mui/material"

export const LoginLayout = ( { children } ) => {
    return (
        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{   
                minHeight: '100vh',
                backgroundImage:'url(./assets/login_bg.svg)' ,
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
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
                xs={ 3 }
                sx={{ 
                    backgroundColor: '#fffffff2', 
                    padding: 3, 
                    borderRadius: 2, 
                    width:{ sm: 450 }, 
                    boxShadow:'1px 1px 5px 1px #00000030'
                }}        
            >
                <img src="/assets/logoUNAHconLetras.png" alt="" width='180px'  />
                
                { children }
            </Grid>
        </Grid>
    )
}

