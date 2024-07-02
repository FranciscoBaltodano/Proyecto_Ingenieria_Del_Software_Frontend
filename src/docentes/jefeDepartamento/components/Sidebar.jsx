
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Chat, Class, Grade, Person } from '@mui/icons-material';

export const Sidebar = () => {
  return (
    <div style={{ width: '250px', backgroundColor: '#f8f9fa', height: '100vh', paddingTop: '20px' }}>
      <img src="assets/logoUNAH.png" alt="UNAH Logo" style={{ width: '80%', margin: '0 auto', display: 'block' }} />
      <List>
        <ListItem button>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Mi Perfil" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Chat /></ListItemIcon>
          <ListItemText primary="Chats" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Class /></ListItemIcon>
          <ListItemText primary="Mis clases" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Grade /></ListItemIcon>
          <ListItemText primary="Notas" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Solicitudes" />
        </ListItem>
      </List>
      <ListItem button>
        <ListItemText primary="Log out" />
      </ListItem>
    </div>
  );
}
