
import axios from 'axios';
import BlogCard from './BlogCard';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

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
    <div style = {{margin:'2%',display:'flex'}}>
      <h3> All Blogs  </h3>
      <div style = {{margin:'3%'}}>
         {blog && blog?.map((i:Blog) => (
            <div key = {i?.id}>
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
