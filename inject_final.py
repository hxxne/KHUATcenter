import base64
import requests
import re
import os

# Base64 encode the image
img_path = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/rehab-icon.png'
with open(img_path, 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')
b64_url = f"data:image/png;base64,{b64}"

rehab_html = f'<div class="mask-icon" style="-webkit-mask-image: url(\'{b64_url}\'); mask-image: url(\'{b64_url}\');"></div>'

# Fetch acrobatic SVG for Tumbling
res = requests.get('https://api.iconify.design/game-icons/acrobatic.svg')
if res.status_code == 200:
    acrobatic_svg = res.text.replace('<svg ', '<svg class="custom-icon" ')
else:
    acrobatic_svg = '<i class="fa-solid fa-person-falling"></i>'

# Gyeorugi -> Fist
gyeorugi_html = '<i class="fa-solid fa-hand-fist" style="font-size: 20px;"></i>'

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Tumbling
content = re.sub(r'(<div class="staff-name">문채연</div><div class="sport-badge">시범단</div></div></div>.*?staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">문채연)', r'\1' + acrobatic_svg + r'\2', content, flags=re.DOTALL)

# Replace Gyeorugi (Sparring) - 유지민
content = re.sub(r'(<div class="staff-name">유지민</div><div class="sport-badge">겨루기</div></div></div>.*?staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">유지민)', r'\1' + gyeorugi_html + r'\2', content, flags=re.DOTALL)

# Replace Gyeorugi (Sparring) - 한혜서
content = re.sub(r'(<div class="staff-name">한혜서</div><div class="sport-badge">겨루기</div></div></div>.*?staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">한혜서)', r'\1' + gyeorugi_html + r'\2', content, flags=re.DOTALL)

# Rotate Badminton racket
content = content.replace('<svg class="custom-icon" viewBox="0 0 48 48">', '<svg class="custom-icon" viewBox="0 0 48 48" style="transform: rotate(45deg);">')

# Inject Base64 Rehab icons
# Find all rehab instructor cards
rehab_staff = ["기윤서", "문수연", "문채연", "안은지", "우지윤", "유승아", "유영민", "윤서연", "이예인", "이채원", "조연지", "조현준", "진승희", "천지훈", "최민혁"]
for name in rehab_staff:
    content = re.sub(r'(staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">' + name + r'</div><div class="sport-badge">재활강사</div>)', r'\1' + rehab_html + r'\2', content, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML modified successfully.")
