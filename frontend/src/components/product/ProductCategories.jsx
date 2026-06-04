import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";

const ProductCategories = () => {
  // Simple slide-up animation from the bottom for the overlay
  const slideUpVariants = {
    rest: { y: "100%" },
    hover: { y: 0 },
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "80px 10px",
          textAlign: "center",
          fontFamily: "'Josefin Sans', sans-serif",
          overflowX: "hidden",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&family=Prata&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            @keyframes scrollText {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              color: "#333",
              fontSize: "15px",
              marginBottom: "40px",
              letterSpacing: "0.5px",
            }}
          >
            Click to Explore
          </motion.p>

          <Row gutter={[32, 32]} align="middle" justify="center">
            {/* ---------- LEFT COLUMN ---------- */}
            <Col xs={24} md={12}>
              {/* Scroll-in animation wrapper */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Hover detection wrapper (Covers Image AND Text) */}
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  style={{ cursor: "pointer", display: "inline-block", width: "100%" }}
                >
                  <div
                    style={{
                      position: "relative",
                      maxWidth: "380px",
                      margin: "0 auto",
                      overflow: "hidden", // Keeps the sliding text inside the box
                    }}
                  >
                    {/* Static Image */}
                    <img
                      src={p1}
                      alt="Ashtadhatu Jewellery"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Clean slide-up bar from bottom */}
                    <motion.div
                      variants={slideUpVariants}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.95)", // Clean white bar
                        padding: "16px 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTop: "1px solid #eaeaea",
                      }}
                    >
                      <span
                        style={{
                          color: "#0d4b4b",
                          fontFamily: "'Prata', serif",
                          fontSize: "20px",
                          letterSpacing: "1px",
                        }}
                      >
                        Explore More
                      </span>
                    </motion.div>
                  </div>

                  {/* Text under image */}
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#5f5f5f",
                      fontSize: "18px",
                      marginTop: "24px",
                      marginBottom: "4px",
                    }}
                  >
                    Unveil the Sacred
                  </p>

                  <Link
                    to="/ashta-dhatu"
                    style={{
                      display: "inline-block",
                      fontFamily: "'Prata', serif",
                      fontSize: "28px",
                      color: "#0d4b4b",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#1a6a6a")}
                    onMouseLeave={(e) => (e.target.style.color = "#0d4b4b")}
                  >
                    Explore Religious Products
                  </Link>
                </motion.div>
              </motion.div>
            </Col>

            {/* ---------- RIGHT COLUMN ---------- */}
            <Col xs={24} md={12}>
              {/* Scroll-in animation wrapper */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Hover detection wrapper (Covers Image AND Text) */}
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  style={{ cursor: "pointer", display: "inline-block", width: "100%" }}
                >
                  <div
                    style={{
                      position: "relative",
                      maxWidth: "380px",
                      margin: "0 auto",
                      overflow: "hidden",
                    }}
                  >
                    {/* Static Image */}
                    <img
                      src={p2}
                      alt="Fashion Jewellery"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Clean slide-up bar from bottom */}
                    <motion.div
                      variants={slideUpVariants}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.95)", // Clean white bar
                        padding: "16px 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTop: "1px solid #eaeaea",
                      }}
                    >
                      <span
                        style={{
                          color: "#0d4b4b",
                          fontFamily: "'Prata', serif",
                          fontSize: "20px",
                          letterSpacing: "1px",
                        }}
                      >
                        Explore More
                      </span>
                    </motion.div>
                  </div>

                  {/* Text under image */}
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "#5f5f5f",
                      fontSize: "18px",
                      marginTop: "24px",
                      marginBottom: "4px",
                    }}
                  >
                    Define Your Style
                  </p>

                  <Link
                    to="/fashion-jewelry"
                    style={{
                      display: "inline-block",
                      fontFamily: "'Prata', serif",
                      fontSize: "28px",
                      color: "#0d4b4b",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#1a6a6a")}
                    onMouseLeave={(e) => (e.target.style.color = "#0d4b4b")}
                  >
                    Shop Fashion Jewellery
                  </Link>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Promotional Banner */}
      <div
        style={{
          backgroundColor: "#0d4b4b",
          color: "#fff",
          textAlign: "center",
          padding: "6px 0",
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "'Josefin Sans', sans-serif",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "scrollText 20s linear infinite",
          }}
        >
          4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours
          &nbsp;&nbsp;&nbsp; 4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships
          in 24 hours
        </div>
      </div>
    </>
  );
};

export default ProductCategories;