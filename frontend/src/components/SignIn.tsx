
import { ChangeEvent, ReactElement, useState } from 'react';
import  { Link } from 'react-router-dom' ;
import { SignInValidation  } from 'common-types-users' ;


const SignIn = () => {

    const [postinputs,setpostinputs] = useState<SignInValidation>({
        email : '',
        password : ''
    })

    const loginhandler = () => {
        console.log("inside login");
        console.log('==',postinputs.email,postinputs.password);
    }

    
  return (
    <>
     <div>
          <div>  Login Now </div>
          <div>
                <span> Create New Account  </span>
                <Link to = "/signup"> Signup  </Link>
          </div>

          <div>
              <div>  
                 <LabelInputs label = "email" placeholder = "amandeep@gmail.com" 
                 value = {postinputs.email}  onChange = {(e) => {
                    setpostinputs(c => ({
                        ...c,
                        email :e.target.value
                    }))
                }}  /> 
              </div>

             <div>  
                <LabelInputs label = "password" placeholder = "amandeep"  
                value = {postinputs.password} onChange = {(e) => {
                    setpostinputs(c => ({
                        ...c,
                        password :e.target.value
                    }))
                }}  />  
             </div>

          </div>

            <div>
                <button onClick={loginhandler}> Login Now </button>
            </div>

     </div>
    </>
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