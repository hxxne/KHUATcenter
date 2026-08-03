import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add Kim Jun-young data to professorsData
kim_data = """
                "김준영": {
                    role: "실장 / 체육부",
                    photo: "",
                    degree: "체육학 석사",
                    edu: "경희대학교",
                    subject: "재활운동실습, 스포츠테이핑실습",
                    lab: "AT센터 (031-201-2787)",
                    email: "junyoung0366@khu.ac.kr",
                    career: [
                        "현) 경희대학교 AT 센터 실장",
                        "현) 경희대학교 체육대학 강사",
                        "전) Athletic Trainer, The university of Kyung Hee Basketball",
                        "전) BNK 썸 여자프로농구단 트레이너",
                        "전) 평창군보건의료원 운동처방사",
                        "전) 경희대학교 시설운영공단 트레이너"
                    ],
                    research: []
                }
"""
# Replace the end of professorsData
html = re.sub(
    r'(research:\s*\[.*?\]\s*\n\s*\}\s*)\n\s*};\s*\n\s*const assistantData',
    r'\1,' + kim_data + r'            };\n            \nconst assistantData',
    html,
    flags=re.DOTALL
)

# 2. Modify the JS to hide research section if empty
old_js = """                            const researchList = document.getElementById('prof-modal-research');
                            researchList.innerHTML = '';
                            pData.research.forEach(item => {
                                const li = document.createElement('li');
                                li.textContent = item;
                                researchList.appendChild(li);
                            });"""

new_js = """                            const researchList = document.getElementById('prof-modal-research');
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

html = html.replace(old_js, new_js)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Kim Jun-young data and logic updated in index.html")
