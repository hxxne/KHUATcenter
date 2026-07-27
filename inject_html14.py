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

weight_lifter_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5c-1.11 0-2 .89-2 2s.89 2 2 2s2-.89 2-2s-.89-2-2-2m10-4v5h-2V4H4v2H2V1h2v2h16V1zm-7 10.26V23h-2v-5h-2v5H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5h2v.5C7.5 8 9.5 10 12 10s4.5-2 4.5-4.5V5h2v.5c0 2.5-1.43 4.67-3.5 5.76"/></svg>'

rehab_staff = ["기윤서", "문수연", "문채연", "안은지", "우지윤", "유승아", "유영민", "윤서연", "이예인", "이채원", "조연지", "조현준", "진승희", "천지훈", "최민혁"]
for name in rehab_staff:
    content = update_icon(content, name, '재활강사', weight_lifter_svg)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Weight lifter icon applied to Rehab!")
