
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'

export const CoordinadoresRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard /> }/>
    </Routes>
    
  )
}


