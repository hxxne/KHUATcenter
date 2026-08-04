import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update professorsData
pattern1 = r'("오성민":\s*\{[^}]*?photo:\s*")([^"]*)(")'
replacement1 = r'\g<1>assets/ohsungmin.png\g<3>'
html = re.sub(pattern1, replacement1, html)

# 2. Update HTML org chart
# Find the block for 오성민
# <div class="member-card">\s*<div class="member-avatar placeholder-avatar"></div>\s*<div class="member-info">\s*<h4 class="member-name">오성민</h4>
pattern2 = r'(<div class="member-avatar placeholder-avatar"></div>)(\s*<div class="member-info">\s*<h4 class="member-name">오성민</h4>)'
replacement2 = r"""<div class="member-avatar" style="background-image: url('assets/ohsungmin.png'); background-position: center; background-size: cover;"></div>\g<2>"""
html = re.sub(pattern2, replacement2, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
    print("Oh Sung-min photo updated.")
