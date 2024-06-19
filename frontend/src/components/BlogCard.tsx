import { Link } from "react-router-dom"

interface Blog  {
  id:number,
  title : string,
  description : string
}


const BlogCard = ({id,title,description} :Blog) => {
  return (
    <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr',padding:'5%',backgroundColor:'lightsalmon',margin:'6%'}}>
          <Link to = {`${id}`}>
            <div>
              <h3> ID is : {id} </h3>  
              <h2> {title} </h2>
            </div>

            <div>
              <h2> {description} </h2>    
            </div>
          </Link>
    </div>
  )
}

export default BlogCard