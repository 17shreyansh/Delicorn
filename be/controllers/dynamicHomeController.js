const HeroSection = require('../models/HeroSection');
const JewelryBanner = require('../models/JewelryBanner');
const SliderImage = require('../models/SliderImage');
const PromoMarquee = require('../models/PromoMarquee');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads/homepage');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Hero Section
const getHeroSection = async (req, res) => {
  try {
    const hero = await HeroSection.getInstance();
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateHeroSection = async (req, res) => {
  try {
    let hero = await HeroSection.findOne();
    if (!hero) hero = new HeroSection(req.body);
    else {
      if (req.file) {
        if (hero.backgroundImage && !hero.backgroundImage.startsWith('/assets/')) {
          const oldPath = path.join(__dirname, '..', hero.backgroundImage);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        hero.backgroundImage = `/uploads/homepage/${req.file.filename}`;
      }
      Object.assign(hero, req.body);
    }
    await hero.save();
    res.json({ success: true, data: hero, message: 'Hero section updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Jewelry Banner
const getJewelryBanner = async (req, res) => {
  try {
    const banner = await JewelryBanner.getInstance();
    res.json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateJewelryBanner = async (req, res) => {
  try {
    let banner = await JewelryBanner.findOne();
    if (!banner) banner = new JewelryBanner(req.body);
    else {
      if (req.file) {
        if (banner.backgroundImage && !banner.backgroundImage.startsWith('/assets/')) {
          const oldPath = path.join(__dirname, '..', banner.backgroundImage);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        banner.backgroundImage = `/uploads/homepage/${req.file.filename}`;
      }
      Object.assign(banner, req.body);
    }
    await banner.save();
    res.json({ success: true, data: banner, message: 'Jewelry banner updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Slider
const getSlider = async (req, res) => {
  try {
    const slider = await SliderImage.getInstance();
    res.json({ success: true, data: slider });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSlider = async (req, res) => {
  try {
    let slider = await SliderImage.findOne();
    let oldUrls = [];
    
    if (!slider) {
      slider = new SliderImage(req.body);
    } else {
      if (slider.images?.length > 0) {
        oldUrls = slider.images.map(img => img.url);
      }

      const newImages = [];
      const incomingImages = Array.isArray(req.body.images) ? req.body.images : [];
      const uploadedFiles = req.files || [];

      incomingImages.forEach((item, index) => {
        let imageUrl = '';
        const alt = item.alt || `Slide ${index + 1}`;
        const order = item.order || index + 1;

        if (uploadedFiles[index]) {
          imageUrl = `/uploads/homepage/${uploadedFiles[index].filename}`;
        } else if (item.url && !item.url.startsWith('rc-upload-')) {
          imageUrl = item.url;
        }

        if (imageUrl) {
          newImages.push({ url: imageUrl, alt, order });
        }
      });

      slider.images = newImages;

      const currentUrls = slider.images.map(img => img.url);
      oldUrls.forEach(oldUrl => {
        if (!oldUrl.startsWith('/assets/') && !currentUrls.includes(oldUrl)) {
          const oldPath = path.join(__dirname, '..', oldUrl);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
      });

      const { images, ...other } = req.body;
      Object.assign(slider, other);
    }

    await slider.save();
    res.json({ success: true, data: slider, message: 'Slider updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Promo Marquee
const getPromoMarquee = async (req, res) => {
  try {
    const marquee = await PromoMarquee.getInstance();
    res.json({ success: true, data: marquee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePromoMarquee = async (req, res) => {
  try {
    let marquee = await PromoMarquee.findOne();
    if (!marquee) marquee = new PromoMarquee(req.body);
    else Object.assign(marquee, req.body);
    await marquee.save();
    res.json({ success: true, data: marquee, message: 'Promo marquee updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all dynamic home data
const getAllDynamicHome = async (req, res) => {
  try {
    const [hero, jewelry, slider, marquee] = await Promise.all([
      HeroSection.getInstance(),
      JewelryBanner.getInstance(),
      SliderImage.getInstance(),
      PromoMarquee.getInstance()
    ]);
    res.json({
      success: true,
      data: { hero, jewelry, slider, marquee }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHeroSection,
  updateHeroSection,
  getJewelryBanner,
  updateJewelryBanner,
  getSlider,
  updateSlider,
  getPromoMarquee,
  updatePromoMarquee,
  getAllDynamicHome,
  upload
};
