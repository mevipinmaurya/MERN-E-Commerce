import "./NewCollections.css"
import Item from "../Item/Item";
import { useEffect, useState } from "react";

const NewCollections = () => {

    const [new_collection, setNew_collection] = useState([])

    useEffect(() => {
        fetch("https://mern-e-commerce-1-56z3.onrender.com/newcollection")
            .then((res) => res.json())
            .then((data) => setNew_collection(data))
    }, [])

    return (
        <div className="new-collections">
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collection.map((items, i) => {
                    return <Item key={i} id={items.id} name={items.name} image={items.image} new_price={items.new_price} old_price={items.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollections