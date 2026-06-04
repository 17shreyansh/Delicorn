const mongoose = require('mongoose');

const sliderImageSchema = new mongoose.Schema({
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

sliderImageSchema.statics.getInstance = async function() {
  let slider = await this.findOne();
  if (!slider) {
    slider = await this.create({
      images: [
        { url: "/assets/s1.jpg", alt: "Slider 1", order: 1 },
        { url: "/assets/s2.jpg", alt: "Slider 2", order: 2 },
        { url: "/assets/s3.png", alt: "Slider 3", order: 3 },
        { url: "/assets/s4.jpg", alt: "Slider 4", order: 4 },
        { url: "/assets/s5.jpg", alt: "Slider 5", order: 5 }
      ]
    });
  }
  return slider;
};

module.exports = mongoose.model('SliderImage', sliderImageSchema);
