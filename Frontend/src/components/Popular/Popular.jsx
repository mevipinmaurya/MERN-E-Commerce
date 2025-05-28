import "./Popular.css"
import Item from "../Item/Item.jsx"
import { useEffect, useState } from "react"

const Popular = () => {

    const [data_product, setData_Product] = useState([])

    useEffect(() => {
        fetch("https://mern-e-commerce-1-56z3.onrender.com/popularinwomen")
            .then((res) => res.json())
            .then((data) => setData_Product(data))
    }, [])

    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {data_product.map((items, i) => {
                    return <Item key={i} id={items.id} name={items.name} image={items.image} new_price={items.new_price} old_price={items.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular