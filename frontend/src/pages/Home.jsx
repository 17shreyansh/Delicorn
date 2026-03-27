import React from 'react';
import { Layout } from 'antd';
import { 
  Hero, 
  Slider, 
  Jewellery, 
  Collections, 
  Ring, 
  CTA, 
  JewellerySale, 
  FeaturedProducts 
} from '../components';
import { ProductCategories } from '../components/product';
import { Footer } from '../components/layout';
import TestConnection from '../components/TestConnection';

const Home = () => {
  return (
    <Layout>
      <Hero />
      {/* <TestConnection /> */}
      <ProductCategories />
      <Jewellery/>
      <Collections />
      <CTA />
      <JewellerySale />
      <FeaturedProducts 
        productType="ashta-dhatu" 
        title="Ashtadhatu : Statement of Soul & Style" 
        limit={4}
      />
      <FeaturedProducts 
        productType="fashion-jewelry" 
        title="Sacred Pendants & Bracelets" 
        limit={4}
      />
      <Ring />
      <Slider />
      <Footer />
    </Layout>
  );
};

export default Home;