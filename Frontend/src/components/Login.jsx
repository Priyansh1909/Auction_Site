import React, { useState } from 'react'
import '../css/Login_Signup.css'
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import { Link} from 'react-router-dom'

function Login() {

    
    // Setting up Variable

    const [Email,SetEmail] = useState('')
    const [Password,SetPassword] = useState('')
    const [Alert,SetAlert] = useState('')
    const SignIn = useSignIn()


    // Setting up Login Function
    const Login = (e)=>{

        e.preventDefault()


    // Validating Inputs Before Sending Request to Backend
        if (Email == ''){

            SetAlert(
                <div className="alert alert-danger" id='alert_login' role="alert">
                Email input is Empty
                </div>
            )
            return 

        }
        else if (Password.length <= 7){
            SetAlert(
                <div className="alert alert-danger" id='alert_login' role="alert">
                Password should be greater than 7 letters
                </div>
            )
            return 
        }

    //SENDING EMAIL AND PASSWORD TO BACKEND

        axios.post('http://localhost:8000/login',{
            Email:Email,
            Password:Password
        }).then((result)=>{
            if (result.data.Status == false){
                SetAlert(
                    <div className="alert alert-danger" id='alert_login' role="alert">
                        {result.data.message}
                    </div>
                )
            }
            else{
                if (SignIn({
                            token: result.data.Token,
                            expiresIn:3600,
                            tokenType: "Bearer",
                            authState: {Email:Email },
                        })
                    ){
                        location.reload()

                }

            }
        })


    }




  return (
    <>
    <div  className='Background_Login_Signup'>
        

        <div  className='Login_Signup_Container'>
            <div className='Login_Signup_Heading'>
                Login Page
            </div>
            
            <div>
                <form>
                    <div className='Login_Signup_Details'>
                        <label className='form_label'>
                            <span>Email: </span>
                            <input type='text' className='input_Details' onChange={(e)=>SetEmail(e.target.value)} />
                        </label>
                        <label className='form_label'>
                            <span>Password:</span> 
                            <input type='password' className='input_Details' onChange={(e)=>SetPassword(e.target.value)} />
                        </label>
                        
                        <button className='Login_Signup_button' onClick={(e)=>Login(e)}>Login</button>
                    
                    </div>
                    
                </form>

            </div>
            <div>
                Don't have an Account, Sign up <Link to="/signup">Here</Link>
            </div>
            <div>
                {Alert}
            </div>

        </div>
        </div>

    </>
  )
}

export default Login