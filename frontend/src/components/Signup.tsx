import { ChangeEvent, ReactElement, useState } from 'react';
import  { Link } from 'react-router-dom' ;
import { SignupInput  } from 'common-types-users' ;

const Signup = () => {

    const [postinputs,setpostinputs] = useState<SignupInput>({
        name : '',
        email : '',
        password : ''
    })

  return (
    <>
     <div>
          <div> Create an Account  </div>
          <div>
                <span> Already have an Account? </span>
                <Link to = "/signin"> Login  </Link>
          </div>

          <div>
            
              <div>  
                <LabelInputs  label = "name" placeholder = "Amandeep singh" 
                value = {postinputs.name} onChange = {(e) => {
                    setpostinputs({
                        ...postinputs,
                        name : e.target.value 
                    })
                }}   />  
              </div>

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


export default Signup