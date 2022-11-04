import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BridgeView from "../assets/BridgeView.jpg";

function Register() {
  const navigate = useNavigate();
  const [userDeatils, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:4000/auth/register",
      userDeatils
    );
 
    console.log(userDeatils)
    if (res) {
      console.log(res);
      if(res.data === 'User Already Exist!') {
        console.log("User Already Exist")
        // window.location.reload();
        navigate('/register')
      }
      else {
      navigate("/login");
      }
    } else {
      
      console.log("Error Ocurred");
    }
  };

  return (
    <>
      <div className="utility-container">
        <div className="util-container-1">
          <h1 className="heading">Register</h1>
          <form className="form">
            {/* <div className="input-container">
            <span>Name</span>
            <input type="text" className="input"/>
           </div> */}
            <div className="input-container">
              <span>Username</span>
              <input
                type="text"
                className="input"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <span>Email Address</span>
              <input
                type="text"
                className="input"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <span>Password</span>
              <input
                type="password"
                className="input"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <button className="btn11" type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <span>
              Already have Account <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
        <div className="util-container-2">
          <img src={BridgeView} />
        </div>
      </div>
    </>
  );
}

export default Register;
