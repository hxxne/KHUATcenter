import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

updates = {
    "골프": '["문수연", "유승원", "최주영", "김무건"]',
    "배구": '["문민서", "장서현", "이다현", "황성윤", "박인서", "박유빈"]',
    "야구": '["송서옥", "채상우", "박서현", "홍진후"]',
    "축구": '["조현준", "김예종", "오승진", "이복음"]',
    "품새": '["홍혜원", "권준휘", "이은채", "김형우"]',
    "핸드볼": '["정준영", "남가민", "박다은", "김민지"]',
    "스포츠재활": '["이진주", "송찬", "권준홍", "박서현"]'
}

for key, value in updates.items():
    # Find '"Key": [...]' and replace with new array
    pattern = rf'"{key}":\s*\[.*?\]'
    replacement = f'"{key}": {value}'
    html = re.sub(pattern, replacement, html)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("All assistant ATs updated successfully.")
