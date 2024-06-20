
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import { useEffect, useState } from 'react';

const SingleBlog = () => {

     interface SingleBlog  {
        id:number,
        title : string,
        description : string,
        publishedDate : string,
      }
      
    const [singleblog,setsingleblog] = useState<SingleBlog | null>(null);

    const { id } = useParams();
    console.log('id is =',id);

    useEffect(() => {
        async function FetchsingleBlog() {   
            const res =  await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            });
            console.log('res =',res.data.blog);
            setsingleblog(res?.data?.blog);
        }
        FetchsingleBlog();
    },[id]);

  return (
    <div style = {{padding:'4% 5%'}}>
     <div>
            <div key = {id}>
             <h4> 
                {singleblog && (
                    <>
                        <div key = {singleblog?.id}>
                        <h3>  {singleblog?.title} </h3>    
                        <h3> {singleblog?.description} </h3>    
                        <h3> Posted on  {formatDate(singleblog?.publishedDate)} </h3>    
                    </div>
                    </>
                )}
            </h4>
            </div>
     </div>
    </div>
  )
}

export default SingleBlog


function  formatDate(date : string){
    const maindate = new Date(date);
    return maindate.toDateString();
}