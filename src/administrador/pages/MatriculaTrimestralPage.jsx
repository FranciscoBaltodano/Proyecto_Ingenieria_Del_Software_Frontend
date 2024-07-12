import { AdministradorLayout } from '../layout/AdministradorLayout'
import { Divider, Typography } from '@mui/material'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';

export const MatriculaTrimestralPage =()=>{
    return (
        <AdministradorLayout>
        <Typography variant="h5" component="h1" gutterBottom>
          Configuracion Matricula Trimestral
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />
        
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
            <div className="w-10/12" > 
            <Typography variant="h7" component="h1" gutterBottom>
            Seleccione  el PAC
            </Typography>
            <select className="w-full p-2 border border-black rounded"  >
            <option value="" disabled>Elegir</option>
            </select>
            </div>
            <div className="w-10/12">
            <Typography variant="h7" component="h1" gutterBottom>
            Fecha de inicio PAC 
            </Typography>
            <input type="date" placeholder="Ingrese su numero de identidad"
                className="w-full p-2 border border-black rounded"/>
            </div>
            <div className="w-10/12">
            <Typography variant="h7" component="h1" gutterBottom>
            Fecha de fin PAC
            </Typography>
            <input type="date" placeholder="Ingrese su numero de identidad"
                className="w-full p-2 border border-black rounded"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
            <div className="w-10/12">
              <Typography variant="h7" component="h1" gutterBottom>
              Fecha de inicio PAC 
              </Typography>
              <input type="date" placeholder="Ingrese su numero de identidad"
                  className="w-full p-2 border border-black rounded"/>
              </div>
              <div className="w-10/12">
              <Typography variant="h7" component="h1" gutterBottom>
              Fecha de fin PAC
              </Typography>
              <input type="date" placeholder="Ingrese su numero de identidad"
                  className="w-full p-2 border border-black rounded"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Hora Inicio Matricula
                </Typography>
                <input type="time" placeholder=""
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Hora Inicio Matricula
                </Typography>
                <input type="time" placeholder=""
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
            </div>
              
          </div>
          <br />
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="h7" component="h1" gutterBottom>
          Horarios matricula por indice:
          </Typography>
          <Typography variant="h7" component="h1" gutterBottom>
          Excelencia academica y primer ingreso ( 1000 a 1600)
          </Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
            <div className="w-10/12">
              <Typography variant="h7" component="h1" gutterBottom>
              Fecha matricula 
              </Typography>
              <input type="date" placeholder="Ingrese su numero de identidad"
                  className="w-full p-2 border border-black rounded"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder=" Desde"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder="Hasta"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Primer Ingreso PAA
                </Typography>
                <input type="text" placeholder="Desde"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Primer Ingreso PAA
                </Typography>
                <input type="text" placeholder="Hasta"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
              </div>           
          </div>
          <br />
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="h7" component="h1" gutterBottom>
              Estudiantes general y primer ingreso ( 0 a 999)
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
            <div className="w-10/12">
              <Typography variant="h7" component="h1" gutterBottom>
              Fecha matricula 
              </Typography>
              <input type="date" placeholder="Ingrese su numero de identidad"
                  className="w-full p-2 border border-black rounded"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder=" Desde"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder="Hasta"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Primer Ingreso PAA
                </Typography>
                <input type="text" placeholder="Desde"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Primer Ingreso PAA
                </Typography>
                <input type="text" placeholder="Hasta"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
              </div>           
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
            <div className="w-10/12">
              <Typography variant="h7" component="h1" gutterBottom>
              Fecha matricula 
              </Typography>
              <input type="date" placeholder="Ingrese su numero de identidad"
                  className="w-full p-2 border border-black rounded"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder=" Desde"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder="Hasta"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
              </div>         
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
            <div className="w-10/12">
              <Typography variant="h7" component="h1" gutterBottom>
              Fecha matricula 
              </Typography>
              <input type="date" placeholder="Ingrese su numero de identidad"
                  className="w-full p-2 border border-black rounded"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder=" Desde"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder="Hasta"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
              </div>         
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-3 " style={{ justifyContent: 'space-evenly'  }}>
            <div className="w-10/12">
              <Typography variant="h7" component="h1" gutterBottom>
              Fecha matricula 
              </Typography>
              <input type="date" placeholder="Ingrese su numero de identidad"
                  className="w-full p-2 border border-black rounded"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-2 " style={{ justifyContent: 'space-evenly'  }}>
                
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder=" Desde"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
                <div >
                <Typography variant="h7" component="h1" gutterBottom>
                Indice matricula
                </Typography>
                <input type="text" placeholder="Hasta"
                    className="w-8/12 p-2 border border-black rounded"/>
                </div>
              </div>         
          </div>
          <br />

          <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'nowrap',justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Stack direction="row" spacing={2}>
            <Button variant="contained" >
              Activar
            </Button>
            <Button variant="contained" style={{backgroundColor:'gray'}}>
              RegresSar
            </Button>
            </Stack>
          </div>
          <br />
    </AdministradorLayout>
    )
}
