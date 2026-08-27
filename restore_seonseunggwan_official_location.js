const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Restore meta keywords
html = html.replace('노천극장, khuatcenter', '선승관, khuatcenter');

// 2. Keep the About photo caption as 노천극장:
// <i class="fa-solid fa-location-dot" style="color: #f87171; margin-right: 4px;"></i> 경희대학교 국제캠퍼스 노천극장

// 3. Restore About section lead text to 선승관
html = html.replace(
    '노천극장에 위치한 <strong>Athletic Training Center (AT센터)</strong>는',
    '선승관에 위치한 <strong>Athletic Training Center (AT센터)</strong>는'
);

// 4. Restore Staff member cards research lab location to 선승관
html = html.replaceAll('<li>연구실: 경희대학교 노천극장 AT Center</li>', '<li>연구실: 경희대학교 선승관 AT Center</li>');

// 5. Restore Contact section
html = html.replace(
    '<span>경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 노천극장 AT 센터</span>',
    '<span>경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 선승관 AT 센터 (B1)</span>'
);

html = html.replace(
    '<span>경희대 국제캠퍼스 노천극장</span>',
    '<span>경희대 국제캠퍼스 선승관 B1</span>'
);

// 6. Restore Footer
html = html.replace(
    '<h4>경희대학교 노천극장 AT 센터</h4>',
    '<h4>경희대학교 선승관 AT 센터</h4>'
);

html = html.replace(
    '<p class="footer-address">(우)17104 경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 노천극장 AT 센터</p>',
    '<p class="footer-address">(우)17104 경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 선승관 AT 센터 (B1)</p>'
);

// 7. Restore lab fields in professorsData
html = html.replaceAll('lab: "경희대학교 노천극장 AT Center"', 'lab: "경희대학교 선승관 AT Center"');
html = html.replaceAll('lab: "노천극장 AT center (031-201-2787)"', 'lab: "선승관 AT center (031-201-2787)"');
html = html.replaceAll('"노천극장 AT center (031-201-2787)"', '"선승관 AT center (031-201-2787)"');

// 8. Update cache busters
const now = Date.now();
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully restored official center location to 선승관 (B1) while keeping photo caption as 노천극장');
