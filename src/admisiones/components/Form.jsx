import { centros } from '../data/centros';
import { carreras } from '../data/carreras';
import { useForm } from 'react-hook-form';

export const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
      
      
      return (
      
            <div className="p-6 bg-card text-card-foreground flex flex-col rounded-lg shadow-md justify-between items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-xl font-bold">Llena la solicitud de inscripción</h1>
              <p className="text-muted-foreground">Completa todos los campos y se parte de nuestra comunidad</p>
              <div className="my-4 border-t border-border"></div>
              <h2 className="text-lg font-semibold">Datos Generales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1  lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
                <div>
                  <label htmlFor="numero_identidad" className="block font-medium">Numero De Identidad</label>
                  <input required id="numero_identidad" type="number" placeholder="Ingrese su numero de identidad" pattern="\d{13}" className="w-full p-2 border border-input rounded" {...register("Identidad", {required: true, minLength: 13, maxLength: 13})}/>
                </div>
                <div>
                  <label htmlFor="primer-nombre" className="block font-medium">Primer Nombre</label>
                  <input type="text" placeholder="Primer nombre" {...register("Primer nombre", {required: true, min: 3, maxLength: 12})}  className="w-full p-2 border border-input rounded" />
                </div>
                <div>
                  <label htmlFor="segundo_nombre" className="block font-medium">Segundo Nombre</label>
                  <input id="segundo_nombre" type="text" placeholder="Primer nombre" {...register("Segundo nombre", {required: true, min: 3, maxLength: 12})}  className="w-full p-2 border border-input rounded" />
                </div>
                  
                <div>
                  <label required htmlFor="primer_apellido" className="block font-medium">Primer Apellido</label>
                  <input id="primer_apellido" type="text" placeholder="Ingrese su primer apellido"  {...register("Primer apellido",{required: true, min: 3, maxLength: 12})} className="w-full p-2 border border-input rounded"/>
                </div>
                <div>
                  <label htmlFor="segundo_apellido" className="block font-medium">Segundo Apellido</label>
                  <input id="segundo_apellido" type="text" placeholder="Ingrese su segundo apellido"  {...register("Segundo apellido",{required: false, min: 3, maxLength: 12})} className="w-full p-2 border border-input rounded"/>
                </div>
                <div>
                  <label htmlFor="correo_electronico" className="block font-medium">Correo Electronico</label>
                  <input id="correo_electronico" type="email" placeholder="Ingrese su correo electronico" className="w-full p-2 border border-input rounded"  {...register("Email", {required: true, pattern: /^\S+@\S+$/i})}/>
                </div>
                {/* <div>
                  <label htmlFor="confirma-correo" className="block font-medium">Confirma Tu Correo Electronico</label>
                  <input id="confirma-correo" type="email" placeholder="Confirma tu correo" className="w-full p-2 border border-input rounded"/>
                </div> */}
              </div>
              <div className="my-4 border-t border-border"></div>
              <h2 className="text-lg font-semibold">Datos De Carrera Y Centro Regional</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="centro_regional" className="block font-medium" id='centro-regional'>Centro Regional</label>
                  <select id="centro_regional" {...register("centros", { required: true })} className="w-full p-2 border border-input rounded placeholder:slecciona" >
                    <option value="" disabled selected>{'Elegir'}</option>
                    { centros.map((centros) => (
                    <option key={centros.id} value={centros.id}>{centros.siglas}</option>
                    ))}
                    </select>
                </div>
                <div>
                  <label htmlFor="carrera_principal" className="block font-medium">Carrera Principal</label>
                  <select id="carrera_principal" {...register("carrera principal", { required: true })} className="w-full p-2 border border-input rounded">
                  <option value="" disabled selected>{'Elegir'}</option>
                  { carreras.map(( carreras ) => (
                    <option key={carreras.nombre} value={carreras.nombre}>{carreras.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="carrera_secundundefined" className="block font-medium">Carrera Secundaria</label>
                  <select id="carrera_secundundefined" {...register("carrera secundaria", { required: true })} className="w-full p-2 border border-input rounded">
                  <option value="" disabled selected>{'Elegir'}</option>
                  { carreras.map(( carreras ) => (
                    <option key={carreras.nombre} value={carreras.nombre}>{carreras.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="my-4 border-t border-border"></div>
              <h2 className="text-lg font-semibold">Subida De Certificado De Estudio</h2>
              <div className="mt-4">
                <label htmlFor="certificado_secundundaria" className="block font-medium">Suba Una Foto De Su Certificado De Estudio De Secundaria</label>
                <div className="flex items-center mt-2">
                  <input id="certificado_secundundefined" type="file" accept="image/*" className="flex-grow p-2 border border-input rounded"/>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button id='subir-foto' className="bg-primary text-primary-foreground p-2 rounded">Enviar Formulario</button>
              </div>
              </form>
            </div>
      
            
      );
}


