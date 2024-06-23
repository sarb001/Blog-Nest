
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Header = () => {

    const [session,setSession] = useState(() => 
        localStorage.getItem('token') !== null
    );
    const navigate = useNavigate();

    interface Profile {
        name :string,
        email : string
    }

    const [userProfile,setuserProfile] = useState<Profile | null>(null);

    const logout = () => {
        localStorage.removeItem('token');
        setSession(!session);
        navigate('/signin');
    }

    useEffect(() => {
        async function Profile() {   
            const res =  await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            });
            console.log('res =',res.data.mainuser);
            setuserProfile(res?.data.mainuser);
        }
        Profile();
    },[])


  return (
        <div style = {{display:'grid' ,gridTemplateColumns:'1fr 1fr' ,justifyContent:'space-between',margin:'2%'}}>
                {session ? <>
                    <div>
                      <Link to = "/blogs"> Kagaaz </Link>
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
                            Name is -  {userProfile?.email}
                        </div>

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