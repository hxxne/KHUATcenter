const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const bentoPlusPanoramaHTML = `    <!-- Core Pillars Section (Clean 3-Column Bento Grid + 3-Photo Panorama Strip + Instagram Banner) -->
    <section id="pillars" class="section-padding bg-dark-lighter">
        <div class="container">
            <div class="section-header text-center">
                <h2 class="section-title">핵심 사업</h2>
                <div class="divider"></div>
                <p class="section-subtitle">교육 (Education) · 연구 (Research) · 서비스 (Service)</p>
            </div>

            <!-- Top: 3-Column Modern Bento Grid -->
            <div class="bento-pillars-grid">
                
                <!-- Pillar 1: Education -->
                <div class="bento-card bento-card-edu">
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
                                <h4>정기 세미나 & In-Service</h4>
                            </div>
                            <p class="bento-item-desc">정기 학술 세미나 운영 및 격주 단위 선수 부상 케이스 스터디</p>
                        </div>
                    </div>
                </div>

                <!-- Pillar 2: Research -->
                <div class="bento-card bento-card-res" onclick="openResearchModal()" style="cursor: pointer;">
                    <div class="bento-card-header">
                        <div class="bento-badge-row">
                            <span class="bento-badge badge-res">02. RESEARCH</span>
                            <span class="bento-cat-icon"><i class="fa-solid fa-chart-line"></i></span>
                        </div>
                        <h3 class="bento-title">연구</h3>
                        <p class="bento-subtitle">근거 중심 스포츠의학(EBM) 구현 <span class="research-modal-badge">[논문 63편 ↗]</span></p>
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

            <!-- Middle: 3-Photo Panorama Visual Strip -->
            <div class="pillars-panorama-strip">
                <div class="panorama-photo-card">
                    <img src="assets/images/insta/post_3.jpg" alt="경희대 AT 센터 교육 및 실습 현장" class="panorama-img">
                    <div class="panorama-overlay"></div>
                    <div class="panorama-caption">
                        <span class="panorama-badge"><i class="fa-solid fa-graduation-cap"></i> 01. 교육 현장</span>
                        <p>정기 학술 세미나 & 테이핑 실무 교육</p>
                    </div>
                </div>

                <div class="panorama-photo-card" onclick="openResearchModal()" style="cursor: pointer;">
                    <img src="assets/images/insta/post_18.jpg" alt="경희대 AT 센터 학술대회 및 연구 발표" class="panorama-img">
                    <div class="panorama-overlay"></div>
                    <div class="panorama-caption">
                        <span class="panorama-badge"><i class="fa-solid fa-chart-line"></i> 02. 연구 발표</span>
                        <p>국내외 학술대회 발표 & 63편 연구 실적</p>
                    </div>
                </div>

                <div class="panorama-photo-card">
                    <img src="assets/images/insta/post_14.jpg" alt="경희대 AT 센터 대회 파견 및 현장의무지원" class="panorama-img">
                    <div class="panorama-overlay"></div>
                    <div class="panorama-caption">
                        <span class="panorama-badge"><i class="fa-solid fa-hand-holding-medical"></i> 03. 현장 케어</span>
                        <p>선수단 전담 케어 & 스포츠 이벤트 의무지원</p>
                    </div>
                </div>
            </div>

            <!-- Bottom: Sleek Instagram CTA Banner -->
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
    html = html.substring(0, pillarsStart) + bentoPlusPanoramaHTML + '\n\n    ' + html.substring(pillarsEnd);
    console.log('Successfully replaced Core Pillars section with Bento + Panorama layout');
}

// 2. Remove unused story slide controller script
html = html.replace(/\/\/ 3-Tier Storytelling Showcase Sliders Controller[\s\S]*?4500 \+ pIdx \* 700\);\s*\}\);/, '');

// 3. Update CSS in style.css for Bento Cards, Panorama Strip, and Instagram Banner
let css = fs.readFileSync('style.css', 'utf8');

const bentoPanoramaCSS = `/* --------------------------------------------------------------------------
   Core Pillars - 3-Column Bento Cards + 3-Photo Panorama Strip
   -------------------------------------------------------------------------- */
.bento-pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 30px;
}

.bento-card {
    background: #ffffff;
    border-radius: 22px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.04);
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}

.bento-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.09);
    border-color: #cbd5e1;
}

