import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export const NoticiasTable2 = ({ noticias, setNoticiaSeleccionada, handleDelete, noticiaSeleccionada, handleCancel }) => {
  const columns = [
    { field: 'id_noticia', headerName: 'ID', width: 90 },
    { field: 'titulo', headerName: 'Título', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 300 },
    { field: 'imagen', headerName: 'Imagen', width: 200,
      renderCell: (params) => (
          <img src={params.value} alt={params.value} style={{ width: '100%' }} />
      ),
     },
    { field: 'fecha_creacion', headerName: 'Fecha', width: 200,
      renderCell: (params) => (
        new Date(params.value).toLocaleDateString()
      ),
     },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => setNoticiaSeleccionada(params.row)}
            disabled={noticiaSeleccionada && noticiaSeleccionada.id_noticia === params.row.id_noticia}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id_noticia)}
            disabled={noticiaSeleccionada && noticiaSeleccionada.id_noticia === params.row.id_noticia}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={noticias}
        getRowId={(row) => row.id_noticia}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        // slots={{
        //   toolbar: () => <CustomToolbar />,
        // }}
      />
    </div>
  );
};



// function CustomToolbar() {
  //   return (
  //     <GridToolbarContainer>
  //       <GridToolbarExport
  //         csvOptions={{ 
  //           delimiter: ';', 
  //           utf8WithBom: true, 
  //         }} 
  //       />
  //     </GridToolbarContainer>
  //   );
  // }