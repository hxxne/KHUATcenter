import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the HTML card avatar for Kim Jun-young
pattern = r'<div class="member-avatar placeholder-avatar"></div>\s*(<div class="member-info">\s*<h4 class="member-name">김준영</h4>)'
replacement = r'<div class="member-avatar" style="background-image: url(\'assets/kimjunyoung.png\'); background-position: center; background-size: cover;"></div>\n                            \1'
html = re.sub(pattern, replacement, html)

# Replace the photo in professorsData
html = html.replace(
    '"김준영": {\n                    role: "실장 / 체육부",\n                    photo: "",',
    '"김준영": {\n                    role: "실장 / 체육부",\n                    photo: "assets/kimjunyoung.png",'
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Kim Jun-young photo updated successfully.")
