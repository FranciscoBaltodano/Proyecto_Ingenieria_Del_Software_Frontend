import { Box } from '@mui/material';
import { Sidebar } from '../components/Sidebar';
import { Profile } from '../components/Profile';
import { DocenteLayout } from '../../layout/DocenteLayout';

export const Dashboard = () => {
  return (
    <DocenteLayout>
      <Profile />
    </DocenteLayout>
  );
}