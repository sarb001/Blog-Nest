
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import { useEffect, useState } from 'react';
import WriteComment from './WriteComment';

const SingleBlog = () => {

     interface SingleBlog  {
        id: number  ,
        title : string,
        description : string,
        publishedDate : string,
        author : {
            name : string
        }
      }
      
    const [singleblog,setsingleblog] = useState<SingleBlog | null>(null);

    const { id } = useParams<string>();
    console.log('id is -',typeof(id));

    const navigate = useNavigate();

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

    const DeleteBlog = async(id:string) => {
        try {
            console.log('Specifc User id is=',id);
            const res =  await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            });
            console.log('res =',res.data.blog);
            alert('Blog Deleted');
            navigate('/blogs');
        } catch (error) {
            alert('Not Autorized to Delete')
        }
    }

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

            <div>
                <WriteComment />
            </div>
     </div>

     <div>
         <h3> Author </h3>
         <h3> {singleblog?.author?.name} </h3> 
         <h4> Master of mirth , funniest person in kingdom  </h4>
         { id && <button 
         style = {{padding:'3%'}}
         onClick={() => DeleteBlog(id)}> Delete </button> }
     </div>

     
    </div>
  )
}

export default SingleBlog


function  formatDate(date : string){
    const maindate = new Date(date);
    return maindate.toDateString();
}