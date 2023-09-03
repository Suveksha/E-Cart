'use client'
import React,{useState} from 'react'
import { UserAuth } from './context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'


const Home = () => {
const {user}=UserAuth()

   const listOfProducts=[
        {
          "productName":"Shirt",
          "productID":"P01",
          "quantity":0,
          "price":100
        },
        {
          "productName":"Dress",
          "productID":"P02",
          "quantity":0,
          "price":200
        },
        {
          "productName":"Pant",
          "productID":"P03",
          "quantity":0,
          "price":900
        }
      ]

      const [productArray,setProductArray]=useState(listOfProducts)

      const addProduct=async(product)=>{
        console.log("Product Add",product)
        productArray.map((productObj)=>{
         if(product.productID==productObj.productID)
         {
           productObj.quantity+=1
         }
        })
        console.log("Product List Add",productArray)
        setProductArray([...productArray])
        console.log("User",user)
        console.log("PRODUCT",product)
        await setDoc(doc(db,'users',user?.uid,'productList',product?.productID),{...product})
       }
    
  return (
    <>
     {productArray?.map((product)=>(
      <div className='border-yellow-500 border-2 w-[20rem] h-[20rem] p-3 mx-auto my-5' key={product.productID}>
        <div>
        <div>{product.productName}</div>
        <div>{product.price}</div>
        </div>
        <div>
          <button className="bg-green-700 border-2 p-2 rounded-xl border-green-800 hover:bg-green-400" onClick={()=>addProduct(product)}>Add to Cart</button>
        </div>
      </div>
    ))}
    </>
  )
}

export default Home