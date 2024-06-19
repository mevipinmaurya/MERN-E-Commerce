import "./Navbar.css"
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" width={"50px"} height={"50px"} />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link to={"/"} style={{ textDecoration: "none", color: "black" }}>Shop</Link> {menu === "shop" ? <hr /> : <></>} </li>
        <li onClick={() => setMenu("mens")}><Link to={"/mens"} style={{ textDecoration: "none", color: "black" }}>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("womens")}><Link to={"/womens"} style={{ textDecoration: "none", color: "black" }}>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("kids")}><Link to={"/kids"} style={{ textDecoration: "none", color: "black" }}>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-carts">
        <Link to={"/login"}><button>Login</button></Link>
        <Link to={"/cart"} ><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar