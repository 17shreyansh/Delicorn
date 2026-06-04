const mongoose = require('mongoose');

const promoMarqueeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    default: "4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours"
  },
  backgroundColor: {
    type: String,
    default: "#0d4b4b"
  },
  textColor: {
    type: String,
    default: "#ffffff"
  },
  speed: {
    type: Number,
    default: 6
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

promoMarqueeSchema.statics.getInstance = async function() {
  let marquee = await this.findOne();
  if (!marquee) {
    marquee = await this.create({});
  }
  return marquee;
};

module.exports = mongoose.model('PromoMarquee', promoMarqueeSchema);
