// import React from 'react'
// import { useForm } from 'react-hook-form';


// export const Solicitud = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
//   console.log(errors);
  
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
      
//         <div className='flex justify-center items-center flex-row'> 
//             <select {...register("Nacionalidad", { required: true })}>
//         <option value="hondureña">hondureña</option>
//         <option value="salvadoreña">salvadoreña</option>
//         <option value="guatemalteca">guatemalteca</option>
//         <option value="nicaragüense">nicaragüense</option>
//         </select>
//          <input type="number" placeholder="Identidad" {...register("Identidad", {required: true, maxLength: 13})} />
//          <input type="number" placeholder="Confirma tu número de identidad" {...register("Confirma tu número de identidad", { maxLength: 13, pattern: /Identidad/i})} />

//       <input type="submit" />
//         </div>
    
//     </form>
//   );
// }
import React from 'react'
import { useForm } from 'react-hook-form';

export const Solicitud = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
   console.log(errors);
  return (
  
    <form onSubmit={handleSubmit(onSubmit)}>
      
           <div className='flex justify-center items-center flex-row'> 
                <select {...register("Nacionalidad", { required: true })}>
            <option value="hondureña">hondureña</option>
            <option value="salvadoreña">salvadoreña</option>
            <option value="guatemalteca">guatemalteca</option>
         <option value="nicaragüense">nicaragüense</option>
         </select>
              <input type="number" placeholder="Identidad" {...register("Identidad", {required: true, maxLength: 13})} />
           <input type="number" placeholder="Confirma tu número de identidad" {...register("Confirma tu número de identidad", { maxLength: 13, pattern: /Identidad/i})} />
    
           <input type="submit" />
           </div>
        
         </form>
  

  );
}

