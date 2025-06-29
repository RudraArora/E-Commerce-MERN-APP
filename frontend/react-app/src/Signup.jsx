import React, { useContext, useState } from 'react';
import image from './assets/image.png';
import { ClothesContext } from './Context/ClothesContext';
import { useNavigate } from "react-router";
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Signup = () => {

  const [registerUser, setRegister] = useState({
    username:"",
    email:"",
    contact:null,
    password:""
  })

  const navigate = useNavigate();

  const signupHandler = async() => {
    let res;
    try {
      res = await axios.post('https://mern-ecomm-dj71.onrender.com/signup',registerUser)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    
    if (res.status === 200) {
      localStorage.setItem('token',res.data.token)
      toast.success('Signup Successful');
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-300 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <img src={image} alt="mountain" className="mx-auto w-2xl h-30" />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Sign Up</h1>
        </div>

        <h5 className="text-sm text-gray-500 mt-2">
            Have an account? <button onClick={()=>navigate('/login')} className="text-blue-500 underline">Log in</button>
        </h5>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setRegister(prev =>  ({...prev, username:e.target.value}))}
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setRegister(prev =>  ({...prev, email:e.target.value}))}
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Contact"
            onChange={(e) => setRegister(prev =>  ({...prev, contact:e.target.value}))}
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setRegister(prev =>  ({...prev, password:e.target.value}))}
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={signupHandler}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
