import React, { useContext } from 'react'
import { useNavigate } from "react-router"
import { ClothesContext } from './Context/ClothesContext';

const Navigation = () => {

  const navigate = useNavigate()
  const {pwdBool, emailBool} = useContext(ClothesContext)
  // console.log(pwdBool,emailBool)

  return (
    <nav className="sticky top-0 bg-amber-950 text-white px-6 py-4 shadow-md ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold">MyShop</div>

        
        <div className="space-x-9 text-3xl flex ">
          <p onClick={()=> navigate('/')} className="hover:text-yellow-300 transition duration-200">Home</p>
          <p onClick={()=> pwdBool===1 && emailBool===1 ? navigate('/contact') : navigate('/login')} className="hover:text-yellow-300 transition duration-200">{emailBool===1 && pwdBool===1?"Contact":"Login"}</p>
          <p onClick={()=>navigate('/clothing')} className="hover:text-yellow-300 transition duration-200">Clothings</p>
          <p onClick={()=>navigate('/cart')} className="hover:text-yellow-300 transition duration-200">🛒 Cart</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation