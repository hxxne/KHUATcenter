const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update member card for 오성민
const oldCardRegex = /<!-- 오성민 -->[\s\S]*?<!-- Group 2: Staff -->/;
const newCard = `<!-- 오성민 -->
                <div class="modern-profile-card" onclick="openProfModal(this)">
                    <div class="modern-avatar-container">
                        <div class="modern-avatar-blob"></div>
                        <img src="assets/ohsungmin.png" alt="오성민" class="modern-avatar-img-fallback" onerror="this.src='https://via.placeholder.com/180x180?text=Profile'">
                    </div>
                    <div class="modern-profile-name">오성민 교수</div>
                    <ul class="modern-profile-exp">
                        <li>학위명: 스포츠심리학-운동제어 박사(Motor Control 전공)</li>
                        <li>최종학력: 성균관대학교</li>
                        <li>담당과목: 운동손상평가</li>
                        <li>연구실: 경희대학교 선승관 AT Center</li>
                        <li>E-mail: sungminoh@khu.ac.kr</li>
                    </ul>
                </div>
            </div>

            <!-- Group 2: Staff -->`;

html = html.replace(oldCardRegex, newCard);

// 2. Update professorsData for 오성민
const oldProfDataRegex = /"오성민":\s*\{[\s\S]*?\},(?=\s*"이재욱":)/;
const newProfData = `"오성민": {
                role: "연구교수",
                photo: "assets/ohsungmin.png",
                degree: "스포츠심리학-운동제어 박사(Motor Control 전공)",
                edu: "성균관대학교",
                subject: "운동손상평가",
                lab: "경희대학교 선승관 AT Center",
                email: "sungminoh@khu.ac.kr",
                career: [
                    "현) 경희대학교 체육대학 연구교수",
                    "현) 한국운동제어학회 상임이사",
                    "전) 성균관대학교 스포츠과학연구소 연구원"
                ],
                research: [
                    "Effects of fatigue on motor control and neuromuscular regulation during explosive dynamic movements",
                    "Biomechanical and neurophysiological adaptations in elite collegiate athletes",
                    "Motor learning and sensory-motor integration in sports injury rehabilitation"
                ]
            },`;

html = html.replace(oldProfDataRegex, newProfData);

// 3. Update cache busters
const now = Date.now();
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated 오성민 profile card and modal in index.html');
