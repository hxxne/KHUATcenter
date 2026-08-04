import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update the '스포츠 재활강사' staff-grid
# The grid is between <h4 class="org-group-title">스포츠 재활강사</h4>\n                            <div class="staff-grid"> and </div></div></div>
match = re.search(r'(<h4 class="org-group-title">스포츠 재활강사</h4>\s*<div class="staff-grid">)(.*?)(</div></div></div>\s*</div>)', html, re.DOTALL)
if match:
    prefix = match.group(1)
    cards_str = match.group(2)
    suffix = match.group(3)
    
    # Extract all cards
    cards = re.findall(r'<div class="staff-card">.*?</div></div></div>', cards_str)
    
    # Filter and sort
    keep_names = ['기윤서', '문수연', '문채연', '박서현', '송찬', '우지윤', '유승아', '유영민', '윤서연', '이예인', '이진주', '이채원', '조연지', '조현준', '진승희', '최민혁']
    
    sorted_cards = []
    for name in keep_names:
        for card in cards:
            if f'<div class="staff-name">{name}</div>' in card:
                sorted_cards.append(card)
                break
                
    new_cards_str = "\n".join(["                                " + c for c in sorted_cards]) + "\n                            "
    html = html[:match.start()] + prefix + "\n" + new_cards_str + suffix + html[match.end():]

# 2. Add '체육부 비전담 AT' group under Kim Jun-young
svg_icon = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5c-1.11 0-2 .89-2 2s.89 2 2 2s2-.89 2-2s-.89-2-2-2m10-4v5h-2V4H4v2H2V1h2v2h16V1zm-7 10.26V23h-2v-5h-2v5H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5h2v.5C7.5 8 9.5 10 12 10s4.5-2 4.5-4.5V5h2v.5c0 2.5-1.43 4.67-3.5 5.76"/></svg>'
def make_card(name, badge):
    return f'                                <div class="staff-card"><div class="staff-avatar-icon">{svg_icon}</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">{badge}</div></div></div>'

new_group_html = """                        <div class="org-line vertical-line"></div>
                        <div class="org-group" style="width: 100%;">
                            <h4 class="org-group-title">체육부 비전담 AT</h4>
                            <div class="staff-grid">
"""
new_group_html += "\n".join([make_card(name, "센터 AT") for name in ['권준홍', '천지훈', '안은지', '이천이']])
new_group_html += """
                            </div>
                        </div>
"""

# Insert this after the "체육부 전담 AT" group
target = r'(<h4 class="org-group-title">체육부 전담 AT</h4>.*?</div>\s*</div>)'
match2 = re.search(target, html, re.DOTALL)
if match2:
    html = html[:match2.end()] + "\n" + new_group_html + html[match2.end():]

# 3. Update assistantData in Javascript just to be safe
# Remove from "재활강사": ["...", "안은지", ..., "천지훈", ..., "권준홍", ...]
# We can just replace the whole array string
old_rehab_arr = '"재활강사": ["기윤서", "문수연", "문채연", "안은지", "우지윤", "유승아", "유영민", "윤서연", "이예인", "이채원", "조연지", "조현준", "진승희", "천지훈", "최민혁", "이진주", "송찬", "권준홍", "박서현"]'
# Actually wait, in index.html, assistantData doesn't have these names! It has:
# "재활강사": [] // This will store certifications for rehab instructors
# But wait, earlier I checked and I appended to "스포츠재활"
old_sports_rehab_arr = '"스포츠재활": ["이진주", "송찬", "권준홍", "박서현"]'
new_sports_rehab_arr = '"스포츠재활": ["이진주", "송찬", "박서현"]'
html = html.replace(old_sports_rehab_arr, new_sports_rehab_arr)

# Add "센터 AT" to assistantData just below "스포츠재활"
if '"센터 AT"' not in html:
    html = html.replace(new_sports_rehab_arr, new_sports_rehab_arr + ',\n                "센터 AT": ["권준홍", "천지훈", "안은지", "이천이"]')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
    print("Updates applied safely.")
