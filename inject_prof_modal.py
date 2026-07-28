import re
import os

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# --- CSS INJECTION ---
prof_css = """
/* Professor Modal Styles */
.prof-modal-content {
    background: #ffffff;
    width: 90%;
    max-width: 600px;
    max-height: 85vh;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    padding: 0;
    position: relative;
    transform: translateY(30px) scale(0.95);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.modal-overlay.show .prof-modal-content {
    transform: translateY(0) scale(1);
}

.prof-modal-header-bg {
    background: var(--color-khu-blue);
    padding: 30px 30px 20px;
    color: white;
    position: relative;
}

.prof-modal-close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    transition: color 0.2s;
}

.prof-modal-close-btn:hover {
    color: white;
}

.prof-modal-profile {
    display: flex;
    align-items: center;
    gap: 20px;
}

.prof-modal-photo {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-khu-blue);
    font-size: 32px;
    overflow: hidden;
    border: 3px solid rgba(255,255,255,0.3);
}

.prof-modal-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.prof-modal-name {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
}
.prof-modal-role {
    font-size: 0.9rem;
    font-weight: 400;
    opacity: 0.9;
    margin-top: 5px;
}

.prof-modal-body {
    padding: 25px 30px;
    overflow-y: auto;
    background: #f8fafc;
    flex: 1;
}

.prof-info-grid {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 10px 15px;
    margin-bottom: 25px;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}

.prof-info-label {
    font-size: 0.9rem;
    font-weight: 700;
    color: #475569;
}

.prof-info-value {
    font-size: 0.9rem;
    color: #1e293b;
    word-break: keep-all;
}

.prof-section {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}

.prof-section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-khu-crimson);
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f5f9;
}

.prof-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.prof-list li {
    position: relative;
    padding-left: 15px;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #334155;
    line-height: 1.5;
}

.prof-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #cbd5e1;
}
"""

if "/* Professor Modal Styles */" not in css_content:
    css_content += "\n" + prof_css


# --- HTML INJECTION ---
prof_html = """
    <!-- Professor Modal -->
    <div id="prof-modal" class="modal-overlay">
        <div class="prof-modal-content">
            <div class="prof-modal-header-bg">
                <button class="prof-modal-close-btn" id="prof-modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
                <div class="prof-modal-profile">
                    <div class="prof-modal-photo" id="prof-modal-photo">
                        <i class="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                        <h3 class="prof-modal-name" id="prof-modal-name">홍길동</h3>
                        <div class="prof-modal-role" id="prof-modal-role">교수</div>
                    </div>
                </div>
            </div>
            
            <div class="prof-modal-body">
                <div class="prof-info-grid">
                    <div class="prof-info-label">학위명</div>
                    <div class="prof-info-value" id="prof-modal-degree">-</div>
                    
                    <div class="prof-info-label">최종학력</div>
                    <div class="prof-info-value" id="prof-modal-edu">-</div>
                    
                    <div class="prof-info-label">담당과목</div>
                    <div class="prof-info-value" id="prof-modal-subject">-</div>
                    
                    <div class="prof-info-label">연구실</div>
                    <div class="prof-info-value" id="prof-modal-lab">-</div>
                    
                    <div class="prof-info-label">E-mail</div>
                    <div class="prof-info-value" id="prof-modal-email">-</div>
                </div>
                
                <div class="prof-section">
                    <div class="prof-section-title">주요경력</div>
                    <ul class="prof-list" id="prof-modal-career">
                    </ul>
                </div>
                
                <div class="prof-section">
                    <div class="prof-section-title">연구실적 (최근 논문)</div>
                    <ul class="prof-list" id="prof-modal-research">
                    </ul>
                </div>
            </div>
        </div>
    </div>
"""

if "<!-- Professor Modal -->" not in html_content:
    # Insert before the last </body>
    html_content = html_content.replace('</body>', prof_html + '\n</body>')


# --- JS INJECTION ---
# I need to update the Javascript. The easiest robust way via script is to inject the professorsData 
# and modify the click handler.

# Find where the assistantData is declared:
data_insertion_point = 'const assistantData = {'
prof_data_js = """
            // Professor Data
            const professorsData = {
                "박지홍": {
                    role: "센터장 / 교수",
                    degree: "체육과학 박사(Physical Medicine & Rehabilitation 전공)",
                    edu: "Brigham Young University",
                    subject: "운동손상, 재활모달리티, 저항운동과컨디셔닝",
                    lab: "체411호 (031-201-2721)",
                    email: "jihong.park@khu.ac.kr",
                    career: [
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
                        "Sex-specific associations of body mass index with quadriceps neuromuscular function and self-reported function in individuals with and without patellofemoral pain (2025)"
                    ]
                }
            };
            
"""
if "const professorsData =" not in html_content:
    html_content = html_content.replace(data_insertion_point, prof_data_js + data_insertion_point)

# Now, intercept the click handler where it says: 
# if (sportBadge === "경희대학교") return; // Center director
# We will change it to open the prof modal!
old_logic = 'if (sportBadge === "경희대학교") return; // Center director'
new_logic = """
                    // Handle Center Director / Professor separately
                    if (sportBadge === "경희대학교") {
                        const profModal = document.getElementById('prof-modal');
                        const pData = professorsData[staffName];
                        
                        if (pData) {
                            document.getElementById('prof-modal-name').textContent = staffName;
                            document.getElementById('prof-modal-role').textContent = pData.role;
                            document.getElementById('prof-modal-degree').textContent = pData.degree;
                            document.getElementById('prof-modal-edu').textContent = pData.edu;
                            document.getElementById('prof-modal-subject').textContent = pData.subject;
                            document.getElementById('prof-modal-lab').textContent = pData.lab;
                            document.getElementById('prof-modal-email').textContent = pData.email;
                            
                            const careerList = document.getElementById('prof-modal-career');
                            careerList.innerHTML = '';
                            pData.career.forEach(item => {
                                const li = document.createElement('li');
                                li.textContent = item;
                                careerList.appendChild(li);
                            });
                            
                            const researchList = document.getElementById('prof-modal-research');
                            researchList.innerHTML = '';
                            pData.research.forEach(item => {
                                const li = document.createElement('li');
                                li.textContent = item;
                                researchList.appendChild(li);
                            });
                        } else {
                            document.getElementById('prof-modal-name').textContent = staffName;
                            document.getElementById('prof-modal-role').textContent = "상세 정보가 업데이트 되지 않았습니다.";
                        }
                        
                        profModal.classList.add('show');
                        return;
                    }
"""
html_content = html_content.replace(old_logic, new_logic)

# Finally, add event listeners to close the prof modal.
# Find: closeBtn.addEventListener('click', () => { ... });
close_events_insertion = """
            const profModal = document.getElementById('prof-modal');
            const profCloseBtn = document.getElementById('prof-modal-close-btn');
            
            profCloseBtn.addEventListener('click', () => {
                profModal.classList.remove('show');
            });
            
            profModal.addEventListener('click', (e) => {
                if (e.target === profModal) {
                    profModal.classList.remove('show');
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && profModal.classList.contains('show')) {
                    profModal.classList.remove('show');
                }
            });
"""
if "profCloseBtn.addEventListener" not in html_content:
    # Just insert it right before the end of the script tag
    html_content = html_content.replace('</script>', close_events_insertion + '\n</script>')


with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Professor Modal Injected!")
