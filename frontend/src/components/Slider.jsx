import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import c1 from "../assets/s1.jpg";
import c2 from "../assets/s2.jpg";
import c3 from "../assets/s3.png";
import c4 from "../assets/s4.jpg";
import c5 from "../assets/s5.jpg";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const defaultSlides = [
  { url: c1, alt: "Slider 1", order: 1 },
  { url: c2, alt: "Slider 2", order: 2 },
  { url: c3, alt: "Slider 3", order: 3 },
  { url: c4, alt: "Slider 4", order: 4 },
  { url: c5, alt: "Slider 5", order: 5 }
];

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const Slider = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliderData();
  }, []);

  const fetchSliderData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/dynamic-home/slider`);
      if (res.data.data?.images?.length > 0) {
        const sortedImages = res.data.data.images.sort((a, b) => a.order - b.order);
        setSlides(sortedImages);
      }
    } catch (error) {
      console.error('Error fetching slider data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ width: "100%", padding: "60px 0", display: "flex", justifyContent: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 0",
        position: "relative",
      }}
    >
      {/* Left Arrow */}
      <div
        className="swiper-button-prev"
        style={{
          left: "2%",
          color: "#000",
          fontSize: "18px",
          background: "#fff",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        <LeftOutlined />
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Autoplay, EffectCoverflow]}
        effect="coverflow"
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        slidesPerView="auto"
        spaceBetween={0}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 180,
          modifier: 2.5,
          slideShadows: true,
        }}
        style={{
          width: "90%",
          maxWidth: "800px",
          height: "500px",
        }}
        watchSlidesProgress={true}
      >
        {slides.concat(slides).map((img, index) => {
          const imgUrl = typeof img.url === 'string' && img.url.startsWith('http') 
            ? img.url 
            : typeof img.url === 'string' && (img.url.startsWith('/uploads') || img.url.startsWith('/assets'))
            ? `${API_BASE_URL}${img.url}`
            : img.url;
          return (
            <SwiperSlide
              key={index}
              style={{
                width: "280px",
                height: "500px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                background: "#fff",
                transition: "transform 0.3s ease",
              }}
            >
              <img
                src={imgUrl}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Right Arrow */}
      <div
        className="swiper-button-next"
        style={{
          right: "2%",
          color: "#000",
          fontSize: "18px",
          background: "#fff",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 10,
          cursor: "pointer",
        }}
      >
        <RightOutlined />
      </div>
    </div>
  );
};

export default Slider;
