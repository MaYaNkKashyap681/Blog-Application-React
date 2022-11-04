import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

function Navbar() {
  const {currentUser, logoutUser } = useContext(AuthContext);

  // const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user)

  const handleLogout = () => {
    logoutUser();
    // window.location.reload('/')
  }

  return (
    <div className="blog_navbar">
      <div className="logo">
        <Link to="/" style={{
          textDecoration: "none"
        }}>
          <p>
            Blog<span className="world">World</span>
          </p>
        </Link>
      </div>
      <div className="links">
        <Link className="link" to="/?cat=art">
          <h6>ART</h6>
        </Link>
        <Link className="link" to="/?cat=science">
          <h6>SCIENCE</h6>
        </Link>
        <Link className="link" to="/?cat=technology">
          <h6>TECHNOLOGY</h6>
        </Link>
        <Link className="link" to="/?cat=cinema">
          <h6>CINEMA</h6>
        </Link>
        <Link className="link" to="/?cat=design">
          <h6>DESIGN</h6>
        </Link>
        <Link className="link" to="/?cat=food">
          <h6>FOOD</h6>
        </Link>

        {currentUser == null ? (
          <>
            <Link className="link extra" to="/register">
              <h6>Register</h6>
            </Link>
            <Link className="link extra" to="/login">
              <h6>Login</h6>
            </Link>
          </>
        ) : (
          <>
            <span className="link username">
              <h6>{currentUser.username}</h6>
            </span>
            <Link className="link extra">
              <h6 onClick = {handleLogout}>Logout</h6>
            </Link>
          </>
        )}

        <Link className="link extra write" to="/write">
          <h6>Write</h6>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
