import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add IDs to the section titles
content = content.replace(
    '<h4 class="modal-section-title">전담 AT</h4>',
    '<h4 class="modal-section-title" id="modal-title-main">전담 AT</h4>'
)
content = content.replace(
    '<h4 class="modal-section-title">보조 AT 명단</h4>',
    '<h4 class="modal-section-title" id="modal-title-sub">보조 AT 명단</h4>'
)

# 2. Update JS logic
# Find the JS script block and replace it.
# First, extract the old script.
js_start = content.find('<!-- Modal Logic -->')
if js_start != -1:
    old_script = content[js_start:]
    
    new_script = """<!-- Modal Logic -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('department-modal');
            const closeBtn = document.getElementById('modal-close-btn');
            
            // Placeholder data for Assistant ATs or Certifications. 
            // Update this dictionary when actual data is provided.
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
                "재활강사": [] // This will store certifications for rehab instructors
            };

            // Certifications dictionary for specific Rehab Instructors (can add names here later)
            const certificationsData = {
                // "홍길동": ["물리치료사 면허증", "건강운동관리사"]
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
                    
                    if (sportBadge === "경희대학교") return; // Center director
                    
                    // Populate Modal Icon
                    document.getElementById('modal-sport-icon').innerHTML = iconHtml;
                    
                    // Element references
                    const titleMain = document.getElementById('modal-title-main');
                    const titleSub = document.getElementById('modal-title-sub');
                    
                    // Reset to defaults
                    titleMain.textContent = "전담 AT";
                    titleSub.textContent = "보조 AT 명단";
                    
                    let dataList = [];
                    let emptyMessage = "현재 등록된 보조 AT 명단이 없습니다. (업데이트 예정)";

                    // Set titles and load specific data
                    if (sportBadge === "재활강사") {
                        document.getElementById('modal-sport-title').textContent = staffName;
                        titleMain.textContent = "스포츠재활강사";
                        document.getElementById('modal-at-role-text').textContent = "스포츠재활강사";
                        document.getElementById('modal-main-at-name').textContent = staffName;
                        
                        titleSub.textContent = "자격증";
                        dataList = certificationsData[staffName] || [];
                        emptyMessage = "현재 등록된 자격증 정보가 없습니다. (업데이트 예정)";
                        
                    } else if (["운영기획", "구기종목", "투기/시범", "라켓/스틱"].includes(sportBadge)) {
                        document.getElementById('modal-sport-title').textContent = sportBadge + " 파트장";
                        document.getElementById('modal-at-role-text').textContent = "파트장";
                        document.getElementById('modal-main-at-name').textContent = staffName;
                        dataList = assistantData[sportBadge] || [];
                    } else {
                        document.getElementById('modal-sport-title').textContent = sportBadge + (sportBadge.endsWith("단") || sportBadge.endsWith("팀") ? "" : "부");
                        document.getElementById('modal-at-role-text').textContent = "전담 AT";
                        document.getElementById('modal-main-at-name').textContent = staffName;
                        dataList = assistantData[sportBadge] || [];
                    }
                    
                    // Set default user icon
                    document.getElementById('modal-at-photo').innerHTML = '<i class="fa-solid fa-user"></i>';

                    // Populate Assistants/Certifications List
                    const listEl = document.getElementById('modal-assistants-list');
                    listEl.innerHTML = '';
                    
                    if (dataList.length === 0) {
                        const li = document.createElement('li');
                        li.className = "empty-msg";
                        li.textContent = emptyMessage;
                        listEl.appendChild(li);
                    } else {
                        dataList.forEach(item => {
                            const li = document.createElement('li');
                            li.textContent = item;
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
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    modal.classList.remove('show');
                }
            });
        });
    </script>
"""
    content = content[:js_start] + new_script + '\n</body>\n</html>'
    
    # Strip any extra trailing stuff if there was any body closing tag duplication
    content = content.replace('</body>\n</html>\n</body>\n</html>', '</body>\n</html>')
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Modal Logic Fixed for Rehab!")
