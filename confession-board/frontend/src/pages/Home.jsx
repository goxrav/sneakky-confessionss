// src/pages/Home.jsx
import PageWrapper from "../components/PageWrapper";
import React from "react";
import ConfessionPreview from "../components/ConfessionPreview";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import HeroSection from "../components/Herosection";
import LearnMore from "../components/LearnMore";
 // Assuming you have a HeroSection component


const Home = () => {
  return (
    
    <div>
      <HeroSection/>
      
      <ConfessionPreview />
      <HowItWorks />
      
    </div>
  );
};

export default Home;


