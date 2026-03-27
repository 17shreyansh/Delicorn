const Product = require('../models/Product');

/**
 * Initialize and fix product stock on server startup
 */
const initializeProductStock = async () => {
  try {
    console.log('🔄 Checking product stock...');
    
    const products = await Product.find();
    let fixedCount = 0;

    for (const product of products) {
      let needsUpdate = false;
      
      // Calculate what the stock should be
      let calculatedStock = 0;
      if (product.sizeVariants && product.sizeVariants.length > 0) {
        calculatedStock = product.sizeVariants.reduce((total, variant) => {
          return total + (variant.stock || 0);
        }, 0);
      }
      
      const calculatedInStock = calculatedStock > 0;
      
      // Check if current values are incorrect
      if (product.totalStock !== calculatedStock || product.inStock !== calculatedInStock) {
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await Product.updateOne(
          { _id: product._id },
          { 
            $set: { 
              totalStock: calculatedStock,
              inStock: calculatedInStock
            } 
          }
        );
        fixedCount++;
        console.log(`  ✓ Fixed stock for: ${product.name} (Stock: ${calculatedStock})`);
      }
    }

    if (fixedCount > 0) {
      console.log(`✅ Fixed stock for ${fixedCount} product(s)`);
    } else {
      console.log('✅ All product stock values are correct');
    }
  } catch (error) {
    console.error('❌ Error initializing product stock:', error);
  }
};

module.exports = { initializeProductStock };
