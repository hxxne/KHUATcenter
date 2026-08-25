const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Redesigned Bento Pillars Grid HTML
const redesignedPillarsHTML = `<div class="bento-pillars-grid">
                
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
                                <h4>정기 세미나 & 인서비스(In-Service)</h4>
                            </div>
                            <p class="bento-item-desc">정기 학술 세미나 운영 및 격주 단위 선수 부상 케이스 스터디</p>
                        </div>
                    </div>
                </div>

                <!-- Pillar 2: Research -->
                <div class="bento-card bento-card-res">
                    <div class="bento-card-header">
                        <div class="bento-badge-row">
                            <span class="bento-badge badge-res">02. RESEARCH</span>
                            <span class="bento-cat-icon"><i class="fa-solid fa-chart-line"></i></span>
                        </div>
                        <h3 class="bento-title">연구</h3>
                        <p class="bento-subtitle">근거 중심 스포츠의학(EBM) 구현</p>
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
                                <h4>14개 엘리트 선수단 전담 케어</h4>
                            </div>
                            <p class="bento-item-desc">야구·축구·농구 등 종목별 선수 맞춤형 테이핑 및 컨디셔닝 관리</p>
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
                            <p class="bento-item-desc">경희대학교 총장기 태권도대회, 전국체전 등 단기 스포츠 행사 AT 서비스 지원</p>
                        </div>
                    </div>
                </div>

            </div>`;

const gridStart = html.indexOf('<div class="bento-pillars-grid">');
const gridEnd = html.indexOf('</section>', gridStart);

if (gridStart !== -1 && gridEnd !== -1) {
    const sectionEndTag = '</div>\n    </section>';
    const sectionClosePos = html.indexOf(sectionEndTag, gridStart);
    if (sectionClosePos !== -1) {
        html = html.substring(0, gridStart) + redesignedPillarsHTML + '\n        ' + html.substring(sectionClosePos);
        console.log('Successfully updated bento-pillars-grid in index.html');
    }
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');

// 2. Updated CSS for Bento Pillars in style.css
let css = fs.readFileSync('style.css', 'utf8');

const updatedBentoCSS = `/* --------------------------------------------------------------------------
   Bento Pillars Grid (Spacious Modern UI/UX Redesign)
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

/* Card Header with subtle tint */
.bento-card-header {
    padding: 28px 26px 20px 26px;
    position: relative;
    border-bottom: 1px solid #f1f5f9;
}

.bento-card-edu .bento-card-header {
    background: linear-gradient(180deg, #fff5f6 0%, #ffffff 100%);
    border-top: 5px solid #A50034;
}
.bento-card-res .bento-card-header {
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    border-top: 5px solid #1E293B;
}
.bento-card-srv .bento-card-header {
    background: linear-gradient(180deg, #fff9f5 0%, #ffffff 100%);
    border-top: 5px solid #C2410C;
}

.bento-badge-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
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
    font-size: 1.7rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px 0;
    letter-spacing: -0.5px;
}

.bento-subtitle {
    font-size: 0.92rem;
    color: #64748b;
    font-weight: 600;
    margin: 0 0 14px 0;
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
    padding: 22px 24px 26px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: 1;
    background: #ffffff;
}

.bento-item {
    background: #f8fafc;
    border: 1px solid #edf2f7;
    border-radius: 14px;
    padding: 15px 18px;
    transition: all 0.25s ease;
    display: flex;
    flex-direction: column;
    gap: 6px;
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

@media (max-width: 991px) {
    .bento-pillars-grid {
        grid-template-columns: 1fr;
        gap: 24px;
    }
}`;

const oldBentoStart = css.indexOf('/* --------------------------------------------------------------------------\n   Bento Pillars Grid');
const oldBentoEnd = css.indexOf('@media (max-width: 991px) {\n    .bento-pillars-grid {\n        grid-template-columns: 1fr;\n        gap: 24px;\n    }\n}');

if (oldBentoStart !== -1 && oldBentoEnd !== -1) {
    css = css.substring(0, oldBentoStart) + updatedBentoCSS + css.substring(oldBentoEnd + 105);
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Successfully replaced Bento Pillars CSS in style.css');
}
