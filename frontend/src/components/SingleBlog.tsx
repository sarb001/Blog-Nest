
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import { useEffect, useState } from 'react';
import WriteComment from './WriteComment';
import Header from './Header';

const SingleBlog = () => {

     interface SingleBlog  {
        id: number ,
        title : string,
        description : string,
        imageUrl :string,
        publishedDate : string,
        user : {
            name : string
        }
      }
      
      interface Comments {
        id : string | undefined
        content  :string,
        user : {
            name :string
        }
      }

      interface Allcomments {
         allcomm : Comments[]
      }

    const [singleblog,setsingleblog] = useState<SingleBlog | null>(null);

    const [allcomment,setAllComments] = useState<Comments[]>([]);

    const { id } = useParams<string>();
    console.log('id isss -',typeof(id));

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

    useEffect(() => {
        async function GetAllComments(){
            const res =  await axios.get(`${BACKEND_URL}/api/v1/blog/comment/${id}`, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
                });
                setAllComments(res.data.comment);
            console.log(' All Commentss =',res.data.comment);
        }
        GetAllComments();
    },[])
        

  return (
        <>
          <Header /> 
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
                            <div>
                                 <span>
                                  <img src = {singleblog?.imageUrl} style = {{width:'35%',height:'15%',objectFit:'cover'}}
                                   />
                                 </span>
                            </div>
                            </>
                        )}
                    </h4>

                    </div>

                    <div>
                    { id && <WriteComment  postid = {id} />}
                    </div>
                    <div>
                        <h3> All Comments Here-  </h3>
                        <div>
                            {allcomment  && allcomment.map(i => (
                                <div key= {i?.id}>
                                    <h2> {i?.content} -- {i?.user?.name} 
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>

            <div>
                <h3> Author </h3>
                <h3> {singleblog?.user?.name} </h3> 
                <h4> Master of mirth , funniest person in kingdom  </h4>
                { id && <button 
                style = {{padding:'3%'}}
                onClick={() => DeleteBlog(id)}> Delete </button> }
            </div>

            
            </div>
       </>
  )
}

export default SingleBlog


function  formatDate(date : string){
    const maindate = new Date(date);
    return maindate.toDateString();
}