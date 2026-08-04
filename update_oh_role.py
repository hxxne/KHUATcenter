import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Update HTML Card
html = html.replace(
    '<h4 class="member-name">오성민</h4>\n                            <p class="member-role">담당교수</p>',
    '<h4 class="member-name">오성민</h4>\n                            <p class="member-role">연구교수</p>'
)

# Update Javascript Data
html = html.replace(
    '"오성민": {\n                    role: "담당교수",',
    '"오성민": {\n                    role: "연구교수",'
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Role updated to Research Professor for Oh Sung-min")
