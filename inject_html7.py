import re
import os

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update style.css org-line
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

css_content = re.sub(
    r'\.org-line\s*{\s*background-color:\s*transparent;\s*}',
    r'.org-line {\n    background-color: #ddd;\n}',
    css_content
)
with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)


# 2. SVGs to inject
tumbling_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="m19.8 2l-8.2 6.7l-1.21-1.04L14 5.58L9.41 1L8 2.41l2.74 2.74L5 8.46l-1.19 4.29L6.27 17L8 16l-2.03-3.5l.35-1.32L9.5 13l.5 9h2l.5-10L21 3.4zM5 3a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2"/></svg>'
gyeorugi_svg = '<svg class="custom-icon" viewBox="0 0 512 512"><path fill="currentColor" d="M117.842 26.268a15.3 15.3 0 0 0-4.418.76c-5.625 1.858-10.165 7.048-12.6 15.701s-2.255 20.27 1.668 32.045s10.754 21.198 17.9 26.686c7.147 5.488 13.9 6.946 19.526 5.088s10.163-7.046 12.597-15.7c2.435-8.653 2.256-20.271-1.668-32.046c-3.923-11.776-10.753-21.196-17.9-26.684c-5.36-4.116-10.498-5.966-15.105-5.85m183.933 12.373c-3.461.157-6.505 1.749-8.25 5.344L279.89 68.73l-26.733 32.309s-53.832-9.528-72.039-6.863a519 519 0 0 0-11.318 1.767c-3.614 12.656-11.809 23.592-24.192 27.682c-11.513 3.803-23.674.702-33.761-6.178c-4.565 3.511-8.787 7.581-12.557 12.33c-18.674 14.66-26.385 24.747-42.1 34.92c3.083-14.864 10.683-29.677 19.026-41.879c1.37-2.003 11.495-10.555 12.888-12.406c7.48-14.706-8.464-41.216-23.476-15.86c-1.425 1.979-7.346 18.877-8.817 21.096c-14.574 28.867-23.676 47.817-15.474 76.325c2.756 9.578 30.91-4.905 55.23-22.159c26.469 37.34 59.364 48.604 78.373 63.078c-23.266 83.384 10.267 147.263 29.276 207.721l-29.149 36.086c-8.868 10.627 48.711 13.113 52.412.75l7.71-33.84c-28.831-90.508-3.142-157.686 17.62-207.722c55.208-59.043 115.23-82.304 168.9-128.791l45.302-9.635c10.848-19.916 10.236-29.748-13.854-30.697l-44.924 17.595c-56.586 31.807-146.01 53.348-186.496 97.99c-.897-14.045-17.4-47.3-20.902-58.437c19.373 2.573 45.668 4.223 60.642-2.682c16.005-7.38 33.63-40.796 33.63-40.796l19.663-14.551c17.065-10.058-.63-27.798-12.994-27.24z"/></svg>'
poomsae_svg = '<svg class="custom-icon" viewBox="0 0 32 32"><path fill="currentColor" d="M7.08 6.459A2.93 2.93 0 0 1 9.614 5h12.77c1.035 0 2.013.54 2.538 1.462l5.81 10.051a2.03 2.03 0 0 1-.703 2.736l-.013.009l-3.728 2.142l-.003.002a2 2 0 0 1-1.786.11v4.829c0 .892-.713 1.659-1.655 1.659H9.165A1.664 1.664 0 0 1 7.5 26.34v-4.828a2 2 0 0 1-1.786-.11l-.002-.002l-3.706-2.135l-.004-.003a2.01 2.01 0 0 1-.732-2.744l.002-.003zM19.091 7L16 13.57L12.908 7h-1.934l4.059 8.625l-.235.5h1.934L21.026 7zm-1.255 9.125H22.5v-1.23l.866 1.492a.7.7 0 0 1 .081.14l1.822 3.135l.001.003l.003.002l.002.001l.003.002h.003l.003.001l.003-.002l3.698-2.125a.04.04 0 0 0 .015-.022v-.007l-.002-.008l-5.813-10.055a.91.91 0 0 0-.8-.452h-.254zm-4.042 0c.001-.143.033-.287.095-.42l.038-.08L9.868 7h-.253a.93.93 0 0 0-.804.459L3.001 17.52v.002q0 .005.003.007l.004.004l3.709 2.137h.003l.008-.004l.002-.003l.002-.002L9.5 14.863v1.262zM9.5 26h13v-8.125h-4.474l1.766 3.752a.875.875 0 1 1-1.584.746l-2.116-4.498h-.184l-2.116 4.498a.875.875 0 1 1-1.584-.746l1.766-3.752H9.5z"/></svg>'
rehab_svg = '<div style="display:flex; justify-content:center; align-items:center; gap:0px;"><svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path fill="currentColor" d="M12 5c-1.11 0-2 .89-2 2s.89 2 2 2s2-.89 2-2s-.89-2-2-2m10-4v5h-2V4H4v2H2V1h2v2h16V1zm-7 10.26V23h-2v-5h-2v5H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5h2v.5C7.5 8 9.5 10 12 10s4.5-2 4.5-4.5V5h2v.5c0 2.5-1.43 4.67-3.5 5.76"/></svg><svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><path fill="currentColor" d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4l.11-.94L5 5.5L12 2l7 3.5v5h-1V6l-2.11 1.06zm-4 6c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg></div>'

