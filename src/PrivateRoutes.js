import React, {useContext} from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import DataContext from './context/DataContext'


const PrivateRoutes = () => {
  const {logged} = useContext(DataContext);
  
  
  return (
    logged ? <Outlet/>: <Navigate to='/login'/>
  )
}

export default PrivateRoutes