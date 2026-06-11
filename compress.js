const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');

async function processImages() {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.jpg')) {
      // Don't touch next.svg, vercel.svg, etc.
      const filePath = path.join(publicDir, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const outPath = path.join(publicDir, `${baseName}.webp`);
      
      console.log(`Converting ${file} to WebP...`);
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outPath);
        
        console.log(`Success! Original: ${fs.statSync(filePath).size} bytes, New: ${fs.statSync(outPath).size} bytes`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err);
      }
    }
  }
}

processImages();
