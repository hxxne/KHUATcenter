import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'

# 1. Update style.css to add --color-khu-blue
with open(css_file, 'r', encoding='utf-8') as f:
    css = f.read()

if "--color-khu-blue" not in css:
    # Insert it right after --color-khu-crimson
    css = css.replace('--color-khu-crimson: #A50034;', '--color-khu-crimson: #A50034;\n    --color-khu-blue: #00305E; /* Kyung Hee Dark Blue */')
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(css)

# 2. Update index.html
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Add photo to professorsData
old_data = """role: "센터장 / 교수","""
new_data = """role: "센터장 / 교수",
                    photo: "http://sports.khu.ac.kr/data/member_tmp/thumb-1563944723_111x138.jpg","""
html = html.replace(old_data, new_data)

# Add logic to inject photo
old_logic = """document.getElementById('prof-modal-name').textContent = staffName;
                        document.getElementById('prof-modal-role').textContent = pData.role;"""

new_logic = """document.getElementById('prof-modal-name').textContent = staffName;
                        document.getElementById('prof-modal-role').textContent = pData.role;
                        
                        const photoEl = document.getElementById('prof-modal-photo');
                        if (pData.photo) {
                            photoEl.innerHTML = `<img src="${pData.photo}" alt="${staffName}">`;
                        } else {
                            photoEl.innerHTML = '<i class="fa-solid fa-user-tie"></i>';
                        }
"""
html = html.replace(old_logic, new_logic)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("UI Fixed!")
