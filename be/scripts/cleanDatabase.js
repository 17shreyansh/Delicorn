require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');

const cleanDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();
    const brandCount = await Brand.countDocuments();

    console.log('\n=== Current Database Status ===');
    console.log(`Products: ${productCount}`);
    console.log(`Categories: ${categoryCount}`);
    console.log(`Brands: ${brandCount}`);

    console.log('\n⚠️  Deleting all data in 3 seconds...\n');
    await new Promise(resolve => setTimeout(resolve, 3000));

    await Product.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});

    console.log('\n✅ Database cleaned successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

cleanDatabase();