.bento-card-edu { border-top: 4px solid #0284c7; }
.bento-card-res { border-top: 4px solid #16a34a; }
.bento-card-srv { border-top: 4px solid #A50034; }

.bento-badge-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}

.bento-badge {
    font-size: 0.78rem;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.5px;
}

.bento-cat-icon {
    font-size: 1.25rem;
    color: #64748b;
}

.bento-title {
    font-size: 1.55rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
}

.bento-subtitle {
    font-size: 0.95rem;
    color: #475569;
    margin: 0 0 12px 0;
    font-weight: 600;
}

.research-modal-badge {
    font-size: 0.78rem;
    font-weight: 800;
    color: #0284c7;
    background: #e0f2fe;
    padding: 2px 8px;
    border-radius: 6px;
    margin-left: 4px;
    display: inline-block;
}

.bento-tags {
    display: flex;
    gap: 6px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
}

.bento-tags span {
    font-size: 0.76rem;
    font-weight: 700;
    color: #64748b;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 3px 8px;
    border-radius: 6px;
}

/* Bento Card Items */
.bento-card-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: 1;
}

.bento-item {
    background: #f8fafc;
    border: 1px solid #edf2f7;
    border-radius: 12px;
    padding: 12px 14px;
    transition: all 0.2s ease;
}

.bento-item:hover {
    background: #ffffff;
    border-color: #fca5a5;
    transform: translateX(3px);
}

.bento-item-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 3px;
}

.item-bullet-icon {
    font-size: 0.9rem;
    color: #A50034;
}

.bento-item-header h4 {
    font-size: 0.92rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
}

.bento-item-desc {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
    padding-left: 18px;
    word-break: keep-all;
}

/* 3-Photo Panorama Strip */
.pillars-panorama-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 24px;
}

.panorama-photo-card {
    height: 230px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    background: #0f172a;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.panorama-photo-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
}

.panorama-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.panorama-photo-card:hover .panorama-img {
    transform: scale(1.06);
}

.panorama-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(15, 23, 42, 0.8) 100%);
    pointer-events: none;
}

.panorama-caption {
    position: absolute;
    bottom: 14px;
    left: 16px;
    right: 16px;
    color: #ffffff;
    z-index: 2;
}

.panorama-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    font-size: 0.74rem;
    font-weight: 800;
    color: #ffffff;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 4px;
}

.panorama-caption p {
    font-size: 0.88rem;
    font-weight: 600;
    color: #f8fafc;
    margin: 0;
    word-break: keep-all;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

/* Instagram CTA Banner */
.pillars-instagram-cta-banner {
    margin-top: 30px;
    background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #4c0519 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 22px;
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    box-shadow: 0 12px 36px rgba(15, 23, 42, 0.1);
    position: relative;
    overflow: hidden;
}

.pillars-instagram-cta-banner::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(225, 48, 108, 0.25) 0%, rgba(0,0,0,0) 70%);
    pointer-events: none;
}

.insta-cta-left {
    display: flex;
    align-items: center;
    gap: 18px;
    position: relative;
    z-index: 1;
}

.insta-cta-icon-badge {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: #ffffff;
    flex-shrink: 0;
    box-shadow: 0 6px 18px rgba(225, 48, 108, 0.35);
}

.insta-cta-tag {
    font-size: 0.74rem;
    font-weight: 800;
    color: #f43f5e;
    letter-spacing: 1.2px;
    margin-bottom: 2px;
}

.insta-cta-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 3px 0;
    letter-spacing: -0.3px;
}

.insta-cta-title strong {
    color: #fda4af;
    font-weight: 800;
}

.insta-cta-desc {
    font-size: 0.88rem;
    color: #94a3b8;
    margin: 0;
    word-break: keep-all;
}

.insta-cta-btn {
    background: #ffffff;
    color: #0f172a;
    font-weight: 800;
    font-size: 0.92rem;
    padding: 12px 22px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    flex-shrink: 0;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 1;
}

.insta-cta-btn:hover {
    background: #fecdd3;
    color: #881337;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(225, 48, 108, 0.25);
}

@media (max-width: 991px) {
    .bento-pillars-grid {
        grid-template-columns: 1fr;
    }
    .pillars-panorama-strip {
        grid-template-columns: 1fr;
    }
    .panorama-photo-card {
        height: 200px;
    }
    .pillars-instagram-cta-banner {
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
    }
    .insta-cta-btn {
        width: 100%;
        justify-content: center;
    }
}`;

const oldPillarsStart = css.indexOf('/* --------------------------------------------------------------------------\n   3-Tier Wide Storytelling Showcase');
const oldPillarsEnd = css.indexOf('/* --------------------------------------------------------------------------\n   Stats & Dashboard');

if (oldPillarsStart !== -1 && oldPillarsEnd !== -1) {
    css = css.substring(0, oldPillarsStart) + bentoPanoramaCSS + '\n\n' + css.substring(oldPillarsEnd);
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully updated style.css with Bento + Panorama styling');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
