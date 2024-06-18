import "./CSS/ShopCategory.css"
import { ShopContext } from "../context/ShopContext"
import { useContext } from "react"
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)

  return (
    <div className="shop-category">
      <img className="shopCategory-banner" src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing 1-12 </span>out of 36 products
        </p>
        <div className="shopCategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopCategory-products">
        {all_product.map((items, i) => {
          if (props.category === items.category) {
            return <Item key={i} id={items.id} name={items.name} image={items.image} new_price={items.new_price} old_price={items.old_price} />
          }else{
            return null;
          }
        })}
      </div>
      <div className="shopCategory-loadMore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory