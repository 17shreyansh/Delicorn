import React from "react";
import { Layout, Row, Col, Input, Button, Typography, Space } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.png";

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
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
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Home</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Shop AshtaDhatu</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Shop Fashion</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>About Us</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Contact</Text>
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
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Shipping</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Returns</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Privacy Policy</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Terms</Text>
          </Space>
        </Col>

        {/* Policies 2 */}
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
            Policies
          </Title>
          <Space direction="vertical" size="small">
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Shipping</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Returns</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Privacy Policy</Text>
            <Text style={{ fontSize: "15px", fontFamily: "'Josefin Sans', sans-serif" }}>Terms</Text>
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
        <InstagramOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <FacebookOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <TwitterOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <YoutubeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
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
          <span style={{ cursor: "pointer" }}>Privacy Policy</span>
          {" | "}
          <span style={{ cursor: "pointer" }}>Terms and Conditions</span>
          {" | "}
          Made with love and craft by AFFOBE
        </Text>
      </div>
    </AntFooter>
  );
};

export default Footer;
