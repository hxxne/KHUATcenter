const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('<span class="stat-number" data-target="82">0</span>', '<span class="stat-number" data-target="82">82</span>');
html = html.replace('<span class="stat-number" data-target="63">0</span>', '<span class="stat-number" data-target="63">63</span>');
html = html.replace('<span class="stat-number" data-target="320">0</span>', '<span class="stat-number" data-target="320">320</span>');
html = html.replace('<h3 class="stat-label">발표 논문 및 학술 연구 실적 (편) </h3>', '<h3 class="stat-label">발표 논문 및 학술 연구 실적 (편)</h3>');

const now = Date.now();
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated stats spans in index.html');
