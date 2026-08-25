const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const premiumAboutHTML = `    <!-- About Section (Premium Showcase UI/UX Redesign) -->
    <section id="about" class="section-padding">
        <div class="container">
            <div class="section-header text-center">
                <h2 class="section-title">센터 소개</h2>
                <div class="divider"></div>
                <p class="section-subtitle">선수의 경기력 향상 및 교직원 건강 증진을 위한 스포츠의학 실천 공간</p>
            </div>
            
            <div class="about-hero-container">
                <!-- Large Top Image Frame -->
                <div class="about-hero-image-wrap">
                    <img src="assets/images/at_center_interior.jpg?v=2" alt="경희대학교 AT 센터 내부 전경" class="about-hero-img">
                    <div class="about-hero-overlay"></div>
                    <div class="about-hero-caption">
                        <i class="fa-solid fa-location-dot" style="color: #f87171; margin-right: 4px;"></i> 경희대학교 국제캠퍼스 선승관 AT Center
                    </div>
                </div>
                
                <!-- Content Below -->
                <div class="about-hero-content">
                    <div class="about-tagline-wrap text-center">
                        <span class="about-tagline"><i class="fa-solid fa-shield-halved" style="color: #A50034; margin-right: 6px;"></i> SPORTS MEDICINE & ATHLETIC TRAINING</span>
                    </div>

                    <div class="about-text-block">
                        <p class="about-lead">
                            선승관에 위치한 <strong>Athletic Training Center (AT센터)</strong>는 체육대학 학부 및 대학원생들로 이루어진<br class="pc-br">
                            Athletic Training 동아리의 스태프와 대학원생들이 운영하는 실천적 학술 및 스포츠케어 공간입니다.
                        </p>
                        <p class="about-detail">
                            체육부 운동선수, 교직원, 그리고 일반 학생 모두를 대상으로 전문화된 트레이닝과 재활 서비스를 제공하고 있으며,<br class="pc-br">
                            <span class="highlight-word">교육(Education)</span>, <span class="highlight-word">연구(Research)</span>, <span class="highlight-word">서비스(Service)</span> 세 부문의 유기적인 시너지를 통해 스포츠의학적 역량을 전파하고 있습니다.
                        </p>
                    </div>
                    
                    <!-- 5 Highlights Grid -->
                    <div class="about-grid-highlights-new">
                        <div class="hi-card">
                            <div class="hi-num-badge">01</div>
                            <div class="hi-card-icon"><i class="fa-solid fa-user-graduate"></i></div>
                            <div class="hi-card-txt">스포츠의학 현장 전문가 양성 교육</div>
                        </div>
                        <div class="hi-card">
                            <div class="hi-num-badge">02</div>
                            <div class="hi-card-icon"><i class="fa-solid fa-chart-line"></i></div>
                            <div class="hi-card-txt">임상 및 데이터 기반 경기력 향상 연구</div>
                        </div>
                        <div class="hi-card">
                            <div class="hi-num-badge">03</div>
                            <div class="hi-card-icon"><i class="fa-solid fa-person-running"></i></div>
                            <div class="hi-card-txt">엘리트 운동선수 밀착 케어</div>
                        </div>
                        <div class="hi-card">
                            <div class="hi-num-badge">04</div>
                            <div class="hi-card-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                            <div class="hi-card-txt">교직원 스포츠재활 프로그램</div>
                        </div>
                        <div class="hi-card hi-card-wide">
                            <div class="hi-num-badge">05</div>
                            <div class="hi-card-icon"><i class="fa-solid fa-truck-medical"></i></div>
                            <div class="hi-card-txt">단기 스포츠 이벤트 스포츠의학 현장 파견 서비스</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

const aboutStart = html.indexOf('<!-- About Section');
const aboutEnd = html.indexOf('<!-- Core Pillars Section');

if (aboutStart !== -1 && aboutEnd !== -1) {
    html = html.substring(0, aboutStart) + premiumAboutHTML + '\n\n    ' + html.substring(aboutEnd);
    console.log('Successfully replaced About section HTML with premium UI');
}

// 2. Updated CSS in style.css
let css = fs.readFileSync('style.css', 'utf8');

const premiumAboutCSS = `/* --------------------------------------------------------------------------
   About Center - Premium Showcase UI/UX Redesign
   -------------------------------------------------------------------------- */
