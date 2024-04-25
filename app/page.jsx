"use client";

import * as React from "react";
import { Grid } from "@mui/material";
import Carousel from '../components/Carousel/Carousel.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  const handleClick = (route) => {
    window.location.href = route;
  };

  return (
    <div>
        <Carousel/>
        <Footer/>
  
    </div>
  );
};

export default Home;
