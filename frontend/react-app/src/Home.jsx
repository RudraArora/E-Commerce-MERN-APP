import React from 'react'
import Navigation from './Navigation'
import { useNavigate } from "react-router"
const Home = () => {

  return (
    <div>
        {/* {<Navigation/>} */}
        <div className="flex justify-center items-center h-screen">
        <h1 className="text-5xl font-bold text-amber-50">Welcome to My Shop</h1>
      </div>
    </div>
  )
}

export default Home