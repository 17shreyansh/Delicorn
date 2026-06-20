import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultImage1 from "../assets/cta1.jpg";
import defaultImage2 from "../assets/cta2.jpg";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function JewelleryBanner() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "Adorn Yourself with Timeless Beauty",
    description1: "Discover the perfect blend of spiritual heritage and modern elegance.",
    description2: "From sacred Ashta Dhatu Jewellery to trend-setting Fashion Jewellery,",
    description3: "Find pieces that reflect your style and soul.",
    buttonText: "Shop Now",
    buttonLink: "/products",
    image1: defaultImage1,
    image2: defaultImage2
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/api/dynamic-home/cta`);
      if (res.data.data) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching CTA banner:', error);
    }
  };

  const getImageUrl = (imagePath, defaultImg) => {
    if (!imagePath) return defaultImg;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads') || imagePath.startsWith('/assets')) return `${VITE_BACKEND_URL}${imagePath}`;
    return imagePath;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        padding: "40px 20px",
        fontFamily: "'Josefin Sans', sans-serif",
        flexWrap: "wrap",
        gap: "20px",
        maxWidth: "100%",

      }}
    >
      {/* Left Section - Images */}
      <div style={{ display: "flex", position: "relative", flex: "0 0 auto", maxWidth: "100%" }}>
        {/* First Image (Main) */}
        <div
          style={{
            width: "clamp(200px, 40vw, 300px)",
            height: "clamp(220px, 45vw, 340px)",
            borderRadius: "300px 300px 0 0",
            border: "2px solid #F8E6B6",
            padding: "8px",
            zIndex: 2,
          }}
        >
          <img
            src={getImageUrl(data.image1, defaultImage1)}
            alt="Jewellery"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "300px 300px 0 0" }}
          />
        </div>

        {/* Second Image (Overlay) */}
        <div
          style={{
            width: "clamp(150px, 30vw, 200px)",
            height: "clamp(170px, 35vw, 240px)",
            borderRadius: "300px 300px 0 0",
            border: "2px solid #F8E6B6",
            padding: "8px",
            position: "absolute",
            bottom: "0",
            left: "60%",
            zIndex: 3,
          }}
        >
          <img
            src={getImageUrl(data.image2, defaultImage2)}
            alt="Jewellery"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "300px 300px 0 0" }}
          />
        </div>
      </div>

      {/* Right Section - Text */}
      <div style={{ flex: "1 1 300px", maxWidth: "500px", textAlign: "left" }}>
        <h2
          style={{
            fontFamily: "'Prata', serif",
            fontSize: "clamp(24px, 4vw, 30px)",
            color: "#000",
            marginBottom: "15px",
            fontWeight: "400",
          }}
        >
          {data.title}
        </h2>
        <p
          style={{
            color: "#555",
            marginBottom: "15px",
            fontFamily: "'Josefin Sans', sans-serif",
            fontWeight: "200",

          }}
        >
          {data.description1}
        </p>
        <p style={{ color: "#555",marginBottom: "15px", fontFamily: "'Josefin Sans', sans-serif", fontWeight: "200" }}>
          {data.description2}
        </p>
        <p style={{ color: "#555", marginBottom: "25px", fontFamily: "'Josefin Sans', sans-serif", fontWeight: "200" }}>
          {data.description3}
        </p>

        <Button
          type="primary"
          onClick={() => navigate(data.buttonLink || "/products")}
          style={{
            backgroundColor: "#004d40",
            borderColor: "#004d40",
            padding: "8px 24px",
            fontWeight: "bold",
            fontSize: "15px",
            borderRadius: "0px",
            transition: "all 0.3s ease",
            fontFamily: "'Josefin Sans', sans-serif",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#00695c";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#004d40";
          }}
        >
          {data.buttonText || "Shop Now"}
        </Button>
      </div>
    </div>
  );
}
