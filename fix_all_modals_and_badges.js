const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add onclick="openProfModal(this)" to all modern-profile-card divs that don't have it yet
html = html.replace(/<div class="modern-profile-card"(?!.*onclick)/g, '<div class="modern-profile-card" onclick="openProfModal(this)"');

// 2. Update style.css to ensure assistant-badge has rich KHU Burgundy pill styling and modal-overlay.show works with 100% reliability
let css = fs.readFileSync('style.css', 'utf8');

const assistantBadgeCSS = `
/* Assistant Badge Pill Styling in Sports Modal */
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
    css += '\n' + assistantBadgeCSS;
} else {
    css = css.replace(/\.assistant-badge\s*\{[^}]*\}/g, assistantBadgeCSS);
}

// Make sure modal-overlay.show has strong visibility rules
css = css.replace(/\.modal-overlay\.show\s*\{[^}]*\}/, `.modal-overlay.show {
    display: flex !important;
    opacity: 1 !important;
    visibility: visible !important;
}`);

fs.writeFileSync('style.css', css, 'utf8');
console.log('Updated style.css with assistant-badge and modal-overlay.show rules');

// Bump version in index.html
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html with inline onclick for all profile cards and cache busted');
