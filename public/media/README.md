# Media Gallery Structure

This directory contains all media assets for the Chez Amis Bar and Grill website.

## Directory Structure

```
/public/media/
  /images/
    /dishes/
      /attieke/          # Attieke dish photos
      /grill/            # Grilled specialties
      /appetizers/       # Appetizer photos
      /mains/            # Main course photos
      /desserts/         # Dessert photos
      /beverages/        # Beverage photos
    /restaurant/
      /interior/         # Dining room, bar area
      /exterior/         # Restaurant exterior
      /ambiance/         # Ambiance shots, table settings
    /team/               # Chef and staff photos
    /events/             # Event and promotion images
    /social/             # Social media posts
  /videos/
    /cooking/            # Cooking/preparation videos
    /restaurant-tour/    # Restaurant tour videos
    /ambiance/           # Ambiance videos
```

## Image Optimization Guidelines

### Recommended Sizes:
- **Hero images**: 1920x1080px
- **Dish photos**: 800x800px (square)
- **Gallery images**: 1200x800px
- **Thumbnails**: 400x400px
- **Social media posts**: 1080x1080px (square)

### File Formats:
- **Primary**: WebP (for modern browsers)
- **Fallback**: JPEG (for older browsers)
- **Quality**: 85-90% for photos, 80% for thumbnails
- **Max file size**: < 200KB per image

### Naming Convention:
- Use descriptive, lowercase names with hyphens
- Example: `attieke-grilled-tilapia-001.jpg`
- Include version numbers for multiple images of same dish

## Video Optimization Guidelines

### Recommended Settings:
- **Format**: H.264 MP4
- **Resolution**: 1920x1080px (Full HD) or 1280x720px (HD)
- **Frame rate**: 30fps
- **Max file size**: < 10MB per video
- **Poster images**: Create first frame as JPEG (1200x675px)

### Naming Convention:
- Use descriptive, lowercase names with hyphens
- Example: `chef-preparing-attieke.mp4`
- Poster: `chef-preparing-attieke-poster.jpg`

## Upload Instructions

1. **Organize files** by category before uploading
2. **Optimize images** using tools like:
   - ImageOptim (Mac)
   - Squoosh (Web)
   - TinyPNG (Web)
3. **Compress videos** using:
   - HandBrake
   - FFmpeg
   - Online tools like CloudConvert
4. **Create thumbnails** for all images (400x400px)
5. **Create poster images** for all videos (first frame as JPEG)
6. **Update galleryMedia.ts** with new media items

## Current Media Inventory

### Images Uploaded:
- ✅ Attieke with Grilled Tilapia
- ✅ Attieke with Fried Fish Platter
- ✅ Acheke promotional images
- ✅ Grilled fish dishes
- ✅ Mixed grill platters
- ✅ Takeaway packaging
- ✅ Restaurant promotional materials

### Videos Needed:
- ⏳ Chef preparing signature dishes
- ⏳ Restaurant tour
- ⏳ Ambiance videos
- ⏳ Behind-the-scenes kitchen footage

## Next Steps

1. Upload optimized images to appropriate folders
2. Upload optimized videos with poster images
3. Update `lib/data/galleryMedia.ts` with new media items
4. Test gallery page to ensure all media loads correctly
5. Verify mobile responsiveness
6. Check loading performance


