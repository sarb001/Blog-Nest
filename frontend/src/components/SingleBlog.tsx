
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import { useEffect, useState } from 'react';
import WriteComment from './WriteComment';
import Header from './Header';
import { AiFillDelete } from "react-icons/ai";

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
            <div>

                {singleblog && (
                    <div key = {id} className='flex flex-col gap-4 mx-8 my-6'>

                            <div className='grid grid-cols-2 justify-between'>
                                    <div className='text-2xl font-semibold'>  {singleblog?.title} </div> 
                                    <div className='flex justify-end'>  
                                        { id && <button className='p-2 bg-slate-500 rounded-lg'
                                        onClick={() => DeleteBlog(id)}> <AiFillDelete color='red'
                                        className='text-2xl'
                                        /> 
                                        </button> }
                                    </div>
                            </div>

                            <div className='flex flex-row items-center'>
                                <div className ="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600">
                                        <div className ="font-medium text-black dark:text-gray-300">
                                        JL 
                                        </div>
                                </div>
                                <div className='pl-4 text-xl font-bold'>  {singleblog?.user?.name} </div>
                                <div className='pl-4'> 
                                    {formatDate(singleblog?.publishedDate)} 
                                </div>
                            </div>
                        
                            <div className='mt-5'>
                                <div> 
                                <img src = {singleblog?.imageUrl} 
                                style = {{width:'100%',height:'15%',objectFit:'cover'}} /> 
                                </div>
                            </div>

                            <div>
                                <div className='text-xl font-medium'> {singleblog?.description} </div>
                            </div>

                            <div>
                                Comments 
                            </div>

                   </div>

                )}





                {/* <div>

            {/*  Write comments  */}

                        {/* <div>
                        { id && <WriteComment  postid = {id} />}
                        </div> */}

            {/* fetch all */}
{/* 
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
                        </div> */}

                {/* </div> */}

            </div>
       </>
  )
}

export default SingleBlog


function  formatDate(date : string){
    const maindate = new Date(date);
    return maindate.toDateString();
}