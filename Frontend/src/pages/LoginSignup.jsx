import { useState } from "react"
import "./CSS/LoginSignup.css"

const LoginSignup = () => {

  const [state, setState] = useState("Login")

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Login function
  const login = async () => {
    console.log("Login function executed", formData)
    let responseData;
    await fetch("https://mern-e-commerce-1-56z3.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((res) => res.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/");
    }else{
      alert(responseData.errors)
    }
  }

  // Signup function
  const signup = async () => {
    console.log("Signup function executed", formData)
    let responseData;
    await fetch("https://mern-e-commerce-1-56z3.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((res) => res.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/");
    }else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginSignup'>
      <div className="loginSignup-container">
        <h1>{state}</h1>
        <div className="loginSignup-fields">
          {state === "Sign Up"
            ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />
            : <></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Your Password' />
        </div>
        <button onClick={() => state === "Login" ? login() : signup()}>Continue</button>
        {state === "Login"
          ? <p className='loginSignup-login'>Create an account? <span onClick={() => setState("Sign Up")} style={{ cursor: "pointer" }}>Click here</span></p>
          : <p className='loginSignup-login'>Already have an account? <span onClick={() => setState("Login")} style={{ cursor: "pointer" }}>Login here</span></p>}

        <div className="loginSignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use $ privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup