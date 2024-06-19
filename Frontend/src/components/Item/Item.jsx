import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" width={"100%"} height={"310px"}/></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="items-prices-new">
                ${props.new_price}
            </div>
            <div className="items-prices-old">
                ${props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item