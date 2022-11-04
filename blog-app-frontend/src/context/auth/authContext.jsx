import { createContext, useReducer, useState, useEffect } from "react";
// import authReducer from "./authReducer.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    null || JSON.parse(localStorage.getItem("user")) 
  );

  const loginUser = async (inputs) => {
    const res = await axios.post("http://localhost:4000/auth/login", inputs);
    setCurrentUser({...res.data, password: null});
    navigate('/')
  };

  const logoutUser = async (inputs) => {
    await axios.post("http://localhost:4000/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
