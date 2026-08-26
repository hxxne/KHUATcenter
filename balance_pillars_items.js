const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the entire bento-pillars-grid with the balanced 4:4:4 items
const oldGridStart = '<div class="bento-pillars-grid">';
const oldGridEnd = '<!-- Sleek Instagram CTA Banner -->';

const sIdx = html.indexOf(oldGridStart);
const eIdx = html.indexOf(oldGridEnd);

if (sIdx === -1 || eIdx === -1) {
    console.error('Could not find bento-pillars-grid markers');
    process.exit(1);
}

const newGridHTML = `<div class="bento-pillars-grid">
                
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
                            <p class="bento-item-desc">현장 관찰(Observation) 100시간 및 CPR·응급처치 실습 지도</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-microscope item-bullet-icon"></i>
                                <h4>학술 스터디 & 저널 클럽</h4>
                            </div>
                            <p class="bento-item-desc">기능해부학 심층 학습, 최신 스포츠의학 논문 리뷰 및 재활 연구</p>
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
                            <p class="bento-item-desc">생체역학적(Biomechanics) 분석 기반 부상 위험 요인 규명</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-heart-pulse item-bullet-icon"></i>
                                <h4>임상 재활 및 통증 완화</h4>
                            </div>
                            <p class="bento-item-desc">단계별 기능 재활 프로토콜의 임상적 운동 치료 효과 검증</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-shield-halved item-bullet-icon"></i>
                                <h4>대학 스포츠 부상 역학</h4>
                            </div>
                            <p class="bento-item-desc">부상감시시스템(ISS) 기반 엘리트 선수단 손상 추이 분석</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-bolt-lightning item-bullet-icon"></i>
                                <h4>트레이닝 및 리커버리 전략</h4>
                            </div>
                            <p class="bento-item-desc">웜업, 저항운동, 쿨다운 등 선수 회복 전략의 과학적 효과 규명</p>
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
                            <p class="bento-item-desc">종목별 전담 AT 파견 및 선수 맞춤형 부상 예방·컨디셔닝</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-hands-holding-child item-bullet-icon"></i>
                                <h4>교직원 및 학생 대상 케어</h4>
                            </div>
                            <p class="bento-item-desc">체육시설운영단 연계 교내 구성원 스포츠재활 프로그램 운영</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-truck-medical item-bullet-icon"></i>
                                <h4>스포츠 이벤트 현장 의무 지원</h4>
                            </div>
                            <p class="bento-item-desc">전지훈련, 전국체전, 생활체육 등 주요 대회 현장 AT 의무 파견</p>
                        </div>
                        <div class="bento-item">
                            <div class="bento-item-header">
                                <i class="fa-solid fa-notes-medical item-bullet-icon"></i>
                                <h4>선수단 부상 관리 & 복귀 지원</h4>
                            </div>
                            <p class="bento-item-desc">부상 이력 모니터링 기반 단계별 안전한 필드 복귀(RTP) 지도</p>
                        </div>
                    </div>
                </div>

            </div>\n\n            `;

html = html.substring(0, sIdx) + newGridHTML + html.substring(eIdx);

// Update cache busters
const now = Date.now();
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated bento pillars with 4:4:4 balanced grid and clean phrasing in index.html');
