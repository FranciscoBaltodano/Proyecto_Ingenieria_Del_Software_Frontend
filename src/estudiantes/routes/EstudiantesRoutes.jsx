
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'

export const EstudiantesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard /> }/>
    </Routes>
  )
}




