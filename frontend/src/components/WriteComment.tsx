import { ChangeEvent, FormEvent, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

interface writecomment {
  postid  : string
}


const WriteComment = ({postid}:writecomment) => {

    const [newcomment,setnewcomment] = useState('');

    const handleComment = async(e:FormEvent<HTMLFormElement>) => {
      
        e.preventDefault();
          const response =  await axios.post(`${BACKEND_URL}/api/v1/blog/comment/${postid}`,
             {  content : newcomment }, 
             {
              headers : {
                  'Authorization' : localStorage.getItem('token')
              }
            });
            alert('Comment Posted');
            window.location.reload();
            setnewcomment('');
      }

  return (
    <div className="bg-[#a5abb1] my-2 p-4">
        <div>
            <form onSubmit={handleComment}>
             <input className="w-full p-2 h-24 " type = "text"
              placeholder='Write comment..' value = {newcomment}
             onChange  = {(e) => setnewcomment(e.target.value)}
             >  </input>
             <div  className="flex justify-end pt-4">
                <button type = "submit" className ="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">  Comment </button>
             </div>
            </form>
        </div>
    </div>
  )
}

export default WriteComment