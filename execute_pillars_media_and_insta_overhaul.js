const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Redesigned Core Pillars with Mini Media Sliders and Instagram CTA Banner
const redesignedPillarsHTML = `    <!-- Core Pillars Section (Apple-style 3-Column Bento Grid with Media Sliders) -->
    <section id="pillars" class="section-padding bg-dark-lighter">
        <div class="container">
            <div class="section-header text-center">
                <h2 class="section-title">핵심 사업</h2>
                <div class="divider"></div>
                <p class="section-subtitle">교육 (Education) · 연구 (Research) · 서비스 (Service)</p>
            </div>

            <!-- Bento 3-Column Grid -->
            <div class="bento-pillars-grid">
                
                <!-- Pillar 1: Education -->
                <div class="bento-card bento-card-edu">
                    <!-- Top Media Slider -->
                    <div class="bento-media-slider" data-slider="edu">
                        <div class="bento-slide-track">
                            <div class="bento-slide active">
                                <img src="assets/images/insta/post_3.jpg" alt="정기 학술 세미나 & Taping 실무 교육" class="bento-slide-img">
                                <div class="bento-slide-caption">정기 학술 세미나 & 실무 교육</div>
                            </div>
                            <div class="bento-slide">
                                <img src="assets/images/insta/post_6.jpg" alt="In-Service 실기 교육 & 기능 실습" class="bento-slide-img">
                                <div class="bento-slide-caption">In-Service 실기 & 테크닉 실습</div>
                            </div>
                            <div class="bento-slide">
                                <img src="assets/images/insta/post_7.jpg" alt="소도구 트레이닝 & 부상 케이스 스터디 특강" class="bento-slide-img">
                                <div class="bento-slide-caption">소도구 트레이닝 & 부상 특강</div>
                            </div>
                        </div>
                        <div class="slider-dots">
                            <span class="slider-dot active" onclick="setSliderSlide('edu', 0)"></span>
                            <span class="slider-dot" onclick="setSliderSlide('edu', 1)"></span>
                            <span class="slider-dot" onclick="setSliderSlide('edu', 2)"></span>
                        </div>
                    </div>

                    <div class="bento-card-header">
                        <div class="bento-badge-row">
                            <span class="bento-badge badge-edu">01. EDUCATION</span>
                            <span class="bento-cat-icon"><i class="fa-solid fa-graduation-cap"></i></span>
                        </div>
                        <h3 class="bento-title">교육</h3>
                        <p class="bento-subtitle">미래 스포츠의학 전문가 양성</p>
                        <div class="bento-tags">
                            <span>#전공연계</span>
                            <span>#실무역량</span>
                        </div>
                    </div>
                    <div class="bento-card-body">
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-book-open-reader item-bullet-icon"></i>
                                <h4>전공 교육 과정 연계</h4>
                            </div>
                            <p class="bento-item-desc">손상 평가·관리 및 재활운동 실습 중심의 심화 전공 과정 지도</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-user-doctor item-bullet-icon"></i>
                                <h4>AT 실무 기초 교육</h4>
                            </div>
                            <p class="bento-item-desc">현장 관찰(Observation) 100시간 및 CPR·응급처치·전문 장비 실습</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-microscope item-bullet-icon"></i>
                                <h4>학술 스터디 & 저널 클럽</h4>
                            </div>
                            <p class="bento-item-desc">기능해부학 심층 학습, 최신 스포츠의학 논문 리뷰 및 재활 테크닉 연구</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-chalkboard-user item-bullet-icon"></i>
                                <h4>정기 세미나 & 인서비스(In-Service)</h4>
                            </div>
                            <p class="bento-item-desc">정기 학술 세미나 운영 및 격주 단위 선수 부상 케이스 스터디</p>
                        </div>
                    </div>
                </div>

                <!-- Pillar 2: Research -->
                <div class="bento-card bento-card-res" onclick="openResearchModal()" style="cursor: pointer;">
                    <!-- Top Media Slider -->
                    <div class="bento-media-slider" data-slider="res">
                        <div class="bento-slide-track">
                            <div class="bento-slide active">
                                <img src="assets/images/insta/post_1.jpg" alt="제63차 대한비만학회 춘계학술대회 참가" class="bento-slide-img">
                                <div class="bento-slide-caption">국내외 주요 학술대회 연구 발표</div>
                            </div>
                            <div class="bento-slide">
                                <img src="assets/images/insta/post_18.jpg" alt="World Congress on Kinesiology 학술대회 발표" class="bento-slide-img">
                                <div class="bento-slide-caption">World Congress Kinesiology 참가</div>
                            </div>
                            <div class="bento-slide">
                                <img src="assets/images/insta/post_30.jpg" alt="European College of Sport Science 발표" class="bento-slide-img">
                                <div class="bento-slide-caption">ECSS 국제 스포츠의학 연구 교류</div>
                            </div>
                        </div>
                        <div class="slider-dots">
                            <span class="slider-dot active" onclick="setSliderSlide('res', 0)"></span>
                            <span class="slider-dot" onclick="setSliderSlide('res', 1)"></span>
                            <span class="slider-dot" onclick="setSliderSlide('res', 2)"></span>
                        </div>
                    </div>

                    <div class="bento-card-header">
                        <div class="bento-badge-row">
                            <span class="bento-badge badge-res">02. RESEARCH</span>
                            <span class="bento-cat-icon"><i class="fa-solid fa-chart-line"></i></span>
                        </div>
                        <h3 class="bento-title">연구</h3>
                        <p class="bento-subtitle">근거 중심 스포츠의학(EBM) 구현 <span style="font-size: 0.8rem; color: #38bdf8; font-weight: 700; margin-left: 4px;">[논문 63편 보기 ↗]</span></p>
                        <div class="bento-tags">
                            <span>#생체역학</span>
                            <span>#임상데이터</span>
                        </div>
                    </div>
                    <div class="bento-card-body">
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-dna item-bullet-icon"></i>
                                <h4>손상 기전 및 예방 연구</h4>
                            </div>
                            <p class="bento-item-desc">생체역학적(Biomechanics) 분석을 통한 부상 위험 요인 규명</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-heart-pulse item-bullet-icon"></i>
                                <h4>임상 재활 및 통증 완화</h4>
                            </div>
                            <p class="bento-item-desc">단계별 기능 재활 프로토콜의 임상적 운동 효과 검증</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-shield-halved item-bullet-icon"></i>
                                <h4>대학 스포츠 부상 역학</h4>
                            </div>
                            <p class="bento-item-desc">부상감시시스템(ISS) 기반 엘리트 선수단 손상 추이 및 역학 분석</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-bolt-lightning item-bullet-icon"></i>
                                <h4>트레이닝 및 리커버리 전략</h4>
                            </div>
                            <p class="bento-item-desc">웜업, 저항운동, 쿨다운 등 선수 회복 전략에 대한 과학적 효과 검증</p>
                        </div>
                    </div>
                </div>

                <!-- Pillar 3: Service -->
                <div class="bento-card bento-card-srv">
                    <!-- Top Media Slider -->
                    <div class="bento-media-slider" data-slider="srv">
                        <div class="bento-slide-track">
                            <div class="bento-slide active">
                                <img src="assets/images/insta/post_14.jpg" alt="제1회 라이언매치 대회 현장 의무지원" class="bento-slide-img">
                                <div class="bento-slide-caption">대회 현장 스포츠의학 의무지원</div>
                            </div>
                            <div class="bento-slide">
                                <img src="assets/images/insta/post_17.jpg" alt="Go Free Run 현장 스포츠의학 의무지원" class="bento-slide-img">
                                <div class="bento-slide-caption">마라톤 & 러닝 이벤트 메디컬 케어</div>
                            </div>
                            <div class="bento-slide">
                                <img src="assets/images/insta/post_22.jpg" alt="제106회 전국체육대회 엘리트 선수단 출정식 및 파견" class="bento-slide-img">
                                <div class="bento-slide-caption">전국체전 엘리트 선수단 전담 파견</div>
                            </div>
                        </div>
                        <div class="slider-dots">
                            <span class="slider-dot active" onclick="setSliderSlide('srv', 0)"></span>
                            <span class="slider-dot" onclick="setSliderSlide('srv', 1)"></span>
                            <span class="slider-dot" onclick="setSliderSlide('srv', 2)"></span>
                        </div>
                    </div>

                    <div class="bento-card-header">
                        <div class="bento-badge-row">
                            <span class="bento-badge badge-srv">03. SERVICE</span>
                            <span class="bento-cat-icon"><i class="fa-solid fa-hand-holding-medical"></i></span>
                        </div>
                        <h3 class="bento-title">서비스</h3>
                        <p class="bento-subtitle">실천적 스포츠 케어 및 현장 지원</p>
                        <div class="bento-tags">
                            <span>#선수컨디셔닝</span>
                            <span>#현장의무지원</span>
                        </div>
                    </div>
                    <div class="bento-card-body">
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-people-group item-bullet-icon"></i>
                                <h4>엘리트 운동선수 밀착 케어</h4>
                            </div>
                            <p class="bento-item-desc">종목별 선수 맞춤형 부상 예방 및 컨디셔닝</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-hands-holding-child item-bullet-icon"></i>
                                <h4>교직원 및 학생 대상 근골격계 케어</h4>
                            </div>
                            <p class="bento-item-desc">경희대학교 체육시설운영단 스포츠재활 프로그램 운영</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-truck-medical item-bullet-icon"></i>
                                <h4>스포츠 이벤트 현장 의무 지원</h4>
                            </div>
                            <p class="bento-item-desc">전지훈련, 전국체전, 생활체육 등 단기 스포츠 AT 서비스</p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Sleek Instagram CTA Banner -->
            <div class="pillars-instagram-cta-banner">
                <div class="insta-cta-left">
                    <div class="insta-cta-icon-badge">
                        <i class="fa-brands fa-instagram"></i>
                    </div>
                    <div class="insta-cta-text">
                        <div class="insta-cta-tag">OFFICIAL INSTAGRAM</div>
                        <h3 class="insta-cta-title">경희대학교 AT Center 공식 인스타그램 <strong>@khuatcenter</strong></h3>
                        <p class="insta-cta-desc">더 많은 생생한 실시간 현장 소식, 학술 세미나, 대회 파견 스토리를 공식 인스타그램에서 만나보세요.</p>
                    </div>
                </div>
                <a href="https://www.instagram.com/khuatcenter/" target="_blank" rel="noopener noreferrer" class="insta-cta-btn">
                    <span>인스타그램 바로가기</span>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </div>
    </section>`;

