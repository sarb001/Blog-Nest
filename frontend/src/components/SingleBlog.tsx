
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import { useEffect } from 'react';

const SingleBlog = () => {

    const { id } = useParams();
    console.log('id is =',id);

    useEffect(() => {
        async function FetchsingleBlog() {   
            const res =  await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            });
            console.log('res =',res);
        }
        FetchsingleBlog();
    },[])


  return (
    <div>SingleBlog - {id} </div>
  )
}

export default SingleBlog