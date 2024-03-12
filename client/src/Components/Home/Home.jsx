import React, {useRef, useState,useEffect} from "react";
import './Home.css';
import uoem from './uoem.jpeg'
import Navbar from "../Navbar/Navbar";
import {useLocation, useNavigate} from 'react-router-dom'


const Home = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  

  return (
    <>
    <Navbar/>
    <div className="home-page">
      <img src={uoem} alt="" /><br/>
    </div>
    </>
  )
}

export default Home;

