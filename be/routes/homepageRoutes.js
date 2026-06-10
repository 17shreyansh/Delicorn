const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware"); // Assuming these are correctly defined
const {
    getBanner,
    updateBanner,
    getShippingBanner,
    updateShippingBanner,
    getImageGrid,
    updateImageGrid,
    getPromoBanner,
    updatePromoBanner,
    getFooterOffer,
    updateFooterOffer,
    upload // Import the multer upload instance
} = require('../controllers/homepageController'); // Adjust path as needed

// Banner Routes
// For single image upload, use upload.single('fieldName') where 'fieldName' is the name of the input field in your form
router.get('/banner', getBanner);
router.put('/banner', protect, isAdmin, upload.single('image'), updateBanner);

// Shipping Banner Routes
router.get('/shipping-banner', getShippingBanner);
router.put('/shipping-banner', protect, isAdmin, upload.single('image'), updateShippingBanner);

// Image Grid Routes
// For multiple image uploads, use upload.array('fieldName', maxCount)
// 'images' is the field name, 4 is the maximum number of images allowed for the grid
router.get('/image-grid', getImageGrid);
router.put('/image-grid', protect, isAdmin, upload.array('images', 4), updateImageGrid);

// Promo Banner Routes
router.get('/promo-banner', getPromoBanner);
router.put('/promo-banner', protect, isAdmin, upload.single('image'), updatePromoBanner);

// Footer Offer Routes
router.get('/footer-offer', getFooterOffer);
router.put('/footer-offer', protect, isAdmin, updateFooterOffer);

// Get all home page data at once
const { Banner, ShippingBanner, ImageGrid, PromoBanner, FooterOffer } = require('../controllers/homepageController');
router.get('/all', async (req, res) => {
    try {
        const banner = await Banner.findOne();
        const shippingBanner = await ShippingBanner.findOne();
        const imageGrid = await ImageGrid.findOne();
        const promoBanner = await PromoBanner.findOne();
        const footerOffer = await FooterOffer.findOne();

        res.json({
            success: true,
            data: {
                banner: banner || {},
                shippingBanner: shippingBanner || {},
                imageGrid: imageGrid || {},
                promoBanner: promoBanner || {},
                footerOffer: footerOffer || {}
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
