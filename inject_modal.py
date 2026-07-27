import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# 1. Add CSS for Modal
modal_css = """
/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.show {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: #ffffff;
    width: 90%;
    max-width: 400px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    padding: 30px;
    position: relative;
    transform: translateY(30px) scale(0.95);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
}

.modal-overlay.show .modal-content {
    transform: translateY(0) scale(1);
}

.modal-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    color: #94a3b8;
    cursor: pointer;
    transition: color 0.2s;
}

.modal-close-btn:hover {
    color: var(--color-khu-crimson);
}

.modal-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f1f5f9;
}

.modal-sport-icon {
    width: 50px;
    height: 50px;
    background: var(--color-khu-crimson);
    color: white;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
}

.modal-sport-icon svg.custom-icon {
    width: 30px;
    height: 30px;
}

.modal-sport-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-khu-blue);
    margin: 0;
}

.modal-section-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.modal-main-at {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #f8fafc;
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 20px;
}

.modal-at-photo {
    width: 60px;
    height: 60px;
    background: #e2e8f0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #94a3b8;
    font-size: 24px;
    overflow: hidden;
}

.modal-at-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal-at-info {
    display: flex;
    flex-direction: column;
}

.modal-at-role {
    font-size: 0.85rem;
    color: var(--color-khu-crimson);
    font-weight: 600;
    margin-bottom: 2px;
}

.modal-at-name {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text-main);
}

.modal-assistants {
    background: #f8fafc;
    padding: 15px;
    border-radius: 12px;
}

.modal-assistants-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.modal-assistants-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    color: var(--color-text-main);
    font-weight: 500;
}

.modal-assistants-list li::before {
    content: '•';
    color: var(--color-khu-blue);
    font-weight: bold;
}

.modal-assistants-list li.empty-msg {
    color: #94a3b8;
    font-weight: 400;
}
.modal-assistants-list li.empty-msg::before {
    display: none;
}

/* Make staff cards clickable */
.staff-card {
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}
.staff-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
"""

if "/* Modal Styles */" not in css_content:
    css_content += "\n" + modal_css

# 2. Add HTML and JS to index.html
modal_html_and_js = """
    <!-- Department Modal -->
    <div id="department-modal" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close-btn" id="modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
            
            <div class="modal-header">
                <div class="modal-sport-icon" id="modal-sport-icon">
                    <i class="fa-solid fa-futbol"></i>
                </div>
                <h3 class="modal-sport-title" id="modal-sport-title">축구부</h3>
            </div>
            
            <h4 class="modal-section-title">전담 AT</h4>
            <div class="modal-main-at">
                <div class="modal-at-photo" id="modal-at-photo">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="modal-at-info">
                    <span class="modal-at-role" id="modal-at-role-text">전담 AT</span>
                    <span class="modal-at-name" id="modal-main-at-name">홍길동</span>
                </div>
            </div>
            
            <h4 class="modal-section-title">보조 AT 명단</h4>
            <div class="modal-assistants">
                <ul class="modal-assistants-list" id="modal-assistants-list">
                    <!-- Javascript will populate this -->
                </ul>
            </div>
        </div>
    </div>

    <!-- Modal Logic -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('department-modal');
            const closeBtn = document.getElementById('modal-close-btn');
            
            // Placeholder data for Assistant ATs. 
            // Update this dictionary when actual names are provided.
            const assistantData = {
                "축구": [],
                "농구": [],
                "야구": [],
                "럭비": [],
                "배구": [],
                "시범단": [],
                "겨루기": [],
                "품새": [],
                "아이스하키": [],
                "배드민턴": [],
                "핸드볼": [],
                "재활강사": []
            };

            // Attach click event to all staff cards
            document.querySelectorAll('.staff-card').forEach(card => {
                card.addEventListener('click', () => {
                    const sportBadgeEl = card.querySelector('.sport-badge');
                    const nameEl = card.querySelector('.staff-name');
                    
                    if (!sportBadgeEl || !nameEl) return;
                    
                    const sportBadge = sportBadgeEl.textContent.trim();
                    const staffName = nameEl.textContent.trim();
                    const iconHtml = card.querySelector('.staff-avatar-icon').innerHTML;
                    
                    // Determine logic based on whether it's a specific sport or center director etc.
                    // Usually sport-badge has the sport name (e.g. "축구", "시범단")
                    // If sport-badge is "경희대학교", it's the center director, skip modal.
                    if (sportBadge === "경희대학교") return;
                    
                    // Populate Modal
                    document.getElementById('modal-sport-icon').innerHTML = iconHtml;
                    
                    // Set titles
                    if (sportBadge === "재활강사") {
                        document.getElementById('modal-sport-title').textContent = staffName;
                        document.getElementById('modal-at-role-text').textContent = "스포츠재활강사";
                        document.getElementById('modal-main-at-name').textContent = staffName;
                    } else if (["운영기획", "구기종목", "투기/시범", "라켓/스틱"].includes(sportBadge)) {
                        document.getElementById('modal-sport-title').textContent = sportBadge + " 파트장";
                        document.getElementById('modal-at-role-text').textContent = "파트장";
                        document.getElementById('modal-main-at-name').textContent = staffName;
                    } else {
                        document.getElementById('modal-sport-title').textContent = sportBadge + (sportBadge.endsWith("단") || sportBadge.endsWith("팀") ? "" : "부");
                        document.getElementById('modal-at-role-text').textContent = "전담 AT";
                        document.getElementById('modal-main-at-name').textContent = staffName;
                    }
                    
                    // Set default user icon (can be replaced with img tags later)
                    document.getElementById('modal-at-photo').innerHTML = '<i class="fa-solid fa-user"></i>';

                    // Populate Assistants
                    const listEl = document.getElementById('modal-assistants-list');
                    listEl.innerHTML = '';
                    
                    // Use sportBadge to look up assistants
                    const assistants = assistantData[sportBadge] || [];
                    
                    if (assistants.length === 0) {
                        const li = document.createElement('li');
                        li.className = "empty-msg";
                        li.textContent = "현재 등록된 보조 AT 명단이 없습니다. (업데이트 예정)";
                        listEl.appendChild(li);
                    } else {
                        assistants.forEach(name => {
                            const li = document.createElement('li');
                            li.textContent = name;
                            listEl.appendChild(li);
                        });
                    }
                    
                    // Show modal
                    modal.classList.add('show');
                });
            });
            
            // Close modal events
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
            
            // Escape key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    modal.classList.remove('show');
                }
            });
        });
    </script>
"""

if "<!-- Department Modal -->" not in html_content:
    html_content = html_content.replace('</body>', modal_html_and_js + '\n</body>')

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Modal feature injected!")
