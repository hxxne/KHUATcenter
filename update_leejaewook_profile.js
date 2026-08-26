const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update member card for 이재욱
const oldCard = `                <!-- 이재욱 -->
                <div class="modern-profile-card" onclick="openProfModal(this)">
                    <div class="modern-avatar-container">
                        <div class="modern-avatar-blob"></div>
                        <img src="assets/leejaewook.jpg" alt="이재욱" class="modern-avatar-img-fallback" onerror="this.src='https://via.placeholder.com/180x180?text=Profile'">
                    </div>
                    <div class="modern-profile-name">이재욱 팀장</div>
                    <ul class="modern-profile-exp">
                        <li>체육학 석사 (Athletic Training 전공)</li>
                        <li>최종학력: 경희대학교</li>
                        <li>담당과목: 저항운동과컨디셔닝, 운동손상관리, 저항운동실습</li>
                        <li>연구실: 선승관 AT center (031-201-2787)</li>
                        <li>E-mail: jwlee0102@khu.ac.kr</li>
                    </ul>
                </div>`;

const newCard = `                <!-- 이재욱 -->
                <div class="modern-profile-card" onclick="openProfModal(this)">
                    <div class="modern-avatar-container">
                        <div class="modern-avatar-blob"></div>
                        <img src="assets/leejaewook.jpg" alt="이재욱" class="modern-avatar-img-fallback" onerror="this.src='https://via.placeholder.com/180x180?text=Profile'">
                    </div>
                    <div class="modern-profile-name">이재욱 팀장</div>
                    <ul class="modern-profile-exp">
                        <li>학위명: 체육학 석사 (Athletic Training 전공)</li>
                        <li>최종학력: 경희대학교</li>
                        <li>담당과목: 저항운동과컨디셔닝, 운동손상관리, 저항운동실습</li>
                        <li>연구실: 경희대학교 선승관 AT Center</li>
                        <li>E-mail: jwlee0102@khu.ac.kr</li>
                    </ul>
                </div>`;

if (html.includes(oldCard)) {
    html = html.replace(oldCard, newCard);
    console.log('Successfully replaced 이재욱 member card');
} else {
    console.warn('oldCard not found exactly, replacing via regex');
    html = html.replace(/<!-- 이재욱 -->[\s\S]*?<!-- 김준영 -->/, newCard + '\n                <!-- 김준영 -->');
}

// 2. Update facultyData for 이재욱
const oldProfData = `            "이재욱": {
                role: "연구팀장 / 체육대학",
                photo: "assets/profile_이재욱.jpg",
                degree: "체육학 석사 (Athletic Training 전공)",
                edu: "경희대학교",
                subject: "저항운동과컨디셔닝, 운동손상관리, 저항운동실습",
                lab: "선승관 AT center (031-201-2787)",
                email: "jwlee0102@khu.ac.kr",
                career: [
                    "현) 경희대학교 AT 센터 연구팀장",
                    "현) 경희대학교 체육대학 강사",
                    "전) Athletic Trainer, The University of Kyung Hee Demonstration Team (TKD)",
                    "전) 경희대학교 태권도부 전담 AT"
                ],
                research: [
                    "Lower extremity biomechanics and injury prevention in athletes",
                    "Resistance training and rehabilitation protocols in collegiate sports"
                ]
            },`;

const newProfData = `            "이재욱": {
                role: "연구팀장 / 체육대학",
                photo: "assets/leejaewook.jpg",
                degree: "체육학 석사 (Athletic Training 전공)",
                edu: "경희대학교",
                subject: "저항운동과컨디셔닝, 운동손상관리, 저항운동실습",
                lab: "경희대학교 선승관 AT Center",
                email: "jwlee0102@khu.ac.kr",
                career: [
                    "현) 경희대학교 AT Center 연구팀장",
                    "현) 경희대학교 스포츠의학과 강사",
                    "전) 경희대학교 AT Center 실장",
                    "전) Athletic Trainer, Kyung Hee University Taekwondo",
                    "전) 경희대학교 스포츠재활팀 트레이너"
                ],
                research: [
                    "Lower extremity muscle activation patterns during running in individuals with and without anterior cruciate ligament reconstruction (2026)",
                    "Anticipatory effect on lower extremity muscle recruitment and activation patterns during single leg drop tasks (2026)",
                    "Injury incidences related to acute-to-chronic workload ratios in Taekwondo: A prospective study with a 3-year follow-up (2025)",
                    "Change in femoral cartilage cross-sectional area after aerobic and resistance exercise (2024)"
                ]
            },`;

if (html.includes(oldProfData)) {
    html = html.replace(oldProfData, newProfData);
    console.log('Successfully replaced 이재욱 facultyData');
} else {
    console.warn('oldProfData not found exactly, replacing via regex');
    html = html.replace(/"이재욱":\s*\{[\s\S]*?\},(?=\s*"김준영":)/, newProfData.trim());
}

// 3. Update cache busters
const now = Date.now();
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
