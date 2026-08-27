const fs = require('fs');

// 1. Copy the HD photo to assets/images/at_center_interior.jpg
const src = 'C:/Users/LG/.gemini/antigravity/brain/9888bb91-57bf-4631-b8fe-3f3d8fbe1556/at_center_hd_interior_1787814943545.jpg';
const dest = 'assets/images/at_center_interior.jpg';

fs.copyFileSync(src, dest);
console.log('Successfully copied crystal-clear HD interior photo to', dest);

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace keywords
html = html.replace('선승관, khuatcenter', '노천극장, khuatcenter');

// Replace About section photo caption
html = html.replace(
    '<i class="fa-solid fa-location-dot" style="color: #f87171; margin-right: 4px;"></i> 경희대학교 국제캠퍼스 선승관 AT Center',
    '<i class="fa-solid fa-location-dot" style="color: #f87171; margin-right: 4px;"></i> 경희대학교 국제캠퍼스 노천극장'
);

// Replace About section lead text
html = html.replace(
    '선승관에 위치한 <strong>Athletic Training Center (AT센터)</strong>는',
    '노천극장에 위치한 <strong>Athletic Training Center (AT센터)</strong>는'
);

// Replace Staff member cards research lab location
html = html.replaceAll('<li>연구실: 경희대학교 선승관 AT Center</li>', '<li>연구실: 경희대학교 노천극장 AT Center</li>');

// Replace Contact section
html = html.replace(
    '<span>경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 선승관 AT 센터 (B1)</span>',
    '<span>경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 노천극장 AT 센터</span>'
);

html = html.replace(
    '<span>경희대 국제캠퍼스 선승관 B1</span>',
    '<span>경희대 국제캠퍼스 노천극장</span>'
);

// Replace Footer
html = html.replace(
    '<h4>경희대학교 선승관 AT 센터</h4>',
    '<h4>경희대학교 노천극장 AT 센터</h4>'
);

html = html.replace(
    '<p class="footer-address">(우)17104 경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 선승관 AT 센터 (B1)</p>',
    '<p class="footer-address">(우)17104 경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 노천극장 AT 센터</p>'
);

// Replace lab fields in professorsData
html = html.replaceAll('lab: "경희대학교 선승관 AT Center"', 'lab: "경희대학교 노천극장 AT Center"');
html = html.replaceAll('lab: "선승관 AT center (031-201-2787)"', 'lab: "노천극장 AT center (031-201-2787)"');
html = html.replaceAll('"선승관 AT center (031-201-2787)"', '"노천극장 AT center (031-201-2787)"');

// Update image and style cache busters
const now = Date.now();
html = html.replace(/at_center_interior\.jpg\?v=\d+/, 'at_center_interior.jpg?v=' + now);
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated location to 노천극장 and refreshed cache busters in index.html');
