const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, lowercase: true, trim: true },
  description: String,
  productType: {
    type: String,
    enum: ['ashta-dhatu', 'fashion-jewelry'],
    required: true
  },
  // Self-referencing field for parent category
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null, // Top-level categories will have null parent
  },
  // To easily find all descendants (optional but useful for some queries)
  ancestors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }],
  level: { type: Number, default: 0 }, // 0 for top-level, 1 for child, etc.
  // Optional: Image for the category (e.g., icon or banner)
  image: { type: String, default: "category-placeholder.jpg" },
}, { timestamps: true });

// Compound unique index for name+productType and slug+productType
categorySchema.index({ name: 1, productType: 1 }, { unique: true });
categorySchema.index({ slug: 1, productType: 1 }, { unique: true });

// Pre-save hook to generate slug and manage ancestors/level
categorySchema.pre("save", async function (next) {
  // Always generate slug if name is present
  if (this.isModified("name") || this.isNew) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-*|-*$/g, "");
  }

  if ((this.isModified("parent") || this.isNew) && this.parent) {
    const parentCategory = await this.model("Category").findById(this.parent);
    if (parentCategory) {
      this.ancestors = [...parentCategory.ancestors, parentCategory._id];
      this.level = parentCategory.level + 1;
    }
  } else if (this.parent === null || this.isNew) {
    this.ancestors = []; // Top-level categories have no ancestors
    this.level = 0;
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);