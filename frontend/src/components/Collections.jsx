import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin, Empty } from "antd";
import { Link } from "react-router-dom";
import apiService from "../services/api";

// Google Fonts
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Prata&family=Josefin+Sans:wght@400;500;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

export default function SignatureCollections() {
  const [collections, setCollections] = useState([
    { productType: 'ashta-dhatu', title: 'Ashta Dhatu Collections', categories: [] },
    { productType: 'fashion-jewelry', title: 'Fashion Jewelry Collections', categories: [] }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiService.getCategories();
      const allCategories = response.data || [];
      
      // Group categories by productType (exclude main categories)
      const ashtaDhatuCategories = allCategories
        .filter(cat => 
          cat.productType === 'ashta-dhatu' && 
          !cat.name.toLowerCase().includes('ashtadhatu jewellery')
        )
        .slice(0, 5);
      
      const fashionCategories = allCategories
        .filter(cat => 
          cat.productType === 'fashion-jewelry' && 
          !cat.name.toLowerCase().includes('fashion jewellery')
        )
        .slice(0, 5);
      
      setCollections([
        { 
          productType: 'ashta-dhatu', 
          title: 'Ashta Dhatu Collections', 
          categories: ashtaDhatuCategories
        },
        { 
          productType: 'fashion-jewelry', 
          title: 'Fashion Jewelry Collections', 
          categories: fashionCategories
        }
      ]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryImage = (category) => {
    if (category.image && category.image !== 'category-placeholder.jpg') {

      const backendUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001';
      return category.image.startsWith('http') 
        ? category.image 
        : `${backendUrl}${category.image}`;
    }
    return null;
  };

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

  const sectionTitleStyle = {
    fontFamily: "'Prata', serif",
    fontSize: "22px",
    color: "#204e43",
    marginBottom: "30px",
    marginTop: "40px",
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

  if (loading) {
    return (
      <div style={{ ...sectionStyle, padding: "80px 10px" }}>
        <Spin size="large" />
      </div>
    );
  }

  // Check if any collection has categories
  const hasCategories = collections.some(col => col.categories.length > 0);

  if (!hasCategories) {
    return (
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Our Signature Collections</h2>
        <Empty description="No categories available. Please add categories from admin panel." />
      </div>
    );
  }

  return (
    <div style={sectionStyle}>
      <h2 style={titleStyle}>Our Signature Collections</h2>

      {collections.map((collection, idx) => {
        // Only render if collection has categories
        if (collection.categories.length === 0) return null;

        return (
          <div key={idx} style={{ marginBottom: idx < collections.length - 1 ? "60px" : "0" }}>
            <h3 style={sectionTitleStyle}>{collection.title}</h3>
            
            <Row gutter={[24, 24]} justify="center">
              {collection.categories.map((category, i) => {
                const categoryLink = `/${collection.productType}?category=${category._id}`;
                const imageUrl = getCategoryImage(category);
                
                // Skip if no image
                if (!imageUrl) return null;

                return (
                  <Col
                    key={category._id || i}
                    xs={12}
                    sm={8}
                    md={6}
                    lg={4}
                    style={{ textAlign: "center" }}
                  >
                    <Link to={categoryLink} style={{ textDecoration: 'none' }}>
                      <div
                        onMouseEnter={(e) => textHover(e, true)}
                        onMouseLeave={(e) => textHover(e, false)}
                      >
                        <Card
                          style={cardStyle}
                          styles={{ 
                            body: { padding: 0, borderRadius: "0px" },
                            cover: { borderRadius: "0px" }
                          }}
                          cover={
                            <img
                              alt={category.name}
                              src={imageUrl}
                              style={{
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
                          {category.name}
                        </div>
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </div>
  );
}
