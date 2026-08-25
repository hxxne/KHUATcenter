const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Career data dictionary from PDF
const careerDataDict = {
    "강성훈": "정보 준비중",
    "고준영": "MS 피지컬",
    "기윤서": "경희대학교 핸드볼 트레이너",
    "김다영": "정보 준비중",
    "김대호": "경일대학교 스포츠재활의학과 교수",
    "김동현": "정보 준비중",
    "김무성": "정보 준비중",
    "김민준": "키움히어로즈 트레이너",
    "김성완": "부산대학교 스포츠과학과 교수",
    "김승연": "정보 준비중",
    "김재원": "William penn AT",
    "김주완": "부산스포츠과학센터 트레이너",
    "김준영": "경희대학교 AT 센터 실장",
    "김지원": "정보 준비중",
    "김태진": "Nebraska university PhD 진행중",
    "남아공": "정보 준비중",
    "노윤서": "정보 준비중",
    "노유연": "정보 준비중",
    "두현지": "정보 준비중",
    "문정은": "광진구 보건소 운동처방사",
    "문채연": "경희대학교 시범단 트레이너",
    "민경은": "정보 준비중",
    "박상협": "스텝업 트레이닝 센터 트레이너",
    "박지현": "이강인 전담 트레이너",
    "박효진": "기계체조 국가대표 트레이너",
    "방수일": "정보 준비중",
    "서동균": "정보 준비중",
    "성락훈": "정보 준비중",
    "신재윤": "키움히어로즈 헤드 트레이너",
    "안효은": "정보 준비중",
    "양창욱": "정보 준비중",
    "오민섭": "정보 준비중",
    "우태희": "더프로 트레이닝센터 센터장",
    "유승아": "경희대학교 품새부 트레이너",
    "유영수": "정보 준비중",
    "유주승": "경희대학교 야구부 트레이너",
    "윤정섭": "윤 피지오 운동센터",
    "이강훈": "취업 준비",
    "이남송": "국가대표 핸드볼 트레이너",
    "이서영": "성남시청 직장운동부",
    "이선화": "화성국민체육센터",
    "이송현": "정보 준비중",
    "이승훈": "스텝업 트레이닝 센터 트레이너",
    "이승희": "김제시 체육회",
    "이재욱": "경희대학교 AT센터 연구팀장",
    "이정재": "스텝업 트레이닝 센터 트레이너",
    "이주희": "정보 준비중",
    "이준혁": "대한항공 점보스 트레이너",
    "이진우": "정보 준비중",
    "이현욱": "국민대학교 스포츠건강재활학과 교수",
    "임선주": "HD 하이드로젠",
    "임준형": "부산스포츠과학센터 연구원",
    "장영훈": "디엠씨 움직임 한의원",
    "장휘수": "스텝업 트레이닝 센터 센터장",
    "전성규": "삼성 라이온즈 트레이너",
    "조연지": "경희대학교 스포츠재활 강사",
    "조유진": "정보 준비중",
    "조재희": "정보 준비중",
    "차정수": "팀 제로베이스 트레이너",
    "최유빈": "롯데웰푸드 영양사",
    "최윤관": "정보 준비중",
    "최지현": "경남 FC 트레이너",
    "한승욱": "부산대학교 스포츠과학과 교수",
    "한현구": "취업 준비",
    "한혜서": "경희대학교 겨루기부 트레이너"
};

// 2. Add Alumni Modal HTML to index.html before </body>
const alumniModalHTML = `
    <!-- Alumni Career Modal -->
    <div id="alumni-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.65); backdrop-filter: blur(6px); z-index: 9999; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
        <div class="alumni-modal-content" style="width: 90%; max-width: 420px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 45px rgba(0,0,0,0.3); position: relative; transform: scale(0.95); transition: transform 0.3s ease;">
            <!-- Header with KHU Burgundy Gradient -->
            <div style="background: linear-gradient(135deg, #A50034 0%, #700023 100%); padding: 28px 24px 22px 24px; color: white; position: relative; text-align: center;">
                <button id="alumni-modal-close-btn" onclick="closeAlumniModal()" style="position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.2); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1rem; transition: background 0.2s;"><i class="fa-solid fa-xmark"></i></button>
                <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.2); margin: 0 auto 12px auto; display: flex; align-items: center; justify-content: center; font-size: 1.7rem; color: #ffffff; border: 2px solid rgba(255,255,255,0.3);">
                    <i class="fa-solid fa-user-graduate"></i>
                </div>
                <h3 id="alumni-modal-name" style="margin: 0; font-size: 1.45rem; font-weight: 800; color: white; letter-spacing: -0.5px;">이름</h3>
                <div id="alumni-modal-badge" style="display: inline-block; margin-top: 8px; padding: 4px 14px; border-radius: 20px; background: rgba(255,255,255,0.25); font-size: 0.8rem; font-weight: 600; color: #ffffff;">경희대학교 AT Center 동문</div>
            </div>
            
            <!-- Body -->
            <div style="padding: 24px;">
                <div style="background: #fdf6f7; border: 1.5px solid #f9dbe0; border-radius: 14px; padding: 18px 20px; margin-bottom: 16px;">
                    <div style="font-size: 0.82rem; font-weight: 700; color: #A50034; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                        <i class="fa-solid fa-briefcase"></i> 현재 직업 및 활동
                    </div>
                    <div id="alumni-modal-job" style="font-size: 1.15rem; font-weight: 800; color: #222; word-break: keep-all; line-height: 1.45;">
                        -
                    </div>
                </div>

                <div style="background: #f8f9fa; border-radius: 12px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; color: #666;">
                    <span style="font-weight: 600;"><i class="fa-solid fa-building-columns" style="color: #A50034; margin-right: 6px;"></i>소속</span>
                    <span style="font-weight: 700; color: #333;">경희대학교 Athletic Training Center</span>
                </div>
            </div>
        </div>
    </div>
`;

