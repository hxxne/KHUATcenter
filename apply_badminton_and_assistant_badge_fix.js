const fs = require('fs');

// 1. Copy the new Crimson Red Badminton pictogram
const src = 'C:/Users/LG/.gemini/antigravity/brain/9888bb91-57bf-4631-b8fe-3f3d8fbe1556/badminton_crimson_pictogram_1787716237282.jpg';
const dest = 'assets/pictogram_badminton.jpg';
fs.copyFileSync(src, dest);
console.log('Successfully copied Crimson Red badminton pictogram to', dest);

// 2. Update style.css with Assistant Badge & Pictogram styling
let css = fs.readFileSync('style.css', 'utf8');

const sportsModalAndPictogramCSS = `
/* --------------------------------------------------------------------------
   Sports Pictograms & Assistant AT Badges
   -------------------------------------------------------------------------- */
.pictogram-img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    mix-blend-mode: multiply;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    transition: transform 0.25s ease;
}

.sport-card:hover .pictogram-img {
    transform: scale(1.1);
}

.sport-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    margin: 0 auto 12px auto;
    border-radius: 50%;
}

/* Assistant Badge Pill Styling in Sports Modal */
#modal-assistants-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;
}

.assistant-badge {
    background: #FFF0F2;
    border: 1.5px solid #FFCCD3;
    padding: 8px 18px;
    border-radius: 24px;
    font-size: 0.95rem;
    font-weight: 700;
    color: #A50034;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(165, 0, 52, 0.08);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
}

.assistant-badge:hover {
    background: #A50034;
    color: #ffffff;
    border-color: #A50034;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(165, 0, 52, 0.25);
}
`;

if (!css.includes('.assistant-badge {')) {
    css += '\n' + sportsModalAndPictogramCSS;
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully appended Assistant Badge & Pictogram CSS to style.css');
}

// 3. Update cache busters in index.html
let html = fs.readFileSync('index.html', 'utf8');
const now = Date.now();
html = html.replace(/pictogram_badminton\.jpg(\?v=\d+)?/g, 'pictogram_badminton.jpg?v=' + now);
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html with fresh cache busters');
