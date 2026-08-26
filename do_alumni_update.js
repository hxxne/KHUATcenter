const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const sMarker = 'const alumniCareerData = {';
const eMarker = 'window.closeAlumniModal';

const sIdx = html.indexOf(sMarker);
const eIdx = html.indexOf(eMarker);

if (sIdx === -1 || eIdx === -1) {
    console.error('Markers not found!');
    process.exit(1);
}

const replacementCode = `const alumniCareerData = {
        "강성훈": "킹스짐 (광교)",
        "고준영": "MS Physical (서울)",
        "기윤서": "경희대학교 핸드볼부 (AT)",
        "김다영": "성남시청 (AT)",
        "김대호": "경일대학교 스포츠재활의학과 교수",
        "김동현": "University of Connecticut (Korey Stringer Institute)",
        "김무성": "미공개",
        "김민준": "키움히어로즈 프로야구단 (AT)",
        "김성완": "부산대학교 스포츠과학과 교수",
        "김승연": "미공개",
        "김재원": "William Penn University (AT)",
        "김주완": "부산스포츠과학센터",
        "김준영": "경희대학교 AT 센터 실장",
        "김지원": "휴직",
        "김태진": "University of Nebraska PhD 진행중",
        "남아공": "미공개",
        "노윤서": "미공개",
        "노유연": "미공개",
        "두현지": "미공개",
        "문정은": "장애인 컬링 국가대표팀 (AT)",
        "문채연": "경희대학교 시범단 (AT)",
        "민경은": "아비타즈 운동 센터 (화성)",
        "박상협": "스텝업 트레이닝 센터 (동탄)",
        "박지현": "이강인 선수 전담 트레이너",
        "박효진": "기계체조 국가대표팀 (AT)",
        "방수일": "미공개",
        "서동균": "경희대학교 스포츠의학과 강사",
        "성락훈": "The Athletics (MLB)",
        "신재윤": "키움히어로즈 프로야구단 (AT)",
        "안효은": "스피드 스케이팅 국가대표팀 (AT)",
        "양창욱": "진에어 객실승무원",
        "오민섭": "국민대학교 스포츠건강재활학과 조교수",
        "우태희": "더프로 트레이닝센터 (서울)",
        "유승아": "경희대학교 품새부 (AT)",
        "유영수": "미공개",
        "유주승": "경희대학교 야구부 (AT)",
        "윤정섭": "윤 피지오 운동센터 (화성)",
        "이강훈": "미공개",
        "이남송": "핸드볼 국가대표팀 (AT)",
        "이서영": "성남시청 (AT)",
        "이선화": "화성국민체육센터",
        "이송현": "미공개",
        "이승훈": "스텝업 트레이닝 센터 (동탄)",
        "이승희": "김제시 체육회",
        "이재욱": "경희대학교 AT센터 연구팀장",
        "이정재": "스텝업 트레이닝 센터 (동탄)",
        "이주희": "미공개",
        "이준혁": "대한항공 점보스 프로배구단",
        "이진우": "미공개",
        "이현욱": "국민대학교 스포츠건강재활학과 교수",
        "임선주": "HD 하이드로젠 (성남)",
        "임준형": "부산스포츠과학센터 연구원",
        "장영훈": "DMC 움직임 한의원 (서울)",
        "장휘수": "스텝업 트레이닝 센터 (동탄)",
        "전성규": "삼성 라이온즈 프로야구단 (AT)",
        "조연지": "경희대학교 스포츠재활 강사",
        "조유진": "미공개",
        "조재희": "미공개",
        "차정수": "팀 제로베이스 (동탄)",
        "최유빈": "롯데웰푸드 영양사",
        "최윤관": "미공개",
        "최지현": "경남 FC 프로축구단 (AT)",
        "한승욱": "부산대학교 스포츠과학과 교수",
        "한현구": "미공개",
        "한혜서": "경희대학교 겨루기부 (AT)"
    };

    window.openAlumniModal = function(name, badgeText) {
        const modal = document.getElementById('alumni-modal');
        if (!modal) return;

        const nameClean = name.trim();
        const jobInfo = alumniCareerData[nameClean] || "미공개";

        const nameEl = document.getElementById('alumni-modal-name');
        const jobEl = document.getElementById('alumni-modal-job');
        const badgeEl = document.getElementById('alumni-modal-badge');

        if (nameEl) nameEl.textContent = nameClean;
        if (jobEl) {
            if (jobInfo === "미공개" || jobInfo === "정보 준비중") {
                jobEl.innerHTML = '<span style="color: #64748b; font-weight: 700; background: #f1f5f9; padding: 6px 18px; border-radius: 20px; font-size: 1.05rem; display: inline-block;">미공개</span>';
            } else {
                jobEl.innerHTML = '<span style="color: #0f172a; font-weight: 800; font-size: 1.15rem;">' + jobInfo + '</span>';
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

    `;

html = html.substring(0, sIdx) + replacementCode + html.substring(eIdx);

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with complete 64 alumni data and clean modal rendering!');
