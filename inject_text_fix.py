import os

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the texts
content = content.replace('titleSub.textContent = "자격증";', 'titleSub.textContent = "자격사항 및 경력";')
content = content.replace('emptyMessage = "현재 등록된 자격증 정보가 없습니다. (업데이트 예정)";', 'emptyMessage = "현재 등록된 자격사항 및 경력 정보가 없습니다. (업데이트 예정)";')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Text updated to '자격사항 및 경력'")
