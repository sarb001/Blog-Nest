import { Link } from "react-router-dom"


const Home = () => {
  return (
    <>
      <div style = {{margin:'1% 5%'}}>
            <h2> Welcome to WriteWay! </h2>
            <div className="bg-red-500">
              <button>
                <Link to = "/blogs">  Explore Blogs </Link>
              </button>
            </div>
      </div> 
    </>
  )
}

export default Home