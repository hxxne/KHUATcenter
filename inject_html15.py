import re

# 1. Update style.css
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Replace crimson with #ddd for tier-3 lines
css_content = css_content.replace(
    'background: var(--color-khu-crimson);',
    'background: #ddd;'
)
with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)


# 2. Update index.html
html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Carefully remove the 보조 AT block
pattern_to_remove = r'\s*<div class="org-line vertical-line"></div>\s*<div class="org-group" style="width: 100%;">\s*<h4 class="org-group-title">보조 AT</h4>\s*<div class="empty-group-msg">추후 업데이트 예정입니다.</div>\s*</div>'

html_content = re.sub(pattern_to_remove, '', html_content)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print("CSS colors fixed and Assistant AT removed!")
