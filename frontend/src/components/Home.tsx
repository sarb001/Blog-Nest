import { Link } from "react-router-dom"
import Header from "./Header"


const Home = () => {
  return (
    <>
      <div className="m-0">
         <Header/>

         <div className="m-2 grid gap-12  xl:grid-cols-2">

            <div className="mt-14">
              <div className="text-4xl px-6 font-bold flex justify-center md:text-5xl md:px-24">
                Your Platform to Share Stories and Idea
              </div>

              <div className="px-6 py-4 text-xl md:px-24">
                Writeway provides the perfect platform to share your stories, ideas, and expertise with a vibrant community of readers and writers. 
              </div>

              <div className="my-5 mx-10 flex justify-center">
                <button className="bg-black text-white px-4 py-2 border-2 border-r-8  border-black drop-shadow-2xl">
                  <Link to = "/blogs">  Explore Blogs </Link>
                </button>
              </div>

            </div>

            <div className="px-6 md:py-5 md:flex md:justify-center">
               <img src = "/src//assets/writeway.jpg"  className="md:w-2/3 md:object-cover lg:w-1/3 xl:w-10/12 xl:p-5"  alt = "main-image" />
            </div>
         </div>

      </div> 
    </>
  )
}

export default Home