import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Signup"
import SignIn from "./components/SignIn"
import Home from "./components/Home"
import Blogs from "./components/Blogs"
import SingleBlog from "./components/SingleBlog"
import CreateBlog from "./components/CreateBlog"
import ProtectedRoute from './components/ProtectedRoute'
// import dotenv from 'dotenv' ;

// dotenv.config();

function App() {

  return (
      <>
      <BrowserRouter>
         <Routes>
           <Route path="/" element = { <ProtectedRoute> <Home /> </ProtectedRoute>}> 
           </Route>
           <Route path="/signup" element = {<Signup />}>  </Route>
           <Route path="/signin" element = {<SignIn />}>  </Route>
           
           <Route path="/blogs" element = {
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
            }>  </Route>
           <Route path="/create" element = { 
             <ProtectedRoute>
                <CreateBlog />
             </ProtectedRoute>
            }>  </Route>
           <Route path="blogs/:id" element = {
              <ProtectedRoute>
                <SingleBlog /> 
              </ProtectedRoute>
            }>  </Route>
         
         </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
