import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import cross_icon from "../../assets/cross_icon.png"

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([])

  const fetchInfo = async () => {
    await fetch("https://mern-e-commerce-1-56z3.onrender.com/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])


  const removeProduct = async (id) => {
    await fetch("https://mern-e-commerce-1-56z3.onrender.com/removeproduct", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listProduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listProduct-allProducts">
        <hr />
        {allProducts.map((product, index) => {
          return <>
            <div key={index} className="listProduct-format-main listProduct-format">
              <img src={product.image} className='listProduct-product-icon' alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => removeProduct(product.id)} className='listProduct-remove-icon' src={cross_icon} alt="" />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct