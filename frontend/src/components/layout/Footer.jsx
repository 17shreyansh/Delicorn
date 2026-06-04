import React, { useState } from "react";
import { Layout, Row, Col, Input, Button, Typography, Space, message } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  // Framer Motion animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each column appearing
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <AntFooter
      style={{
        background: "white",
        color: "#000",
        padding: "60px 20px 0px", // Removed bottom padding to make bottom strip flush
        fontFamily: "'Josefin Sans', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* CSS for smooth hover transitions */}
      <style>
        {`
          .footer-link {
            color: #4a4a4a;
            transition: color 0.3s ease, transform 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }
          .footer-link:hover {
            color: #004d40;
            transform: translateX(4px);
          }
          .social-icon {
            color: #000;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f5f5f5;
          }
          .social-icon:hover {
            color: #fff;
            background-color: #004d40;
            transform: translateY(-3px);
          }
          .bottom-link {
            color: #e0e0e0;
            transition: color 0.3s ease;
          }
          .bottom-link:hover {
            color: #fff;
          }
        `}
      </style>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Row gutter={[40, 40]} justify="space-between" align="top">
          {/* Left Section */}
          <Col xs={24} md={10}>
            <motion.div variants={itemVariants}>
              <div style={{ marginBottom: "24px" }}>
                <Link to="/">
                  <img
                    src={logo}
                    alt="Delicorn Logo"
                    style={{ width: "180px", marginBottom: "8px" }}
                  />
                </Link>
              </div>

              <Text
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#333",
                  marginBottom: "16px",
                  fontFamily: "'Josefin Sans', sans-serif",
                }}
              >
                Sign up for exclusive offers, new arrivals & styling tips.
              </Text>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <Input
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onPressEnter={handleSubscribe}
                  style={{
                    flex: 1,
                    borderRadius: "4px 0 0 4px",
                    padding: "10px 16px",
                    fontSize: "15px",
                    border: "1px solid #d9d9d9",
                    borderRight: "none",
                    fontFamily: "'Josefin Sans', sans-serif",
                  }}
                />
                <Button
                  onClick={handleSubscribe}
                  style={{
                    backgroundColor: "#004d40",
                    color: "white",
                    borderRadius: "0 4px 4px 0",
                    padding: "0 24px",
                    height: "auto",
                    fontSize: "15px",
                    fontWeight: 600,
                    border: "1px solid #004d40",
                    fontFamily: "'Josefin Sans', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  Subscribe
                </Button>
              </div>

              <Text
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#666",
                  maxWidth: "360px",
                  lineHeight: "1.6",
                  fontFamily: "'Josefin Sans', sans-serif",
                }}
              >
                Join the Delicorn family. We promise to only send you the good stuff—no spam, just beautiful jewelry and exclusive perks.
              </Text>
            </motion.div>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={8} md={4}>
            <motion.div variants={itemVariants}>
              <Title
                level={5}
                style={{
                  color: "#004d40",
                  marginBottom: "20px",
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "'Josefin Sans', sans-serif",
                }}
              >
                Quick Links
              </Title>
              <Space direction="vertical" size="middle">
                <Link to="/" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Home</Link>
                <Link to="/ashta-dhatu" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Shop AshtaDhatu</Link>
                <Link to="/fashion-jewelry" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Shop Fashion</Link>
                <Link to="/about-us" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>About Us</Link>
                <Link to="/contact-us" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Contact</Link>
              </Space>
            </motion.div>
          </Col>

          {/* Policies */}
          <Col xs={12} sm={8} md={4}>
            <motion.div variants={itemVariants}>
              <Title
                level={5}
                style={{
                  color: "#004d40",
                  marginBottom: "20px",
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "'Josefin Sans', sans-serif",
                }}
              >
                Policies
              </Title>
              <Space direction="vertical" size="middle">
                <Link to="/return-refund" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Shipping</Link>
                <Link to="/return-refund" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Returns</Link>
                <Link to="/return-refund" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Privacy Policy</Link>
                <Link to="/return-refund" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Terms</Link>
              </Space>
            </motion.div>
          </Col>

          {/* Customer Care */}
          <Col xs={24} sm={8} md={4}>
            <motion.div variants={itemVariants}>
              <Title
                level={5}
                style={{
                  color: "#004d40",
                  marginBottom: "20px",
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "'Josefin Sans', sans-serif",
                }}
              >
                Customer Care
              </Title>
              <Space direction="vertical" size="middle">
                <Link to="/contact-us" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>FAQ</Link>
                <Link to="/account/orders" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Track Order</Link>
                <Link to="/contact-us" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Support</Link>
                <Link to="/contact-us" className="footer-link" style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Contact Us</Link>
              </Space>
            </motion.div>
          </Col>
        </Row>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            marginTop: "60px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ marginRight: "10px", color: "#666", fontSize: "16px", fontWeight: 500, fontFamily: "'Josefin Sans', sans-serif" }}>
            Follow us on
          </Text>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <InstagramOutlined style={{ fontSize: "20px" }} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FacebookOutlined style={{ fontSize: "20px" }} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <TwitterOutlined style={{ fontSize: "20px" }} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <YoutubeOutlined style={{ fontSize: "20px" }} />
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Strip */}
      <div
        style={{
          backgroundColor: "#114D4D",
          color: "white",
          textAlign: "center",
          padding: "16px 20px",
          marginTop: "20px",
          marginLeft: "-20px",
          marginRight: "-20px",
          width: "calc(100% + 40px)",
        }}
      >
        <Text style={{ color: "#e0e0e0", fontSize: "14px", fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.5px" }}>
          <Link to="/return-refund" className="bottom-link" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>Privacy Policy</Link>
          <span style={{ margin: "0 12px", opacity: 0.5 }}>|</span>
          <Link to="/return-refund" className="bottom-link" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>Terms and Conditions</Link>
          <span style={{ margin: "0 12px", opacity: 0.5 }}>|</span>
          © {new Date().getFullYear()} Made with love and craft by AFFOBE
        </Text>
      </div>
    </AntFooter>
  );
};

export default Footer;