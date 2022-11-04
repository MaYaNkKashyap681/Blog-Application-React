import React, {useState, useContext} from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import NightView from "../assets/NightView.jpg";
import AuthContext from '../context/auth/authContext.jsx'


function Login() {

  const {loginUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const [userDeatils, setUserDetails] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setUserDetails((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(userDeatils);
  }

  return (
    <>
      <div className="utility-container">      
        <div className="util-container-1">
        <h1 className="heading">Login</h1>
          <form className="form">
           <div className="input-container">
            <span>Username</span>
            <input type="text" className="input" onChange={handleChange} name = "username" />
           </div>
           <div className="input-container">
            <span>Password</span>
            <input type="password" className="input" onChange={handleChange} name = "password" />
           </div>
           <div className="">
            <button className="btn11" onClick={handleSubmit}>Submit</button>
           </div>
           <span>Don't have Account <Link to = "/register">Register</Link></span>
          </form>
        </div>
        <div className="util-container-2">
          <img src={NightView} />
        </div>
      </div>
    </>
  );
}

export default Login;
