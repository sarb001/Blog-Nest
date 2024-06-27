import { Link } from "react-router-dom"

interface Blog  {
  id:number,
  title : string,
  description : string,
  publishedDate: string,
  user :{
    name : string
  }
}


//  avatar  | name | pub date 
// title 
// content sliced 

const BlogCard = ({id,title,description, publishedDate , user} : Blog) => {
  return (
          
    <Link to = {`${id}`}  style = {{display:'grid',gridTemplateRows :'1fr 1fr',textDecoration:'none'}}>
          
            <div className="flex">
            
              <div className ="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <div className ="font-medium text-gray-600 dark:text-gray-300">
                      {user.name[0].toUpperCase()}
                  </div>
              </div>

              <div className="flex flex-col ml-5">
                <div className="text-2xl font-semibold"> {user?.name} </div>
                <div> {FormatDate(publishedDate)} </div>
              </div>
                
            </div>

            <div>
                <div className="font-bold text-2xl"> {title} </div>
                <div> {description.slice(0,50) + "...."} </div>
            </div>
            
    </Link>
  )
}

export default BlogCard


function  FormatDate(date : string){
  const maindate = new Date(date);
  return maindate.toDateString();
}