# Testing Guide - Stock Management & Product Fields

## 1. Test Stock Management

### Backend Test
1. Open a product in admin panel
2. Add size variants with stock:
   - Size: Small, Stock: 5
   - Size: Medium, Stock: 10
   - Size: Large, Stock: 0
3. Save the product
4. Check the database or API response:
   - `totalStock` should be 15
   - `inStock` should be true

### Frontend Test - Product Detail Page
1. Navigate to a product with stock
2. Should see: "In stock - ready to ship (15 available)"
3. "Add to Bag" button should be enabled

4. Navigate to a product with NO stock (all variants = 0)
5. Should see: "Out of stock" in red
6. "Add to Bag" button should be disabled

### Frontend Test - Product Card
1. View products list/grid
2. Products with stock: "Add to cart" button enabled
3. Products without stock: "Out of Stock" button disabled

## 2. Test Free-Text Fields

### Admin Panel Test
1. Go to Add Product or Edit Product
2. Fill in the following fields with free text:

**Material:**
```
Gold, Silver, Ashta Dhatu Alloy
```

**Available Colors:**
```
Gold, Silver, Rose Gold, Antique Gold
```

**Metal Details:**
```
Ashta Dhatu alloy base
Eight sacred metals blend
Traditional craftsmanship
Vedic metal composition
```

**Benefits:**
```
Hypoallergenic & skin-friendly
Durable & long-lasting finish
Lightweight & comfortable
Tarnish resistant
```

**Spiritual Benefits:**
```
Positive energy enhancement
Chakra balancing properties
Astrological significance
Spiritual protection
```

3. Save the product

### Frontend Test - Product Detail Page
1. Navigate to the product you just created/edited
2. Scroll down to the collapsible sections
3. Verify all sections display correctly:
   - DESCRIPTION
   - MATERIAL (shows as plain text)
   - METAL DETAILS (shows as bullet list)
   - BENEFITS (shows with checkmarks)
   - SPIRITUAL BENEFITS (shows with checkmarks)

4. Check color display:
   - Colors should appear as colored circles
   - Parsed from comma or newline separated text

## 3. Common Issues & Solutions

### Issue: Stock still shows "Out of Stock" even with stock
**Solution:** 
- Make sure you've restarted the backend server after updating the Product model
- Clear browser cache and refresh
- Check that `totalStock` is calculated in the database (run the product save again)

### Issue: Fields not saving in admin panel
**Solution:**
- Check browser console for errors
- Verify backend is running
- Check that field names match between frontend and backend

### Issue: Sections not displaying on frontend
**Solution:**
- Make sure the fields have data (not empty strings)
- Check browser console for JavaScript errors
- Verify the product data is being fetched correctly

## 4. Database Migration (If Needed)

If you have existing products with array fields, you may need to migrate them:

```javascript
// Run this in MongoDB shell or create a migration script
db.products.find().forEach(function(product) {
  const updates = {};
  
  // Convert arrays to strings
  if (Array.isArray(product.availableColors)) {
    updates.availableColors = product.availableColors.join(', ');
  }
  if (Array.isArray(product.metalDetails)) {
    updates.metalDetails = product.metalDetails.join('\n');
  }
  if (Array.isArray(product.benefits)) {
    updates.benefits = product.benefits.join('\n');
  }
  
  // Recalculate stock
  if (product.sizeVariants && product.sizeVariants.length > 0) {
    updates.totalStock = product.sizeVariants.reduce((total, v) => total + (v.stock || 0), 0);
    updates.inStock = updates.totalStock > 0;
  } else {
    updates.totalStock = 0;
    updates.inStock = false;
  }
  
  if (Object.keys(updates).length > 0) {
    db.products.updateOne({ _id: product._id }, { $set: updates });
  }
});
```

## 5. API Testing

Test the API endpoints directly:

### Get Product
```bash
curl http://localhost:3001/api/products/YOUR_PRODUCT_SLUG
```

Check the response for:
- `totalStock` field
- `inStock` field
- `availableColors` as string
- `metalDetails` as string
- `benefits` as string
- `spiritualBenefits` as string

### Update Product Stock
```bash
curl -X PATCH http://localhost:3001/api/products/PRODUCT_ID/stock \
  -H "Content-Type: application/json" \
  -d '{"size": "Medium", "stock": 20}'
```

Verify `totalStock` is recalculated correctly.
