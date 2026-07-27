import re

def update_icon(content, name, badge, new_icon_html):
    suffix = f'</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">{badge}</div></div></div>'
    parts = content.split(suffix)
    if len(parts) > 1:
        for i in range(len(parts)-1):
            prefix_idx = parts[i].rfind('<div class="staff-avatar-icon">')
            if prefix_idx != -1:
                parts[i] = parts[i][:prefix_idx] + f'<div class="staff-avatar-icon">{new_icon_html}'
        return suffix.join(parts)
    return content

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Change Tumbling to a rotated martial arts (tumbling kick)
tumbling_kick_svg = '<svg class="custom-icon" viewBox="0 0 24 24" style="transform: rotate(110deg);"><path fill="currentColor" d="m19.8 2l-8.2 6.7l-1.21-1.04L14 5.58L9.41 1L8 2.41l2.74 2.74L5 8.46l-1.19 4.29L6.27 17L8 16l-2.03-3.5l.35-1.32L9.5 13l.5 9h2l.5-10L21 3.4zM5 3a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2"/></svg>'
content = update_icon(content, '문채연', '시범단', tumbling_kick_svg)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Tumbling kick applied!")
