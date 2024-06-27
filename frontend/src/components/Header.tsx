
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Header = () => {

    const [session,setSession] = useState(() =>             // true 
        localStorage.getItem('token') !== null
    );

    const navigate = useNavigate();
    const [userProfile,setuserProfile] = useState<Profile | null>(null);

    interface Profile {
        name :string,
        email : string
    }

    const logout = () => {
        localStorage.removeItem('token');
        setSession(false);
        navigate('/signin');
    }

    useEffect(() => {
        async function Profile() {   
            const res =  await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            });
            console.log('res profile =',res.data.mainuser);
            setuserProfile(res?.data.mainuser);
        }
        Profile();
    },[])


  return (
        <div className = "grid grid-cols-2 justify-between py-2 px-1 bg-neutral-100 " >
                {session ? <>
                    <div className="font-bold text-3xl px-4">
                      <Link to = "/blogs"> WriteWay! </Link>
                     </div>
                </> :
                <div>
                           <Link to = "/signup"> Kagaaz </Link>
                </div>
                }


                {session ? 
                <>
                <div style = {{display:'flex',justifyContent: 'space-evenly' }}>
                
                    <div>

                        <button type="button" className ="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <Link to = "/create" > New Blog </Link>
                        </button>

                    </div>

                    <div>
                             <div className ="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600">
                            <div className ="font-medium text-black dark:text-gray-300">
                            {userProfile?.name.toUpperCase()[0]}
                            </div>
                              </div>
                    </div>

                    <div>
                            <button onClick={logout}  type="button" className ="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> Logout
                            </button>
                    </div>

                </div>
                </> : 
                <>
                    <button type="button" className ="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    <Link to = "/signup">    Signup </Link>
                    </button>
                </>}
                
        </div>
  )
}

export default Header