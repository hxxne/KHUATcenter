import re

names = ["기윤서", "유승아", "조현준", "진승희", "이예인", "문수연", "안은지", "윤서연", "유영민", "우지윤", "천지훈", "문채연", "최민혁", "조연지", "이채원"]

card_template = '<div class="staff-card"><div class="staff-avatar-icon"><svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5c-1.11 0-2 .89-2 2s.89 2 2 2s2-.89 2-2s-.89-2-2-2m10-4v5h-2V4H4v2H2V1h2v2h16V1zm-7 10.26V23h-2v-5h-2v5H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5h2v.5C7.5 8 9.5 10 12 10s4.5-2 4.5-4.5V5h2v.5c0 2.5-1.43 4.67-3.5 5.76"/></svg></div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">재활강사</div></div></div>'

new_cards_html = "".join([card_template.format(name=n) for n in names])

with open('index.html', 'r', encoding='utf-8') as f:
    current_html = f.read()

current_match = re.search(r'(<h4 class="org-group-title">스포츠 재활강사</h4>.*?<div class="staff-grid"[^>]*>)(.*?)(</div>\s*</div>\s*</div>\s*</div>)', current_html, re.DOTALL)
if not current_match:
    print("Could not find the grid in index.html")
    exit(1)

new_html = current_html[:current_match.start(2)] + new_cards_html + current_html[current_match.end(2):]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Replaced sports rehab grid with explicit list of 15 names.")
