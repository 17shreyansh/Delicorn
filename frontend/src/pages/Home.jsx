import React from 'react';
import { Layout } from 'antd';
import Hero from '../components/Hero';
import Slider from '../components/Slider';
import ProductCategories from '../components/ProductCategories';
import Jewellery from '../components/Jewellery';
import Collections from '../components/Collections';
import Ring from '../components/Ring';
import CTA from '../components/CTA';
import JewellerySale from '../components/JewellerySale.jsx';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Layout>
      <Hero />
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