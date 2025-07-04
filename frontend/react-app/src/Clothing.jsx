import React, { createContext, useContext, useEffect, useState } from 'react'
import './clothings.css'
import { useNavigate } from "react-router"
import Navigation from './Navigation'
import { ClothesContext } from './Context/ClothesContext'
import axios from 'axios'

const Clothing = () => {
    const navigate = useNavigate()

    const {clothData, setClothData, cartProducts, setcartProducts, clothes, setClothes} = useContext(ClothesContext)

    const productClicker = (id) => {
        const product = clothes.find(c => c.id === id);
        setClothData(product)

        navigate(`/clothing/cloth/${product.name}`)
    }

let updateres
const addcartHandler = async(id) => {
  let res
  
  const product = clothes.find(c => c.id === id);

  const token = localStorage.getItem('token')

  try {
    res = await axios.post('https://mern-ecomm-dj71.onrender.com/addTocart',product, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
  }

  setcartProducts(prev => [...prev,res?.data.product])
    
  }

  const fetchData = async(req,res) => {
        try {
        const token = localStorage.getItem('token')
        res = await axios.get('https://mern-ecomm-dj71.onrender.com/getProduct',{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        setcartProducts(res?.data.products)

      } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  },[])
    
 return (
    <>
      {/* <Navigation /> */}
      <div className="mt-26 px-8 py-6 min-h-screen">
        <h1 className="text-4xl font-semibold text-amber-50 mb-8 text-center">Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clothes.map(({ id, name, price, image, quantity }) => {
            const inCart = cartProducts.some(c => c.id === id);
            return (
            <div
              key={id}
              onClick={() => productClicker(id)}
              className="bg-zinc-100/70 rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img src={image} alt={name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
                <p className="text-sm text-gray-600">ID: {id}</p>
                <p className="text-lg font-bold text-green-700 mt-2">₹{price}</p>
              </div>
              <div className="mt-4 px-2 mb-3">
                    <button disabled={inCart} onClick={(e) => { 
                        e.stopPropagation()
                        addcartHandler(id)}} className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-700 transition duration-300">
                    {!inCart ? "Add to Cart" : "Added in the Cart" }
                    </button>
                </div>
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Clothing