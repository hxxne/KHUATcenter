const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update member card for 김준영
const oldCardRegex = /<!-- 김준영 -->[\s\S]*?<!-- 최현곤 -->/;
const newCard = `<!-- 김준영 -->
                <div class="modern-profile-card" onclick="openProfModal(this)">
                    <div class="modern-avatar-container">
                        <div class="modern-avatar-blob"></div>
                        <img src="assets/kimjunyoung.png" alt="김준영" class="modern-avatar-img-fallback" onerror="this.src='https://via.placeholder.com/180x180?text=Profile'">
                    </div>
                    <div class="modern-profile-name">김준영 실장</div>
                    <ul class="modern-profile-exp">
                        <li>학위명: 체육학 석사 (Athletic Training 전공)</li>
                        <li>최종학력: 경희대학교</li>
                        <li>담당과목: 재활운동실습, 스포츠테이핑실습</li>
                        <li>연구실: 경희대학교 선승관 AT Center</li>
                        <li>E-mail: junyoung0366@khu.ac.kr</li>
                    </ul>
                </div>
                <!-- 최현곤 -->`;

html = html.replace(oldCardRegex, newCard);

// 2. Update professorsData for 김준영
const oldProfDataRegex = /"김준영":\s*\{[\s\S]*?\},(?=\s*"최현곤":)/;
const newProfData = `"김준영": {
                role: "실장 / 체육부",
                photo: "assets/kimjunyoung.png",
                degree: "체육학 석사 (Athletic Training 전공)",
                edu: "경희대학교",
                subject: "재활운동실습, 스포츠테이핑실습",
                lab: "경희대학교 선승관 AT Center",
                email: "junyoung0366@khu.ac.kr",
                career: [
                    "현) 경희대학교 AT 센터 실장",
                    "현) 경희대학교 체육대학 강사",
                    "전) Athletic Trainer, The university of Kyung Hee Basketball",
                    "전) BNK 썸 여자프로농구단 트레이너",
                    "전) 평창군보건의료원 운동처방사",
                    "전) 경희대학교 시설운영공단 트레이너"
                ],
                research: []
            },`;

html = html.replace(oldProfDataRegex, newProfData);

// 3. Update cache busters
const now = Date.now();
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated 김준영 profile card and modal in index.html');
