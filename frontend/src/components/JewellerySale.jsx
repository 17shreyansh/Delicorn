import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import image from "../assets/js.png"; // Banner with jewelry and text
import girl from "../assets/js1.jpg"; // Model photo

const JewelrySale = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    backgroundColor: "#FFF9EB",
    fontFamily: "'Josefin Sans', sans-serif",
    padding: isMobile ? "20px 15px" : "40px 20px",
  };

  const rowStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    borderRadius: "10px",
    overflow: "hidden",
    minHeight: isMobile ? "auto" : "550px",
  };

  const leftColStyle = {
    height: isMobile ? "200px" : "550px",
    padding: "0",
    display: "flex",
    alignItems: "flex-end",
    margin: isMobile ? "0 0 15px 0" : "0",
  };

  const rightColStyle = {
    position: "relative",
    height: "550px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    objectPosition: "top"
  };

  const modelImageStyle = {
    width: isMobile ? "100%" : "90%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: isMobile ? "200px 200px 0 0" : "300px 300px 0 0",
  };

  const buttonContainerStyle = {
    position: "absolute",
    bottom: "0",
    width: isMobile ? "100%" : "90%",
    textAlign: "center",
    backgroundColor: "#0f4a3b",
    padding: isMobile ? "12px 0" : "16px 0",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: isMobile ? "16px" : "20px",
    fontWeight: "500",
    fontFamily: "'Josefin Sans', sans-serif",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <Row
        justify="center"
        align={isMobile ? "top" : "bottom"}
        gutter={isMobile ? [0, 0] : [8, 0]}
        style={rowStyle}
      >
        <Col
          xs={24}
          sm={24}
          md={17}
          lg={17}
          xl={17}
          style={leftColStyle}
        >
          <img
            src={image}
            alt="Jewelry Banner"
            style={imageStyle}
          />
        </Col>

        <Col
          xs={24}
          sm={24}
          md={7}
          lg={7}
          xl={7}
          style={rightColStyle}
        >
          <img
            src={girl}
            alt="Model"
            style={modelImageStyle}
          />
          <div style={buttonContainerStyle}>
            <Button
              type="text"
              style={buttonStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#145a4a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Shop Now
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default JewelrySale;