import React, { useState, useEffect, useContext } from 'react';
import Navigation from './Navigation';
import { ClothesContext } from './Context/ClothesContext';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const AddCart = () => {
  
  const {clothData, setClothData, cartProducts, setcartProducts, clothes, setClothes, isLoggedIn, setIsLoggedIn} = useContext(ClothesContext)

  const fetchData = async(req,res) => {
    try {
      const token = localStorage.getItem('token')
      res = await axios.get('https://mern-ecomm-dj71.onrender.com/getProduct',{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      if (res?.data.status===500) {
                toast.info("Please Login First")
                return
      }
      setcartProducts(res?.data.products)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if (isLoggedIn) {
      fetchData()
    }
  },[isLoggedIn])

  const deleteProduct = async(id) => {
    const token = localStorage.getItem('token')
    if (clothes[id-1].quantity > 1) {

      let delCartRes
      try {
        delCartRes = await axios.put('https://mern-ecomm-dj71.onrender.com/delUpdateCartproduct', clothes[id-1], {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (error) {
        console.log(error)
      }

      setcartProducts(prev => {
        return prev.map((item)=> item.id === delCartRes.data.updatedCart.id ? {...item, quantity: delCartRes.data.updatedCart.quantity} : item)
      })

      let delRes
      try {
        delRes = await axios.put('https://mern-ecomm-dj71.onrender.com/delUpdateProduct', clothes[id-1])
      } catch (error) {
        console.log(error)
      }

      setClothes(prev => {
        return prev.map((item)=> item.id === delRes.data.updated.id ? {...item, quantity: delRes.data.updated.quantity} : item)
      })

    }
    else{

      let delRes
      try {
        delRes = await axios.put('https://mern-ecomm-dj71.onrender.com/delUpdateProduct', clothes[id-1])
      } catch (error) {
        console.log(error)
      }

      setClothes(prev => {
        return prev.map((item)=> item.id === delRes.data.updated.id ? {...item, quantity: delRes.data.updated.quantity} : item)
      })

      let delProductRes
      try {
        delProductRes = axios.delete('https://mern-ecomm-dj71.onrender.com/delCartProduct', {data:{id}, headers:{'Authorization': `Bearer ${token}`}})
      } catch (error) {
        console.log(error)
      }
      const newarr=cartProducts.filter((item) => item.id !== id )
      setcartProducts(newarr)
    }
  }

  const addProduct = async(id) => {

    const token = localStorage.getItem('token')

    let addCartRes
      try {
        addCartRes = await axios.put('https://mern-ecomm-dj71.onrender.com/addUpadteCartProduct', {id}, {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })

      } catch (error) {
        console.log(error)
      }
      // console.log(addCartRes.data.updatedCart.quantity)
      
      setcartProducts(prev => {
        return prev.map((item)=> item.id === addCartRes.data.updatedCart.id ? {...item, quantity: addCartRes.data.updatedCart.quantity} : item)
      })

    let addRes
      try {
        addRes = await axios.put('https://mern-ecomm-dj71.onrender.com/addUpdateProduct', {id})
      } catch (error) {
        console.log(error)
      }
      // console.log(addRes.data.updated.quantity)

      setClothes(prev => {
        return prev.map((item)=> addRes.data.updated.id === id ? {...item, quantity: addRes.data.updated.quantity} : item)
      })
  }


  const total = cartProducts.reduce((sum, item) => sum + item.quantity * item.price, 0);
  // // console.log(total)

  const qty = cartProducts.reduce((sum,item) => sum + item.quantity, 0);

  // console.log(qty)
 

  return (
    <>
      
      <div className="scroll-smooth pt-25 px-6 py-8 ">
        <h1 className="text-3xl font-bold mb-6 text-center text-amber-50">{qty===0 ? "Nothing in the Cart!! Do Some Shopping" : "🛒 Your Cart" }</h1>
        <div className='flex justify-between items-center border-2 m-3.5 p-3 text-3xl bg-zinc-600  rounded-2xl'>
          <span>Subtotal ({qty} items) - ₹ {total} /- </span>
          <button className='border-2 p-2 bg-amber-300/85 rounded-3xl ' >Proceed to Buy</button>
        </div>

        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cartProducts.map((i) => (
            <div
              key={i.id}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <img
                src={i.image}
                alt={i.name}
                className="w-48 h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{i.name}</h2>
              <p className="text-sm text-gray-600 mt-1">ID: {i.id}</p>
              <p className="text-lg font-bold text-green-600 mt-2">₹{i.price}</p>
              <div className='flex gap-4 mt-2 '>
                <button onClick={() => deleteProduct(i.id)} className=' flex justify-center items-end border-2 bg-red-400 w-8 text-5xl h-8 rounded-full '>-</button>
                <div className='text-xl'>{i.quantity}</div>
                <button onClick={() => addProduct(i.id)} className='flex justify-center items-end border-2 bg-green-400 w-8 text-4xl h-8 rounded-full '>+</button>
              </div>
              
              
            </div>
          ))}
        </div>
      </div>
      <ToastContainer autoClose={2000}/>
    </>
  );
};

export default AddCart;
