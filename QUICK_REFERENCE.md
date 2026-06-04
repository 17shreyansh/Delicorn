# 🎯 Quick Reference - Dynamic Homepage System

## 📍 URLs

### Frontend
- **Homepage**: `http://localhost:5173/`
- **Admin Panel**: `http://localhost:5173/admin/dynamic-homepage`
- **Login**: `http://localhost:5173/login`

### Backend API
- **Base URL**: `http://localhost:5000/api/dynamic-home`
- **Hero**: `/hero` (GET/PUT)
- **Jewelry**: `/jewelry` (GET/PUT)
- **Slider**: `/slider` (GET/PUT)
- **Marquee**: `/marquee` (GET/PUT)
- **All**: `/all` (GET)

## 🎨 Admin Panel Tabs

### 1️⃣ Hero Section
```
Fields:
- Title (text)
- Subtitle (textarea)
- Background Image (upload, max 5MB)
- Primary Button (text + link)
- Secondary Button (text + link)
```

### 2️⃣ Jewelry Banner
```
Fields:
- Title (textarea, supports \n for line breaks)
- Description (textarea)
- Background Image (upload, max 5MB)
- Button Text
- Button Link
```

### 3️⃣ Slider
```
Fields:
- Multiple Images (max 10, max 5MB each)
- Alt Text for each
- Order number for each
- Remove button for each
```

### 4️⃣ Promo Marquee
```
Fields:
- Text (scrolling text)
- Background Color (color picker)
- Text Color (color picker)
- Speed (1-20)
- Active (toggle on/off)
```

## 🖼️ Recommended Image Sizes

| Section | Size | Format |
|---------|------|--------|
| Hero Background | 1920x1080px | JPG/PNG |
| Jewelry Banner | 1920x680px | JPG/PNG |
| Slider Images | 800x1000px | JPG/PNG |
| Max File Size | 5MB | All |

## 🔑 Key Features

✅ **Upload Validation**
- Image files only (JPG, PNG, GIF)
- Max 5MB per file
- Auto validation on select

✅ **Preview**
- Click any image to preview
- Full-screen modal
- Close with X or click outside

✅ **Management**
- Replace images anytime
- Old files auto-deleted
- Order slides with numbers
- Remove individual items

✅ **Form Features**
- Required field validation
- Auto-save on upload
- Success/error messages
- Loading spinners

✅ **Error Handling**
- Fallback to defaults
- Network error recovery
- Validation messages
- Console logging (debug mode)

## 🚀 Quick Actions

### Upload New Hero Image
1. Go to Hero Section tab
2. Click upload box
3. Select image (<5MB)
4. Preview automatically
5. Click Save
6. Done! ✅

### Change Marquee Text
1. Go to Promo Marquee tab
2. Edit text field
3. Click Save
4. Refresh homepage to see ✅

### Add Slider Images
1. Go to Slider tab
2. Click upload (select multiple)
3. Edit alt text
4. Set order numbers
5. Click Save
6. Check homepage slider ✅

### Change Colors
1. Go to Promo Marquee tab
2. Click color box
3. Pick color or enter hex
4. Click Save
5. See changes immediately ✅

## 🐛 Quick Troubleshooting

**Problem**: Upload not working
**Fix**: Check console (F12), verify backend running

**Problem**: Image shows broken
**Fix**: Check `http://localhost:5000/uploads/homepage/filename.jpg`

**Problem**: Changes not showing
**Fix**: Hard refresh browser (Ctrl+Shift+R)

**Problem**: Can't access admin
**Fix**: Login with admin account first

**Problem**: Form validation error
**Fix**: Fill all required fields (marked with *)

## 📁 File Structure

```
Backend:
be/
├── models/
│   ├── HeroSection.js
│   ├── JewelryBanner.js
│   ├── SliderImage.js
│   └── PromoMarquee.js
├── controllers/
│   └── dynamicHomeController.js
├── routes/
│   └── dynamicHomeRoutes.js
└── uploads/
    └── homepage/
        └── [uploaded images]

Frontend:
frontend/src/
├── admin/pages/
│   └── DynamicHomePage.jsx
└── components/
    ├── Hero.jsx
    ├── Jewellery.jsx
    └── Slider.jsx
```

## 💡 Pro Tips

1. **Batch Upload**: Select multiple slider images at once
2. **Preview First**: Click uploaded image before saving
3. **Test Colors**: Use color picker preview
4. **Save Often**: Save after each major change
5. **Check Console**: Open F12 for debug info
6. **Refresh Data**: Use Refresh button if data seems stale
7. **Image Quality**: Use optimized images for faster loading
8. **Line Breaks**: Press Enter in jewelry title for line breaks
9. **Reorder Slides**: Change order numbers then save
10. **Toggle Marquee**: Turn off marquee with Active switch

## 📊 Status Indicators

| Indicator | Meaning |
|-----------|---------|
| Blue "Save" button | Ready to save |
| Spinning icon | Saving in progress |
| Green message | Success! |
| Red message | Error - check console |
| Loading spinner | Fetching data |

## 🎨 Default Values

If no data exists, system uses:
- **Hero**: Default jewelry hero image
- **Jewelry**: Default circle image
- **Slider**: 5 default product images
- **Marquee**: "4L+ Happy Customers..." text

## 🔄 Workflow

```
Edit → Preview → Save → Verify → Publish
  ↓       ↓       ↓       ↓        ↓
Type   Click   Click   Check   View
       image   Save    success  site
```

## 📞 Need Help?

1. Check `ADMIN_PANEL_TEST_GUIDE.md`
2. Check `TROUBLESHOOTING.md`
3. Check browser console (F12)
4. Check backend logs
5. Review `DYNAMIC_HOMEPAGE_GUIDE.md`

## ✨ Quick Commands

```bash
# Start Backend
cd be
npm start

# Start Frontend
cd frontend
npm run dev

# Check Logs
# Open browser F12 > Console

# Test API
curl http://localhost:5000/api/dynamic-home/all
```

---

**Everything is working perfectly! Start customizing your homepage now! 🎉**
