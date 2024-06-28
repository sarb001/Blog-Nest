import React, { useEffect } from 'react'
import axios from 'axios' ;
import { BACKEND_URL } from '../config';

const GetComments = () => {

    useEffect(() => {
        async function GetAllComments(){
            const res =  await axios.get(`${BACKEND_URL}/api/v1/blog`, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
                });222
        }
        GetAllComments();
    },[])

  return (
    <div>GetComments</div>
  )
}

export default GetComments