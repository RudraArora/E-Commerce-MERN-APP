import React, { useContext, useState } from 'react';
import image from './assets/image.png';
import { ClothesContext } from './Context/ClothesContext';
import { useNavigate } from "react-router";
import axios from 'axios'
import emailjs from 'emailjs-com';
import { ToastContainer, toast, Bounce } from 'react-toastify';


const Signup = () => {

  emailjs.init("u90jgEhOmmC_q3odr")

  const [registerUser, setRegister] = useState({
    username:"",
    email:"",
    contact:null,
    password:""
  })

  const generateOTP = (length = 6) => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

  const [emailVerify, setemailVerify] = useState(1)
  const [usernameVerify, setusernameVerify] = useState(1)
  const [contactVerify, setcontactVerify] = useState(1)
  const [passwordVerify, setpasswordVerify] = useState(1)
  const [Sendotp, setSendotp] = useState()
  const [Inputotp, setInputotp] = useState()
  const [verify, setverify] = useState(0)

  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  const usernamePattern = /^[A-Za-z0-9_]{3,16}$/
  const contactPattern = /^(?:\+91|0)?[6-9]\d{9}$/
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const navigate = useNavigate();

  const validateFields = () => {
  const isEmail = emailPattern.test(registerUser.email);
  const isUsername = usernamePattern.test(registerUser.username);
  const isContact = contactPattern.test(registerUser.contact)
  const isPassword = passwordPattern.test(registerUser.password);

  setemailVerify(isEmail);
  setusernameVerify(isUsername);
  setcontactVerify(isContact);
  setpasswordVerify(isPassword);

  if (!isEmail) toast.warning('Invalid Email');
  if (!isUsername) toast.warning('Invalid Username');
  if (!isContact) toast.warning('Invalid Contact');
  if (!isPassword) toast.warning('Invalid Password');

  return isEmail && isUsername && isContact && isPassword;
  };

  const signupHandler = async() => {

    if (!validateFields()) {
      return
    }

    let res;
    try {
      res = await axios.post('https://mern-ecomm-dj71.onrender.com/signup',registerUser)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    
    if (res?.data.status === 401) {
      toast.warning('Fill All the fields')
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

  const sendOtp = async() => {

    if (!validateFields()) {
      return
    }

    const code = generateOTP()
    setSendotp(code)

    try {
      await emailjs.send(
        "service_ododzka",
        "template_zg9ojqt",
        {passcode:code, email:registerUser.email}
      )
      toast.success('OTP sent! Check your email.');
      setverify(1)
    } catch (error) {
      console.error('EmailJS error:', err);
      toast.error('Failed to send OTP. Try again.');
    }
  }

  const verifyAndSignup = () => {
    if (Sendotp === Inputotp) {
      signupHandler()
    }else{
      toast.warning("Invalid OTP")
    }
    
  }

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
          <div className='flex justify-between'>
            <button onClick={sendOtp} className='border-black p-1 rounded bg-green-600 text-white mr-1 hover:bg-green-800'>Send OTP</button>
            { verify === 1 && (
              <input 
              className='box-border border px-2 rounded focus:ring-2 focus:outline-none focus:ring-blue-500' 
              type="number"
              value={Inputotp}
              placeholder='Enter OTP'
              onChange={(e) => setInputotp(e.target.value)}
              />
            )}
          </div>
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
            onClick={verifyAndSignup}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Signup;
