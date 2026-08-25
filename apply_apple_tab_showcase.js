const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const tabShowcaseHTML = `    <!-- Core Pillars Section (Apple-style Interactive Tab Showcase) -->
    <section id="pillars" class="section-padding bg-dark-lighter">
        <div class="container">
            <div class="section-header text-center">
                <h2 class="section-title">핵심 사업</h2>
                <div class="divider"></div>
                <p class="section-subtitle">교육 (Education) · 연구 (Research) · 서비스 (Service)</p>
            </div>

            <!-- Tab Navigation Buttons -->
            <div class="pillars-tab-nav">
                <button class="pillar-tab-btn active" data-pillar="edu" onclick="switchPillarTab('edu')">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <span>01. 교육 (Education)</span>
                </button>
                <button class="pillar-tab-btn" data-pillar="res" onclick="switchPillarTab('res')">
                    <i class="fa-solid fa-chart-line"></i>
                    <span>02. 연구 (Research)</span>
                </button>
                <button class="pillar-tab-btn" data-pillar="srv" onclick="switchPillarTab('srv')">
                    <i class="fa-solid fa-hand-holding-medical"></i>
                    <span>03. 서비스 (Service)</span>
                </button>
            </div>

            <!-- Showcase Panels Container -->
            <div class="pillars-showcase-container">
                
                <!-- Panel 1: Education -->
                <div class="pillar-panel active" id="pillar-panel-edu">
                    <div class="pillar-panel-split">
                        <!-- Left: Info & Details -->
                        <div class="pillar-info-col">
                            <div class="pillar-panel-header">
                                <div class="pillar-badge-wrap">
                                    <span class="pillar-badge badge-edu">01. EDUCATION</span>
                                    <span class="pillar-tag">#전공연계</span>
                                    <span class="pillar-tag">#실무역량</span>
                                </div>
                                <h3 class="pillar-main-title">스포츠의학 전문가 양성 교육</h3>
                                <p class="pillar-main-desc">이론과 임상 현장을 연결하는 체계적인 실무 트레이닝 및 학술 스터디를 운영합니다.</p>
                            </div>
                            
                            <div class="pillar-items-list">
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-book-open-reader"></i></div>
                                    <div class="p-item-text">
                                        <h4>전공 교육 과정 연계</h4>
                                        <p>손상 평가·관리 및 재활운동 실습 중심의 심화 전공 과정 지도</p>
                                    </div>
                                </div>
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-user-doctor"></i></div>
                                    <div class="p-item-text">
                                        <h4>AT 실무 기초 교육</h4>
                                        <p>현장 관찰(Observation) 100시간 및 CPR·응급처치·전문 장비 실습</p>
                                    </div>
                                </div>
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-microscope"></i></div>
                                    <div class="p-item-text">
                                        <h4>학술 스터디 & 저널 클럽</h4>
                                        <p>기능해부학 심층 학습, 최신 스포츠의학 논문 리뷰 및 재활 테크닉 연구</p>
                                    </div>
                                </div>
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-chalkboard-user"></i></div>
                                    <div class="p-item-text">
                                        <h4>정기 세미나 & 인서비스(In-Service)</h4>
                                        <p>정기 학술 세미나 운영 및 격주 단위 선수 부상 케이스 스터디</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Big High-Definition Photo Slider -->
                        <div class="pillar-media-col">
                            <div class="showcase-slider-wrap" id="slider-edu">
                                <div class="showcase-slide-track">
                                    <div class="showcase-slide active">
                                        <img src="assets/images/insta/post_3.jpg" alt="정기 학술 세미나 & Taping 실무 교육" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-camera"></i> 학술 세미나</span>
                                            <p>정기 학술 세미나 & 테이핑 실무 교육 현장</p>
                                        </div>
                                    </div>
                                    <div class="showcase-slide">
                                        <img src="assets/images/insta/post_6.jpg" alt="In-Service 실기 교육 & 기능 실습" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-camera"></i> In-Service</span>
                                            <p>스태프 In-Service 실기 및 운동 역학 실습</p>
                                        </div>
                                    </div>
                                    <div class="showcase-slide">
                                        <img src="assets/images/insta/post_7.jpg" alt="소도구 트레이닝 & 부상 케이스 스터디 특강" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-camera"></i> 방학 특강</span>
                                            <p>소도구 트레이닝 및 운동상해 케이스 스터디</p>
                                        </div>
                                    </div>
                                </div>
                                <button class="showcase-nav-btn prev" onclick="navigatePillarSlide('edu', -1)" aria-label="이전 사진"><i class="fa-solid fa-chevron-left"></i></button>
                                <button class="showcase-nav-btn next" onclick="navigatePillarSlide('edu', 1)" aria-label="다음 사진"><i class="fa-solid fa-chevron-right"></i></button>
                                <div class="showcase-dots">
                                    <span class="showcase-dot active" onclick="setPillarSlide('edu', 0)"></span>
                                    <span class="showcase-dot" onclick="setPillarSlide('edu', 1)"></span>
                                    <span class="showcase-dot" onclick="setPillarSlide('edu', 2)"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Panel 2: Research -->
                <div class="pillar-panel" id="pillar-panel-res">
                    <div class="pillar-panel-split">
                        <!-- Left: Info & Details -->
                        <div class="pillar-info-col">
                            <div class="pillar-panel-header">
                                <div class="pillar-badge-wrap">
                                    <span class="pillar-badge badge-res">02. RESEARCH</span>
                                    <span class="pillar-tag">#생체역학</span>
                                    <span class="pillar-tag">#임상데이터</span>
                                </div>
                                <h3 class="pillar-main-title">근거 중심 스포츠의학(EBM) 연구</h3>
                                <p class="pillar-main-desc">체계적인 데이터 수집과 생체역학 분석을 바탕으로 국제 저널에 논문을 발표합니다.</p>
                            </div>
                            
                            <div class="pillar-items-list">
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-dna"></i></div>
                                    <div class="p-item-text">
                                        <h4>손상 기전 및 예방 연구</h4>
                                        <p>생체역학적(Biomechanics) 분석을 통한 부상 위험 요인 규명</p>
                                    </div>
                                </div>
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                                    <div class="p-item-text">
                                        <h4>임상 재활 및 통증 완화</h4>
                                        <p>단계별 기능 재활 프로토콜의 임상적 운동 효과 검증</p>
                                    </div>
                                </div>
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-shield-halved"></i></div>
                                    <div class="p-item-text">
                                        <h4>대학 스포츠 부상 역학</h4>
                                        <p>부상감시시스템(ISS) 기반 엘리트 선수단 손상 추이 및 역학 분석</p>
                                    </div>
                                </div>
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
                                    <div class="p-item-text">
                                        <h4>트레이닝 및 리커버리 전략</h4>
                                        <p>웜업, 저항운동, 쿨다운 등 선수 회복 전략에 대한 과학적 효과 검증</p>
                                    </div>
                                </div>
                            </div>

                            <div class="pillar-action-row">
                                <button type="button" class="btn-research-trigger" onclick="openResearchModal()">
                                    <i class="fa-solid fa-book-bookmark"></i>
                                    <span>센터 연구논문 63편 전체 데이터베이스 열람하기</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Right: Big High-Definition Photo Slider -->
                        <div class="pillar-media-col">
                            <div class="showcase-slider-wrap" id="slider-res">
                                <div class="showcase-slide-track">
                                    <div class="showcase-slide active">
                                        <img src="assets/images/insta/post_1.jpg" alt="제63차 대한비만학회 춘계학술대회 참가" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-flask"></i> 국내 학술대회</span>
                                            <p>제63차 대한비만학회 춘계학술대회 연구 발표</p>
                                        </div>
                                    </div>
                                    <div class="showcase-slide">
                                        <img src="assets/images/insta/post_18.jpg" alt="World Congress on Kinesiology 학술대회 발표" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-flask"></i> 국제 학술대회</span>
                                            <p>World Congress on Kinesiology 국제 구두 발표</p>
                                        </div>
                                    </div>
                                    <div class="showcase-slide">
                                        <img src="assets/images/insta/post_30.jpg" alt="European College of Sport Science 발표" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-flask"></i> ECSS 2025</span>
                                            <p>유럽스포츠과학회(ECSS) 스포츠의학 글로벌 교류</p>
                                        </div>
                                    </div>
                                </div>
                                <button class="showcase-nav-btn prev" onclick="navigatePillarSlide('res', -1)" aria-label="이전 사진"><i class="fa-solid fa-chevron-left"></i></button>
                                <button class="showcase-nav-btn next" onclick="navigatePillarSlide('res', 1)" aria-label="다음 사진"><i class="fa-solid fa-chevron-right"></i></button>
                                <div class="showcase-dots">
                                    <span class="showcase-dot active" onclick="setPillarSlide('res', 0)"></span>
                                    <span class="showcase-dot" onclick="setPillarSlide('res', 1)"></span>
                                    <span class="showcase-dot" onclick="setPillarSlide('res', 2)"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Panel 3: Service -->
                <div class="pillar-panel" id="pillar-panel-srv">
                    <div class="pillar-panel-split">
                        <!-- Left: Info & Details -->
                        <div class="pillar-info-col">
                            <div class="pillar-panel-header">
                                <div class="pillar-badge-wrap">
                                    <span class="pillar-badge badge-srv">03. SERVICE</span>
                                    <span class="pillar-tag">#선수컨디셔닝</span>
                                    <span class="pillar-tag">#현장의무지원</span>
                                </div>
                                <h3 class="pillar-main-title">실천적 스포츠 케어 및 현장 지원</h3>
                                <p class="pillar-main-desc">종목별 특성을 고려한 1:1 맞춤형 케어와 대회 현장 파견 의무 서비스를 수행합니다.</p>
                            </div>
                            
                            <div class="pillar-items-list">
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-people-group"></i></div>
                                    <div class="p-item-text">
                                        <h4>엘리트 운동선수 밀착 케어</h4>
                                        <p>종목별 선수 맞춤형 부상 예방 및 컨디셔닝</p>
                                    </div>
                                </div>
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-hands-holding-child"></i></div>
                                    <div class="p-item-text">
                                        <h4>교직원 및 학생 대상 근골격계 케어</h4>
                                        <p>경희대학교 체육시설운영단 스포츠재활 프로그램 운영</p>
                                    </div>
                                </div>
                                <div class="pillar-list-item">
                                    <div class="p-item-icon"><i class="fa-solid fa-truck-medical"></i></div>
                                    <div class="p-item-text">
                                        <h4>스포츠 이벤트 현장 의무 지원</h4>
                                        <p>전지훈련, 전국체전, 생활체육 등 단기 스포츠 AT 서비스</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Big High-Definition Photo Slider -->
                        <div class="pillar-media-col">
                            <div class="showcase-slider-wrap" id="slider-srv">
                                <div class="showcase-slide-track">
                                    <div class="showcase-slide active">
                                        <img src="assets/images/insta/post_14.jpg" alt="제1회 라이언매치 대회 현장 의무지원" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-briefcase-medical"></i> 현장 의무 지원</span>
                                            <p>대회 현장 부상 평가 및 테이핑 지원</p>
                                        </div>
                                    </div>
                                    <div class="showcase-slide">
                                        <img src="assets/images/insta/post_17.jpg" alt="Go Free Run 현장 스포츠의학 의무지원" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-briefcase-medical"></i> 메디컬 케어</span>
                                            <p>마라톤 & 러닝 이벤트 스포츠의학 부스 운영</p>
                                        </div>
                                    </div>
                                    <div class="showcase-slide">
                                        <img src="assets/images/insta/post_22.jpg" alt="제106회 전국체육대회 엘리트 선수단 출정식 및 파견" class="showcase-slide-img">
                                        <div class="showcase-caption">
                                            <span class="showcase-caption-tag"><i class="fa-solid fa-briefcase-medical"></i> 전국체전 파견</span>
                                            <p>경희대학교 엘리트 선수단 전담 의무 파견</p>
                                        </div>
                                    </div>
                                </div>
                                <button class="showcase-nav-btn prev" onclick="navigatePillarSlide('srv', -1)" aria-label="이전 사진"><i class="fa-solid fa-chevron-left"></i></button>
                                <button class="showcase-nav-btn next" onclick="navigatePillarSlide('srv', 1)" aria-label="다음 사진"><i class="fa-solid fa-chevron-right"></i></button>
                                <div class="showcase-dots">
                                    <span class="showcase-dot active" onclick="setPillarSlide('srv', 0)"></span>
                                    <span class="showcase-dot" onclick="setPillarSlide('srv', 1)"></span>
                                    <span class="showcase-dot" onclick="setPillarSlide('srv', 2)"></span>
                                </div>
                            </div>
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
    html = html.substring(0, pillarsStart) + tabShowcaseHTML + '\n\n    ' + html.substring(pillarsEnd);
    console.log('Successfully replaced Core Pillars section in index.html with Apple-style tab showcase');
}

// 2. Add JavaScript controller for Tab Switcher and Showcase Sliders
const tabControllerScript = `
        // Apple-style Interactive Pillar Tabs Controller
        window.switchPillarTab = function(pillarId) {
            // Update Tab Buttons
            document.querySelectorAll('.pillar-tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-pillar') === pillarId);
            });
            // Update Panels
            document.querySelectorAll('.pillar-panel').forEach(panel => {
                panel.classList.toggle('active', panel.id === \`pillar-panel-\${pillarId}\`);
            });
        };

        const pillarSlideIndices = { edu: 0, res: 0, srv: 0 };

        window.setPillarSlide = function(pillarId, index) {
            const wrap = document.getElementById(\`slider-\${pillarId}\`);
            if (!wrap) return;
            const slides = wrap.querySelectorAll('.showcase-slide');
            const dots = wrap.querySelectorAll('.showcase-dot');
            pillarSlideIndices[pillarId] = (index + slides.length) % slides.length;
            const currentIdx = pillarSlideIndices[pillarId];

            slides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
        };

        window.navigatePillarSlide = function(pillarId, delta) {
            window.setPillarSlide(pillarId, pillarSlideIndices[pillarId] + delta);
        };

        // Auto Advance Slide every 5 seconds for current active panel
        setInterval(() => {
            const activePanel = document.querySelector('.pillar-panel.active');
            if (!activePanel) return;
            const pillarId = activePanel.id.replace('pillar-panel-', '');
            window.navigatePillarSlide(pillarId, 1);
        }, 5000);
`;

// Replace previous slider script
html = html.replace(/\/\/ Bento Media Sliders Controller[\s\S]*?document\.addEventListener\('DOMContentLoaded', startBentoSliders\);/, tabControllerScript.trim());

// 3. Update CSS in style.css for Tab Navigation, Split Layout, and Big Showcase Slider
let css = fs.readFileSync('style.css', 'utf8');

const tabShowcaseCSS = `/* --------------------------------------------------------------------------
   Apple-Style Interactive Tab Showcase & High-Definition Media Slider
   -------------------------------------------------------------------------- */
.pillars-tab-nav {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 30px auto 35px auto;
    max-width: 780px;
    background: #ffffff;
    padding: 8px;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
}

.pillar-tab-btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 22px;
    border-radius: 14px;
    border: none;
    background: transparent;
    color: #475569;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.pillar-tab-btn i {
    font-size: 1.15rem;
    transition: transform 0.25s ease;
}

.pillar-tab-btn:hover {
    color: #A50034;
    background: #fff1f2;
}

.pillar-tab-btn.active {
    background: linear-gradient(135deg, #A50034 0%, #700023 100%);
    color: #ffffff;
    box-shadow: 0 6px 20px rgba(165, 0, 52, 0.3);
}

.pillar-tab-btn.active i {
    transform: scale(1.1);
}

/* Showcase Panels */
.pillars-showcase-container {
    max-width: 1200px;
    margin: 0 auto;
}

.pillar-panel {
    display: none;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.pillar-panel.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.pillar-panel-split {
    display: grid;
    grid-template-columns: 1.1fr 1.2fr;
    gap: 36px;
    align-items: center;
    background: #ffffff;
    border-radius: 28px;
    border: 1px solid #e2e8f0;
    padding: 38px 42px;
    box-shadow: 0 16px 48px rgba(15, 23, 42, 0.06);
}

/* Left Column: Information */
.pillar-badge-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.pillar-badge {
    font-size: 0.8rem;
    font-weight: 800;
    padding: 5px 12px;
    border-radius: 8px;
    letter-spacing: 0.8px;
}

.badge-edu { background: #e0f2fe; color: #0284c7; }
.badge-res { background: #dcfce7; color: #16a34a; }
.badge-srv { background: #fee2e2; color: #dc2626; }

.pillar-tag {
    font-size: 0.8rem;
    font-weight: 700;
    color: #64748b;
    background: #f1f5f9;
    padding: 4px 10px;
    border-radius: 6px;
}

.pillar-main-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
    margin: 0 0 8px 0;
}

.pillar-main-desc {
    font-size: 1.02rem;
    color: #475569;
    margin: 0 0 24px 0;
    line-height: 1.6;
    word-break: keep-all;
}

/* List Items */
.pillar-items-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.pillar-list-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    background: #f8fafc;
    border: 1.5px solid #edf2f7;
    border-radius: 16px;
    padding: 14px 18px;
    transition: all 0.25s ease;
}

.pillar-list-item:hover {
    background: #ffffff;
    border-color: #fca5a5;
    transform: translateX(4px);
    box-shadow: 0 6px 18px rgba(165, 0, 52, 0.07);
}

.p-item-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #A50034;
    font-size: 1.05rem;
    flex-shrink: 0;
    margin-top: 2px;
}

.p-item-text h4 {
    margin: 0 0 3px 0;
    font-size: 0.98rem;
    font-weight: 800;
    color: #1e293b;
}

.p-item-text p {
    margin: 0;
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.55;
    word-break: keep-all;
}

.pillar-action-row {
    margin-top: 20px;
}

.btn-research-trigger {
    width: 100%;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 14px;
    padding: 14px 20px;
    font-size: 0.95rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
}

.btn-research-trigger:hover {
    background: linear-gradient(135deg, #A50034 0%, #700023 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(165, 0, 52, 0.25);
}

/* Right Column: Big Media Slider */
.pillar-media-col {
    position: relative;
}

.showcase-slider-wrap {
    width: 100%;
    height: 440px;
    border-radius: 22px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 14px 38px rgba(0, 0, 0, 0.14);
    background: #0f172a;
}

.showcase-slide-track {
    width: 100%;
    height: 100%;
    position: relative;
}

.showcase-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1.04);
}

.showcase-slide.active {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
}

.showcase-slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
}

.showcase-caption {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: rgba(15, 23, 42, 0.78);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px;
    padding: 12px 18px;
    color: #ffffff;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.showcase-caption-tag {
    display: inline-block;
    font-size: 0.76rem;
    font-weight: 800;
    color: #fda4af;
    margin-bottom: 3px;
}

.showcase-caption p {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #f8fafc;
    word-break: keep-all;
}

/* Slider Controls */
.showcase-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    z-index: 6;
    transition: all 0.22s ease;
    opacity: 0.85;
}

.showcase-nav-btn:hover {
    opacity: 1;
    background: #A50034;
    transform: translateY(-50%) scale(1.08);
}

.showcase-nav-btn.prev { left: 16px; }
.showcase-nav-btn.next { right: 16px; }

.showcase-dots {
    position: absolute;
    top: 18px;
    right: 18px;
    display: flex;
    gap: 6px;
    z-index: 6;
}

.showcase-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.25s ease;
}

.showcase-dot.active {
    width: 22px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* Responsive */
@media (max-width: 991px) {
    .pillar-panel-split {
        grid-template-columns: 1fr;
        padding: 24px;
        gap: 28px;
    }
    .showcase-slider-wrap {
        height: 320px;
    }
    .pillars-tab-nav {
        flex-direction: column;
        gap: 8px;
    }
}`;

const oldPillarsStart = css.indexOf('/* --------------------------------------------------------------------------\n   Bento Media Sliders & Instagram CTA');
const oldPillarsEnd = css.indexOf('/* --------------------------------------------------------------------------\n   Stats & Dashboard');

if (oldPillarsStart !== -1 && oldPillarsEnd !== -1) {
    css = css.substring(0, oldPillarsStart) + tabShowcaseCSS + '\n\n' + css.substring(oldPillarsEnd);
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully updated style.css with Apple-style tab showcase styling');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