// Replace Core Pillars section in index.html
const pillarsStart = html.indexOf('<!-- Core Pillars Section');
const pillarsEnd = html.indexOf('<!-- Stats & Dashboard Section');

if (pillarsStart !== -1 && pillarsEnd !== -1) {
    html = html.substring(0, pillarsStart) + redesignedPillarsHTML + '\n\n    ' + html.substring(pillarsEnd);
    console.log('Successfully replaced Core Pillars section in index.html');
}

// 2. Remove the old standalone Activity Feed (#gallery / #instagram-gallery-grid) and Lightbox Modal
const galleryStart = html.indexOf('<section id="gallery"');
const contactStart = html.indexOf('<!-- Contact Section -->');

if (galleryStart !== -1 && contactStart !== -1) {
    html = html.substring(0, galleryStart) + html.substring(contactStart);
    console.log('Successfully removed standalone Activity Feed and Lightbox modal');
}

// 3. Update Nav Links in Header and Mobile Nav
html = html.replace('<a href="#gallery" class="nav-link">활동 피드</a>', '<a href="https://www.instagram.com/khuatcenter/" target="_blank" rel="noopener noreferrer" class="nav-link insta-nav-btn"><i class="fa-brands fa-instagram" style="color: #E1306C; margin-right: 4px;"></i> 인스타그램</a>');
html = html.replace('<a href="#gallery" class="mobile-link">활동 피드</a>', '<a href="https://www.instagram.com/khuatcenter/" target="_blank" rel="noopener noreferrer" class="mobile-link"><i class="fa-brands fa-instagram" style="color: #E1306C; margin-right: 6px;"></i> 공식 인스타그램 (@khuatcenter)</a>');

