const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Hero Description to exact 3-line format
const oldHeroDesc = `<p class="hero-description">
                경희대학교 국제캠퍼스에 위치한 Athletic Training Center는<br class="pc-br">
                전문적인 스포츠의학 교육, 체육부 선수들을 위한 임상 실무, 과학적 연구를 통합하여 최상의 케어를 실천합니다.
            </p>`;

const newHeroDesc = `<p class="hero-description">
                경희대학교 국제캠퍼스에 위치한 Athletic Training Center는<br>
                전문적인 스포츠의학 교육, 체육부 선수들을 위한 임상 실무, 과학적 연구를 통합하여<br>
                최상의 케어를 실천합니다.
            </p>`;

if (html.includes(oldHeroDesc)) {
    html = html.replace(oldHeroDesc, newHeroDesc);
    console.log('Successfully updated Hero description to 3 lines');
}

// 2. Remove [논문 63편 보기 ↗] from Core Pillars Research Card
const oldResearchSubtitle = '<p class="bento-subtitle">근거 중심 스포츠의학(EBM) 구현 <span style="font-size: 0.8rem; color: #38bdf8; font-weight: 700; margin-left: 4px;">[논문 63편 보기 ↗]</span></p>';
const newResearchSubtitle = '<p class="bento-subtitle">근거 중심 스포츠의학(EBM) 구현</p>';
if (html.includes(oldResearchSubtitle)) {
    html = html.replace(oldResearchSubtitle, newResearchSubtitle);
    console.log('Successfully removed [논문 63편 보기] badge from Research Bento card');
}

// 3. Synchronize Dashboard Stats Target to 63
html = html.replace('<span class="stat-number" data-target="61">0</span>', '<span class="stat-number" data-target="63">0</span>');
console.log('Synchronized dashboard stat-number data-target to 63');

// 4. Update About section 5 highlights grid styling in style.css
let css = fs.readFileSync('style.css', 'utf8');

const updatedAboutHighlightsCSS = `/* 5 Clean Highlights List - Perfect Alignment */
.about-clean-highlights {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px 20px;
    max-width: 920px;
    margin: 32px auto 0 auto;
    border-top: 1px solid #edf2f7;
    padding-top: 28px;
}

.about-clean-item {
    background: #f8fafc;
    border: 1.5px solid #edf2f7;
    border-radius: 14px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: all 0.22s ease;
}

.about-clean-item:hover {
    background: #ffffff;
    border-color: #A50034;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(165, 0, 52, 0.08);
}

.about-clean-wide {
    grid-column: 1 / -1;
}

.about-clean-num {
    font-size: 0.92rem;
    font-weight: 900;
    color: #ffffff;
    background: linear-gradient(135deg, #A50034 0%, #700023 100%);
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(165, 0, 52, 0.25);
}

.about-clean-txt {
    font-size: 1.02rem;
    font-weight: 700;
    color: #1e293b;
    word-break: keep-all;
}

@media (max-width: 768px) {
    .about-clean-highlights {
        grid-template-columns: 1fr;
        gap: 10px;
    }
    .about-clean-wide {
        grid-column: auto;
    }
}`;

const oldAboutHiStart = css.indexOf('/* 5 Clean Highlights List');
const oldAboutHiEnd = css.indexOf('/* --------------------------------------------------------------------------\n   Bento Media Sliders');

if (oldAboutHiStart !== -1 && oldAboutHiEnd !== -1) {
    css = css.substring(0, oldAboutHiStart) + updatedAboutHighlightsCSS + '\n\n' + css.substring(oldAboutHiEnd);
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully updated About highlights CSS in style.css');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
