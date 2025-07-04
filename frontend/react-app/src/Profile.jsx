import React from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { ClothesContext } from './Context/ClothesContext';
import { useNavigate } from "react-router"
import { ToastContainer, toast, Bounce } from 'react-toastify';






const Profile = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [password, setNewPassword] = useState('');

  const navigate = useNavigate()

  const {isLoggedIn, setIsLoggedIn, setClothes, setcartProducts} = useContext(ClothesContext)

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://mern-ecomm-dj71.onrender.com/gettoken', { token });
        
      setEmail(res.data.decoded.email);
      setUsername(res.data.decoded.username);
      setContact(res.data.decoded.contact);

    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };
    
  useEffect(() => {
    fetchData();
  }, []);

  const loginhandler = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      setClothes([])
      setcartProducts([])
      navigate('/login')
    }
  }

  const changepwd = () => {
    setShowPasswordBox(true)
  }

  const submitNewPassword = async() => {

    const token = localStorage.getItem('token');
    const res = await axios.put('https://mern-ecomm-dj71.onrender.com/update-user', {token,password})
    // console.log(res.status)
    if (res.status === 200) {
      toast.success("Password Change Successful")
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-300 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="w-full px-4 py-2 border border-black rounded-md bg-white">
              {username}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="w-full px-4 py-2 border border-black rounded-md bg-white">
              {email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <div className="w-full px-4 py-2 border border-black rounded-md bg-white">
              {contact}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
            <button onClick={changepwd} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200">
              Change Password
            </button>
            <button onClick={loginhandler} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200">
              Logout
            </button>
          </div>

          {showPasswordBox && (
            <div className="mt-6 space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-black rounded-md"
              />
              <button
                onClick={submitNewPassword}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Submit New Password
              </button>
            </div>
          )}

        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Profile;