// 4. Update Footer to include Official Instagram link
const footerContacts = '<p class="footer-contacts">TEL : 031-201-2787 (at center) | 031-201-2786 (lab)</p>';
const footerContactsWithInsta = `<p class="footer-contacts">TEL : 031-201-2787 (at center) | 031-201-2786 (lab) | <a href="https://www.instagram.com/khuatcenter/" target="_blank" rel="noopener noreferrer" style="color: #E1306C; font-weight: 700; text-decoration: none; margin-left: 6px;"><i class="fa-brands fa-instagram"></i> @khuatcenter</a></p>`;
html = html.replace(footerContacts, footerContactsWithInsta);

// 5. Add JavaScript for Bento Media Slider Auto-Rotation and Manual Dot Controls
const sliderScript = `
        // Bento Media Sliders Controller
        const sliderIntervals = {};
        window.setSliderSlide = function(sliderId, slideIndex) {
            const slider = document.querySelector(\`.bento-media-slider[data-slider="\${sliderId}"]\`);
            if (!slider) return;
            const slides = slider.querySelectorAll('.bento-slide');
            const dots = slider.querySelectorAll('.slider-dot');

            slides.forEach((s, idx) => {
                s.classList.toggle('active', idx === slideIndex);
            });
            dots.forEach((d, idx) => {
                d.classList.toggle('active', idx === slideIndex);
            });
        };

        function startBentoSliders() {
            ['edu', 'res', 'srv'].forEach((sliderId, sIdx) => {
                let currentIdx = 0;
                sliderIntervals[sliderId] = setInterval(() => {
                    currentIdx = (currentIdx + 1) % 3;
                    window.setSliderSlide(sliderId, currentIdx);
                }, 4000 + sIdx * 600); // slightly offset intervals for organic feel
            });
        }
        document.addEventListener('DOMContentLoaded', startBentoSliders);
`;

