const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const completeProfessorsData = `
        // Comprehensive Professor & Staff Data Dictionary
        const professorsData = {
            "박지홍": {
                role: "센터장 / 교수",
                photo: "assets/parkjihong.jpg",
                degree: "체육과학 박사(Physical Medicine & Rehabilitation 전공)",
                edu: "Brigham Young University",
                subject: "운동손상, 재활모달리티, 저항운동과컨디셔닝",
                lab: "체411호 (031-201-2721)",
                email: "jihong.park@khu.ac.kr",
                career: [
                    "현) 경희대학교 체육대학 스포츠의학과 교수",
                    "현) 경희대학교 생명윤리위원회 위원",
                    "전) 경희대학교 스포츠의학과 학과장",
                    "전) Assistant Professor, Marshall University",
                    "전) Adjunct Professor, Brigham Young University",
                    "전) Athletic Trainer, The University of Virginia Football"
                ],
                research: [
                    "Anticipatory effect on lower extremity muscle recruitment and activation patterns during single leg drop tasks (2026)",
                    "Bilateral femoral cartilage morphology in athletes with unilateral patellofemoral pain: associations with pain severity and self-reported function (2026)",
                    "Medial meniscus extrusion after 30-min running in individuals who underwent meniscus surgery or anterior cruciate ligament reconstruction and healthy controls (2026)",
                    "Lower extremity muscle activation patterns during running in individuals with and without anterior cruciate ligament reconstruction (2026)",
                    "Sex-specific associations of body mass index with quadriceps neuromuscular function and self-reported function in individuals with and without patellofemoral pain (2025)",
                    "Effects of whole-body vibration on quadriceps neuromuscular function in individuals with knee osteoarthritis: a systematic review and meta-analysis (2025)",
                    "Effects of foot orthoses on lower extremity biomechanics and pain in individuals with patellofemoral pain: a randomized controlled trial (2024)"
                ]
            },
            "오성민": {
                role: "연구교수",
                photo: "assets/ohsungmin.png",
                degree: "스포츠심리학-운동제어 박사(Motor Control 전공)",
                edu: "Sungkyunkwan University",
                subject: "운동손상평가",
                lab: "선승관 AT center (031-201-2787)",
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
            },
            "이재욱": {
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
            },
            "김준영": {
                role: "실장 / 체육부",
                photo: "assets/kimjunyoung.png",
                degree: "체육학 석사(Sports Medicine and Science 전공)",
                edu: "경희대학교",
                subject: "재활운동실습, 스포츠테이핑실습",
                lab: "선승관 AT center (031-201-2787)",
                email: "junyoung0366@khu.ac.kr",
                career: [
                    "현) 경희대학교 AT 센터 실장",
                    "현) 경희대학교 체육대학 강사",
                    "전) Athletic Trainer, The University of Kyung Hee Basketball",
                    "전) BNK 썸 여자프로농구단 트레이너",
                    "전) 평창군보건의료원 운동처방사",
                    "전) 경희대학교 시설운영공단 트레이너"
                ],
                research: [
                    "Sports taping and functional movement recovery in collegiate athletes",
                    "Emergency care and acute injury management protocols in university sports"
                ]
            },
            "최현곤": {
                role: "팀장 / 체육시설운영단",
                photo: "assets/choihyungon.png",
                degree: "체육학 석사(Sports Medicine and Science 전공)",
                edu: "경희대학교",
                subject: "체육시설운영단",
                lab: "선승관 AT center (031-201-2787)",
                email: "gusrhs24@khu.ac.kr",
                career: [
                    "현) 경희대학교 스포츠재활팀 팀장",
                    "전) Athletic Trainer, The University of Kyung Hee Demonstration Team (TKD)",
                    "전) 경희대학교 시설운영단 스포츠재활 총괄"
                ],
                research: [
                    "Sports facility rehabilitation program models and community musculoskeletal health",
                    "Injury prevention and conditioning in martial arts demonstration teams"
                ]
            },
            "한혜서": {
                role: "대학원 연구원 / 겨루기부 전담 AT",
                photo: "assets/profile_한혜서.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "태권도 겨루기 손상 분석 및 재활",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 겨루기부 전담 AT",
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            },
            "유승아": {
                role: "대학원 연구원 / 품새부 전담 AT",
                photo: "assets/profile_유승아.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "품새 선수 기능성 움직임 및 재활",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 품새부 전담 AT",
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            },
            "기윤서": {
                role: "대학원 연구원 / 핸드볼부 전담 AT",
                photo: "assets/profile_기윤서.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "핸드볼 선수 어깨 및 하지 손상 재활",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 핸드볼부 전담 AT",
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            },
            "문채연": {
                role: "시범단 전담 AT / 스포츠재활 강사",
                photo: "assets/profile_문채연.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "시범단 고난도 격파 손상 관리",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 태권도 시범단 전담 AT",
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            },
            "유주승": {
                role: "야구부 전담 AT / 스포츠재활 강사",
                photo: "assets/profile_유주승.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "야구 투구 메커니즘 및 어깨·팔꿈치 재활",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 야구부 전담 AT",
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            },
            "조현준": {
                role: "대학원 연구원 / 스포츠재활 강사",
                photo: "assets/profile_조현준.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "축구 선수 기능 회복 및 재활",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 스포츠재활 강사",
                    "현) 경희대학교 축구부 보조 AT"
                ],
                research: []
            },
            "진승희": {
                role: "대학원 연구원 / 스포츠재활 강사",
                photo: "assets/profile_진승희.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "근골격계 질환 재활 및 운동처방",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            },
            "이예인": {
                role: "대학원 연구원 / 골프부 전담 AT",
                photo: "assets/profile_이예인.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "골프 스윙 바이오메카닉스 및 손상 예방",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 골프부 전담 AT",
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            },
            "유영민": {
                role: "대학원 연구원 / 럭비부 전담 AT",
                photo: "assets/profile_유영민.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "럭비 컨택트 손상 및 컨디셔닝",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 럭비부 전담 AT",
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            },
            "권준홍": {
                role: "대학원 연구원 / 센터 AT",
                photo: "assets/profile_권준홍.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "스포츠의학 및 선수 트레이닝",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 AT Center 센터 AT"
                ],
                research: []
            },
            "우지윤": {
                role: "대학원 연구원 / 스포츠재활 강사",
                photo: "assets/profile_우지윤.jpg",
                degree: "스포츠의학과 석사과정",
                edu: "경희대학교",
                subject: "스포츠 부상 재활 및 체력 관리",
                lab: "선승관 AT center (031-201-2787)",
                email: "khuatcenter@khu.ac.kr",
                career: [
                    "현) 경희대학교 스포츠재활 강사"
                ],
                research: []
            }
        };
`;

