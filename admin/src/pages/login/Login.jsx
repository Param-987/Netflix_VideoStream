import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { login } from '../../context/authContext/apiCall'
import { authContext } from '../../context/authContext/AuthContext'
import './login.css'

const Login = () => {

  const {isFetching,dispatch} = useContext(authContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleClick = (e) =>{
    e.preventDefault()
    login({email,password},dispatch)
  }

  return (
    <div className='login'>
        <form className="loginForm">
            <input type="text" placeholder ="email" className="loginInput" 
            onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder ="password" className="loginInput"
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button
            className="loginButton" 
            onClick={handleClick}
            disabled = {isFetching}
            
            >
              Login
            </button>
        </form>
    </div>
  )
}

export default Login