if (!html.includes('window.setSliderSlide = function')) {
    html = html.replace('// Attach DOM event listeners', sliderScript + '\n        // Attach DOM event listeners');
}

// 6. Update CSS in style.css for Sliders and Instagram Banner
let css = fs.readFileSync('style.css', 'utf8');

const bentoMediaAndInstaCSS = `/* --------------------------------------------------------------------------
   Bento Media Sliders & Instagram CTA Banner Styles
   -------------------------------------------------------------------------- */
.bento-media-slider {
    width: 100%;
    height: 185px;
    border-radius: 18px 18px 0 0;
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

.insta-nav-btn {
    background: rgba(225, 48, 108, 0.08);
    border: 1px solid rgba(225, 48, 108, 0.2);
    border-radius: 12px;
    padding: 6px 14px !important;
    color: #1e293b !important;
    font-weight: 700 !important;
    transition: all 0.2s ease;
}

.insta-nav-btn:hover {
    background: #E1306C;
    color: #ffffff !important;
    border-color: #E1306C;
}

.insta-nav-btn:hover i {
    color: #ffffff !important;
}

@media (max-width: 991px) {
    .pillars-instagram-cta-banner {
        flex-direction: column;
        align-items: flex-start;
        padding: 22px;
    }
    .insta-cta-btn {
        width: 100%;
        justify-content: center;
    }
}`;

if (!css.includes('.bento-media-slider {')) {
    css += '\n' + bentoMediaAndInstaCSS;
} else {
    css = css.replace(/\/\* Bento Media Sliders[\s\S]*?\.insta-nav-btn:hover i \{[^}]*\}/g, bentoMediaAndInstaCSS.trim());
}

fs.writeFileSync('style.css', css, 'utf8');
console.log('Successfully updated style.css with Bento Media Slider & Instagram CTA styles');

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
