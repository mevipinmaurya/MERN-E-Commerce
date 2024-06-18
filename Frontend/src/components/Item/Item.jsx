import "./Item.css";


const Item = (props) => {
  return (
    <div className="item">
        <img src={props.image} alt="" width={"100%"} height={"310px"}/>
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