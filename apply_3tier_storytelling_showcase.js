const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const storyShowcaseHTML = `    <!-- Core Pillars Section (3-Tier Wide Storytelling Showcase) -->
    <section id="pillars" class="section-padding bg-dark-lighter">
        <div class="container">
            <div class="section-header text-center">
                <h2 class="section-title">핵심 사업</h2>
                <div class="divider"></div>
                <p class="section-subtitle">교육 (Education) · 연구 (Research) · 서비스 (Service)</p>
            </div>

            <!-- 3-Tier Storytelling Blocks -->
            <div class="pillars-story-container">
                
                <!-- Story Block 1: Education (Photo Left + Content Right) -->
                <div class="pillar-story-row story-edu">
                    <div class="story-media-col">
                        <div class="story-slider-wrap" id="story-slider-edu">
                            <div class="story-slide-track">
                                <div class="story-slide active">
                                    <img src="assets/images/insta/post_3.jpg" alt="정기 학술 세미나 & Taping 실무 교육" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-graduation-cap"></i> 정기 세미나</span>
                                        <p>전 구성원 정기 학술 세미나 & 테이핑 실무 교육</p>
                                    </div>
                                </div>
                                <div class="story-slide">
                                    <img src="assets/images/insta/post_6.jpg" alt="In-Service 실기 교육 & 기능 실습" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-chalkboard-user"></i> In-Service</span>
                                        <p>스태프 정기 In-Service 실기 및 운동 역학 실습</p>
                                    </div>
                                </div>
                                <div class="story-slide">
                                    <img src="assets/images/insta/post_7.jpg" alt="소도구 트레이닝 & 부상 케이스 스터디 특강" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-user-doctor"></i> 방학 특강</span>
                                        <p>소도구 트레이닝 및 운동상해 케이스 스터디</p>
                                    </div>
                                </div>
                            </div>
                            <button class="story-nav-btn prev" onclick="navigateStorySlide('edu', -1)" aria-label="이전 사진"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="story-nav-btn next" onclick="navigateStorySlide('edu', 1)" aria-label="다음 사진"><i class="fa-solid fa-chevron-right"></i></button>
                            <div class="story-dots">
                                <span class="story-dot active" onclick="setStorySlide('edu', 0)"></span>
                                <span class="story-dot" onclick="setStorySlide('edu', 1)"></span>
                                <span class="story-dot" onclick="setStorySlide('edu', 2)"></span>
                            </div>
                        </div>
                    </div>

                    <div class="story-info-col">
                        <div class="story-header">
                            <div class="story-badge-row">
                                <span class="pillar-badge badge-edu">01. EDUCATION</span>
                                <span class="pillar-tag">#전공연계</span>
                                <span class="pillar-tag">#실무역량</span>
                            </div>
                            <h3 class="story-title">교육</h3>
                            <p class="story-subtitle">미래 스포츠의학 전문가 양성</p>
                        </div>
                        <div class="story-items-list">
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-book-open-reader"></i></div>
                                <div class="s-item-text">
                                    <h4>전공 교육 과정 연계</h4>
                                    <p>손상 평가·관리 및 재활운동 실습 중심의 심화 전공 과정 지도</p>
                                </div>
                            </div>
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-user-doctor"></i></div>
                                <div class="s-item-text">
                                    <h4>AT 실무 기초 교육</h4>
                                    <p>현장 관찰(Observation) 100시간 및 CPR·응급처치·전문 장비 실습</p>
                                </div>
                            </div>
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-microscope"></i></div>
                                <div class="s-item-text">
                                    <h4>학술 스터디 & 저널 클럽</h4>
                                    <p>기능해부학 심층 학습, 최신 스포츠의학 논문 리뷰 및 재활 테크닉 연구</p>
                                </div>
                            </div>
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-chalkboard-user"></i></div>
                                <div class="s-item-text">
                                    <h4>정기 세미나 & 인서비스(In-Service)</h4>
                                    <p>정기 학술 세미나 운영 및 격주 단위 선수 부상 케이스 스터디</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Story Block 2: Research (Content Left + Photo Right) -->
                <div class="pillar-story-row story-res story-reversed">
                    <div class="story-info-col">
                        <div class="story-header">
                            <div class="story-badge-row">
                                <span class="pillar-badge badge-res">02. RESEARCH</span>
                                <span class="pillar-tag">#생체역학</span>
                                <span class="pillar-tag">#임상데이터</span>
                            </div>
                            <h3 class="story-title">연구</h3>
                            <p class="story-subtitle">근거 중심 스포츠의학(EBM) 구현</p>
                        </div>
                        <div class="story-items-list">
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-dna"></i></div>
                                <div class="s-item-text">
                                    <h4>손상 기전 및 예방 연구</h4>
                                    <p>생체역학적(Biomechanics) 분석을 통한 부상 위험 요인 규명</p>
                                </div>
                            </div>
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-heart-pulse"></i></div>
                                <div class="s-item-text">
                                    <h4>임상 재활 및 통증 완화</h4>
                                    <p>단계별 기능 재활 프로토콜의 임상적 운동 효과 검증</p>
                                </div>
                            </div>
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-shield-halved"></i></div>
                                <div class="s-item-text">
                                    <h4>대학 스포츠 부상 역학</h4>
                                    <p>부상감시시스템(ISS) 기반 엘리트 선수단 손상 추이 및 역학 분석</p>
                                </div>
                            </div>
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
                                <div class="s-item-text">
                                    <h4>트레이닝 및 리커버리 전략</h4>
                                    <p>웜업, 저항운동, 쿨다운 등 선수 회복 전략에 대한 과학적 효과 검증</p>
                                </div>
                            </div>
                        </div>

                        <div class="story-action-row">
                            <button type="button" class="btn-research-trigger" onclick="openResearchModal()">
                                <i class="fa-solid fa-book-bookmark"></i>
                                <span>센터 연구논문 63편 전체 데이터베이스 열람하기</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                    <div class="story-media-col">
                        <div class="story-slider-wrap" id="story-slider-res">
                            <div class="story-slide-track">
                                <div class="story-slide active">
                                    <img src="assets/images/insta/post_1.jpg" alt="제63차 대한비만학회 춘계학술대회 참가" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-flask"></i> 국내 학술대회</span>
                                        <p>제63차 대한비만학회 춘계학술대회 연구 발표</p>
                                    </div>
                                </div>
                                <div class="story-slide">
                                    <img src="assets/images/insta/post_18.jpg" alt="World Congress on Kinesiology 학술대회 발표" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-flask"></i> 국제 학술대회</span>
                                        <p>World Congress on Kinesiology 국제 구두 발표</p>
                                    </div>
                                </div>
                                <div class="story-slide">
                                    <img src="assets/images/insta/post_30.jpg" alt="European College of Sport Science 발표" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-flask"></i> ECSS 2025</span>
                                        <p>유럽스포츠과학회(ECSS) 글로벌 연구 교류</p>
                                    </div>
                                </div>
                            </div>
                            <button class="story-nav-btn prev" onclick="navigateStorySlide('res', -1)" aria-label="이전 사진"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="story-nav-btn next" onclick="navigateStorySlide('res', 1)" aria-label="다음 사진"><i class="fa-solid fa-chevron-right"></i></button>
                            <div class="story-dots">
                                <span class="story-dot active" onclick="setStorySlide('res', 0)"></span>
                                <span class="story-dot" onclick="setStorySlide('res', 1)"></span>
                                <span class="story-dot" onclick="setStorySlide('res', 2)"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Story Block 3: Service (Photo Left + Content Right) -->
                <div class="pillar-story-row story-srv">
                    <div class="story-media-col">
                        <div class="story-slider-wrap" id="story-slider-srv">
                            <div class="story-slide-track">
                                <div class="story-slide active">
                                    <img src="assets/images/insta/post_14.jpg" alt="제1회 라이언매치 대회 현장 의무지원" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-briefcase-medical"></i> 현장 의무 지원</span>
                                        <p>대회 현장 부상 평가 및 테이핑 지원</p>
                                    </div>
                                </div>
                                <div class="story-slide">
                                    <img src="assets/images/insta/post_17.jpg" alt="Go Free Run 현장 스포츠의학 의무지원" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-briefcase-medical"></i> 메디컬 케어</span>
                                        <p>마라톤 & 러닝 이벤트 스포츠의학 부스 운영</p>
                                    </div>
                                </div>
                                <div class="story-slide">
                                    <img src="assets/images/insta/post_22.jpg" alt="제106회 전국체육대회 엘리트 선수단 출정식 및 파견" class="story-slide-img">
                                    <div class="story-caption">
                                        <span class="story-caption-tag"><i class="fa-solid fa-briefcase-medical"></i> 전국체전 파견</span>
                                        <p>경희대학교 엘리트 선수단 전담 의무 파견</p>
                                    </div>
                                </div>
                            </div>
                            <button class="story-nav-btn prev" onclick="navigateStorySlide('srv', -1)" aria-label="이전 사진"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="story-nav-btn next" onclick="navigateStorySlide('srv', 1)" aria-label="다음 사진"><i class="fa-solid fa-chevron-right"></i></button>
                            <div class="story-dots">
                                <span class="story-dot active" onclick="setStorySlide('srv', 0)"></span>
                                <span class="story-dot" onclick="setStorySlide('srv', 1)"></span>
                                <span class="story-dot" onclick="setStorySlide('srv', 2)"></span>
                            </div>
                        </div>
                    </div>

                    <div class="story-info-col">
                        <div class="story-header">
                            <div class="story-badge-row">
                                <span class="pillar-badge badge-srv">03. SERVICE</span>
                                <span class="pillar-tag">#선수컨디셔닝</span>
                                <span class="pillar-tag">#현장의무지원</span>
                            </div>
                            <h3 class="story-title">서비스</h3>
                            <p class="story-subtitle">실천적 스포츠 케어 및 현장 지원</p>
                        </div>
                        <div class="story-items-list">
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-people-group"></i></div>
                                <div class="s-item-text">
                                    <h4>엘리트 운동선수 밀착 케어</h4>
                                    <p>종목별 선수 맞춤형 부상 예방 및 컨디셔닝</p>
                                </div>
                            </div>
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-hands-holding-child"></i></div>
                                <div class="s-item-text">
                                    <h4>교직원 및 학생 대상 근골격계 케어</h4>
                                    <p>경희대학교 체육시설운영단 스포츠재활 프로그램 운영</p>
                                </div>
                            </div>
                            <div class="story-item">
                                <div class="s-item-icon"><i class="fa-solid fa-truck-medical"></i></div>
                                <div class="s-item-text">
                                    <h4>스포츠 이벤트 현장 의무 지원</h4>
                                    <p>전지훈련, 전국체전, 생활체육 등 단기 스포츠 AT 서비스</p>
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
    html = html.substring(0, pillarsStart) + storyShowcaseHTML + '\n\n    ' + html.substring(pillarsEnd);
    console.log('Successfully replaced Core Pillars section in index.html with 3-tier storytelling showcase');
}

// 2. Add JavaScript controller for Storytelling Sliders
const storyControllerScript = `
        // 3-Tier Storytelling Showcase Sliders Controller
        const storySlideIndices = { edu: 0, res: 0, srv: 0 };

        window.setStorySlide = function(pillarId, index) {
            const wrap = document.getElementById(\`story-slider-\${pillarId}\`);
            if (!wrap) return;
            const slides = wrap.querySelectorAll('.story-slide');
            const dots = wrap.querySelectorAll('.story-dot');
            storySlideIndices[pillarId] = (index + slides.length) % slides.length;
            const currentIdx = storySlideIndices[pillarId];

            slides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
        };

        window.navigateStorySlide = function(pillarId, delta) {
            window.setStorySlide(pillarId, storySlideIndices[pillarId] + delta);
        };

        // Independent auto-rotations for all 3 story sliders
        ['edu', 'res', 'srv'].forEach((pillarId, pIdx) => {
            setInterval(() => {
                window.navigateStorySlide(pillarId, 1);
            }, 4500 + pIdx * 700);
        });
`;

// Replace previous tab controller script
html = html.replace(/\/\/ Apple-style Interactive Pillar Tabs Controller[\s\S]*?setInterval\(\(\) => \{[\s\S]*?\}, 5000\);/, storyControllerScript.trim());

// 3. Update CSS in style.css for 3-Tier Storytelling Rows and Large Media Sliders
let css = fs.readFileSync('style.css', 'utf8');

const storyShowcaseCSS = `/* --------------------------------------------------------------------------
   3-Tier Wide Storytelling Showcase (Magazine-style alternating layout)
   -------------------------------------------------------------------------- */
.pillars-story-container {
    max-width: 1200px;
    margin: 35px auto 0 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.pillar-story-row {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 40px;
    align-items: center;
    background: #ffffff;
    border-radius: 28px;
    border: 1px solid #e2e8f0;
    padding: 36px 40px;
    box-shadow: 0 12px 40px rgba(15, 23, 42, 0.05);
    transition: all 0.3s ease;
}

.pillar-story-row:hover {
    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
    border-color: #cbd5e1;
}

.pillar-story-row.story-reversed {
    grid-template-columns: 1fr 1.15fr;
}

/* Info Column */
.story-header {
    margin-bottom: 20px;
}

.story-badge-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
}

.story-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
    margin: 0 0 6px 0;
}

.story-subtitle {
    font-size: 1.05rem;
    font-weight: 600;
    color: #A50034;
    margin: 0;
}

/* List Items */
.story-items-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.story-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: #f8fafc;
    border: 1.5px solid #edf2f7;
    border-radius: 14px;
    padding: 13px 16px;
    transition: all 0.22s ease;
}

.story-item:hover {
    background: #ffffff;
    border-color: #fca5a5;
    transform: translateX(4px);
    box-shadow: 0 4px 14px rgba(165, 0, 52, 0.06);
}

.s-item-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #A50034;
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 1px;
}

.s-item-text h4 {
    margin: 0 0 2px 0;
    font-size: 0.95rem;
    font-weight: 800;
    color: #1e293b;
}

.s-item-text p {
    margin: 0;
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.5;
    word-break: keep-all;
}

.story-action-row {
    margin-top: 18px;
}

.btn-research-trigger {
    width: 100%;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 14px;
    padding: 13px 18px;
    font-size: 0.92rem;
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

/* Media Slider Column */
.story-media-col {
    position: relative;
    width: 100%;
}

.story-slider-wrap {
    width: 100%;
    height: 380px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.12);
    background: #0f172a;
}

.story-slide-track {
    width: 100%;
    height: 100%;
    position: relative;
}

.story-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1.03);
}

.story-slide.active {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
}

.story-slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
}

.story-caption {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    background: rgba(15, 23, 42, 0.78);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 14px;
    padding: 10px 16px;
    color: #ffffff;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.story-caption-tag {
    display: inline-block;
    font-size: 0.74rem;
    font-weight: 800;
    color: #fda4af;
    margin-bottom: 2px;
}

.story-caption p {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #f8fafc;
    word-break: keep-all;
}

/* Slider Controls */
.story-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.95rem;
    z-index: 6;
    transition: all 0.22s ease;
    opacity: 0.85;
}

.story-nav-btn:hover {
    opacity: 1;
    background: #A50034;
    transform: translateY(-50%) scale(1.08);
}

.story-nav-btn.prev { left: 14px; }
.story-nav-btn.next { right: 14px; }

.story-dots {
    position: absolute;
    top: 14px;
    right: 14px;
    display: flex;
    gap: 6px;
    z-index: 6;
}

.story-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.25s ease;
}

.story-dot.active {
    width: 20px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

/* Responsive */
@media (max-width: 991px) {
    .pillar-story-row, .pillar-story-row.story-reversed {
        grid-template-columns: 1fr;
        padding: 24px;
        gap: 24px;
    }
    .story-media-col {
        order: 1;
    }
    .story-info-col {
        order: 2;
    }
    .story-slider-wrap {
        height: 280px;
    }
}`;

const oldPillarsStart = css.indexOf('/* --------------------------------------------------------------------------\n   Apple-Style Interactive Tab');
const oldPillarsEnd = css.indexOf('/* --------------------------------------------------------------------------\n   Stats & Dashboard');

if (oldPillarsStart !== -1 && oldPillarsEnd !== -1) {
    css = css.substring(0, oldPillarsStart) + storyShowcaseCSS + '\n\n' + css.substring(oldPillarsEnd);
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully updated style.css with 3-tier storytelling showcase styling');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
