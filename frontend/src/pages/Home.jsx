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
      <TestConnection />
      <ProductCategories />
      <Jewellery/>
      <Collections />
      <CTA />
      <JewellerySale />
      <FeaturedProducts />
      <Ring />
      <Slider />
      <Footer />
    </Layout>
  );
};

export default Home;