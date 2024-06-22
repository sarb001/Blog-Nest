import { useState } from "react"


const WriteComment = () => {

    const [newcomment,setnewcomment] = useState('');

    const handleComment = () => {
        // comment on specifc blog  
    }

  return (
    <div style = {{margin:'3%',backgroundColor:'lightslategray',padding:'2%'}}>
        <h2> Comments </h2>
        <div>
            <form onSubmit={handleComment}>
             <textarea placeholder='Write comment..'>  </textarea>
             <button  style = {{padding:'1% 1%'}} type = "submit"> Comment </button>
            </form>
        </div>
    </div>
  )
}

export default WriteComment