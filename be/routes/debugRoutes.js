const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc    Debug endpoint to check product stock
// @route   GET /api/debug/products/:id/stock
// @access  Public (for debugging - remove in production)
router.get('/products/:id/stock', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Calculate what stock should be
    let calculatedStock = 0;
    if (product.sizeVariants && product.sizeVariants.length > 0) {
      calculatedStock = product.sizeVariants.reduce((total, variant) => {
        return total + (variant.stock || 0);
      }, 0);
    }

    const response = {
      productId: product._id,
      productName: product.name,
      sizeVariants: product.sizeVariants,
      currentTotalStock: product.totalStock,
      currentInStock: product.inStock,
      calculatedTotalStock: calculatedStock,
      calculatedInStock: calculatedStock > 0,
      isCorrect: product.totalStock === calculatedStock && product.inStock === (calculatedStock > 0)
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Fix stock for a specific product
// @route   POST /api/debug/products/:id/fix-stock
// @access  Public (for debugging - remove in production)
router.post('/products/:id/fix-stock', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Calculate correct stock
    let calculatedStock = 0;
    if (product.sizeVariants && product.sizeVariants.length > 0) {
      calculatedStock = product.sizeVariants.reduce((total, variant) => {
        return total + (variant.stock || 0);
      }, 0);
    }

    // Update the product
    await Product.updateOne(
      { _id: product._id },
      { 
        $set: { 
          totalStock: calculatedStock,
          inStock: calculatedStock > 0
        } 
      }
    );

    res.json({
      message: 'Stock fixed successfully',
      productName: product.name,
      oldTotalStock: product.totalStock,
      newTotalStock: calculatedStock,
      oldInStock: product.inStock,
      newInStock: calculatedStock > 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Get all products with stock status
// @route   GET /api/debug/products/stock-status
// @access  Public (for debugging - remove in production)
router.get('/products-stock-status', async (req, res) => {
  try {
    const products = await Product.find().select('name sizeVariants totalStock inStock');
    
    const stockStatus = products.map(product => {
      let calculatedStock = 0;
      if (product.sizeVariants && product.sizeVariants.length > 0) {
        calculatedStock = product.sizeVariants.reduce((total, variant) => {
          return total + (variant.stock || 0);
        }, 0);
      }

      return {
        id: product._id,
        name: product.name,
        totalStock: product.totalStock,
        inStock: product.inStock,
        calculatedStock: calculatedStock,
        isCorrect: product.totalStock === calculatedStock && product.inStock === (calculatedStock > 0)
      };
    });

    const incorrectProducts = stockStatus.filter(p => !p.isCorrect);

    res.json({
      totalProducts: products.length,
      incorrectCount: incorrectProducts.length,
      products: stockStatus,
      incorrectProducts: incorrectProducts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
