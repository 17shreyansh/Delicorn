const mongoose = require('mongoose');

const jewelryBannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Join Our Jewellery Circle"
  },
  description: {
    type: String,
    required: true,
    default: "Get 10% OFF on your first order when you sign up!"
  },
  buttonText: {
    type: String,
    default: "Shop Now"
  },
  buttonLink: {
    type: String,
    default: "/shop"
  },
  backgroundImage: {
    type: String,
    required: true,
    default: "/assets/jewelleryImage.jpg"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

jewelryBannerSchema.statics.getInstance = async function() {
  let banner = await this.findOne();
  if (!banner) {
    banner = await this.create({});
  }
  return banner;
};

module.exports = mongoose.model('JewelryBanner', jewelryBannerSchema);
