import { Box } from '@mui/material';
import { Sidebar } from '../components/Sidebar';
import { Profile } from '../components/Profile';
import { EstudianteLayout } from '../layout/EstudianteLayout';

export const Dashboard = () => {
  return (
    <EstudianteLayout>
      <Box sx={{ display: 'flex' }}>
        <Profile />
      </Box>
    </EstudianteLayout>
  );
}