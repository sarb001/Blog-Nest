import { ChangeEvent, ReactElement, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css'

const CreateBlog = () => {

    const [Title,setTitle] = useState('');
    const [Description,setDescription] = useState('');

     const handlepost = () => {
        console.log('title===',Title);
        console.log('Desc =',Description);
     }

  return (
    <div style = {{margin:'3%'}}> 
        <div>
            <label> Enter Title  </label>
            <input type = "text" placeholder="Enter Text..." 
            value = {Title} onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div>
            <ReactQuill 
                modules = {module}
                theme="snow" 
                value={!Description ? '<br>' : `<p>${Description}</p>`} 
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
             onClick={handlepost}> Publish Post </button>
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