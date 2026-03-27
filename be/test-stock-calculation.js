// Test Stock Calculation
// Run this in MongoDB shell or as a Node.js script to test stock calculation

// Example product with size variants
const testProduct = {
  name: "Test Ring",
  price: 999,
  productType: "ashta-dhatu",
  sizeVariants: [
    { size: "Small", stock: 5 },
    { size: "Medium", stock: 10 },
    { size: "Large", stock: 0 }
  ]
};

// Expected results:
// totalStock = 5 + 10 + 0 = 15
// inStock = true (because totalStock > 0)

console.log("Test Case 1: Product with stock");
console.log("Size Variants:", testProduct.sizeVariants);
const totalStock1 = testProduct.sizeVariants.reduce((total, variant) => total + (variant.stock || 0), 0);
console.log("Total Stock:", totalStock1); // Should be 15
console.log("In Stock:", totalStock1 > 0); // Should be true

// Test Case 2: Product with no stock
const testProduct2 = {
  name: "Test Ring 2",
  price: 999,
  productType: "ashta-dhatu",
  sizeVariants: [
    { size: "Small", stock: 0 },
    { size: "Medium", stock: 0 }
  ]
};

console.log("\nTest Case 2: Product with no stock");
console.log("Size Variants:", testProduct2.sizeVariants);
const totalStock2 = testProduct2.sizeVariants.reduce((total, variant) => total + (variant.stock || 0), 0);
console.log("Total Stock:", totalStock2); // Should be 0
console.log("In Stock:", totalStock2 > 0); // Should be false

// Test Case 3: Product with empty size variants
const testProduct3 = {
  name: "Test Ring 3",
  price: 999,
  productType: "ashta-dhatu",
  sizeVariants: []
};

console.log("\nTest Case 3: Product with empty size variants");
console.log("Size Variants:", testProduct3.sizeVariants);
const totalStock3 = testProduct3.sizeVariants.reduce((total, variant) => total + (variant.stock || 0), 0);
console.log("Total Stock:", totalStock3); // Should be 0
console.log("In Stock:", totalStock3 > 0); // Should be false

// Test Case 4: Product with null/undefined stock values
const testProduct4 = {
  name: "Test Ring 4",
  price: 999,
  productType: "ashta-dhatu",
  sizeVariants: [
    { size: "Small", stock: null },
    { size: "Medium", stock: undefined },
    { size: "Large", stock: 5 }
  ]
};

console.log("\nTest Case 4: Product with null/undefined stock values");
console.log("Size Variants:", testProduct4.sizeVariants);
const totalStock4 = testProduct4.sizeVariants.reduce((total, variant) => total + (variant.stock || 0), 0);
console.log("Total Stock:", totalStock4); // Should be 5
console.log("In Stock:", totalStock4 > 0); // Should be true
