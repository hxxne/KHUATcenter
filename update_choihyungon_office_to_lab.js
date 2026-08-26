const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Change 사무실 -> 연구실 on card
html = html.replace(
    '<li>사무실: 경희대학교 선승관 AT Center</li>',
    '<li>연구실: 경희대학교 선승관 AT Center</li>'
);

// 2. Change modal label logic to always be 연구실
html = html.replace(
    'if (labLabel) labLabel.textContent = (cleanName === "최현곤") ? "사무실" : "연구실";',
    'if (labLabel) labLabel.textContent = "연구실";'
);

// 3. Update cache busters
const now = Date.now();
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully changed 사무실 to 연구실 for 최현곤');
