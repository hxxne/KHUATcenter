import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Add Oh Sung-min
oh_data = """
                "오성민": {
                    role: "담당교수",
                    photo: "",
                    degree: "스포츠심리학-운동제어 박사(Motor Control 전공)",
                    edu: "성균관대학교",
                    subject: "운동손상평가",
                    lab: "선승관 AT center",
                    email: "sungminoh@khu.ac.kr",
                    career: [],
                    research: []
                }
"""

html = re.sub(
    r'(research:\s*\[.*?\]\s*\n\s*\}\s*)\n\s*};\s*\n\s*const assistantData',
    r'\1,' + oh_data + r'            };\n            \nconst assistantData',
    html,
    flags=re.DOTALL
)

# Update Career logic globally
old_career_js = r"const careerList = document\.getElementById\('prof-modal-career'\);\s*careerList\.innerHTML = '';\s*pData\.career\.forEach\(item => \{\s*const li = document\.createElement\('li'\);\s*li\.textContent = item;\s*careerList\.appendChild\(li\);\s*\}\);"

new_career_js = """const careerList = document.getElementById('prof-modal-career');
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
                            }"""

html = re.sub(old_career_js, new_career_js, html)

# Update Research logic globally for remaining old ones
old_research_js = r"const researchList = document\.getElementById\('prof-modal-research'\);\s*researchList\.innerHTML = '';\s*pData\.research\.forEach\(item => \{\s*const li = document\.createElement\('li'\);\s*li\.textContent = item;\s*researchList\.appendChild\(li\);\s*\}\);"

new_research_js = """const researchList = document.getElementById('prof-modal-research');
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
                            }"""

html = re.sub(old_research_js, new_research_js, html)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Oh Sung-min data and robust hide logic updated in index.html")
