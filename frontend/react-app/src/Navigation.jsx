import React, { useContext } from 'react'
import { useNavigate } from "react-router"
import { ClothesContext } from './Context/ClothesContext';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Navigation = () => {

  const navigate = useNavigate()
  const {isLoggedIn, setIsLoggedIn} = useContext(ClothesContext)

  const loginhandler = () => {
    
    if (isLoggedIn) {
      navigate('/profile')
    }else{
      navigate('/login')
    }
  }

  const clothingHandler = () => {
    if (!isLoggedIn) {
      toast.info("Please Login First")
    }else{
      navigate('/clothing')
    }
    
  }
  
  const cartHandler = () => {
    if (!isLoggedIn) {
      toast.info("Please Login First")
    }else{
      navigate('/cart')
    }
    
  }

  return (
    <nav className="fixed top-0 bg-zinc-50/15 text-white px-6 py-4 shadow-md w-full ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold">MyShop</div>

        
        <div className="space-x-9 text-3xl flex ">
          <p onClick={()=> navigate('/')} className="hover:text-yellow-300 transition duration-200">Home</p>
          <p onClick={loginhandler} className="hover:text-yellow-300 transition duration-200">{isLoggedIn===true?"Profile":"Login"}</p>
          <p onClick={clothingHandler} className="hover:text-yellow-300 transition duration-200">Clothings</p>
          <p onClick={cartHandler} className="hover:text-yellow-300 transition duration-200">🛒 Cart</p>
        </div>
      </div>
      <ToastContainer autoClose={2000}/>
    </nav>
  );
};

export default Navigation