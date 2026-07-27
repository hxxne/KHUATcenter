import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove tier-2-line and tier-2-branches
content = re.sub(
    r'<div class="org-line horizontal-line tier-2-line"></div>\s*<div class="org-line vertical-branches tier-2-branches"></div>',
    '',
    content
)

# 2. Update Rehab to just dumbbell
content = re.sub(
    r'<div class="staff-avatar-icon"><div style="display:flex; justify-content:center; align-items:center; gap:0px;">.*?</div></div>(<div class="staff-details"><div class="staff-name">[^<]+</div><div class="sport-badge">재활강사</div>)',
    r'<div class="staff-avatar-icon"><i class="fa-solid fa-dumbbell"></i></div>\1',
    content,
    flags=re.DOTALL
)

# 3. Update Gyeorugi to mdi:martial-arts (which was Tumbling's current)
martial_arts_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="m19.8 2l-8.2 6.7l-1.21-1.04L14 5.58L9.41 1L8 2.41l2.74 2.74L5 8.46l-1.19 4.29L6.27 17L8 16l-2.03-3.5l.35-1.32L9.5 13l.5 9h2l.5-10L21 3.4zM5 3a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2"/></svg>'

content = re.sub(
    r'(<div class="staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">유지민</div><div class="sport-badge">겨루기</div>)',
    r'\1' + martial_arts_svg + r'\2',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'(<div class="staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">한혜서</div><div class="sport-badge">겨루기</div>)',
    r'\1' + martial_arts_svg + r'\2',
    content,
    flags=re.DOTALL
)

# 4. Update Tumbling to Board Break (Custom SVG)
board_break_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M3,12 L10,11 L13,15 L10,18 L3,16 Z M21,8 L14,7 L11,11 L14,14 L21,12 Z M10,4 L15,1 L19,5 L14,8 Z"/></svg>'
# Wait, let's use a simpler broken board icon
board_break_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M2,10 L11,9 L12,14 L10,16 L2,14 Z M22,8 L13,7 L12,12 L14,14 L22,12 Z"/></svg>'

content = re.sub(
    r'(<div class="staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">문채연</div><div class="sport-badge">시범단</div>)',
    r'\1' + board_break_svg + r'\2',
    content,
    flags=re.DOTALL
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

# 5. Fix CSS tier-3-line width
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

css_content = re.sub(
    r'\.tier-3-line\s*{\s*width:\s*1040px;',
    r'.tier-3-line {\n    width: 720px;',
    css_content
)

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Updated HTML layout and CSS width!")
