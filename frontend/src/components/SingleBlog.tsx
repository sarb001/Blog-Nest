
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
    <div style = {{padding:'4% 5%' ,display:'grid',gridTemplateColumns:'1fr 1fr'}}>

     <div>
            <div key = {id}>
             <h4> 
                {singleblog && (
                    <>
                        <div key = {singleblog?.id}>
                            <div>
                                <h1>  {singleblog?.title} </h1>    
                                <h4> Posted on  {formatDate(singleblog?.publishedDate)} </h4>    
                            </div>
                        <h3> {singleblog?.description} </h3>    
                    </div>
                    </>
                )}
            </h4>
            </div>
     </div>

     <div>
         <h3> Author </h3>
         <h2> James Singh </h2>
         <h4> Master of mirth , funniest person in kingdom  </h4>
     </div>
    </div>
  )
}

export default SingleBlog


function  formatDate(date : string){
    const maindate = new Date(date);
    return maindate.toDateString();
}