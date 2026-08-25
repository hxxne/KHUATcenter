const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const cleanAboutHTML = `    <!-- About Section (Clean Minimalist UI) -->
    <section id="about" class="section-padding">
        <div class="container">
            <div class="section-header text-center">
                <h2 class="section-title">센터 소개</h2>
                <div class="divider"></div>
                <p class="section-subtitle">선수의 경기력 향상 및 교직원 건강 증진을 위한 스포츠의학 실천 공간</p>
            </div>
            
            <div class="about-hero-container">
                <!-- Top Image (Natural Full Aspect Ratio - No Cropping) -->
                <div class="about-hero-image-wrap">
                    <img src="assets/images/at_center_interior.jpg?v=3" alt="경희대학교 AT 센터 내부 전경" class="about-hero-img">
                    <div class="about-hero-caption">
                        <i class="fa-solid fa-location-dot" style="color: #f87171; margin-right: 4px;"></i> 경희대학교 국제캠퍼스 선승관 AT Center
                    </div>
                </div>
                
                <!-- Content Below -->
                <div class="about-hero-content">
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
                    
                    <!-- 5 Clean Highlights List (No Micro Cards) -->
                    <div class="about-clean-highlights">
                        <div class="about-clean-item">
                            <span class="about-clean-num">01</span>
                            <span class="about-clean-txt">스포츠의학 현장 전문가 양성 교육</span>
                        </div>
                        <div class="about-clean-item">
                            <span class="about-clean-num">02</span>
                            <span class="about-clean-txt">임상 및 데이터 기반 경기력 향상 연구</span>
                        </div>
                        <div class="about-clean-item">
                            <span class="about-clean-num">03</span>
                            <span class="about-clean-txt">엘리트 운동선수 밀착 케어</span>
                        </div>
                        <div class="about-clean-item">
                            <span class="about-clean-num">04</span>
                            <span class="about-clean-txt">교직원 스포츠재활 프로그램</span>
                        </div>
                        <div class="about-clean-item about-clean-wide">
                            <span class="about-clean-num">05</span>
                            <span class="about-clean-txt">단기 스포츠 이벤트 스포츠의학 현장 파견 서비스</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

const aboutStart = html.indexOf('<!-- About Section');
const aboutEnd = html.indexOf('<!-- Core Pillars Section');

if (aboutStart !== -1 && aboutEnd !== -1) {
    html = html.substring(0, aboutStart) + cleanAboutHTML + '\n\n    ' + html.substring(aboutEnd);
    console.log('Successfully replaced About section HTML with clean version');
}

// 2. Update CSS in style.css
let css = fs.readFileSync('style.css', 'utf8');

const cleanAboutCSS = `/* --------------------------------------------------------------------------
   About Center - Clean Minimalist Redesign (Full Photo, No Cards)
   -------------------------------------------------------------------------- */
.about-hero-container {
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid #e5e9f0;
    box-shadow: 0 10px 36px rgba(15, 23, 42, 0.05);
    overflow: hidden;
    margin-top: 25px;
    padding: 20px;
}

.about-hero-image-wrap {
    width: 100%;
    height: auto;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    background: #f8fafc;
}

.about-hero-img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    border-radius: 16px;
}

.about-hero-caption {
    position: absolute;
    bottom: 16px;
    right: 18px;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #ffffff;
    padding: 7px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: -0.2px;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.about-hero-content {
    padding: 35px 20px 15px 20px;
}

.about-text-block {
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
}

.about-lead {
    font-size: 1.15rem;
    color: #0f172a;
    line-height: 1.85;
    margin-bottom: 16px;
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

/* 5 Clean Highlights List */
.about-clean-highlights {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px 28px;
    max-width: 880px;
    margin: 32px auto 0 auto;
    border-top: 1px solid #edf2f7;
    padding-top: 26px;
}

.about-clean-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
}

.about-clean-wide {
    grid-column: 1 / -1;
    justify-content: center;
}

.about-clean-num {
    font-size: 0.92rem;
    font-weight: 900;
    color: #A50034;
    background: #fff0f2;
    padding: 4px 10px;
    border-radius: 8px;
    letter-spacing: 0.5px;
    flex-shrink: 0;
}

.about-clean-txt {
    font-size: 1.02rem;
    font-weight: 700;
    color: #1e293b;
    word-break: keep-all;
}

@media (max-width: 768px) {
    .about-hero-container {
        padding: 14px;
    }
    .about-hero-content {
        padding: 20px 5px 5px 5px;
    }
    .about-lead {
        font-size: 1.05rem;
    }
    .about-clean-highlights {
        grid-template-columns: 1fr;
        gap: 12px;
    }
    .about-clean-wide {
        grid-column: auto;
        justify-content: flex-start;
    }
}`;

const oldAboutStart = css.indexOf('/* --------------------------------------------------------------------------\n   About Center - Premium Showcase');
const oldAboutEnd = css.indexOf('/* --------------------------------------------------------------------------\n   Bento Pillars Grid');

if (oldAboutStart !== -1 && oldAboutEnd !== -1) {
    css = css.substring(0, oldAboutStart) + cleanAboutCSS + '\n\n' + css.substring(oldAboutEnd);
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully updated style.css with clean minimalist about styling');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
