import { Link } from "react-router-dom"

interface Blog  {
  id:number,
  title : string,
  description : string,
  publishedDate: string,
  author :{
    name : string
  }
}


const BlogCard = ({id,title,description, publishedDate ,  author } :Blog) => {
  return (
    <Link to = {`${id}`}  style = {{display:'grid',gridTemplateColumns:'1fr 1fr',padding:'5%',backgroundColor:'lightsalmon',margin:'6%',textDecoration:'none'}}>
          
            <div>
              <h2> {title} </h2>
              <h2> {description} </h2>    
            </div>

            <div>
              <h4> {FormatDate(publishedDate)} </h4>
              <h3> {author?.name} </h3>
            </div>
            
    </Link>
  )
}

export default BlogCard


function  FormatDate(date : string){
  const maindate = new Date(date);
  return maindate.toDateString();
}