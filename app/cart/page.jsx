'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Cart = () => {
 
    const {user}=UserAuth()

    // const listOfProducts=[
    //     {
    //       "productName":"Shirt",
    //       "productID":"P01",
    //       "quantity":0,
    //       "price":100
    //     },
    //     {
    //       "productName":"Dress",
    //       "productID":"P02",
    //       "quantity":0,
    //       "price":200
    //     },
    //     {
    //       "productName":"Pant",
    //       "productID":"P03",
    //       "quantity":0,
    //       "price":900
    //     }
    //   ]
    
      const [productList,setProductList]=useState([])
      const [productState, setProductState]=useState({})
      const [loading,setLoading]=useState(true)
      useEffect(()=>{
        if(user)
        {
          let newProductList=[]
          getDocs(collection(db,'users',user.uid,"productList")).then((snap)=>{
            console.log("SNAP",snap)
            snap.forEach((doc)=>{
              console.log("DOC",doc.data())
              newProductList.push(doc.data())
            })
            console.log("New ProductList",newProductList)
            setTimeout(()=>{
              setLoading(false)
            },1000)
            setProductList(newProductList)
          })

        }
      },[user])


      const addProduct=async(product)=>{
       console.log("Product Add",product)
       productList.map((productObj)=>{
        if(product.productID==productObj.productID)
        {
          productObj.quantity+=1
        }
       })
       console.log("Product List Add",productList)
       setProductList([...productList])
       setProductState({...product})
       console.log("User",user)
       console.log("PRODUCT",product)
       await setDoc(doc(db,'users',user?.uid,'productList',product?.productID),{...product})
      }
    
      const removeProduct=async(product,type)=>{
        console.log("Product Remove",product)
        switch(type){
          case 'remove':
            if(product.quantity>0)
            {
              productList.map((productObj)=>{
                if(product.productID==productObj.productID)
                {
                  productObj.quantity-=1
                }
              })
              setProductList([...productList])
              setProductState({...product})
              await setDoc(doc(db,'users',user?.uid,'productList',product?.productID),{...product})
            }
            else
            {
                removeProduct(product,'delete')
            }
    
            break;
    
            case 'delete':
              const newProductList=productList.filter((productObj)=>product.productID != productObj.productID)
              setProductList([...newProductList])
              setProductState({})
              await deleteDoc(doc(db,'users',user?.uid,'productList',product?.productID))
              break;
    
            default:
              console.log("DEFAULT")
        }
       console.log("Product List Remove",productList)
      }
    
      return (
        <main className="p-4 w-full">
          {loading?<div>Loading...</div>:productList.length>0? productList.map((product)=>(
            <div className='border-sky-200 border-2 w-[20rem] h-[20rem] mx-auto my-5' key={product.productID}>
                <div className='flex mb-3'>
                <div>{product.productName}</div> <span className='p-2'></span>
                <div>{product.quantity}</div>
                </div>
                <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={()=>removeProduct(product,'remove')}>
                  -
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={()=>addProduct(product)}>
                  +
                </button>
                
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={()=>removeProduct(product,'delete')}>Delete</button>
    
                </div>
            </div> 
            )): <div>No Product Added</div>}
        </main>
      )
}

export default Cart