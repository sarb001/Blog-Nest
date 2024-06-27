
import axios from 'axios';
import BlogCard from './BlogCard';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import Header from './Header';

const Blogs = () => {

   const [blog,setblog] = useState([]);
   const [loading,setloading] = useState(true);

   useEffect(() => {
      async function fetchall(){
        const headers = {
          'Authorization' : localStorage.getItem('token')
        }
        console.log('heders =',headers);
        try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
          headers
        });
        console.log('res =',res.data.AllBlogs);
        setblog(res?.data?.AllBlogs)
        setloading(false);
        } catch (error) {
          console.log('error is =',error);
       }
      }
      fetchall();
      
   },[])

   if(loading)return <h1> Loading..... </h1>

  interface Blog  {
     id:number,
     title : string,
     description : string,
     publishedDate: string,
     user : {
      name :string
     }
   }


  return (
    <>
     <Header /> 
    <div className='m-9 md:m-24'>
      <div className='flex flex-wrap items-center flex-col gap-9'>
         {blog && blog?.map((i:Blog) => (
            <div key = {i?.id} className='p-3 bg-gray-300 md:mx-6  w-[380px] md:w-[550px] lg:w-[800px]' >
              <BlogCard 
                id = {i?.id}
                title = {i?.title}  
                description = {i?.description}
                publishedDate = {i?.publishedDate}
                user = {i?.user}
              />
            </div>
         ))}
      </div>
    </div>
    </>
  )
}

export default Blogs
