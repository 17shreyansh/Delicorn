const mongoose = require('mongoose');

const CTABannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Adorn Yourself with Timeless Beauty"
  },
  description1: {
    type: String,
    required: true,
    default: "Discover the perfect blend of spiritual heritage and modern elegance."
  },
  description2: {
    type: String,
    required: true,
    default: "From sacred Ashta Dhatu Jewellery to trend-setting Fashion Jewellery,"
  },
  description3: {
    type: String,
    required: true,
    default: "Find pieces that reflect your style and soul."
  },
  buttonText: {
    type: String,
    default: "Shop Now"
  },
  buttonLink: {
    type: String,
    default: "/products"
  },
  image1: {
    type: String,
    required: true,
    default: "/assets/cta1.jpg"
  },
  image2: {
    type: String,
    required: true,
    default: "/assets/cta2.jpg"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

CTABannerSchema.statics.getInstance = async function() {
  let banner = await this.findOne();
  if (!banner) {
    banner = await this.create({});
  }
  return banner;
};

module.exports = mongoose.model('CTABanner', CTABannerSchema);
