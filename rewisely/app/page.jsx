"use client";

import * as React from "react";
import { Grid } from "@mui/material";
import Carousel from '../components/Carousel/Carousel.jsx'


const Home = () => {
  const handleClick = (route) => {
    window.location.href = route;
  };

  return (
    <div>
        <Carousel/>
      
  
    </div>
  );
};

export default Home;
