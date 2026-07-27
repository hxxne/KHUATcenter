import re

def update_icon(content, name, badge, new_icon_html):
    # Use exact string match to avoid regex greedy bugs
    suffix = f'</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">{badge}</div></div></div>'
    parts = content.split(suffix)
    if len(parts) > 1:
        for i in range(len(parts)-1):
            prefix_idx = parts[i].rfind('<div class="staff-avatar-icon">')
            if prefix_idx != -1:
                parts[i] = parts[i][:prefix_idx] + f'<div class="staff-avatar-icon">{new_icon_html}'
        return suffix.join(parts)
    else:
        print(f"Failed to match: {name} / {badge}")
    return content

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove tier-2-line and tier-2-branches (Org chart lines fix)
content = content.replace(
    '<div class="org-line horizontal-line tier-2-line"></div>\n                <div class="org-line vertical-branches tier-2-branches"></div>',
    ''
)
content = re.sub(
    r'\s*<div class="org-line horizontal-line tier-2-line"></div>\s*<div class="org-line vertical-branches tier-2-branches"></div>',
    '',
    content
)

# 2. Update icons safely
martial_arts_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="m19.8 2l-8.2 6.7l-1.21-1.04L14 5.58L9.41 1L8 2.41l2.74 2.74L5 8.46l-1.19 4.29L6.27 17L8 16l-2.03-3.5l.35-1.32L9.5 13l.5 9h2l.5-10L21 3.4zM5 3a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2"/></svg>'
board_break_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M2,10 L11,9 L12,14 L10,16 L2,14 Z M22,8 L13,7 L12,12 L14,14 L22,12 Z"/></svg>'
dumbbell_svg = '<i class="fa-solid fa-dumbbell"></i>'

content = update_icon(content, '유지민', '겨루기', martial_arts_svg)
content = update_icon(content, '한혜서', '겨루기', martial_arts_svg)
content = update_icon(content, '문채연', '시범단', board_break_svg)

rehab_staff = ["기윤서", "문수연", "문채연", "안은지", "우지윤", "유승아", "유영민", "윤서연", "이예인", "이채원", "조연지", "조현준", "진승희", "천지훈", "최민혁"]
for name in rehab_staff:
    content = update_icon(content, name, '재활강사', dumbbell_svg)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

# 3. Fix CSS tier-3-line width
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

if 'width: 1040px;' in css_content:
    css_content = re.sub(
        r'\.tier-3-line\s*{\s*width:\s*1040px;',
        r'.tier-3-line {\n    width: 720px;',
        css_content
    )
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(css_content)

print("Safely updated HTML and CSS!")
