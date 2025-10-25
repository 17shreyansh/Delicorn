import React from "react";
import { Card, Row, Col } from "antd";
import image1 from "../assets/c1.jpg"; 
import image2 from "../assets/c2.jpg"; 
import image3 from "../assets/c3.jpg"; 
import image4 from "../assets/c4.jpg"; 
import image5 from "../assets/c5.jpg";

// Google Fonts
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Prata&family=Josefin+Sans:wght@400;500;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const collections = [
  {
    images: [
      image1,
      image2,
      image3,
      image4,
      image5,
    ],
    items: ["Necklace", "Earrings", "Rings", "Mangal sutra", "Mens"],
  },
  {
    images: [
      image1,
      image2,
      image3,
      image4,
      image5,
    ],
    items: ["Necklace", "Earrings", "Rings", "Mangal sutra", "Mens"],
  },
];

export default function SignatureCollections() {
  const sectionStyle = {
    textAlign: "center",
    padding: "50px 10px",
    fontFamily: "'Josefin Sans', sans-serif",
    backgroundColor: "#fff",
  };

  const titleStyle = {
    fontFamily: "'Prata', serif",
    fontSize: "28px",
    color: "#204e43",
    marginBottom: "40px",
  };

  const cardStyle = {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    borderRadius: "0px",
  };

  const textHover = (e, isHover) => {
    const textElement = e.currentTarget.querySelector('.item-text');
    if (textElement) {
      textElement.style.backgroundColor = isHover ? "#204e43" : "transparent";
      textElement.style.color = isHover ? "#fff" : "#333";
    }
  };

  return (
    <div style={sectionStyle}>
      <h2 style={titleStyle}>Our Signature Collections</h2>

      {collections.map((col, idx) => (
        <div key={idx} style={{ marginBottom: idx < collections.length - 1 ? "40px" : "0" }}>
          <Row gutter={[24, 24]} justify="center">
            {col.items.map((item, i) => (
              <Col
                key={i}
                xs={12}
                sm={8}
                md={6}
                lg={4}
                style={{ textAlign: "center" }}
              >
                <div
                  onMouseEnter={(e) => textHover(e, true)}
                  onMouseLeave={(e) => textHover(e, false)}
                >
                  <Card
                    style={cardStyle}
                    bodyStyle={{ padding: 0, borderRadius: "0px" }}
                    styles={{
                      cover: {
                        borderRadius: "0px",
                      }
                    }}
                    cover={
                      <img
                        alt={item}
                        src={col.images[i]}
                        sty le={{
                          width: "100%",
                          aspectRatio: "1",
                          objectFit: "cover",
                          border: "solid 0.5px #000000",
                          borderRadius: "0px",
                        }}
                      />
                    }
                  />
                  <div
                    className="item-text"
                    style={{
                      marginTop: "12px",
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#333",
                      padding: "4px 8px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}
