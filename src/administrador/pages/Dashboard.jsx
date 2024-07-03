
import { Box } from '@mui/material';
import { Sidebar } from '../components/Sidebar';
import { Profile } from '../components/Profile';
import { AdministradorLayout } from '../layout/AdministradorLayout';

export const Dashboard = () => {
  return (
    <AdministradorLayout>
      <Profile />
    </AdministradorLayout>
  );
}
