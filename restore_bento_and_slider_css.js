const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

const completePillarsAndSlidersCSS = `
/* --------------------------------------------------------------------------
   Bento Media Sliders & Bento Pillars Grid (Full UI/UX Restoration)
   -------------------------------------------------------------------------- */
.bento-pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    margin-top: 35px;
    align-items: stretch;
}

.bento-card {
    background: #ffffff;
    border: 1px solid #e5e9f0;
    border-radius: 22px;
    padding: 0;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
}

.bento-card:hover {
    transform: translateY(-7px);
    box-shadow: 0 20px 45px rgba(165, 0, 52, 0.08);
    border-color: #f0cdd3;
}

/* Bento Top Media Slider */
.bento-media-slider {
    width: 100%;
    height: 195px;
    position: relative;
    overflow: hidden;
    background: #0f172a;
}

.bento-slide-track {
    width: 100%;
    height: 100%;
    position: relative;
}

.bento-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1.04);
}

.bento-slide.active {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
}

.bento-slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.bento-slide-caption {
    position: absolute;
    bottom: 10px;
    left: 12px;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #ffffff;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: -0.2px;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.slider-dots {
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    gap: 6px;
    z-index: 5;
}

.slider-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.25s ease;
}

.slider-dot.active {
    width: 20px;
    border-radius: 10px;
    background: #ffffff;
}

/* Card Header with subtle tint */
.bento-card-header {
    padding: 24px 24px 18px 24px;
    position: relative;
    border-bottom: 1px solid #f1f5f9;
}

.bento-card-edu .bento-card-header {
    background: linear-gradient(180deg, #fff5f6 0%, #ffffff 100%);
    border-top: 4px solid #A50034;
}
.bento-card-res .bento-card-header {
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    border-top: 4px solid #1E293B;
}
.bento-card-srv .bento-card-header {
    background: linear-gradient(180deg, #fff9f5 0%, #ffffff 100%);
    border-top: 4px solid #C2410C;
}

.bento-badge-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.bento-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.8px;
}

.badge-edu {
    background: rgba(165, 0, 52, 0.1);
    color: #A50034;
}
.badge-res {
    background: rgba(30, 41, 59, 0.1);
    color: #1E293B;
}
.badge-srv {
    background: rgba(194, 65, 12, 0.1);
    color: #C2410C;
}

.bento-cat-icon {
    font-size: 1.25rem;
    opacity: 0.75;
}
.bento-card-edu .bento-cat-icon { color: #A50034; }
.bento-card-res .bento-cat-icon { color: #1E293B; }
.bento-card-srv .bento-cat-icon { color: #C2410C; }

.bento-title {
    font-size: 1.65rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px 0;
    letter-spacing: -0.5px;
}

.bento-subtitle {
    font-size: 0.92rem;
    color: #64748b;
    font-weight: 600;
    margin: 0 0 12px 0;
}

.bento-tags {
    display: flex;
    gap: 8px;
}

.bento-tags span {
    font-size: 0.78rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 6px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #475569;
}

/* Card Body & Spacious Item Blocks */
.bento-card-body {
    padding: 20px 22px 24px 22px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    background: #ffffff;
}

.bento-item {
    background: #f8fafc;
    border: 1px solid #edf2f7;
    border-radius: 14px;
    padding: 13px 16px;
    transition: all 0.25s ease;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.bento-item:hover {
    background: #ffffff;
    border-color: #cbd5e1;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
    transform: translateX(3px);
}

.bento-card-edu .bento-item:hover {
    border-left: 3.5px solid #A50034;
}
.bento-card-res .bento-item:hover {
    border-left: 3.5px solid #1E293B;
}
.bento-card-srv .bento-item:hover {
    border-left: 3.5px solid #C2410C;
}

.bento-item-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.item-bullet-icon {
    font-size: 0.88rem;
    flex-shrink: 0;
}
.bento-card-edu .item-bullet-icon { color: #A50034; }
.bento-card-res .item-bullet-icon { color: #334155; }
.bento-card-srv .item-bullet-icon { color: #C2410C; }

.bento-item-header h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    line-height: 1.35;
}

.bento-item-desc {
    font-size: 0.85rem;
    color: #475569;
    margin: 0;
    line-height: 1.55;
    word-break: keep-all;
    font-weight: 500;
    padding-left: 20px;
}

/* Instagram CTA Banner */
.pillars-instagram-cta-banner {
    margin-top: 35px;
    background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #4c0519 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 26px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    box-shadow: 0 15px 40px rgba(15, 23, 42, 0.12);
    position: relative;
    overflow: hidden;
}

.pillars-instagram-cta-banner::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(225, 48, 108, 0.25) 0%, rgba(0,0,0,0) 70%);
    pointer-events: none;
}

.insta-cta-left {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
}

.insta-cta-icon-badge {
    width: 58px;
    height: 58px;
    border-radius: 18px;
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #ffffff;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(225, 48, 108, 0.35);
}

.insta-cta-tag {
    font-size: 0.76rem;
    font-weight: 800;
    color: #f43f5e;
    letter-spacing: 1.2px;
    margin-bottom: 4px;
}

.insta-cta-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
}

.insta-cta-title strong {
    color: #fda4af;
    font-weight: 800;
}

.insta-cta-desc {
    font-size: 0.92rem;
    color: #94a3b8;
    margin: 0;
    word-break: keep-all;
}

.insta-cta-btn {
    background: #ffffff;
    color: #0f172a;
    font-weight: 800;
    font-size: 0.95rem;
    padding: 14px 24px;
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    flex-shrink: 0;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 1;
}

.insta-cta-btn:hover {
    background: #fecdd3;
    color: #881337;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(225, 48, 108, 0.25);
}

@media (max-width: 991px) {
    .bento-pillars-grid {
        grid-template-columns: 1fr;
        gap: 24px;
    }
    .pillars-instagram-cta-banner {
        flex-direction: column;
        align-items: flex-start;
        padding: 22px;
    }
    .insta-cta-btn {
        width: 100%;
        justify-content: center;
    }
}
`;

// Append or replace
if (css.includes('.bento-pillars-grid {')) {
    css = css.replace(/\.bento-pillars-grid \{[\s\S]*?@media \(max-width: 991px\) \{[\s\S]*?\}\s*\}/, completePillarsAndSlidersCSS.trim());
} else {
    css += '\n' + completePillarsAndSlidersCSS;
}

fs.writeFileSync('style.css', css, 'utf8');
console.log('Successfully restored Bento Pillars & Sliders CSS into style.css');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());
fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html with new cache buster');
