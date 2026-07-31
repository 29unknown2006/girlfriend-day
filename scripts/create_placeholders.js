import fs from 'fs';
import path from 'path';

const photoDir = './src/assets/photos';
const letterDir = './src/assets/letter';
const audioDir = './src/assets/audio';

[photoDir, letterDir, audioDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to create clean SVG string converted to data URI / file
function createPhotoSVG(title, subtitle, bgColor, accentColor, width=600, height=600) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColor}" />
        <stop offset="100%" stop-color="${accentColor}" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#3A2E33" flood-opacity="0.15"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <circle cx="${width/2}" cy="${height/2 - 40}" r="80" fill="white" opacity="0.25"/>
    <path d="M${width/2} ${height/2 - 70} C${width/2 - 50} ${height/2 - 120}, ${width/2 - 110} ${height/2 - 50}, ${width/2} ${height/2 + 20} C${width/2 + 110} ${height/2 - 50}, ${width/2 + 50} ${height/2 - 120}, ${width/2} ${height/2 - 70} Z" fill="#E8737A" opacity="0.85" filter="url(#shadow)"/>
    <text x="50%" y="${height/2 + 90}" font-family="'Quicksand', sans-serif" font-weight="700" font-size="28" fill="#3A2E33" text-anchor="middle">${title}</text>
    <text x="50%" y="${height/2 + 130}" font-family="'Quicksand', sans-serif" font-size="18" fill="#B94F5C" text-anchor="middle">${subtitle}</text>
  </svg>`;
}

function createLetterSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100">
    <rect width="100%" height="100%" fill="#FFF8F3"/>
    <rect x="40" y="40" width="720" height="1020" rx="16" fill="#FFF" stroke="#F4A6B7" stroke-width="3" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.05))"/>
    
    <!-- Letter Header Decorative Border -->
    <path d="M 100 120 Q 400 80 700 120" fill="none" stroke="#E8737A" stroke-width="2" stroke-dasharray="6,6"/>
    
    <text x="400" y="180" font-family="Georgia, serif" font-weight="bold" font-size="38" fill="#B94F5C" text-anchor="middle">Happy Girlfriend's Day, Litchii ❤️</text>
    <text x="400" y="220" font-family="Georgia, serif" font-style="italic" font-size="22" fill="#E8737A" text-anchor="middle">To the most wonderful girl in the universe</text>
    
    <line x1="150" y1="260" x2="650" y2="260" stroke="#F8D7DE" stroke-width="2"/>
    
    <!-- Handwritten Style Simulated Letter Text -->
    <g font-family="Georgia, serif" font-size="22" fill="#3A2E33" opacity="0.9">
      <text x="120" y="320">My Dearest Litchii,</text>
      
      <text x="120" y="380">I sat down today trying to put every feeling I have into words,</text>
      <text x="120" y="420">and I realized that language is too small for what you mean to me.</text>
      
      <text x="120" y="490">From the quiet mornings to the loudest laughs we share,</text>
      <text x="120" y="530">every moment with you feels like home. You are my safe space,</text>
      <text x="120" y="570">my favorite smile, and my favorite thought before sleeping.</text>
      
      <text x="120" y="640">Thank you for loving me, for staying by my side, and for being</text>
      <text x="120" y="680">the purest, warmest light in my life.</text>
      
      <text x="120" y="750">I promise to protect your heart, make you laugh endlessly,</text>
      <text x="120" y="790">and choose you, over and over, without a second of doubt.</text>
      
      <text x="120" y="870">Happy Girlfriend's Day, my love. You have all of me.</text>
    </g>

    <!-- Signatures (Right aligned to prevent cutoff) -->
    <text x="680" y="950" font-family="Georgia, serif" font-style="italic" font-weight="bold" font-size="26" fill="#B94F5C" text-anchor="end">Forever yours,</text>
    <text x="680" y="990" font-family="Georgia, serif" font-weight="bold" font-size="24" fill="#E8737A" text-anchor="end">Daddy 💋 &amp; Guavaaaa ❤️</text>
  </svg>`;
}

// Write SVG files (and we can reference them cleanly)
fs.writeFileSync(path.join(photoDir, 'placeholder-couple.svg'), createPhotoSVG('Litchii & You ❤️', 'Center Couple Memory', '#FDE8EC', '#F4A6B7', 800, 800));
fs.writeFileSync(path.join(photoDir, 'placeholder-photo-1.svg'), createPhotoSVG('Sweet Smile 😊', 'Memory 1', '#FFF8F3', '#FDE8EC'));
fs.writeFileSync(path.join(photoDir, 'placeholder-photo-2.svg'), createPhotoSVG('Date Night 🌹', 'Memory 2', '#F1E6FA', '#F8D7DE'));
fs.writeFileSync(path.join(photoDir, 'placeholder-photo-3.svg'), createPhotoSVG('Laughter & Joy ✨', 'Memory 3', '#FDEDE1', '#F4A6B7'));
fs.writeFileSync(path.join(photoDir, 'placeholder-photo-4.svg'), createPhotoSVG('Our Adventure 🚗', 'Memory 4', '#FDE8EC', '#F1E6FA'));
fs.writeFileSync(path.join(photoDir, 'placeholder-photo-5.svg'), createPhotoSVG('Cozy Moments ☕', 'Memory 5', '#FFF8F3', '#FDEDE1'));
fs.writeFileSync(path.join(photoDir, 'placeholder-photo-6.svg'), createPhotoSVG('Sunset Walks 🌅', 'Memory 6', '#F8D7DE', '#F4A6B7'));
fs.writeFileSync(path.join(photoDir, 'placeholder-photo-7.svg'), createPhotoSVG('Forever Us 💖', 'Memory 7', '#F1E6FA', '#FDE8EC'));
fs.writeFileSync(path.join(photoDir, 'placeholder-photo-8.svg'), createPhotoSVG('My Favorite Person 👑', 'Memory 8', '#FDEDE1', '#F8D7DE'));

fs.writeFileSync(path.join(letterDir, 'placeholder-letter.svg'), createLetterSVG());

// Also copy SVG to PNG placeholder names if needed, or save SVG directly
console.log('Placeholders created successfully!');
