import { Button } from '@mui/material'


export const ResultSearch =()=>{
    
    return(
        
        <div  style={{marginTop:20, marginLeft:20, marginRight:10, marginBottom:10, display:'flex', flexDirection:'row', justifyContent: 'space-evenly'  }} >
            <div className=" w-2/3">
                <input
                id="dni"
                type="text"
                placeholder="Ingrese su numero de identidad"
                className="w-full p-2 border border-black rounded"

                />
            </div>
            <div >
            <Button className="w-full " id="resultSearch" type="button" variant="contained" >
                Buscar
            </Button>
            </div>
          </div>
    )
}