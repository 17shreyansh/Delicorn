const mongoose = require('mongoose');

const JewelrySaleBannerSchema = new mongoose.Schema({
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
    default: "/assets/js.png"
  },
  image2: {
    type: String,
    required: true,
    default: "/assets/js1.jpg"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

JewelrySaleBannerSchema.statics.getInstance = async function() {
  let banner = await this.findOne();
  if (!banner) {
    banner = await this.create({});
  }
  return banner;
};

module.exports = mongoose.model('JewelrySaleBanner', JewelrySaleBannerSchema);
