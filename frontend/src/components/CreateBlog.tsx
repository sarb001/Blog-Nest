
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from  'uuid' ;
import { storage } from '../firebaseconfig';
import { useState } from "react";

const CreateBlog = () => {

    const [title,setTitle] = useState ('');
    const [description,setDescription] = useState('');
    const [img,setImg] = useState(null);
    const [showimg,setShowimg]= useState('/src/assets/default-img.jpg');
    const navigate = useNavigate();

    const [loading,setloading] = useState(false);

     const handlepost = async() => 
        {
            console.log('title=',title);
            console.log('Descriptionnnn is=',description);

            if(img == null) return ;
            const spaceRef =  ref(storage ,`/mainimages/${v4()}`);

            await uploadBytes(spaceRef,img);
            const imgurl = await getDownloadURL(spaceRef);
                setloading(true);
                await axios.post(`${BACKEND_URL}/api/v1/blog/createblog`, {
                    title,
                    description,
                    imageUrl : imgurl
                },{
                    headers : {
                        'Authorization' : localStorage.getItem('token')
                    }
                });
                setloading(false);
                alert('Post Created');
                setTitle('');
                setDescription('');
                navigate('/blogs');
     }

     const changenow = (e:any) => {
        setImg(e.target.files[0]);
        setShowimg(URL.createObjectURL(e.target.files[0]));
     }


  return (
    <>
     <Header />
        <div className="mx-12 lg:mx-48 mt-4 flex flex-col justify-center h-screen gap-14 "> 

            <div className="flex flex-col items-center">
                    <div>
                    <img src = {showimg} className ="w-32 h-32 rounded-full"  alt="Rounded avatar" />
                    </div>

                    <div className="mt-5">
                        <input  type = "file"  onChange={(e) => changenow(e)} required />
                    </div>
            </div>  

            <div className="mt-5 ">

                    <div>
                        <label> Enter Title </label>
                        <input type="text"  className ="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Title..." 
                        value = {title} onChange={(e) => setTitle(e.target.value)}
                        required />
                    </div>
                    
                     <div>
                         <label> Enter Description </label>
                        <input type="text"  className ="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter Description..." 
                        value = {description} onChange={(e) => setDescription(e.target.value)}
                        required />
                    </div>
                    
                    <div className="mt-6">
                        <button type = "submit" className ="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                        onClick={handlepost} >
                            {loading ?  "Publishing...." : " Publish Post" } 
                        </button>
                    </div>

            </div>

        </div>
    </>
  )
}


export default CreateBlog