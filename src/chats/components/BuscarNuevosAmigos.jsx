import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, TextField, Paper, Grid, Modal, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PerfilView } from './PerfilView';
import { useAuth } from "../../contexts/AuthContext";

export const BuscarNuevosAmigos = () => {
    const { user } = useAuth();
    const uid = user.numeroCuenta ? user.numeroCuenta : user.numeroEmpleado;
    const [friends, setFriends] = useState([]);
    const [isFriend, setIsFriend] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Maneja la búsqueda
    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    }

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/student/usuarios');
                const { data: { data } } = response;
    
                const processedData = data.map((usuario) => {
                    // Procesar los datos del usuario
                    const uid = usuario.estudiante.length > 0 
                        ? usuario.estudiante[0].numeroCuenta 
                        : usuario.empleado.length > 0 
                            ? usuario.empleado[0].numeroEmpleado 
                            : null;
    
                    return {
                        id: usuario.id,
                        Nombre: usuario.Nombre,
                        Apellido: usuario.Apellido,
                        Imagen: usuario.Imagen,
                        uid: uid,
                    };
                });
    
                setUsuarios(processedData);
                console.log('Todos los Usuarios:', processedData);
            } catch (error) {
                setError('Error al traer a todos los usuarios');
                console.error('Error al querer traer a todos los usuarios:', error);
            } finally {
                setLoading(false);
            }
        }
    
        fetchUsuarios();
    }, []);
    

    useEffect(() => {
        const fetchFriends = async () => {
            const appId = import.meta.env.VITE_COMETCHAT_APP_ID;
            const apiKey = import.meta.env.VITE_COMETCHAT_API_KEY;
            const region = import.meta.env.VITE_COMETCHAT_REGION;
            const url = `https://${appId}.api-${region}.cometchat.io/v3/users/${uid}/friends?perPage=100&page=1`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        apikey: apiKey,
                    },
                });
                const data = await response.json();
                setFriends(data.data);
                console.log('Lista de amigos:', data.data);
            } catch (err) {
                setError('Error al cargar la lista de amigos');
                console.error('Error al cargar la lista de amigos:', err);
            }
        };
        fetchFriends();
    }, [uid]);


    // Dentro de tu componente
    const filteredUsuarios = useMemo(() => 
        usuarios.filter(usuario =>
            `${usuario.Nombre} ${usuario.Apellido}`.toLowerCase().includes(busqueda.toLowerCase())
        ),
        [usuarios, busqueda]
    );
    

    const handleRowClick = (id, uid) => {
        console.log('ID:', id);
        console.log('UID:', uid);
        if (friends.length === 0) {
            console.log('No se han cargado los amigos aún');
            return;
        }
        setIdUser(id);
        const friend = friends.find(friend => friend.uid.toString() === uid.toString());
        
        if (friend) {
            setIsFriend(true);
        } else {
            setIsFriend(false);
        }
        setModalOpen(true);
    }

    // Cierra el modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setIdUser(null);
    }

    // Define las columnas para el DataGrid
    const columns = [
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 100,
            renderCell: (params) => (
                <Avatar src={params.value || ''} />
            ),
        },
        {
            field: 'fullName',
            headerName: 'Nombre Completo',
            width: 300,
            renderCell: (params) => (
                `${params.row.Nombre} ${params.row.Apellido}`
            ),
        },
        {
            field: 'uid',
            headerName: 'UID',
            width: 200,
            renderCell: (params) => (
                params.row.uid
            ),
        },
    ];

    const rows = filteredUsuarios.map((usuario) => ({
        id: usuario.id,
        avatar: usuario.Imagen,
        Nombre: usuario.Nombre,
        Apellido: usuario.Apellido,
        uid: usuario.uid
    }));
        
    return (
        <Grid container display='flex'>
            <Grid item xs={12} >
                <TextField
                    label="Buscar usuario"
                    variant="outlined"
                    margin="normal"
                    value={busqueda}
                    onChange={handleBusqueda}
                />

                <Paper style={{ height: '70vh', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        onRowClick={(param) => handleRowClick(param.id, param.row.uid)}
                    />
                </Paper>
            </Grid>

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '1200px',
                    width: '90%',
                    bgcolor: '#EAF8FF',
                    boxShadow: 24,
                    borderRadius:'40px'
                }}>
                    {idUser && <PerfilView id_Usuario={idUser} isFriend={isFriend} />}
                </Box>
            </Modal>
        </Grid>
    );
}