.about-hero-container {
    background: #ffffff;
    border-radius: 28px;
    border: 1px solid #e5e9f0;
    box-shadow: 0 12px 48px rgba(15, 23, 42, 0.06);
    overflow: hidden;
    margin-top: 25px;
    padding: 24px;
    transition: all 0.3s ease;
}

.about-hero-image-wrap {
    width: 100%;
    height: 480px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    background: #0f172a;
}

.about-hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 45%;
    display: block;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-hero-image-wrap:hover .about-hero-img {
    transform: scale(1.03);
}

.about-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(15, 23, 42, 0.6) 100%);
    pointer-events: none;
}

.about-hero-caption {
    position: absolute;
    bottom: 20px;
    right: 22px;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: #ffffff;
    padding: 8px 18px;
    border-radius: 30px;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: -0.2px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}

.about-hero-content {
    padding: 40px 24px 15px 24px;
}

.about-tagline-wrap {
    margin-bottom: 20px;
}

.about-tagline {
    display: inline-flex;
    align-items: center;
    background: #fff5f6;
    color: #A50034;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 1.2px;
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid rgba(165, 0, 52, 0.12);
}

.about-text-block {
    max-width: 960px;
    margin: 0 auto 40px auto;
    text-align: center;
}

.about-lead {
    font-size: 1.16rem;
    color: #0f172a;
    line-height: 1.85;
    margin-bottom: 18px;
    font-weight: 600;
    word-break: keep-all;
}

.about-detail {
    font-size: 1.02rem;
    color: #475569;
    line-height: 1.85;
    margin: 0;
    font-weight: 400;
    word-break: keep-all;
}

.highlight-word {
    font-weight: 700;
    color: #A50034;
    border-bottom: 2px solid rgba(165, 0, 52, 0.3);
}

/* 5 Highlights Grid - Sleek Feature Cards */
.about-grid-highlights-new {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    max-width: 960px;
    margin: 0 auto;
    border-top: 1px solid #f1f5f9;
    padding-top: 35px;
}

.hi-card {
    background: #ffffff;
    border: 1.5px solid #edf2f7;
    border-radius: 18px;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}

.hi-card:hover {
    background: #ffffff;
    border-color: #fca5a5;
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(165, 0, 52, 0.09);
}

.hi-card-wide {
    grid-column: 1 / -1;
}

.hi-num-badge {
    font-size: 0.98rem;
    font-weight: 900;
    color: #ffffff;
    background: linear-gradient(135deg, #A50034 0%, #700023 100%);
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(165, 0, 52, 0.28);
}

.hi-card-icon {
    font-size: 1.2rem;
    color: #64748b;
    width: 36px;
    height: 36px;
    background: #f8fafc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.25s ease;
}

.hi-card:hover .hi-card-icon {
    color: #A50034;
    background: #fff1f2;
}

.hi-card-txt {
    font-size: 1.02rem;
    color: #1e293b;
    font-weight: 700;
    line-height: 1.45;
    word-break: keep-all;
    flex: 1;
}

@media (max-width: 768px) {
    .about-hero-container {
        padding: 16px;
    }
    .about-hero-image-wrap {
        height: 280px;
    }
    .about-hero-content {
        padding: 25px 5px 5px 5px;
    }
    .about-lead {
        font-size: 1.05rem;
    }
    .about-grid-highlights-new {
        grid-template-columns: 1fr;
        gap: 12px;
    }
    .hi-card-wide {
        grid-column: auto;
    }
}`;

const oldAboutStart = css.indexOf('/* --------------------------------------------------------------------------\n   About Center - Top Hero Image');
const oldAboutEnd = css.indexOf('/* --------------------------------------------------------------------------\n   Bento Pillars Grid');

if (oldAboutStart !== -1 && oldAboutEnd !== -1) {
    css = css.substring(0, oldAboutStart) + premiumAboutCSS + '\n\n' + css.substring(oldAboutEnd);
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully updated style.css with premium about styling');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
