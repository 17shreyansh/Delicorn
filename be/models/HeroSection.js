const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Discover Exquisite Jewelry"
  },
  subtitle: {
    type: String,
    required: true,
    default: "Premium Ashta Dhatu and Fashion Jewelry crafted with love and tradition"
  },
  backgroundImage: {
    type: String,
    required: true,
    default: "/assets/hero1.jpg"
  },
  primaryButtonText: {
    type: String,
    default: "Shop Now"
  },
  primaryButtonLink: {
    type: String,
    default: "/shop"
  },
  secondaryButtonText: {
    type: String,
    default: "View Collections"
  },
  secondaryButtonLink: {
    type: String,
    default: "/collections"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

heroSectionSchema.statics.getInstance = async function() {
  let hero = await this.findOne();
  if (!hero) {
    hero = await this.create({});
  }
  return hero;
};

module.exports = mongoose.model('HeroSection', heroSectionSchema);
