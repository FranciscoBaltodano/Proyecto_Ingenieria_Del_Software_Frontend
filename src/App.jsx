import { AppRouter } from './router/AppRouter';
import { Grid } from '@mui/material';
import SessionManager from './components/SessionManager';
function App() {

  return (
    <>
    <SessionManager>
      <AppRouter />
    </SessionManager>
        
    </>
  );
}

export default App
