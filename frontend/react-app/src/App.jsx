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
import Contact from './Contact'
import Signup from './Signup'
import { useEffect } from 'react'
import axios from 'axios';

function App() {

  const [clothData, setClothData] = useState({})
  const [cartProducts, setcartProducts] = useState([])
  const[emailBool, setemailBool] = useState(0)
  const[pwdBool, setpwdBool] = useState(0)

  const [clothes, setClothes] = useState([])

  const fetchData = async()=>{
    try {
      const data = await axios.get('https://mern-ecomm-dj71.onrender.com/products')
      setClothes(data?.data.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  

    


  return (
    <>
    {/* <Login/> */}
    
      {<BrowserRouter>
      <ClothesContext.Provider value={{clothData, setClothData, cartProducts, setcartProducts, clothes, setClothes, emailBool, setemailBool, pwdBool, setpwdBool  } }>
        {<Navigation />}
        <Routes>
            <Route path='/clothing' element={<Clothing/>}/>
            <Route path='/' element={<Home/>} />
            <Route path='/clothing/cloth/:name' element={<Cloth/>}/>
            <Route path='/cart' element={<AddCart/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </ClothesContext.Provider>
      </BrowserRouter>}
      
    </>
  )
}

export default App
