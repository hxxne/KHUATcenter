const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update member card for 최현곤
const oldCardRegex = /<!-- 최현곤 -->[\s\S]*?<!-- Group 3: Graduate Students -->/;
const newCard = `<!-- 최현곤 -->
                <div class="modern-profile-card" onclick="openProfModal(this)">
                    <div class="modern-avatar-container">
                        <div class="modern-avatar-blob"></div>
                        <img src="assets/choihyungon.png" alt="최현곤" class="modern-avatar-img-fallback" style="object-fit: cover; object-position: center 10%;" onerror="this.src='https://via.placeholder.com/180x180?text=Profile'">
                    </div>
                    <div class="modern-profile-name">최현곤 팀장</div>
                    <ul class="modern-profile-exp">
                        <li>학위명: 체육학 석사 (Sports Medicine and Science 전공)</li>
                        <li>최종학력: 경희대학교</li>
                        <li>담당부서: 체육시설운영단</li>
                        <li>사무실: 경희대학교 선승관 AT Center</li>
                        <li>E-mail: gusrhs24@khu.ac.kr</li>
                    </ul>
                </div>
            </div>
            
            <!-- Group 3: Graduate Students -->`;

html = html.replace(oldCardRegex, newCard);

// 2. Update professorsData for 최현곤
const oldProfDataRegex = /"최현곤":\s*\{[\s\S]*?\},(?=\s*"한혜서":)/;
const newProfData = `"최현곤": {
                role: "팀장 / 체육시설운영단",
                photo: "assets/choihyungon.png",
                degree: "체육학 석사 (Sports Medicine and Science 전공)",
                edu: "경희대학교",
                subject: "체육시설운영단",
                lab: "경희대학교 선승관 AT Center",
                email: "gusrhs24@khu.ac.kr",
                career: [
                    "현) 경희대학교 스포츠재활팀 팀장",
                    "전) 경희대학교 태권도 시범단/격파부 전담 AT"
                ],
                research: []
            },`;

html = html.replace(oldProfDataRegex, newProfData);

// 3. Ensure prof-modal-lab-label ID exists in modal
html = html.replace('<div class="prof-info-label">연구실</div>', '<div class="prof-info-label" id="prof-modal-lab-label">연구실</div>');

// 4. Update openProfModal to toggle lab label for 최현곤
if (!html.includes("const labLabel = document.getElementById('prof-modal-lab-label');")) {
    html = html.replace(
        "if (subjectLabel) subjectLabel.textContent = (cleanName === \"최현곤\") ? \"담당부서\" : \"담당과목\";",
        "if (subjectLabel) subjectLabel.textContent = (cleanName === \"최현곤\") ? \"담당부서\" : \"담당과목\";\n                const labLabel = document.getElementById('prof-modal-lab-label');\n                if (labLabel) labLabel.textContent = (cleanName === \"최현곤\") ? \"사무실\" : \"연구실\";"
    );
}

// 5. Update cache busters
const now = Date.now();
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated 최현곤 profile card and modal in index.html');
