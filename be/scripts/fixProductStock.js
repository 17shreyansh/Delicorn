const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const fixProductStock = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/delicorn');
    console.log('Connected to MongoDB');

    const products = await Product.find();
    console.log(`Found ${products.length} products to update`);

    let updatedCount = 0;

    for (const product of products) {
      // Calculate total stock from size variants
      let totalStock = 0;
      if (product.sizeVariants && product.sizeVariants.length > 0) {
        totalStock = product.sizeVariants.reduce((total, variant) => {
          return total + (variant.stock || 0);
        }, 0);
      }

      const inStock = totalStock > 0;

      // Update the product directly in database
      await Product.updateOne(
        { _id: product._id },
        { 
          $set: { 
            totalStock: totalStock,
            inStock: inStock
          } 
        }
      );

      console.log(`Updated: ${product.name} - Stock: ${totalStock}, InStock: ${inStock}`);
      updatedCount++;
    }

    console.log(`\n✅ Successfully updated ${updatedCount} products`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixProductStock();
