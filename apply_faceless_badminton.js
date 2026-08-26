const fs = require('fs');

const src = 'C:/Users/LG/.gemini/antigravity/brain/9888bb91-57bf-4631-b8fe-3f3d8fbe1556/badminton_faceless_crimson_pictogram_1787716317275.jpg';
const dest = 'assets/pictogram_badminton.jpg';

fs.copyFileSync(src, dest);
console.log('Successfully copied faceless crimson badminton pictogram to', dest);

// Update index.html cache busters
let html = fs.readFileSync('index.html', 'utf8');
const now = Date.now();
html = html.replace(/pictogram_badminton\.jpg(\?v=\d+)?/g, 'pictogram_badminton.jpg?v=' + now);
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html cache busters');
