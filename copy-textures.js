const fs = require('fs');
const path = require('path');

const srcBrick = 'C:\\Users\\Mike\\.gemini\\antigravity-ide\\brain\\f2402f65-159d-4c15-95df-f4f8f1c334c9\\seamless_brick_texture_1784280037413.png';
const srcWood = 'C:\\Users\\Mike\\.gemini\\antigravity-ide\\brain\\f2402f65-159d-4c15-95df-f4f8f1c334c9\\seamless_wood_texture_1784280048824.png';

const destBrick = path.join(__dirname, 'public', 'images', 'brick-texture.png');
const destWood = path.join(__dirname, 'public', 'images', 'wood-texture.png');

try {
  fs.copyFileSync(srcBrick, destBrick);
  console.log('Successfully copied brick-texture.png to public/images');
  fs.copyFileSync(srcWood, destWood);
  console.log('Successfully copied wood-texture.png to public/images');
} catch (error) {
  console.error('Error copying files:', error);
}
