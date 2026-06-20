const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  getHeroSection,
  updateHeroSection,
  getJewelryBanner,
  updateJewelryBanner,
  getSlider,
  updateSlider,
  getPromoMarquee,
  updatePromoMarquee,
  getCTABanner,
  updateCTABanner,
  getJewelrySaleBanner,
  updateJewelrySaleBanner,
  getAllDynamicHome,
  upload
} = require('../controllers/dynamicHomeController');

// Hero Section
router.get('/hero', getHeroSection);
router.put('/hero', protect, isAdmin, upload.single('backgroundImage'), updateHeroSection);

// Jewelry Banner
router.get('/jewelry', getJewelryBanner);
router.put('/jewelry', protect, isAdmin, upload.single('backgroundImage'), updateJewelryBanner);

// Slider
router.get('/slider', getSlider);
router.put('/slider', protect, isAdmin, upload.array('images', 10), updateSlider);

// Promo Marquee
router.get('/marquee', getPromoMarquee);
router.put('/marquee', protect, isAdmin, updatePromoMarquee);

// CTA Banner
router.get('/cta', getCTABanner);
router.put('/cta', protect, isAdmin, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), updateCTABanner);

// Jewelry Sale Banner
router.get('/jewelry-sale', getJewelrySaleBanner);
router.put('/jewelry-sale', protect, isAdmin, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), updateJewelrySaleBanner);

// Get all
router.get('/all', getAllDynamicHome);

module.exports = router;
