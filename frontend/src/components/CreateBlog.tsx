import {  useState } from "react";
import ReactQuill  from "react-quill";
import 'react-quill/dist/quill.snow.css'
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const navigate = useNavigate();

    const [loading,setloading] = useState(false);

     const handlepost = async() => {
        console.log('title===',title);
        console.log('Desc =',description);
            setloading(true);
            const res =  await axios.post(`${BACKEND_URL}/api/v1/blog/createblog`, {
                title,
                description 
            },{
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            });
            setloading(false);
            console.log('res =',res.data);
            alert('Post Created');
            setTitle('');
            setDescription('');
            navigate('/blogs');
     }


  return (
    <div style = {{margin:'3%'}}> 
        <div>
            <label> Enter Title  </label>
            <input type = "text" placeholder="Enter Text..." 
            value = {title} onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div>
            <ReactQuill 
                modules = {module}
                theme="snow" 
                value={!description ? '<br>' : `<p>${description}</p>`} 
                className="custom-quill"
                onChange={(val: string) => {
                    setDescription(val?.replace(/<\/?p[^>]*>/g, '').replace('<br>', ''));
                  }}
                placeholder="Write an article....."
                />
        </div>
        
        <div style = {{margin:'3%'}}>
            <button style = {{padding:'1% 3%'}} 
             type = "submit" 
             onClick={handlepost}>
                {loading ?  "Publishing...." : " Publish Post" } 
              </button>
        </div>
    </div>
  )
}

var toolBarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

const module =  {
    toolbar : toolBarOptions
}

export default CreateBlog