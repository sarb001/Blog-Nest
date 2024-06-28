
import { ChangeEvent, ReactElement, useState } from 'react';
import  { Link, useNavigate } from 'react-router-dom' ;
import { SignInValidation  } from 'common-types-users' ;
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Quote from './Quote';

const SignIn = () => {

    const [postinputs,setpostinputs] = useState<SignInValidation>({
        email : '',
        password : ''
    })

    const navigate = useNavigate();

    const loginhandler = async() => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/login` , postinputs);

        if(res.data.token){   
            localStorage.setItem('token',res.data.token);
            navigate('/blogs');
            alert(' Loggedin Successfully ');
        }else{
            alert(' User not Existed ');
        }
    }

    const Guestcredentials = () => {
        setpostinputs({
            email : 'guestcredentials@gmail.com',
            password :'guestcredentials'
        })
    }

  return (
    <div className='grid  grid-cols-1 lg:grid-cols-2' >

            <div className='flex flex-col justify-center items-center px-6 h-screen lg:px-36'>

                <div className='flex flex-col justify-center'>

                    <div>
                        <div className='font-bold text-3xl'> Welcome to WriteWay! </div>

                        <div className='font-bold text-3xl mt-2'> Create an account  </div>
                        
                            <div  className = 'font-medium text-[14px] mt-4 text-slate-500'>
                                <span> Don't have an account ? </span>
                                <span>
                                    <Link to = "/signup"> Sign Up </Link>
                                </span>
                            </div>
                            
                    </div>

                    <div className='py-4'>
                            <div>  
                                <LabelInputs label = "Email" placeholder = "amandeep@gmail.com" 
                                value = {postinputs.email}  onChange = {(e) => {
                                    setpostinputs(c => ({
                                        ...c,
                                        email :e.target.value
                                    }))
                                }}  /> 
                            </div>

                            <div className='pt-4'>  
                                <LabelInputs label = "Password" placeholder = "amandeep"  
                                value = {postinputs.password} onChange = {(e) => {
                                    setpostinputs(c => ({
                                        ...c,
                                        password :e.target.value
                                    }))
                                }}  />  
                            </div>

                    </div>

                    <div>
                        <div className='py-4'>
                            <button className='py-1.5 rounded-lg  w-full bg-black text-white px-4' onClick={loginhandler}> Login Now </button>
                        </div>

                        <div className='py-4'>
                            <button className='py-1.5 rounded-lg w-full bg-black text-white px-4'  onClick={Guestcredentials}>   Guest Credentials </button>
                        </div>

                    </div>
                    </div>

            </div>

            <div className='lg:block hidden'>
                <Quote />
            </div>

    </div>
  )
}

type Label = {
    label : string ,
    placeholder : string,
    value : string,
    onChange : (e:ChangeEvent<HTMLInputElement>) => void;
}

const  LabelInputs = ({label, placeholder ,value , onChange} : Label) => {
    return (
        <div>
            <div>  <label> {label} </label>  </div>

        <div>
            <input
            className='p-2 w-full bg-slate-200 rounded-lg border-black focus:border-2'
            type = "text" placeholder = {placeholder}  value = {value}
            onChange = {onChange}  />
        </div>
        </div>
    )
}



export default SignIn