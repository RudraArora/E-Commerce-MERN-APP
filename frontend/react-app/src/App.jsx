import { useState } from 'react'
import './App.css'
import Cloth from './Cloth'
import Clothing from './Clothing'
import Home from './Home'
import Navigation from './Navigation'
import { BrowserRouter, Route, Router, Routes } from "react-router"
import AddCart from './AddCart'
import { ClothesContext } from './Context/ClothesContext'
import Login from './Login'
import Signup from './Signup'
import { useEffect } from 'react'
import axios from 'axios';
import Profile from './Profile'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

function App() {

  const [clothData, setClothData] = useState({})
  const [cartProducts, setcartProducts] = useState([])

  const [isLoggedIn, setIsLoggedIn] = useState(()=>
  {return Boolean(localStorage.getItem("token"))}
  )

  const [clothes, setClothes] = useState([])

  const token = localStorage.getItem('token')
  // console.log(token)
  
  function isMalformedToken(t) {
    return !t || t.split('.').length !== 3
  }

  useEffect(() => {
    if (isMalformedToken(token)) {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      return
    }
    try {
      const { exp } = jwtDecode(token)
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
      }
    } catch {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
    }
  }, [token])

  const fetchData = async()=>{
    try {
      const data = await axios.get('http://localhost:3000/products',{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      
      setClothes(data?.data.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if (isLoggedIn) {
      fetchData()
    }
  },[isLoggedIn])
  



  return (
    <>
    {/* <Login/> */}
    
      {<BrowserRouter>
      <ClothesContext.Provider value={{clothData, setClothData, cartProducts, setcartProducts, clothes, setClothes, isLoggedIn, setIsLoggedIn  } }>
        {<Navigation />}
        <Routes>
            <Route path='/clothing' element={<Clothing/>}/>
            <Route path='/' element={<Home/>} />
            <Route path='/clothing/cloth/:name' element={<Cloth/>}/>
            <Route path='/cart' element={<AddCart/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </ClothesContext.Provider>
      </BrowserRouter>}
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default App
