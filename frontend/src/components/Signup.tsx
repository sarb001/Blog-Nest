import { ChangeEvent  , useState } from 'react';
import  { Link, useNavigate } from 'react-router-dom' ;
import { SignupInput  } from 'common-types-users' ;
import axios from 'axios' ;
import { BACKEND_URL } from '../config';
import Quote from './Quote';


const Signup = () => {

    const [postinputs,setpostinputs] = useState<SignupInput>({
        name : '',
        email : '',
        password : ''
    })

    const navigate = useNavigate();

    const signuphandler = async() => {
        try {
            if(postinputs.email == '' || postinputs.name == '' || postinputs.password == ''){
                alert(' Enter Data in All Fields ');
            }
            else{
                const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup` , 
                    postinputs
               );
               console.log('res= ',res);
               alert('Account Created');
               navigate('/signin')
            }
        } catch (error) {
            console.log('Signup error ');
        }
    }
       

    
  return (
    <div className='grid  grid-cols-1 lg:grid-cols-2' >

         <div className='flex flex-col justify-center items-center px-6 h-screen lg:px-36'>
                <div className='flex flex-col justify-center'>

                    <div>
               
                    <div>
                        <div className='font-bold text-3xl'> Welcome to WriteWay! </div>

                        <div className='font-bold text-3xl mt-2'> Create an account  </div>
                        
                            <div  className = 'font-medium text-[14px] mt-4 text-slate-500'>
                                <span> Already have an account ? </span>
                                <span>
                                    <Link to = "/signin"> Sign In </Link>
                                </span>
                            </div>
                            
                    </div>

                    <div className='py-4'>

                        <div>  
                        <LabelInputs  label = "Name" placeholder = "Amandeep singh" 
                        value = {postinputs.name} onChange = {(e) => {
                            setpostinputs({
                                ...postinputs,
                                name : e.target.value 
                            })
                        }}   />  
                        </div>

                        <div>  
                            <LabelInputs label = "Email" placeholder = "amandeep@gmail.com" 
                            value = {postinputs.email}  onChange = {(e) => {
                                setpostinputs(c => ({
                                    ...c,
                                    email :e.target.value
                                }))
                            }}  /> 
                        </div>

                        <div>  
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
                            <button className='py-1.5 rounded-lg  w-full bg-black text-white px-4' onClick={signuphandler}> SignUp </button>
                        </div>
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
        <>
         <label> {label} </label>
         <input type = "text" placeholder = {placeholder}  value = {value}
          className='p-2 w-full bg-slate-200 rounded-lg border-black focus:border-2'
         onChange = {onChange}  />
        </>
    )
}


export default Signup