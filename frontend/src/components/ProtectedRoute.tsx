import React from 'react'
import { Navigate  } from 'react-router-dom' ;

interface Props  {
  children : React.ReactNode
}


const ProtectedRoute = ({children} : Props) => {

    const maintoken = localStorage.getItem('token');

    return maintoken ?  (
      children
    ) : <Navigate to = "/signin"  state = {{prevUrl : location.pathname }}  replace 
    />
}

export default ProtectedRoute