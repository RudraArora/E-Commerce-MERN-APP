import React, { useContext } from 'react';
import Navigation from './Navigation';
import { ClothesContext } from './Context/ClothesContext';

const Cloth = () => {
  const {clothData, setClothData, cartProducts, setcartProducts, clothes, setClothes} = useContext(ClothesContext)
  return (
    <>
      {/* <Navigation /> */}
      <div className="pt-32 flex justify-center ">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
          <img
            src={clothData.image}
            alt={clothData.name}
            className="w-60 h-60 object-cover mx-auto rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{clothData.name}</h1>
          <p className="text-sm text-gray-500 mb-1">Product ID: <span className="font-medium">{clothData.id}</span></p>
          <p className="text-xl font-semibold text-green-600">₹{clothData.price}</p>
        </div>
      </div>
    </>
  );
};

export default Cloth;
