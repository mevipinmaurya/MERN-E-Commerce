import React, { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    const cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = ({ children }) => {

    const [all_product, setAll_Product] = useState([])

    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch("http://localhost:3000/allproducts")
            .then((res) => res.json())
            .then((data) => setAll_Product(data))

        if (localStorage.getItem('auth-token')) {
            fetch("http://localhost:3000/getcart", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: "",
            })
                .then((res) => res.json())
                .then((data) => setCartItems(data))
        }
    }, [])


    // Addtocart function
    const addToCart = (itemId) => {
        console.log(itemId)
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        // console.log(cartItems);
        if (localStorage.getItem('auth-token')) {
            fetch("http://localhost:3000/addtocart", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'itemId': itemId })
            }).then((res) => res.json()).then((data) => console.log(data))
        }
    }


    // Removefromcart function
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if (localStorage.getItem('auth-token')) {
            fetch("http://localhost:3000/removefromcart", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'itemId': itemId })
            }).then((res) => res.json()).then((data) => console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (let items in cartItems) {
            if (cartItems[items] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(items))
                totalAmount += itemInfo.new_price * cartItems[items]
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (let items in cartItems) {
            if (cartItems[items] > 0) {
                totalItems += cartItems[items];
            }
        }
        return totalItems;
    }


    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;