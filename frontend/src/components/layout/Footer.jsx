import React, { useState } from "react";
import { Layout, Row, Col, Input, Button, Typography, Space, message } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      message.warning("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error("Please enter a valid email");
      return;
    }
    message.success("Successfully subscribed!");
    setEmail("");
  };

  return (
    <AntFooter
      style={{
        background: "white",
        color: "#000",
        padding: "60px 20px 20px",
        fontFamily: "'Josefin Sans', sans-serif",
      }}
    >
      <Row gutter={[40, 40]} justify="space-between" align="top">
        {/* Left Section */}
        <Col xs={24} md={8}>
          <div style={{ marginBottom: "24px" }}>
            <img
              src={logo}
              alt="Delicorn Logo"
              style={{ width: "180px", marginBottom: "24px" }}
            />
          </div>

          <Text
            style={{
              display: "block",
              fontSize: "15px",
              color: "#000",
              marginBottom: "12px",
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Sign up for exclusive offers, new arrivals & styling tips.
          </Text>

          <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onPressEnter={handleSubscribe}
              style={{
                flex: 1,
                borderRadius: "2px",
                padding: "8px 12px",
                fontSize: "14px",
                border: "1px solid #ccc",
                fontFamily: "'Josefin Sans', sans-serif",
              }}
            />
            <Button
              onClick={handleSubscribe}
              style={{
                backgroundColor: "#004d40",
                color: "white",
                borderRadius: "2px",
                padding: "0 18px",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "'Josefin Sans', sans-serif",
              }}
            >
              Subscribe Now
            </Button>
          </div>

          <Text
            style={{
              display: "block",
              fontSize: "15px",
              color: "#000",
              maxWidth: "340px",
              lineHeight: "1.6",
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Col>

        {/* Quick Links */}
        <Col xs={12} sm={8} md={4}>
          <Title
            level={5}
            style={{
              color: "#004d40",
              marginBottom: "16px",
              fontSize: "18px",
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Quick Links
          </Title>
          <Space direction="vertical" size="small">
            <Link to="/" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Home</Link>
            <Link to="/ashta-dhatu" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Shop AshtaDhatu</Link>
            <Link to="/fashion-jewelry" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Shop Fashion</Link>
            <Link to="/about-us" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>About Us</Link>
            <Link to="/contact-us" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Contact</Link>
          </Space>
        </Col>

        {/* Policies 1 */}
        <Col xs={12} sm={8} md={4}>
          <Title
            level={5}
            style={{
              color: "#004d40",
              marginBottom: "16px",
              fontSize: "18px",
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Policies
          </Title>
          <Space direction="vertical" size="small">
            <Link to="/return-refund" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Shipping</Link>
            <Link to="/return-refund" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Returns</Link>
            <Link to="/return-refund" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Privacy Policy</Link>
            <Link to="/return-refund" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Terms</Link>
          </Space>
        </Col>

        {/* Customer Care */}
        <Col xs={24} sm={8} md={4}>
          <Title
            level={5}
            style={{
              color: "#004d40",
              marginBottom: "16px",
              fontSize: "18px",
              fontFamily: "'Josefin Sans', sans-serif",
            }}
          >
            Customer Care
          </Title>
          <Space direction="vertical" size="small">
            <Link to="/contact-us" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>FAQ</Link>
            <Link to="/account/orders" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Track Order</Link>
            <Link to="/contact-us" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Support</Link>
            <Link to="/contact-us" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif", color: "#000" }}>Contact Us</Link>
          </Space>
        </Col>
      </Row>

      {/* Social Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          marginTop: "40px",
          marginBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        <Text style={{ marginRight: "10px", color: "#000", fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>
          Follow us
        </Text>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramOutlined style={{ fontSize: "20px", cursor: "pointer", color: "#000" }} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookOutlined style={{ fontSize: "20px", cursor: "pointer", color: "#000" }} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined style={{ fontSize: "20px", cursor: "pointer", color: "#000" }} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <YoutubeOutlined style={{ fontSize: "20px", cursor: "pointer", color: "#000" }} />
        </a>
      </div>

      {/* Bottom Strip */}
      <div
        style={{
          backgroundColor: "#114D4D",
          color: "white",
          textAlign: "center",
          padding: "12px 0",
          marginTop: "20px",
          marginLeft: "-20px",
          marginRight: "-20px",
          marginBottom: "-20px",
        }}
      >
        <Text style={{ color: "white", fontSize: "14px", fontFamily: "'Josefin Sans', sans-serif" }}>
          <Link to="/return-refund" style={{ color: "white" }}>Privacy Policy</Link>
          {" | "}
          <Link to="/return-refund" style={{ color: "white" }}>Terms and Conditions</Link>
          {" | "}
          Made with love and craft by AFFOBE
        </Text>
      </div>
    </AntFooter>
  );
};

export default Footer;
