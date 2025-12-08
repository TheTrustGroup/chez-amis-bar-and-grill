/**
 * Favicon Generation Script
 * 
 * This script generates all required favicon sizes from the logo.png file
 * 
 * Requirements:
 * - Install sharp: npm install --save-dev sharp
 * - Logo file at: public/logo.png
 * 
 * Usage: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/logo.png');
const outputDir = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check if logo exists
if (!fs.existsSync(logoPath)) {
  console.error('❌ Logo file not found at:', logoPath);
  console.error('Please ensure public/logo.png exists');
  process.exit(1);
}

// Favicon sizes to generate
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from logo...\n');

  try {
    // Generate PNG favicons
    for (const { size, name } of faviconSizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png({
          quality: 100,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ Generated ${name} (${size}x${size}) - ${(stats.size / 1024).toFixed(2)} KB`);
    }

    // Generate favicon.ico (multi-resolution ICO)
    // Note: sharp doesn't support ICO directly, so we'll create a simple one
    // For best results, use an online converter or ImageMagick
    console.log('\n⚠️  favicon.ico requires manual conversion');
    console.log('   Use: https://convertio.co/png-ico/ or ImageMagick');
    console.log('   Convert favicon-32x32.png to favicon.ico\n');

    console.log('✨ Favicon generation complete!');
    console.log('\n📋 Next steps:');
    console.log('   1. Convert favicon-32x32.png to favicon.ico');
    console.log('   2. Verify all files are in /public directory');
    console.log('   3. Test in browser (hard refresh: Ctrl+Shift+R)');

  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

// Run the script
generateFavicons();

