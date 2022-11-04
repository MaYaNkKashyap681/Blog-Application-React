import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Home, Login, Register, Single, Write} from './pages/index.js'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/write' element = {<Write/>} />
          <Route path = '/blog/:id' element = {<Single/>} />
          {/* <Route path = '/' element = {<Home/>} />
          <Route path = '/' element = {<Home/>} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
