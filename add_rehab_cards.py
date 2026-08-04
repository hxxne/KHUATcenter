html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_names = ["이진주", "송찬", "권준홍", "박서현"]
svg_icon = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5c-1.11 0-2 .89-2 2s.89 2 2 2s2-.89 2-2s-.89-2-2-2m10-4v5h-2V4H4v2H2V1h2v2h16V1zm-7 10.26V23h-2v-5h-2v5H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5h2v.5C7.5 8 9.5 10 12 10s4.5-2 4.5-4.5V5h2v.5c0 2.5-1.43 4.67-3.5 5.76"/></svg>'

insert_index = -1
for i, line in enumerate(lines):
    if "최민혁" in line and "재활강사" in line:
        insert_index = i + 1
        break

if insert_index != -1:
    for name in reversed(new_names):
        card_html = f'                                <div class="staff-card"><div class="staff-avatar-icon">{svg_icon}</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">재활강사</div></div></div>\n'
        lines.insert(insert_index, card_html)

    with open(html_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Successfully added new rehab instructors.")
else:
    print("Could not find the insertion point.")
