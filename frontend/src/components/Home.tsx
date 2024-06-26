import { Link } from "react-router-dom"


const Home = () => {
  return (
    <>
      <div style = {{margin:'1% 5%'}}>
            <h2> Welcome to WriteWay </h2>
            <button>
              <Link to = "/blogs">  Explore Blogs </Link>
            </button>
      </div> 
    </>
  )
}

export default Home