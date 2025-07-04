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

  const [emailVerify, setemailVerify] = useState(1)
  const [usernameVerify, setusernameVerify] = useState(1)
  const [contactVerify, setcontactVerify] = useState(1)
  const [passwordVerify, setpasswordVerify] = useState(1)

  const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  const username_pattern = /^[A-Za-z0-9_]{3,16}$/
  const contact_pattern = /^(?:\+91|0)?[6-9]\d{9}$/
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const navigate = useNavigate();

  const signupHandler = async() => {

    if (registerUser.username && registerUser.email && registerUser.password && registerUser.contact) {
      if (!email_pattern.test(registerUser.email)) {
        toast.warning("Invalid Email")
        setemailVerify(0)
      }else{
        setemailVerify(1)
      }

      if (!username_pattern.test(registerUser.username)) {
        toast.warning("Invalid Username")
        setusernameVerify(0)
      }else{
        setusernameVerify(1)
      }

      if (!contact_pattern.test(registerUser.contact)) {
        toast.warning("Invalid Contact")
        setcontactVerify(0)
      }else{
        setcontactVerify(1)
      }

      if (!password_pattern.test(registerUser.password)) {
        toast.warning("Invalid Password")
        setpasswordVerify(0)
      }else{
        setpasswordVerify(1)
      }
    }else{
      toast.warning("Please Enter Credentials")
      return
    }



    if (emailVerify===0 || passwordVerify===0 || contactVerify===0 || usernameVerify===0) {
      return;
    }

    

    let res;
    try {
      res = await axios.post('https://mern-ecomm-dj71.onrender.com/signup',registerUser)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    
    if (res?.data.status === 409) {
      toast.info("User Already Exist!!")
      return
    }

    if (res?.status === 200) {
      localStorage.setItem('token',res.data.token)
      toast.success('Signup Successful');
      setTimeout(()=>{
        navigate('/login')
      },2100)
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-20">
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
          <dl className='text-zinc-700 text-sm list'>
            <dt>Password Must Have: </dt>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one digit</li>
            <li>At least one special character</li>
            <li>Password length should be at least 8</li>
          </dl>
          <button
            onClick={signupHandler}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
      <ToastContainer autoClose = {2000} />
    </div>
  );
};

export default Signup;
