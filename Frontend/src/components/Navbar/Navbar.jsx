import "./Navbar.css"
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png"
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import dropdown_icon from "../../assets/dropdown_icon.png"

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  const [menu, setMenu] = useState("shop");
  const menuRef = useRef();

  const dropDown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle("open");
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" width={"50px"} height={"50px"} />
        <p>SHOPPER</p>
      </div>
      {/* <img className="nav-dropdown" src={dropdown_icon} alt="" /> */}
      <div onClick={() => dropDown_toggle()} className="nav-dropdown">&#9776;</div>
      <ul ref={menuRef} className="nav-menu">
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