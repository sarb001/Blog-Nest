
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import { useEffect, useState } from 'react';
import WriteComment from './WriteComment';
import Header from './Header';
import { AiFillDelete } from "react-icons/ai";
import Loader from './Loader';

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


    const [singleblog,setsingleblog] = useState<SingleBlog | null>(null);
    const [loading,setloading] = useState(true);
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
            setsingleblog(res?.data?.blog);
            setloading(false);
        }
        FetchsingleBlog();
    },[id]);

    const DeleteBlog = async(id:string) => {
        try {
            const res =  await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            });
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
        }
        GetAllComments();
    },[])

    if(loading) return (
        <div className='flex flex-col justify-center items-center'>
          <Loader />
        </div>
    )

  return (
        <>
          <Header /> 
            <div>

                {singleblog && (
                    <div key = {id} className='flex flex-col gap-4 mx-8 my-6 lg:px-44 '>

                            <div className='grid grid-cols-[1.8fr,0.2fr] justify-between'>
                                    <div className='text-2xl font-semibold lg:text-3xl'>  {singleblog?.title} </div> 
                                    <div className='flex justify-end'>  
                                        { id && <button className='p-2 bg-slate-700  rounded-lg'
                                        onClick={() => DeleteBlog(id)}> 
                                        <AiFillDelete color='red'
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
                                <div className='md:flex md:items-center '> 
                                <img src = {singleblog?.imageUrl} 
                                className='w-full md:w-3/4 h-full lg:w-3/12  object-cover' /> 
                                </div>
                            </div>

                            <div className='my-5'>
                                <div className='text-xl font-medium'> {singleblog?.description} </div>
                            </div>

                            <div className='my-2  md:mr-48'>
                                 <div className='text-2xl font-bold'> Comments </div>
                                { id && <WriteComment  postid = {id} />}
                            </div>

                            <div>
                                {allcomment  && allcomment.map(i => (
                            <div>
            
                                    <div className='flex flex-row items-center'>
                                        <div className ="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600">
                                            <div className ="font-medium text-black dark:text-gray-300">
                                                        {i?.user?.name[0].toUpperCase()} 
                                            </div>
                                        </div>
                                        
                                        <div className='px-2 text-[18px] font-bold '>  {i?.user?.name} </div> 
                                    </div>

                                    <div key= {i?.id} className='flex flex-col gap-5 my-3'>
                                                <div>  {i?.content} </div> 
                                    </div>
                                 
                               </div>
                                ))}
                            </div>

                   </div>

                )}
                
            </div>
       </>
  )
}

export default SingleBlog


function  formatDate(date : string){
    const maindate = new Date(date);
    return maindate.toDateString();
}