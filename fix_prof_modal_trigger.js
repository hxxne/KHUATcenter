const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Complete Clean Script Replacement for Modals
const cleanModalScript = `    <!-- Modal Logic -->
    <script>
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

        const sportsData = {
            "축구": { head: "강석", sub: ["조현준", "김예종", "오승진", "이복음"] },
            "야구": { head: "유주승", sub: ["송서옥", "채상우", "박서현", "홍진후"] },
            "농구": { head: "이상준", sub: ["이진호", "정연우", "김민주", "김성준", "김동언", "황이삭"] },
            "배구": { head: "박세민", sub: ["문민서", "장서현", "이다현", "황성윤", "박인서", "박유빈"] },
            "럭비": { head: "유영민", sub: ["이도형", "최성찬"] },
            "골프": { head: "이예인", sub: ["문수연", "유승원", "최주영", "김무건"] },
            "배드민턴": { head: "권남준", sub: ["이채원"] },
            "핸드볼": { head: "기윤서", sub: ["정준영", "남가민", "박다은", "김민지"] },
            "시범단": { head: "문채연", sub: ["우민서", "김한결", "김다은", "권인혜", "김다감", "남수현"] },
            "겨루기": { head: ["유지민", "한혜서"], sub: ["정도엽", "조연지", "박은지"] },
            "품새": { head: "유승아", sub: ["홍혜원", "권준휘", "이은채", "김형우"] },
            "센터": { head: null, sub: ["권준홍", "천지훈", "안은지", "이천이"] }
        };

        // Open Department Modal
        window.openSportModal = function(sportName) {
            const modal = document.getElementById('department-modal');
            if (!modal) return;

            const sportIcons = {
                "축구": '<img src="assets/pictogram_soccer.jpg" alt="축구" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "야구": '<img src="assets/pictogram_baseball.jpg" alt="야구" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "농구": '<img src="assets/pictogram_basketball.jpg" alt="농구" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "배구": '<img src="assets/pictogram_volleyball.jpg" alt="배구" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "럭비": '<img src="assets/pictogram_rugby.jpg" alt="럭비" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "골프": '<img src="assets/pictogram_golf.jpg" alt="골프" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "배드민턴": '<img src="assets/pictogram_badminton.jpg" alt="배드민턴" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "핸드볼": '<img src="assets/pictogram_handball.jpg" alt="핸드볼" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "시범단": '<img src="assets/pictogram_demoteam.jpg" alt="시범단" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "겨루기": '<img src="assets/pictogram_gyeorugi.jpg" alt="겨루기" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "품새": '<img src="assets/pictogram_poomsae.jpg" alt="품새" style="width: 48px; height: 48px; border-radius: 50%; mix-blend-mode: screen;">',
                "센터": '<i class="fa-solid fa-kit-medical"></i>'
            };

            const data = sportsData[sportName] || { head: "담당자 미정", sub: [] };

            const iconEl = document.getElementById('modal-sport-icon');
            if (iconEl) {
                iconEl.innerHTML = sportIcons[sportName] || '<i class="fa-solid fa-trophy"></i>';
            }

            const titleEl = document.getElementById('modal-sport-title');
            if (titleEl) {
                titleEl.textContent = sportName === "센터" ? "센터 AT" : \`\${sportName}부\`;
            }

            const headBlock = document.getElementById('modal-head-at-block');
            const assistantsBlock = document.getElementById('modal-assistants-block');
            const headContainer = document.getElementById('s-modal-head-container');
            const mainAtNameEl = document.getElementById('modal-main-at-name');

            if (!data.head || sportName === "센터") {
                if (headBlock) headBlock.style.display = 'none';
                if (assistantsBlock) {
                    assistantsBlock.style.gridColumn = '1 / -1';
                    const titleH4 = assistantsBlock.querySelector('h4');
                    if (titleH4) titleH4.innerHTML = '<i class="fa-solid fa-users"></i> 센터 AT 명단 (Center ATs)';
                }
            } else {
                if (headBlock) headBlock.style.display = 'block';
                if (assistantsBlock) {
                    assistantsBlock.style.gridColumn = 'auto';
                    const titleH4 = assistantsBlock.querySelector('h4');
                    if (titleH4) titleH4.innerHTML = '<i class="fa-solid fa-users"></i> 보조 AT 명단 (Assistants)';
                }

                const heads = Array.isArray(data.head) ? data.head : [data.head];
                if (mainAtNameEl) {
                    mainAtNameEl.textContent = heads.join(', ');
                }

                if (headContainer) {
                    headContainer.innerHTML = '';
                    heads.forEach((headName) => {
                        const profileDiv = document.createElement('div');
                        profileDiv.className = 'head-at-profile';
                        profileDiv.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-bottom: 8px;';
                        profileDiv.innerHTML = \`
                            <div style="width: 52px; height: 52px; border-radius: 50%; overflow: hidden; background: #e0e0e0; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; color: #777; flex-shrink: 0;">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div class="head-at-info">
                                <h5 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: #222;">\${headName}</h5>
                                <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #666; font-weight: 600;">경희대학교 \${sportName} 전담 AT</p>
                            </div>
                        \`;
                        headContainer.appendChild(profileDiv);
                    });
                }
            }

            const assistantsList = document.getElementById('modal-assistants-list');
            if (assistantsList) {
                assistantsList.innerHTML = '';
                if (data.sub && data.sub.length > 0) {
                    data.sub.forEach(name => {
                        const span = document.createElement('span');
                        span.className = 'assistant-badge';
                        span.textContent = name;
                        assistantsList.appendChild(span);
                    });
                } else {
                    assistantsList.innerHTML = '<span style="color: #999; font-size: 0.9rem;">배속 보조 AT 없음</span>';
                }
            }

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
        };

        window.closeDepartmentModal = function() {
            const modal = document.getElementById('department-modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = '';
            }
        };

        window.switchSubTab = function(tabName) {
            document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.sub-tab-pane').forEach(pane => pane.classList.remove('active'));

            const btn = document.getElementById('btn-tab-' + tabName);
            const pane = document.getElementById('sub-tab-' + tabName);

            if (btn) btn.classList.add('active');
            if (pane) pane.classList.add('active');
        };

        // Open Professor / Staff Modal
        window.openProfModal = function(cardOrName) {
            let rawName = "";
            let cardImgSrc = "";

            if (typeof cardOrName === "string") {
                rawName = cardOrName.trim();
            } else if (cardOrName && cardOrName.nodeType) {
                const nameEl = cardOrName.querySelector('.modern-profile-name');
                if (nameEl) rawName = nameEl.textContent.trim();
                const imgEl = cardOrName.querySelector('img');
                if (imgEl && imgEl.src) cardImgSrc = imgEl.src;
            }

            if (!rawName) return;

            const cleanName = rawName.replace(/(교수|팀장|실장)$/, '').trim();
            const profModal = document.getElementById('prof-modal');
            if (!profModal) return;

            const pData = professorsData[cleanName] || professorsData[rawName] || null;

            if (pData) {
                document.getElementById('prof-modal-name').textContent = rawName;
                document.getElementById('prof-modal-role').textContent = pData.role || "경희대학교 AT Center";

                const photoEl = document.getElementById('prof-modal-photo');
                if (photoEl) {
                    const imgSrc = pData.photo || cardImgSrc;
                    if (imgSrc) {
                        photoEl.innerHTML = \`<img src="\${imgSrc}" alt="\${rawName}" style="width: 100%; height: 100%; object-fit: cover;">\`;
                    } else {
                        photoEl.innerHTML = '<i class="fa-solid fa-user-tie"></i>';
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
            } else {
                // Fallback for general members
                document.getElementById('prof-modal-name').textContent = rawName;
                document.getElementById('prof-modal-role').textContent = "경희대학교 스포츠재활 강사";

                const photoEl = document.getElementById('prof-modal-photo');
                if (photoEl) {
                    if (cardImgSrc) {
                        photoEl.innerHTML = \`<img src="\${cardImgSrc}" alt="\${rawName}" style="width: 100%; height: 100%; object-fit: cover;">\`;
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
            }

            profModal.style.display = 'flex';
            setTimeout(() => { profModal.classList.add('show'); }, 10);
            document.body.style.overflow = 'hidden';
        };

        window.closeProfModal = function() {
            const profModal = document.getElementById('prof-modal');
            if (profModal) {
                profModal.classList.remove('show');
                setTimeout(() => { profModal.style.display = 'none'; }, 300);
                document.body.style.overflow = '';
            }
        };

        // Attach DOM event listeners
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Department modal close
            const deptModal = document.getElementById('department-modal');
            const deptCloseBtn = document.getElementById('modal-close-btn');
            if (deptCloseBtn) {
                deptCloseBtn.addEventListener('click', window.closeDepartmentModal);
            }
            if (deptModal) {
                deptModal.addEventListener('click', (e) => {
                    if (e.target === deptModal) window.closeDepartmentModal();
                });
            }

            // 2. Professor / Staff cards click
            document.querySelectorAll('.modern-profile-card').forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    window.openProfModal(card);
                });
            });

            // 3. Professor modal close
            const profCloseBtn = document.getElementById('prof-modal-close-btn');
            const profModal = document.getElementById('prof-modal');
            if (profCloseBtn) {
                profCloseBtn.addEventListener('click', window.closeProfModal);
            }
            if (profModal) {
                profModal.addEventListener('click', (e) => {
                    if (e.target === profModal) window.closeProfModal();
                });
            }
        });
    </script>`;

// Replace from '<!-- Modal Logic -->' to '</script>' before '<!-- Alumni Career Modal -->'
const modalLogicStart = html.indexOf('<!-- Modal Logic -->');
const modalLogicEnd = html.indexOf('<!-- Alumni Career Modal -->');

if (modalLogicStart !== -1 && modalLogicEnd !== -1) {
    html = html.substring(0, modalLogicStart) + cleanModalScript + '\n\n' + html.substring(modalLogicEnd);
    console.log('Successfully replaced modal logic script block');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
