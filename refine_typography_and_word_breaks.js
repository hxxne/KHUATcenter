const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Refine About Section text with natural breaks and word protection
const refinedAboutText = `                    <div class="about-text-block">
                        <p class="about-lead">
                            선승관에 위치한 <strong>Athletic Training Center (AT센터)</strong>는 체육대학 학부 및 대학원생들로 이루어진<br class="pc-br">
                            Athletic Training 동아리의 스태프와 대학원생들이 운영하는 실천적 학술 및 스포츠케어 공간입니다.
                        </p>
                        <p class="about-detail">
                            체육부 운동선수, 교직원, 그리고 일반 학생 모두를 대상으로 전문화된 트레이닝과 재활 서비스를 제공하고 있으며,<br class="pc-br">
                            <span class="highlight-word">교육(Education)</span>, <span class="highlight-word">연구(Research)</span>, <span class="highlight-word">서비스(Service)</span> 세 부문의 유기적인 시너지를 통해 스포츠의학적 역량을 전파하고 있습니다.
                        </p>
                    </div>`;

const aboutTextStart = html.indexOf('<div class="about-text-block">');
const aboutTextEnd = html.indexOf('<!-- 5 Highlights Grid -->', aboutTextStart);

if (aboutTextStart !== -1 && aboutTextEnd !== -1) {
    html = html.substring(0, aboutTextStart) + refinedAboutText + '\n                    \n                    ' + html.substring(aboutTextEnd);
    console.log('Successfully updated about-text-block with natural line breaks');
}

// 2. Update style.css to support .pc-br and strengthen word-break / text-wrap across cards
let css = fs.readFileSync('style.css', 'utf8');

const typographyRules = `
/* Clean Typographic Line Breaks & Word Protection */
.pc-br {
    display: inline;
}
@media (max-width: 991px) {
    .pc-br {
        display: none;
    }
}

.about-lead, .about-detail {
    word-break: keep-all;
    overflow-wrap: break-word;
    text-wrap: pretty;
}

.bento-item-desc {
    font-size: 0.88rem;
    color: #475569;
    margin: 0;
    line-height: 1.6;
    word-break: keep-all;
    overflow-wrap: break-word;
    text-wrap: pretty;
    font-weight: 500;
    padding-left: 20px;
}

.hi-card-txt {
    font-size: 1.02rem;
    color: #0f172a;
    font-weight: 700;
    line-height: 1.45;
    word-break: keep-all;
    overflow-wrap: break-word;
    text-wrap: pretty;
}
`;

if (!css.includes('.pc-br {')) {
    css += '\n' + typographyRules;
} else {
    css = css.replace(/\/\* Clean Typographic Line Breaks[\s\S]*?\.hi-card-txt \{[^}]*\}/g, typographyRules.trim());
}

fs.writeFileSync('style.css', css, 'utf8');
console.log('Updated style.css with clean typography and line-break rules');

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
