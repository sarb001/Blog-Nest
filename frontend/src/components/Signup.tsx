import { ChangeEvent, ReactElement, useState } from 'react';
import  { Link } from 'react-router-dom' ;
import { SignupInput  } from 'common-types-users' ;

const Signup = () => {

    const [postinputs,setpostinputs] = useState<SignupInput>({
        name : '',
        email : '',
        password : ''
    })

    const signuphandler = () => {
        console.log("inside");
        console.log('==',postinputs.name,postinputs.email,postinputs.password);

    }
    
  return (
    <div style = {{margin:'5%',width:'30%'}}>
     <div style = {{display:'flex' ,flexDirection:'column',justifyContent:'space-between',padding:'14% 6%' ,backgroundColor:'lightgrey' , alignItems:'center' }}>

          <div> Create an Account  </div>

          <div style = {{marginTop:'1%'}}>
                <span> Already have an Account? </span>
                <Link to = "/signin"> Login  </Link>
          </div>

          <div style = {{marginTop:'2%'}}>

              <div style = {{margin:'2% 0%'}}>  
                <LabelInputs  label = "name" placeholder = "Amandeep singh" 
                value = {postinputs.name} onChange = {(e) => {
                    setpostinputs({
                        ...postinputs,
                        name : e.target.value 
                    })
                }}   />  
              </div>

              <div style = {{margin:'2% 0%'}}>  
                 <LabelInputs label = "email" placeholder = "amandeep@gmail.com" 
                 value = {postinputs.email}  onChange = {(e) => {
                    setpostinputs(c => ({
                        ...c,
                        email :e.target.value
                    }))
                }}  /> 
              </div>

             <div style = {{margin:'2% 0%'}}>  
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
                <button style = {{padding:'3% 1%'}} onClick={signuphandler}> Create Account  </button>
          </div>

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


export default Signup