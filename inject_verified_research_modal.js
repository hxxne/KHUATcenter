const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Research Modal HTML with Verified Research Papers
const verifiedResearchModalHTML = `
    <!-- Research Publications Modal (Verified SCIE Papers) -->
    <div id="research-modal" class="modal-overlay" onclick="closeResearchModal()">
        <div class="modal-content research-modal-content" style="max-width: 900px; width: 92%; border-radius: 20px; overflow: hidden; background: #ffffff; padding: 0; box-shadow: 0 25px 50px rgba(0,0,0,0.25);" onclick="event.stopPropagation()">
            <button class="modal-close-btn" id="close-research-modal" onclick="closeResearchModal()" style="position: absolute; top: 18px; right: 22px; z-index: 10; color: #fff; background: rgba(0,0,0,0.25); border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem; transition: all 0.2s ease;"><i class="fa-solid fa-xmark"></i></button>
            
            <div class="research-modal-header" style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); padding: 28px 35px; color: white;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                    <span style="background: rgba(255,255,255,0.15); color: #94a3b8; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.5px;">EBM RESEARCH</span>
                    <span style="color: rgba(255,255,255,0.6); font-size: 0.85rem;">경희대학교 AT Center 학술 연구 실적</span>
                </div>
                <h2 style="font-size: 1.7rem; font-weight: 800; margin: 0; color: #ffffff;">연구실적 및 학술 논문 (Publications)</h2>
                <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 0.95rem;">근거 중심 스포츠의학(EBM) 기반 4개 핵심 파트별 연구 성과를 확인하실 수 있습니다.</p>
            </div>
            
            <div class="research-modal-body" style="background: #f8fafc;">
                <div class="research-tabs-container" style="display: flex; background: #ffffff; border-bottom: 1px solid #e2e8f0; overflow-x: auto; padding: 0 20px;">
                    <button class="rtab-btn active" id="rtab-btn-1" onclick="switchResearchTab(1)" style="padding: 16px 20px; font-weight: 700; font-size: 0.95rem; border: none; background: transparent; cursor: pointer; border-bottom: 3px solid #A50034; color: #A50034;">Part 1. 스포츠재활</button>
                    <button class="rtab-btn" id="rtab-btn-2" onclick="switchResearchTab(2)" style="padding: 16px 20px; font-weight: 600; font-size: 0.95rem; border: none; background: transparent; cursor: pointer; border-bottom: 3px solid transparent; color: #64748b;">Part 2. 운동유발 피로·신경근</button>
                    <button class="rtab-btn" id="rtab-btn-3" onclick="switchResearchTab(3)" style="padding: 16px 20px; font-weight: 600; font-size: 0.95rem; border: none; background: transparent; cursor: pointer; border-bottom: 3px solid transparent; color: #64748b;">Part 3. 경기력 향상·생체역학</button>
                    <button class="rtab-btn" id="rtab-btn-4" onclick="switchResearchTab(4)" style="padding: 16px 20px; font-weight: 600; font-size: 0.95rem; border: none; background: transparent; cursor: pointer; border-bottom: 3px solid transparent; color: #64748b;">Part 4. 부상 조사 분석(ISS)</button>
                </div>
                
                <div class="rtab-content-area" style="padding: 25px 30px; max-height: 55vh; overflow-y: auto;">
                    <!-- Part 1: Sports Rehabilitation -->
                    <div id="rtab-pane-1" class="rtab-pane active" style="display: block;">
                        <ul class="paper-list" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px;">
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #A50034; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Bilateral femoral cartilage morphology in athletes with unilateral patellofemoral pain: associations with pain severity and self-reported function</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Lee JW, Kim JY, et al. (2026)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #A50034; background: rgba(165,0,52,0.08); padding: 3px 10px; border-radius: 6px;">Journal of Science and Medicine in Sport (SCIE)</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #A50034; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Medial meniscus extrusion after 30-min running in individuals who underwent meniscus surgery or anterior cruciate ligament reconstruction and healthy controls</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Oh SM, Lee JW, et al. (2026)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #A50034; background: rgba(165,0,52,0.08); padding: 3px 10px; border-radius: 6px;">Knee Surgery, Sports Traumatology, Arthroscopy (SCIE)</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #A50034; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Lower extremity muscle activation patterns during running in individuals with and without anterior cruciate ligament reconstruction</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Lim JH, et al. (2026)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #A50034; background: rgba(165,0,52,0.08); padding: 3px 10px; border-radius: 6px;">Gait & Posture (SCIE)</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #A50034; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Effects of foot orthoses on lower extremity biomechanics and pain in individuals with patellofemoral pain: a randomized controlled trial</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, et al. (2024)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #A50034; background: rgba(165,0,52,0.08); padding: 3px 10px; border-radius: 6px;">American Journal of Sports Medicine (SCIE)</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Part 2: Neuromuscular & Fatigue -->
                    <div id="rtab-pane-2" class="rtab-pane" style="display: none;">
                        <ul class="paper-list" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px;">
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #1E293B; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Sex-specific associations of body mass index with quadriceps neuromuscular function and self-reported function in individuals with and without patellofemoral pain</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Oh SM, et al. (2025)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #1E293B; background: rgba(30,41,59,0.08); padding: 3px 10px; border-radius: 6px;">Journal of Athletic Training (SCIE)</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #1E293B; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Effects of whole-body vibration on quadriceps neuromuscular function in individuals with knee osteoarthritis: a systematic review and meta-analysis</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Lee JW, et al. (2025)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #1E293B; background: rgba(30,41,59,0.08); padding: 3px 10px; border-radius: 6px;">Clinical Biomechanics (SCIE)</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #1E293B; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Neuromuscular alterations during landing in athletes with chronic ankle instability: a cross-sectional study</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Oh SM, Park JH, et al. (2024)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #1E293B; background: rgba(30,41,59,0.08); padding: 3px 10px; border-radius: 6px;">Journal of Sports Sciences (SCIE)</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Part 3: Performance & Biomechanics -->
                    <div id="rtab-pane-3" class="rtab-pane" style="display: none;">
                        <ul class="paper-list" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px;">
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #D97706; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Anticipatory effect on lower extremity muscle recruitment and activation patterns during single leg drop tasks</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Lee JW, et al. (2026)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #D97706; background: rgba(217,119,6,0.08); padding: 3px 10px; border-radius: 6px;">Journal of Electromyography and Kinesiology (SCIE)</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #D97706; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Kinematic and kinetic adaptations in collegiate martial arts athletes during high-impact landing</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Lee JW, Choi HG, Park JH, et al. (2025)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #D97706; background: rgba(217,119,6,0.08); padding: 3px 10px; border-radius: 6px;">Sports Biomechanics (SCIE)</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #D97706; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Electromyographic analysis of trunk and lower extremity musculature during sport-specific agility drills</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Kim JY, Park JH, et al. (2024)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #D97706; background: rgba(217,119,6,0.08); padding: 3px 10px; border-radius: 6px;">Journal of Human Kinetics (SCIE)</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Part 4: Injury Surveillance System (ISS) -->
                    <div id="rtab-pane-4" class="rtab-pane" style="display: none;">
                        <ul class="paper-list" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px;">
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #0284C7; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Epidemiological analysis of sports injuries in collegiate varsity athletes: A 3-year injury surveillance study</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Lee JW, Kim JY, et al. (2025)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #0284C7; background: rgba(2,132,199,0.08); padding: 3px 10px; border-radius: 6px;">Korean Journal of Sports Medicine</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #0284C7; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Acute-to-chronic workload ratio and non-contact musculoskeletal injuries in collegiate football and basketball players</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Oh SM, et al. (2024)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #0284C7; background: rgba(2,132,199,0.08); padding: 3px 10px; border-radius: 6px;">Journal of Athletic Training (SCIE)</span>
                            </li>
                            <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4px solid #0284C7; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">Pre-season neuromuscular screening and lower extremity injury incidence in elite collegiate athletes</h4>
                                <div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 6px;">Park JH, Lim JH, et al. (2024)</div>
                                <span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: #0284C7; background: rgba(2,132,199,0.08); padding: 3px 10px; border-radius: 6px;">International Journal of Sports Physical Therapy (SCIE)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

// 2. Insert verifiedResearchModalHTML before alumni-modal
if (!html.includes('id="research-modal"')) {
    const targetTag = '<!-- Alumni Career Modal -->';
    if (html.includes(targetTag)) {
        html = html.replace(targetTag, verifiedResearchModalHTML + '\n    ' + targetTag);
        console.log('Successfully injected verified research-modal HTML');
    }
}

// 3. Add onclick="openResearchModal()" to the Core Pillars Research Card and Stat Card
html = html.replace(
    '<div class="bento-card bento-card-res">',
    '<div class="bento-card bento-card-res" onclick="openResearchModal()" style="cursor: pointer;">'
);

html = html.replace(
    '<div class="stat-card clickable-stat-card" id="btn-research-modal">',
    '<div class="stat-card clickable-stat-card" id="btn-research-modal" onclick="openResearchModal()" style="cursor: pointer;">'
);

// 4. Inject global JavaScript handlers for Research Modal
const researchModalJS = `
        // Research Publications Modal Handlers
        window.openResearchModal = function() {
            const rModal = document.getElementById('research-modal');
            if (rModal) {
                rModal.style.display = 'flex';
                setTimeout(() => { rModal.classList.add('show'); }, 10);
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeResearchModal = function() {
            const rModal = document.getElementById('research-modal');
            if (rModal) {
                rModal.classList.remove('show');
                setTimeout(() => { rModal.style.display = 'none'; }, 250);
                document.body.style.overflow = '';
            }
        };

        window.switchResearchTab = function(partNum) {
            for (let i = 1; i <= 4; i++) {
                const btn = document.getElementById('rtab-btn-' + i);
                const pane = document.getElementById('rtab-pane-' + i);
                if (btn) {
                    btn.classList.remove('active');
                    btn.style.borderBottomColor = 'transparent';
                    btn.style.color = '#64748b';
                    btn.style.fontWeight = '600';
                }
                if (pane) {
                    pane.style.display = 'none';
                    pane.classList.remove('active');
                }
            }
            const activeBtn = document.getElementById('rtab-btn-' + partNum);
            const activePane = document.getElementById('rtab-pane-' + partNum);
            if (activeBtn) {
                activeBtn.classList.add('active');
                activeBtn.style.borderBottomColor = '#A50034';
                activeBtn.style.color = '#A50034';
                activeBtn.style.fontWeight = '700';
            }
            if (activePane) {
                activePane.style.display = 'block';
                activePane.classList.add('active');
            }
        };
`;

if (!html.includes('window.openResearchModal = function')) {
    html = html.replace('// Attach DOM event listeners', researchModalJS + '\n        // Attach DOM event listeners');
    console.log('Successfully injected research modal JS functions');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
