import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import jewelleryImage from "../assets/jewelleryImage.jpg";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const JewelleryCircleBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [bannerData, setBannerData] = useState({
    title: "Join Our Jewellery Circle",
    description: "Get 10% OFF on your first order when you sign up!",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    backgroundImage: jewelleryImage
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/api/dynamic-home/jewelry`);
      if (res.data.data) {
        setBannerData(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching jewelry banner:', error);
      // Use default data on error
    }
  };

  const bgImage = typeof bannerData.backgroundImage === 'string' && bannerData.backgroundImage.startsWith('http') 
    ? bannerData.backgroundImage 
    : typeof bannerData.backgroundImage === 'string' && (bannerData.backgroundImage.startsWith('/uploads') || bannerData.backgroundImage.startsWith('/assets'))
    ? `${VITE_BACKEND_URL}${bannerData.backgroundImage}`
    : bannerData.backgroundImage;

  const containerStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    width: "100%",
    minHeight: isSmallMobile ? "400px" : isMobile ? "500px" : "680px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: isSmallMobile ? "30px 15px" : isMobile ? "40px 20px" : "60px 120px",
    boxSizing: "border-box",
    color: "white"
  };

  const titleStyle = {
    fontFamily: "Prata, serif",
    fontSize: "clamp(32px, 8vw, 60px)",
    fontWeight: 400,
    lineHeight: "1.1",
    margin: 0,
    color: "white",
  };

  const descriptionStyle = {
    fontSize: "clamp(18px, 4vw, 32px)",
    lineHeight: "1.4",
    fontWeight: 400,
    marginBottom: "40px",
    color: "white",
  };

  const buttonStyle = {
    backgroundColor: "white",
    color: "black",
    border: "none",
    fontSize: "clamp(16px, 2.5vw, 20px)",
    fontFamily: "Josefin Sans, sans-serif",
    padding: "10px 50px",
    borderRadius: "0",
    height: "auto",
    fontWeight: 500,
  };

  return (
    <div style={containerStyle}>
      {/* Top Section */}
      <div style={{ textAlign: "left", color: "white" }}>
        <h1 style={titleStyle}>
          {bannerData.title.includes('\\n') 
            ? bannerData.title.split('\\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < bannerData.title.split('\\n').length - 1 && <br />}
                </React.Fragment>
              ))
            : bannerData.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < bannerData.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))
          }
        </h1>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          textAlign: isMobile ? "center" : "right",
          fontFamily: "Josefin Sans, sans-serif",
          color: "white",
        }}
      >
        <p style={descriptionStyle}>
          {bannerData.description}
        </p>

        <Link to={bannerData.buttonLink || '/shop'}>
          <Button style={buttonStyle}>
            {bannerData.buttonText || 'Shop Now'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JewelleryCircleBanner;
