import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Signup"
import SignIn from "./components/SignIn"
import Home from "./components/Home"
import Blogs from "./components/Blogs"
import SingleBlog from "./components/SingleBlog"
import CreateBlog from "./components/CreateBlog"
import Header from "./components/Header"


function App() {

  return (
      <>
      <BrowserRouter>
      <Header />
         <Routes>
           <Route path="/" element = {<Home />}>  </Route>
           <Route path="/signup" element = {<Signup />}>  </Route>
           <Route path="/signin" element = {<SignIn />}>  </Route>
           <Route path="/blogs" element = {<Blogs />}>  </Route>
           <Route path="/create" element = {<CreateBlog />}>  </Route>
           <Route path="blogs/:id" element = {<SingleBlog />}>  </Route>
         </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
