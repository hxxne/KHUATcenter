const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

// Update max-width of modern-profile-card to 350px if it is 320px
css = css.replace(/max-width:\s*320px;(\s*display:\s*flex;\s*flex-direction:\s*column;\s*align-items:\s*flex-start;)/, 'max-width: 350px;$1');

// Append degree-line styling
const degreeCSS = `
/* Degree line single line formatting for Member Cards */
.modern-profile-exp li.degree-line {
    font-size: 0.815rem !important;
    letter-spacing: -0.65px !important;
    white-space: nowrap !important;
}

@media (max-width: 480px) {
    .modern-profile-exp li.degree-line {
        white-space: normal !important;
        font-size: 0.78rem !important;
        letter-spacing: -0.5px !important;
    }
}
`;

if (!css.includes('.modern-profile-exp li.degree-line')) {
    css += '\n' + degreeCSS;
}
fs.writeFileSync('style.css', css, 'utf8');
console.log('Updated style.css with degree-line styling');

// 2. Update index.html with class="degree-line" for 박지홍 교수 and others
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    '<li>학위명: 체육과학 박사(Physical Medicine &amp; Rehabilitation 전공)</li>',
    '<li class="degree-line">학위명: 체육과학 박사(Physical Medicine &amp; Rehabilitation 전공)</li>'
);

html = html.replace(
    '<li>학위명: 스포츠심리학-운동제어 박사(Motor Control 전공)</li>',
    '<li class="degree-line">학위명: 스포츠심리학-운동제어 박사(Motor Control 전공)</li>'
);

html = html.replace(
    '<li>학위명: 체육학 석사 (Athletic Training 전공)</li>',
    '<li class="degree-line">학위명: 체육학 석사 (Athletic Training 전공)</li>'
);

html = html.replace(
    '<li>학위명: 체육학 석사 (Sports Medicine and Science 전공)</li>',
    '<li class="degree-line">학위명: 체육학 석사 (Sports Medicine and Science 전공)</li>'
);

// 3. Update cache busters
const now = Date.now();
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html with degree-line classes and fresh cache busters');
