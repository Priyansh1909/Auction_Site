import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {

    // Setting up Variable

      const [Name,SetName] = useState('')
      const [Email,SetEmail] = useState('')
      const [Password,SetPassword] = useState('')
      const [ConfirmPassword,SetConfirmPassword] = useState('')
      const [Alert,SetAlert] = useState('')

    // Setting Up Signup Function

      const Signup = (e)=>{
        e.preventDefault()

    // Validating Inputs Before Sending Request to Backend
    if (Name == ''){

        SetAlert(
            <div className="alert alert-danger" id='alert_login' role="alert">
            Name input is Empty
            </div>
        )
        return 

    }
    else if (Email == ''){

        SetAlert(
            <div className="alert alert-danger" id='alert_login' role="alert">
            Email input is Empty
            </div>
        )
        return 

    }
    else if (Password != ConfirmPassword){
        SetAlert(
            <div className="alert alert-danger" id='alert_login' role="alert">
            Password Does Not Match
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

    axios.post('http://localhost:8000/signup',{
        Name:Name,
        Email:Email,
        Password:Password,
        ConfirmPassword:ConfirmPassword
    }).then((result)=>{
        console.log(result.data)
        if (result.data.Status == false){
            SetAlert(
                <div className="alert alert-danger" id='alert_login' role="alert">
                {result.data.message}
                </div>
            )
        }
        else{
            SetAlert(
                <div className="alert alert-success" id='alert_login' role="alert">
                {result.data.message}
                </div>
            )


        }
    })


      }


  return (
    <>
    <div  className='Background_Login_Signup'>
        

        <div  className='Login_Signup_Container'>
            <div className='Login_Signup_Heading'>
                Sign Up Page
            </div>
            
            <div>
                <form>
                    <div className='Login_Signup_Details'>
                    <label className='form_label'>
                            <span>Name: </span>
                            <input type='text' className='input_Details' onChange={(e)=>SetName(e.target.value)} />
                        </label>
                        <label className='form_label'>
                            <span>Email: </span>
                            <input type='text' className='input_Details' onChange={(e)=>SetEmail(e.target.value)} />
                        </label>
                        <label className='form_label'>
                            <span>Password:</span> 
                            <input type='password' className='input_Details' onChange={(e)=>SetPassword(e.target.value)} />
                        </label>
                        <label className='form_label'>
                            <span>Confirm Password:</span> 
                            <input type='password' className='input_Details' onChange={(e)=>SetConfirmPassword(e.target.value)}/>
                        </label>
                        <button className='Login_Signup_button' onClick={(e)=>Signup(e)} >Signup</button>
                    </div>
                </form>

            </div>
            <div>
                Already Have an Account?. Login <Link to="/login">Here</Link>
            </div>
            <div>
                {Alert}
            </div>

        </div>
        </div>

    </>
  )
}

export default Register