if (!html.includes('id="alumni-modal"')) {
    html = html.replace('</body>', alumniModalHTML + '\n</body>');
    console.log('Successfully added alumni-modal HTML');
}

// 3. Add JS logic for alumni modal & auto-attaching click events
const alumniModalScript = `
    <!-- Alumni Modal Logic -->
    <script>
        const alumniCareerData = ${JSON.stringify(careerDataDict, null, 8)};

        window.openAlumniModal = function(name, badgeText) {
            const modal = document.getElementById('alumni-modal');
            if (!modal) return;

            const nameClean = name.trim();
            const jobInfo = alumniCareerData[nameClean] || "경희대학교 AT Center 동문";

            const nameEl = document.getElementById('alumni-modal-name');
            const jobEl = document.getElementById('alumni-modal-job');
            const badgeEl = document.getElementById('alumni-modal-badge');

            if (nameEl) nameEl.textContent = nameClean;
            if (jobEl) {
                if (jobInfo === "정보 준비중") {
                    jobEl.innerHTML = '<span style="color: #888; font-weight: 600;">정보 준비중 (업데이트 예정)</span>';
                } else {
                    jobEl.textContent = jobInfo;
                }
            }
            if (badgeEl) badgeEl.textContent = badgeText || "경희대학교 AT Center 동문";

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
                modal.style.opacity = '1';
                const content = modal.querySelector('.alumni-modal-content');
                if (content) content.style.transform = 'scale(1)';
            }, 10);
            document.body.style.overflow = 'hidden';
        };

        window.closeAlumniModal = function() {
            const modal = document.getElementById('alumni-modal');
            if (modal) {
                modal.style.opacity = '0';
                const content = modal.querySelector('.alumni-modal-content');
                if (content) content.style.transform = 'scale(0.95)';
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = '';
            }
        };

        // Attach click listeners to Awards, Past Leaders, and Graduate Assistants
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Past Leaders & Student Awards lists
            document.querySelectorAll('.awards-list li').forEach(li => {
                const nameEl = li.querySelector('.name');
                const yearEl = li.querySelector('.year');
                const colTitleEl = li.closest('.awards-col') ? li.closest('.awards-col').querySelector('.col-title') : null;
                const badgeText = (colTitleEl ? colTitleEl.textContent.trim() : '역대 수상자') + (yearEl ? ' (' + yearEl.textContent.trim() + ')' : '');

                if (nameEl) {
                    const rawNames = nameEl.textContent.trim();
                    // Split if multiple names like "조재희, 양창욱"
                    const names = rawNames.split(',').map(n => n.trim());
                    nameEl.innerHTML = '';
                    names.forEach((n, idx) => {
                        const span = document.createElement('span');
                        span.className = 'clickable-alumni-name';
                        span.textContent = n;
                        span.title = n + ' 현재 직업 보기';
                        span.style.cursor = 'pointer';
                        span.style.transition = 'all 0.2s ease';
                        span.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.openAlumniModal(n, badgeText);
                        });
                        nameEl.appendChild(span);
                        if (idx < names.length - 1) {
                            nameEl.appendChild(document.createTextNode(', '));
                        }
                    });
                }
            });

            // 2. Graduate Assistants grid
            document.querySelectorAll('.ga-card').forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    const nameEl = card.querySelector('.ga-name');
                    const roleEl = card.querySelector('.ga-role');
                    const dateEl = card.querySelector('.ga-date');
                    if (!nameEl) return;

                    const personName = nameEl.textContent.trim();
                    const badge = 'Graduate Assistant · ' + (roleEl ? roleEl.textContent.trim() : '') + (dateEl ? ' (' + dateEl.textContent.trim() + ')' : '');
                    window.openAlumniModal(personName, badge);
                });
            });

            // 3. Modal overlay click to close
            const alumniModal = document.getElementById('alumni-modal');
            if (alumniModal) {
                alumniModal.addEventListener('click', (e) => {
                    if (e.target === alumniModal) {
                        window.closeAlumniModal();
                    }
                });
            }
        });
    </script>
`;

if (!html.includes('alumniCareerData')) {
    html = html.replace('</body>', alumniModalScript + '\n</body>');
    console.log('Successfully injected alumniModalScript before </body>');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');

// 4. Update style.css to add sleek hover effects for awards and ga-card
let css = fs.readFileSync('style.css', 'utf8');
if (!css.includes('.clickable-alumni-name')) {
    css += `
/* Alumni & Awards Interactive Styles */
.clickable-alumni-name {
    color: inherit;
    display: inline-block;
    padding: 1px 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}
.clickable-alumni-name:hover {
    color: #A50034 !important;
    background: #FFF0F2;
    text-decoration: underline;
    font-weight: 700;
}
.ga-card {
    cursor: pointer !important;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.ga-card:hover {
    transform: translateY(-4px) scale(1.02) !important;
    border-color: #A50034 !important;
    box-shadow: 0 8px 20px rgba(165, 0, 52, 0.15) !important;
}
`;
    fs.writeFileSync('style.css', css, 'utf8');
    console.log('Added interactive hover styles for awards and ga-cards to style.css');
}
