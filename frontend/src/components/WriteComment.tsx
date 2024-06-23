import { ChangeEvent, FormEvent, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

interface writecomment {
  postid  : string
}


const WriteComment = ({postid}:writecomment) => {
     console.log('post id =',postid);

    const [newcomment,setnewcomment] = useState('');

    const handleComment = async(e:FormEvent<HTMLFormElement>) => {
        // comment on specifc blog  
        e.preventDefault();
        console.log('new comment-',newcomment);
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
    <div style = {{margin:'3%',backgroundColor:'lightslategray',padding:'2%'}}>
        <h2> Comments </h2>
        <div>
            <form onSubmit={handleComment}>
             <input style = {{padding:'2% 5%'}} type = "text"
              placeholder='Write comment..' value = {newcomment}
             onChange  = {(e) => setnewcomment(e.target.value)}
             >  </input>
             <div>
             <button  style = {{padding:'1% 1%'}} type = "submit"> Comment </button>
             </div>
            </form>
        </div>
    </div>
  )
}

export default WriteComment