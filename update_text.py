import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update degree for Kim Jun-young and Choi Hyun-gon
for prof in ["김준영", "최현곤"]:
    pattern = rf'("{prof}":\s*\{{[^}}]*?degree:\s*")[^"]*(")'
    replacement = rf'\g<1>체육학 석사 (Sports Medicine and Science 전공)\g<2>'
    html = re.sub(pattern, replacement, html)

# 2. Update edu for Oh Sung-min to English
pattern = r'("오성민":\s*\{[^}]*?edu:\s*")[^"]*(")'
replacement = r'\g<1>Sungkyunkwan University\g<2>'
html = re.sub(pattern, replacement, html)

# 3. Add ID to the label
html = html.replace('<div class="prof-info-label">담당과목</div>', '<div class="prof-info-label" id="prof-modal-subject-label">담당과목</div>')

# 4. Inject JavaScript to change label dynamically
# There are two places where prof-modal-subject is updated: 1040 and 1097
# We'll just replace both instances of `document.getElementById('prof-modal-subject').textContent = pData.subject;`
# with itself + the label change
old_js = "document.getElementById('prof-modal-subject').textContent = pData.subject;"
new_js = """document.getElementById('prof-modal-subject').textContent = pData.subject;
                        const subjectLabel = document.getElementById('prof-modal-subject-label');
                        if (subjectLabel) subjectLabel.textContent = staffName === "최현곤" ? "담당부서" : "담당과목";"""
html = html.replace(old_js, new_js)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Text updates applied successfully.")
