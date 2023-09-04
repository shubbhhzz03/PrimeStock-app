import React from 'react';
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png"
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
      <div className="logo">
      <RiProductHuntLine size={35}/>

      </div>
      <ul className="home-links"> 
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
      <button className="--btn --btn-primary">

        <Link to="/login">Login</Link>
        </button>
      </li>
      <li>
      <button className="--btn --btn-primary">
      
        <Link to="/dashboard">Dashboard</Link>
        </button>
      </li>
      </ul>

      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
            <h2> INVENTORY: Bharat Electronics Limited </h2>
        <p>Inventory system to control and manage products in the warehouse in real time and integrated to make it easier to develop your business</p>
        <div className="hero-button">
        <button className="--btn --btn-secondary">
      
      <Link to="/dashboard">Free Trial 1 Month </Link>
      </button>
        </div>
        <div className="--flex-start">
        <NumberText num="14K" text="Brand Owners"/>
        <NumberText num="23K" text="Active Users"/>
        <NumberText num="500+" text="Partners"/>

        </div>
        </div>

        <motion.div className="hero-image" initial={{opacity: 0, x: 500}} animate={{opacity: 1, x: 0, transition: {duration: 0.8}}}>
            <img src={heroImg} alt="Inventory"/>
        </motion.div>
      </section>
    </div>
  );
};

const NumberText = ({num, text}) => {
    return (
        <div className="--mr">
            <h3 className="--color-white">{num}</h3>
            <p className="--color-white">{text}</p>
        </div>
    )
};

export default Home
