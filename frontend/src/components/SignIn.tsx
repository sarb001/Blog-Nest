
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
        console.log("inside login");
        console.log('==',postinputs.email,postinputs.password);

        const res = await axios.post(`${BACKEND_URL}/api/v1/user/login` , postinputs);
        console.log('res =',res);

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
    <div className='grid grid-cols-2' >
        <div style = {{display:'flex' ,flexDirection:'column',justifyContent:'space-between', alignItems:'center' }}>
            <div>  Login Now </div>

            <div style = {{marginTop:'1%'}}>
                    <span> Create New Account  </span>
                    <Link to = "/signup"> Signup  </Link>
            </div>

            <div style = {{marginTop:'2%'}}>
                <div  style = {{margin:'2% 0%'}} >  
                    <LabelInputs label = "email" placeholder = "amandeep@gmail.com" 
                    value = {postinputs.email}  onChange = {(e) => {
                        setpostinputs(c => ({
                            ...c,
                            email :e.target.value
                        }))
                    }}  /> 
                </div>

                <div  style = {{margin:'2% 0%'}}>  
                    <LabelInputs label = "password" placeholder = "amandeep"  
                    value = {postinputs.password} onChange = {(e) => {
                        setpostinputs(c => ({
                            ...c,
                            password :e.target.value
                        }))
                    }}  />  
                </div>

            </div>

            <div style = {{marginTop:'3%'}}>
                    <button style = {{padding:'1% 1%'}} onClick={loginhandler}> Login Now </button>
            </div>

            <div style = {{marginTop:'3%'}}>
                    <button style = {{padding:'1% 1%'}} onClick={Guestcredentials}> 
                        Guest Credentials 
                    </button>
            </div>

        </div>

        <div>
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
         onChange = {onChange}  />
        </>
    )
}



export default SignIn