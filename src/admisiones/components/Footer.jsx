import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";

export const Footer = ()=> {
    return (
        <Paper sx={{marginTop: 'calc(10% + 60px)',
            bottom: 0,
            width: '100%',
            mt: 5,
            backgroundColor: 'transparent',

        }} component="footer" square variant="outlined"
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        my:1
                    }}
                >
                    <Typography variant="caption" color="initial">
                        <b>UNAH</b> Universidad Nacional Autónoma de Honduras
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 1 }}>
                        <Link to='https://www.facebook.com/unahoficial' target="_blank">
                            <FacebookIcon fontSize="small" sx={{ color: 'black' }} />
                        </Link>
                        <Link to='https://www.instagram.com/unahoficial' target="_blank">
                            <InstagramIcon fontSize="small" sx={{ color: 'black' }}/>
                        </Link>
                        <Link to='https://www.youtube.com/unahoficial' target="_blank">
                            <YouTubeIcon fontSize="small" sx={{ color: 'black' }}/>
                        </Link>
                        <Link to='https://www.twitter.com/UNAHOficial' target="_blank">
                            <XIcon fontSize="small" sx={{ color: 'black' }}/>
                        </Link>
                    </Box>

                    <Typography variant="caption" color="initial">
                        Derechos Reservados ©2024.
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
}