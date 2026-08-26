const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const updatedAlumniCareerData = `        const alumniCareerData = {
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
        };`;

// Replace alumniCareerData in index.html
const startMarker = 'const alumniCareerData = {';
const endMarker = '};\n\n        window.openAlumniModal = function';

const sIdx = html.indexOf(startMarker);
const eIdx = html.indexOf(endMarker);

if (sIdx !== -1 && eIdx !== -1) {
    html = html.substring(0, sIdx) + updatedAlumniCareerData.trim() + '\n\n        window.openAlumniModal = function' + html.substring(eIdx + endMarker.length);
    console.log('Successfully replaced alumniCareerData in index.html');
}

// Update openAlumniModal function to handle "미공개" cleanly
const oldModalFunc = `            if (jobEl) {
                if (jobInfo === "정보 준비중") {
                    jobEl.innerHTML = '<span style="color: #888; font-weight: 600;">정보 준비중 (업데이트 예정)</span>';
                } else {
                    jobEl.textContent = jobInfo;
                }
            }`;

const newModalFunc = `            if (jobEl) {
                if (jobInfo === "미공개" || jobInfo === "정보 준비중") {
                    jobEl.innerHTML = '<span style="color: #64748b; font-weight: 700; background: #f1f5f9; padding: 6px 18px; border-radius: 20px; font-size: 1.05rem; display: inline-block;">미공개</span>';
                } else {
                    jobEl.innerHTML = '<span style="color: #0f172a; font-weight: 800; font-size: 1.15rem;">' + jobInfo + '</span>';
                }
            }`;

if (html.includes(oldModalFunc)) {
    html = html.replace(oldModalFunc, newModalFunc);
    console.log('Successfully updated openAlumniModal function');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