const updatedCardClickListener = `
        // Attach click listener to modern-profile-cards (Professors, Staff, Researchers, Rehab Instructors)
        document.querySelectorAll('.modern-profile-card').forEach(card => {
            card.addEventListener('click', () => {
                const nameEl = card.querySelector('.modern-profile-name');
                if (!nameEl) return;

                const rawName = nameEl.textContent.trim();
                // Strip titles like '교수', '팀장', '실장' to match dictionary keys
                const cleanName = rawName.replace(/(교수|팀장|실장)$/, '').trim();
                const profModal = document.getElementById('prof-modal');
                if (!profModal) return;

                const pData = (typeof professorsData !== 'undefined') ? (professorsData[cleanName] || professorsData[rawName]) : null;

                if (pData) {
                    document.getElementById('prof-modal-name').textContent = rawName;
                    document.getElementById('prof-modal-role').textContent = pData.role || "경희대학교 AT Center";

                    const photoEl = document.getElementById('prof-modal-photo');
                    if (photoEl) {
                        if (pData.photo) {
                            photoEl.innerHTML = \`<img src="\${pData.photo}" alt="\${rawName}" style="width: 100%; height: 100%; object-fit: cover;">\`;
                        } else {
                            const imgInCard = card.querySelector('img');
                            if (imgInCard && imgInCard.src) {
                                photoEl.innerHTML = \`<img src="\${imgInCard.src}" alt="\${rawName}" style="width: 100%; height: 100%; object-fit: cover;">\`;
                            } else {
                                photoEl.innerHTML = '<i class="fa-solid fa-user-tie"></i>';
                            }
                        }
                    }

                    document.getElementById('prof-modal-degree').textContent = pData.degree || "-";
                    document.getElementById('prof-modal-edu').textContent = pData.edu || "경희대학교";
                    document.getElementById('prof-modal-subject').textContent = pData.subject || "-";

                    const subjectLabel = document.getElementById('prof-modal-subject-label');
                    if (subjectLabel) subjectLabel.textContent = (cleanName === "최현곤") ? "담당부서" : "담당과목";

                    document.getElementById('prof-modal-lab').textContent = pData.lab || "선승관 AT center (031-201-2787)";
                    document.getElementById('prof-modal-email').textContent = pData.email || "khuatcenter@khu.ac.kr";

                    const careerList = document.getElementById('prof-modal-career');
                    if (careerList) {
                        careerList.innerHTML = '';
                        if (pData.career && pData.career.length > 0) {
                            careerList.parentElement.style.display = 'block';
                            pData.career.forEach(item => {
                                const li = document.createElement('li');
                                li.textContent = item;
                                careerList.appendChild(li);
                            });
                        } else {
                            careerList.parentElement.style.display = 'none';
                        }
                    }

                    const researchList = document.getElementById('prof-modal-research');
                    if (researchList) {
                        researchList.innerHTML = '';
                        if (pData.research && pData.research.length > 0) {
                            researchList.parentElement.style.display = 'block';
                            pData.research.forEach(item => {
                                const li = document.createElement('li');
                                li.textContent = item;
                                researchList.appendChild(li);
                            });
                        } else {
                            researchList.parentElement.style.display = 'none';
                        }
                    }

                    profModal.style.display = 'flex';
                    setTimeout(() => { profModal.classList.add('show'); }, 10);
                    document.body.style.overflow = 'hidden';
                } else {
                    // Fallback for other members
                    document.getElementById('prof-modal-name').textContent = rawName;
                    document.getElementById('prof-modal-role').textContent = "경희대학교 스포츠재활 강사";

                    const photoEl = document.getElementById('prof-modal-photo');
                    const imgInCard = card.querySelector('img');
                    if (photoEl) {
                        if (imgInCard && imgInCard.src) {
                            photoEl.innerHTML = \`<img src="\${imgInCard.src}" alt="\${rawName}" style="width: 100%; height: 100%; object-fit: cover;">\`;
                        } else {
                            photoEl.innerHTML = '<i class="fa-solid fa-user-check"></i>';
                        }
                    }

                    document.getElementById('prof-modal-degree').textContent = "스포츠재활 강사";
                    document.getElementById('prof-modal-edu').textContent = "경희대학교";
                    document.getElementById('prof-modal-subject').textContent = "스포츠 부상 재활 & 1:1 케어";
                    document.getElementById('prof-modal-lab').textContent = "선승관 AT center (031-201-2787)";
                    document.getElementById('prof-modal-email').textContent = "khuatcenter@khu.ac.kr";

                    const careerList = document.getElementById('prof-modal-career');
                    if (careerList) {
                        careerList.parentElement.style.display = 'block';
                        careerList.innerHTML = '<li>현) 경희대학교 AT Center 스포츠재활 강사</li>';
                    }

                    const researchList = document.getElementById('prof-modal-research');
                    if (researchList) {
                        researchList.parentElement.style.display = 'none';
                    }

                    profModal.style.display = 'flex';
                    setTimeout(() => { profModal.classList.add('show'); }, 10);
                    document.body.style.overflow = 'hidden';
                }
            });
        });
`;

// Insert completeProfessorsData before sportsData
const sportsDataPos = html.indexOf('const sportsData = {');
if (sportsDataPos !== -1) {
    html = html.substring(0, sportsDataPos) + completeProfessorsData + '\n' + html.substring(sportsDataPos);
    console.log('Successfully injected completeProfessorsData dictionary');
}

// Replace the old card click listener
const oldListenerStart = html.indexOf('// Attach click listener to modern-profile-cards');
const oldListenerEnd = html.indexOf('// Close prof-modal event listeners', oldListenerStart);

if (oldListenerStart !== -1 && oldListenerEnd !== -1) {
    html = html.substring(0, oldListenerStart) + updatedCardClickListener + '\n\n        ' + html.substring(oldListenerEnd);
    console.log('Successfully updated modern-profile-card click listener');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
