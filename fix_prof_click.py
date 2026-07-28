import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add click listener for .member-card
member_card_listener = """
            // Attach click event to member cards (Directors / Professors)
            document.querySelectorAll('.member-card').forEach(card => {
                card.addEventListener('click', () => {
                    const nameEl = card.querySelector('.member-name');
                    if (!nameEl) return;
                    
                    const staffName = nameEl.textContent.trim();
                    const profModal = document.getElementById('prof-modal');
                    
                    // professorsData is defined globally above
                    const pData = typeof professorsData !== 'undefined' ? professorsData[staffName] : null;
                    
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
                        
                        profModal.classList.add('show');
                    }
                });
            });
"""

# Insert it right before the staff-card listener
if "document.querySelectorAll('.member-card').forEach(card => {" not in html:
    html = html.replace("document.querySelectorAll('.staff-card').forEach(card => {", member_card_listener + "\n            document.querySelectorAll('.staff-card').forEach(card => {")

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Add hover effect to .member-card in CSS
with open(css_file, 'r', encoding='utf-8') as f:
    css = f.read()

# I will just append this to the end of style.css, it will override any previous transform on member-card
css_append = """
.member-card {
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}
.member-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
"""

if "cursor: pointer;" not in css.split('.member-card {')[-1]:
    css += css_append
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(css)

print("Fix Applied!")
