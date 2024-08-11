
import { LoginLayout } from "../layout/LoginLayout";
import { LoginForm } from '../components/LoginForm';
import { Navbar } from "../components/Navbar";
import { Grid } from "@mui/material";

export const LoginPage = () => {
  return (
    <LoginLayout>
      <Grid sx={{ position:'fixed'}} container>
      <Navbar />
      </Grid>
      <LoginForm />
    </LoginLayout>
  );
};
