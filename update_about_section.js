const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Updated About Section HTML
const updatedAboutHTML = `    <!-- About Section (Large Hero Image Top + Content Below) -->
    <section id="about" class="section-padding">
        <div class="container">
            <div class="section-header text-center">
                <h2 class="section-title">센터 소개</h2>
                <div class="divider"></div>
                <p class="section-subtitle">선수의 경기력 향상 및 교직원 건강 증진을 위한 스포츠의학 실천 공간</p>
            </div>
            
            <div class="about-hero-container">
                <!-- Large Top Image -->
                <div class="about-hero-image-wrap">
                    <img src="assets/images/at_center_interior.jpg?v=2" alt="경희대학교 AT 센터 내부 전경" class="about-hero-img">
                    <div class="about-hero-caption">
                        <i class="fa-solid fa-location-dot"></i> 경희대학교 국제캠퍼스 선승관 AT Center
                    </div>
                </div>
                
                <!-- Content Below -->
                <div class="about-hero-content">
                    <div class="about-text-block">
                        <p class="about-lead">
                            선승관에 위치한 <strong>Athletic Training Center (AT센터)</strong>는 체육대학 학부 및 대학원생들로 이루어진 
                            Athletic Training 동아리의 스태프와 대학원생들이 운영하는 실천적 학술 및 스포츠케어 공간입니다.
                        </p>
                        <p class="about-detail">
                            체육부 운동선수, 교직원, 그리고 일반 학생 모두를 대상으로 전문화된 트레이닝과 재활 서비스를 제공하고 있으며, 
                            <span class="highlight-word">교육(Education)</span>, <span class="highlight-word">연구(Research)</span>, <span class="highlight-word">서비스(Service)</span> 
                            세 부문의 유기적인 시너지를 통해 스포츠의학적 역량을 전파하고 있습니다.
                        </p>
                    </div>
                    
                    <!-- 5 Highlights Grid -->
                    <div class="about-grid-highlights-new">
                        <div class="hi-card">
                            <div class="hi-num-badge">01</div>
                            <div class="hi-card-txt">스포츠의학 현장 전문가 양성 교육</div>
                        </div>
                        <div class="hi-card">
                            <div class="hi-num-badge">02</div>
                            <div class="hi-card-txt">임상 및 데이터 기반 경기력 향상 연구</div>
                        </div>
                        <div class="hi-card">
                            <div class="hi-num-badge">03</div>
                            <div class="hi-card-txt">엘리트 운동선수 밀착 케어</div>
                        </div>
                        <div class="hi-card">
                            <div class="hi-num-badge">04</div>
                            <div class="hi-card-txt">교직원 스포츠재활 프로그램</div>
                        </div>
                        <div class="hi-card hi-card-wide">
                            <div class="hi-num-badge">05</div>
                            <div class="hi-card-txt">단기 스포츠 이벤트 스포츠의학 현장 파견 서비스</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

// Replace about section in index.html
const aboutStart = html.indexOf('<!-- About Section');
const aboutEnd = html.indexOf('<!-- Core Pillars Section');

if (aboutStart !== -1 && aboutEnd !== -1) {
    html = html.substring(0, aboutStart) + updatedAboutHTML + '\n\n    ' + html.substring(aboutEnd);
    console.log('Successfully replaced About section HTML');
}

// 2. Updated CSS in style.css
let css = fs.readFileSync('style.css', 'utf8');

const updatedAboutCSS = `/* --------------------------------------------------------------------------
   About Center - Top Hero Image + Bottom Content Redesign
   -------------------------------------------------------------------------- */
.about-hero-container {
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid #e5e9f0;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.05);
    overflow: hidden;
    margin-top: 25px;
    padding: 24px;
}

.about-hero-image-wrap {
    width: 100%;
    max-height: 520px;
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.about-hero-img {
    width: 100%;
    height: 100%;
    max-height: 520px;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-hero-image-wrap:hover .about-hero-img {
    transform: scale(1.02);
}

.about-hero-caption {
    position: absolute;
    bottom: 16px;
    right: 20px;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #ffffff;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: -0.2px;
}

.about-hero-content {
    padding: 35px 20px 10px 20px;
}

.about-text-block {
    max-width: 960px;
    margin: 0 auto 35px auto;
}

.about-lead {
    font-size: 1.15rem;
    color: #1e293b;
    line-height: 1.8;
    margin-bottom: 16px;
    font-weight: 500;
    word-break: keep-all;
}

.about-detail {
    font-size: 1.02rem;
    color: #475569;
    line-height: 1.8;
    margin: 0;
    word-break: keep-all;
}

.highlight-word {
    font-weight: 700;
    color: #A50034;
    border-bottom: 2px solid rgba(165, 0, 52, 0.3);
}

/* 5 Highlights Grid */
.about-grid-highlights-new {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    max-width: 960px;
    margin: 0 auto;
    border-top: 1px solid #f1f5f9;
    padding-top: 30px;
}

.hi-card {
    background: #f8fafc;
    border: 1.5px solid #edf2f7;
    border-radius: 16px;
    padding: 18px 22px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.hi-card:hover {
    background: #ffffff;
    border-color: #A50034;
    transform: translateY(-3px);
    box-shadow: 0 8px 22px rgba(165, 0, 52, 0.08);
}

.hi-card-wide {
    grid-column: 1 / -1;
}

.hi-num-badge {
    font-size: 1.05rem;
    font-weight: 900;
    color: #ffffff;
    background: linear-gradient(135deg, #A50034 0%, #700023 100%);
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    flex-shrink: 0;
    box-shadow: 0 3px 10px rgba(165, 0, 52, 0.25);
}

.hi-card-txt {
    font-size: 1.02rem;
    color: #0f172a;
    font-weight: 700;
    line-height: 1.45;
    word-break: keep-all;
}

@media (max-width: 768px) {
    .about-hero-container {
        padding: 16px;
    }
    .about-hero-image-wrap {
        max-height: 320px;
    }
    .about-hero-content {
        padding: 20px 5px 5px 5px;
    }
    .about-grid-highlights-new {
        grid-template-columns: 1fr;
    }
    .hi-card-wide {
        grid-column: auto;
    }
}`;

const oldAboutCSSStart = css.indexOf('/* ==========================================================================\n   About Center - Split Card Layout');
const oldAboutCSSEnd = css.indexOf('/* --------------------------------------------------------------------------\n   Bento Pillars Grid');

if (oldAboutCSSStart !== -1 && oldAboutCSSEnd !== -1) {
    css = css.substring(0, oldAboutCSSStart) + updatedAboutCSS + '\n\n' + css.substring(oldAboutCSSEnd);
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully replaced About section CSS in style.css');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
