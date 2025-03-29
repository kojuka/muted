import * as fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

async function generateIcons(): Promise<void> {
  try {
    // Ensure icon directories exist
    if (!fs.existsSync('icons/png')) {
      fs.mkdirSync('icons/png', { recursive: true });
    }

    // Sizes for icons - add larger sizes for better toolbar display
    const sizes: number[] = [16, 32, 48, 64, 96, 128, 192];
    
    // Generate versions of the active icon
    const activeSource = fs.readFileSync('icons/icon-active.svg');
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Load the SVG image
      const img = await loadImage('icons/icon-active.svg');
      ctx.drawImage(img, 0, 0, size, size);
      
      // Write the PNG file
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(`icons/png/icon-active-${size}.png`, buffer);
      console.log(`Generated icons/png/icon-active-${size}.png`);
    }
    
    // Generate versions of the mute icon
    const muteSource = fs.readFileSync('icons/icon-mute.svg');
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Load the SVG image
      const img = await loadImage('icons/icon-mute.svg');
      ctx.drawImage(img, 0, 0, size, size);
      
      // Write the PNG file
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(`icons/png/icon-mute-${size}.png`, buffer);
      console.log(`Generated icons/png/icon-mute-${size}.png`);
    }
    
    console.log('All icons generated successfully');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 