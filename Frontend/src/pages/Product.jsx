import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Product = () => {
  const {all_product} = useContext(ShopContext);
  return (
    <div>Product</div>
  )
}

export default Product