import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the HTML card avatar for Choi Hyun-gon
pattern = r'<div class="member-avatar placeholder-avatar"></div>\s*(<div class="member-info">\s*<h4 class="member-name">최현곤</h4>)'
replacement = r'<div class="member-avatar" style="background-image: url(\'assets/choihyungon.png\'); background-position: center; background-size: cover;"></div>\n                            \1'
html = re.sub(pattern, replacement, html)

# Add Choi Hyun-gon to professorsData
choi_data = """
                "최현곤": {
                    role: "팀장 / 체육시설운영단",
                    photo: "assets/choihyungon.png",
                    degree: "체육학석사(Sports Medicine and Science 전공)",
                    edu: "Kyung Hee University",
                    subject: "체육시설운영단",
                    lab: "경희대학교 선승관 B1 102호 AT center",
                    email: "gusrhs24@khu.ac.kr",
                    career: [
                        "현) 경희대학교 스포츠재활팀 팀장",
                        "전) 경희대학교 태권도 시범단/격파부 전담 AT"
                    ],
                    research: []
                }
"""

# Inject before assistantData
html = re.sub(
    r'(research:\s*\[.*?\]\s*\n\s*\}\s*)\n\s*};\s*\n\s*const assistantData',
    r'\1,' + choi_data + r'            };\n            \nconst assistantData',
    html,
    flags=re.DOTALL
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Choi Hyun-gon profile added successfully.")
