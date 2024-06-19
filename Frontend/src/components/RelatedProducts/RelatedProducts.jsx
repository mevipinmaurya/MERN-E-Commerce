import "./RelatedProducts.css"
import data_product from "../../assets/data"
import Item from "../Item/Item"

const RelatedProducts = () => {
    return (
        <div className="relatedProducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedProducts-item">
                {data_product.map((items, i) => {
                    return <Item key={i} id={items.id} name={items.name} image={items.image} new_price={items.new_price} old_price={items.old_price} />
                })}
            </div>
        </div>
    )
}

export default RelatedProducts