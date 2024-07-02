import { Box } from '@mui/material';
import { Sidebar } from '../components/Sidebar';
import { Profile } from '../components/Profile';

export const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Profile />
    </Box>
  );
}