# 3. Process index.html line by line to remove "보조 AT" and replace SVGs
lines = content.split('\n')
new_lines = []
skip = False
for i, line in enumerate(lines):
    # Remove Assistant AT
    if '<h4 class="org-group-title">보조 AT</h4>' in line:
        skip = True
        # Also remove the line before it (the vertical line)
        if new_lines and '<div class="org-line vertical-line"></div>' in new_lines[-1]:
            new_lines.pop()
        continue
    
    if skip:
        if '</div>' in line and '</div>' in lines[i-1] and '추후 업데이트' in lines[i-2]:
            # This is fragile, better to just wait for the end of org-group
            skip = False
            continue
        # Check if it's the end of the org-group
        if line.strip() == '</div>' and (i > 0 and '추후 업데이트' in lines[i-1] or '</div>' in lines[i-1]):
            # actually let's use regex for Assistant AT removal instead of line-by-line
            pass
            
    new_lines.append(line)

# Let's use regex on full content for Assistant AT since it's cleaner
content = content.replace(
    '<div class="org-line vertical-line"></div>\n                        <div class="org-group" style="width: 100%;">\n                            <h4 class="org-group-title">보조 AT</h4>\n                            <div class="empty-group-msg">추후 업데이트 예정입니다.</div>\n                        </div>',
    ''
)
# Just in case of different indentation:
content = re.sub(
    r'\s*<div class="org-line vertical-line"></div>\s*<div class="org-group"[^>]*>\s*<h4 class="org-group-title">보조 AT</h4>\s*<div class="empty-group-msg">[^<]*</div>\s*</div>',
    '',
    content
)

# Replace the SVGs
# For Tumbling (문채연)
content = re.sub(
    r'(<div class="staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">문채연</div><div class="sport-badge">시범단</div>)',
    r'\1' + tumbling_svg + r'\2',
    content
)

# For Gyeorugi (유지민, 한혜서)
content = re.sub(
    r'(<div class="staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">유지민</div><div class="sport-badge">겨루기</div>)',
    r'\1' + gyeorugi_svg + r'\2',
    content
)
content = re.sub(
    r'(<div class="staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">한혜서</div><div class="sport-badge">겨루기</div>)',
    r'\1' + gyeorugi_svg + r'\2',
    content
)

# For Poomsae (유승아 - left branch only. Wait, rehab also has 유승아!)
# Make sure we only replace the one with "품새"
content = re.sub(
    r'(<div class="staff-avatar-icon">).*?(</div><div class="staff-details"><div class="staff-name">유승아</div><div class="sport-badge">품새</div>)',
    r'\1' + poomsae_svg + r'\2',
    content
)

# For Rehab (All right branch staff)
# We can match `...</div><div class="staff-details"><div class="staff-name">.*?</div><div class="sport-badge">재활강사</div>`
content = re.sub(
    r'<div class="staff-avatar-icon">.*?</div>(<div class="staff-details"><div class="staff-name">[^<]+</div><div class="sport-badge">재활강사</div>)',
    f'<div class="staff-avatar-icon">{rehab_svg}</div>\\1',
    content
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html and style.css!")
