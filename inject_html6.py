import requests
import re

def fetch_svg(icon_name):
    parts = icon_name.split(':')
    if len(parts) == 2:
        url = f"https://api.iconify.design/{parts[0]}/{parts[1]}.svg"
        res = requests.get(url)
        if res.status_code == 200:
            return res.text
    return None

def extract_path(svg_content):
    if not svg_content:
        return ""
    match = re.search(r'<svg[^>]*>(.*?)</svg>', svg_content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

icons = {
    "rehab": "material-symbols:massage",
    "poomsae": "icon-park-solid:kungfu",
}

inner_svgs = {}
for name, query in icons.items():
    svg_raw = fetch_svg(query)
    inner = extract_path(svg_raw)
    inner_svgs[name] = inner

paths = {
    'handball': "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 19.96,11.5L16.41,9.81L16.03,6L12,4M10,6.09L9.6,9.85L6.05,11.54C6.38,8.27 8.93,5.65 12,5.1V6C11.23,6 10.53,6.34 10,6.09M3.93,12L7.33,13.62L7.75,17.43C5.55,16.5 4,14.4 3.93,12M8.19,17.8L11,19.26V20C9.64,20 8.35,19.5 7.37,18.66L8.19,17.8M13,20V19.26L15.82,17.8L16.63,18.66C15.65,19.5 14.36,20 13,20M16.25,17.43L16.67,13.62L20.07,12C20,14.4 18.45,16.5 16.25,17.43M12,11L14,12V14L12,15L10,14V12L12,11Z",
    'gymnastics': "M4 6c0-1.1.9-2 2-2s2 .9 2 2s-.9 2-2 2s-2-.9-2-2M1 9h6l7-5l1.31 1.5l-4.17 3H14L21.8 4L23 5.4L14.5 12L14 22h-2l-.5-10L8 11H1z",
    'gyeorugi': "M19.8 2L11.6 8.7L10.39 7.66L14 5.58L9.41 1L8 2.41L10.74 5.15L5 8.46L3.81 12.75L6.27 17L8 16L5.97 12.5L6.32 11.18L9.5 13L10 22H12L12.5 12L21 3.4L19.8 2M5 3C6.11 3 7 3.9 7 5S6.11 7 5 7 3 6.11 3 5 3.9 3 5 3Z",
}

for k, v in paths.items():
    inner_svgs[k] = f'<path fill="currentColor" d="{v}" />'

badminton_raw = fetch_svg('icon-park-solid:badminton')
badminton_inner = extract_path(badminton_raw)
badminton_html = f'<svg class="custom-icon" viewBox="0 0 48 48" style="transform: rotate(45deg);">{badminton_inner}</svg>'

def get_icon_html(sport):
    if sport == 'badminton': return badminton_html
    if sport == 'rehab':
        return f'<svg class="custom-icon" viewBox="0 0 24 24" style="transform: scale(1.2);">{inner_svgs["rehab"]}</svg>'
    if sport == 'poomsae':
        return f'<svg class="custom-icon" viewBox="0 0 48 48">{inner_svgs["poomsae"]}</svg>'
    
    if sport in inner_svgs:
        return f'<svg class="custom-icon" viewBox="0 0 24 24">{inner_svgs[sport]}</svg>'
    
    fa_map = {
        'soccer': '<i class="fa-solid fa-futbol"></i>',
        'volleyball': '<i class="fa-solid fa-volleyball"></i>',
        'rugby': '<i class="fa-solid fa-football"></i>',
        'baseball': '<i class="fa-solid fa-baseball-bat-ball"></i>',
        'basketball': '<i class="fa-solid fa-basketball"></i>',
        'golf': '<i class="fa-solid fa-golf-ball-tee"></i>',
    }
    return fa_map.get(sport, '<i class="fa-solid fa-star"></i>')

left_staff = [
    ("강석", "축구", "soccer"),
    ("권남준", "배드민턴", "badminton"),
    ("기윤서", "핸드볼", "handball"),
    ("문채연", "시범단", "gymnastics"),
    ("박세민", "배구", "volleyball"),
    ("유승아", "품새", "poomsae"),
    ("유영민", "럭비", "rugby"),
    ("유주승", "야구", "baseball"),
    ("유지민", "겨루기", "gyeorugi"),
    ("이상준", "농구", "basketball"),
    ("이예인", "골프", "golf"),
    ("한혜서", "겨루기", "gyeorugi")
]

left_html = []
for name, badge, sport in left_staff:
    icon = get_icon_html(sport)
    left_html.append(f'                                <div class="staff-card"><div class="staff-avatar-icon">{icon}</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">{badge}</div></div></div>')

rehab_staff = ["기윤서", "문수연", "문채연", "안은지", "우지윤", "유승아", "유영민", "윤서연", "이예인", "이채원", "조연지", "조현준", "진승희", "천지훈", "최민혁"]
rehab_html = []
for name in rehab_staff:
    icon = get_icon_html('rehab')
    rehab_html.append(f'                                <div class="staff-card"><div class="staff-avatar-icon">{icon}</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">재활강사</div></div></div>')

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace left branch exactly
m_left = re.search(r'(<h4 class="org-group-title">체육부 전담 AT</h4>\s*<div class="staff-grid">)(.*?)(</div>\s*</div>\s*<div class="org-line vertical-line">)', content, re.DOTALL)
if m_left:
    old_left_block = m_left.group(0)
    new_left_block = m_left.group(1) + "\n" + "\n".join(left_html) + "\n                            " + m_left.group(3)
    content = content.replace(old_left_block, new_left_block)
else:
    print("FAILED TO MATCH LEFT")

# Replace right branch exactly
m_right = re.search(r'(<h4 class="org-group-title">스포츠 재활강사</h4>\s*<div class="staff-grid">)(.*?)(</div>\s*</div>\s*</div>\s*<!-- Middle Branch)', content, re.DOTALL)
if not m_right:
    # Try another way. The end of the right branch staff grid is followed by closing tags of the org-group and org-branch.
    m_right = re.search(r'(<h4 class="org-group-title">스포츠 재활강사</h4>\s*<div class="staff-grid">)(.*?)(</div>\s*</div>\s*</div>\s*</div>)', content, re.DOTALL)

if m_right:
    # However, (.*?) might match too much. Let's make sure we only match cards.
    # Count the number of staff-cards in the match to verify it's the right one.
    cards_matched = m_right.group(2).count("staff-card")
    print(f"Right branch matched, found {cards_matched} old cards.")
    
    old_right_block = m_right.group(0)
    new_right_block = m_right.group(1) + "\n" + "\n".join(rehab_html) + "\n                            " + m_right.group(3)
    content = content.replace(old_right_block, new_right_block)
else:
    print("FAILED TO MATCH RIGHT")

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html securely!")
