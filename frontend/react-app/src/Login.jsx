import React, { useContext, useEffect, useState } from 'react';
import image from './assets/image.png';
import { ClothesContext } from './Context/ClothesContext';
import { useNavigate } from "react-router"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {

    const navigate = useNavigate()

    const {users, isLoggedIn, setIsLoggedIn} = useContext(ClothesContext)
    
    const[email, setemail] = useState("")
    const[password, setpwd] = useState("")

    
    

    const loginHandler = async() => {
      

        const user = {
          email,
          password
        }

        if (!user.email || !user.password) {
          toast.warning("Fill all the Fields")
          return
        }

        // let res;
        // const token = localStorage.getItem('token')
        // try {
        //   res = await axios.post('http://localhost:3000/login',
        //     user,{
        //       headers: {
        //       "Content-Type":"application/json",
        //       "Authorization": `Bearer ${token}`
        //     }
        //     })
        //   // console.log(res)
        // } catch (error) {
        //   console.log(error)
        // }

        // if (!res.data.isVerified) {
        //   localStorage.setItem('token',res.data.refreshToken)
        // }

        let res;
        const token = localStorage.getItem('token')
        try {
          res = await axios.post('http://localhost:3000/login',user)
          // console.log(res)
        } catch (error) {
          console.log(error)
        }
        localStorage.setItem('token', res.data.token)
        setIsLoggedIn((()=>
        {return Boolean(localStorage.getItem("token"))}
        ))

        if (res.data.status===200) {
            toast.success('Login Successful!! WELCOME To Rudra Store');
            setTimeout(()=>{
              navigate('/')
            },2100)
            
        }
        else {
            toast.warning("Invalid credentials");
        }

    }
    
    


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-300 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <img src={image} alt="mountain" className="mx-auto w-2xl h-30" />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Log in</h1>
          <h5 className="text-sm text-gray-500 mt-2">
            Don’t have an account? <button onClick={()=>navigate('/signup')} className="text-blue-500 underline">Sign up</button>
          </h5>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            id="pwd"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setpwd(e.target.value)}
            className="w-full px-4 py-2 border  border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            id="btn"
            onClick={loginHandler}
            className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </div>
      </div>

    </div>
  );
};

export default Login;
