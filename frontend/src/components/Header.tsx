
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";

const Header = () => {

    const [session,setSession] = useState(true);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setSession(false);
        navigate('/signin');
    }

  return (
        <div style = {{display:'grid' ,gridTemplateColumns:'1fr 1fr' ,justifyContent:'space-between',margin:'2%'}}>
                {session ? <>
                    <div>
                      <Link to = "/"> Kagaaz </Link>
                     </div>
                </> :
                <div>
                           <Link to = "/signup"> Kagaaz </Link>
                </div>
                }
                {session ? 
                <>
                <div style = {{display:'flex',justifyContent:'end' }}>
                    <button onClick={logout} style={{padding:'1% 3%'}}> Logout </button>
                    <div>
                        <Link to = "/create" > Write Now </Link>
                    </div>
                </div>
                </> : 
                <>
                    <Link to = "/signup">
                      <button> Signup </button>
                    </Link>
                </>}
                
        </div>
  )
}

export default Header