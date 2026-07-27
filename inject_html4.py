import requests
import re
import os

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
    "gyeorugi": "icon-park-solid:helmet",
}

inner_svgs = {}
for name, query in icons.items():
    svg_raw = fetch_svg(query)
    inner = extract_path(svg_raw)
    inner_svgs[name] = inner

# Tumbling (Board break / Smash) -> fa-solid fa-burst
# Handball -> plain ball (mdi:baseball or mdi:circle-outline)
paths = {
    'handball': "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M7.29,17.21C9.09,14.7 9.09,9.29 7.29,6.79C7.03,6.43 7.5,5.96 7.86,6.21C10,7.74 11.23,10.04 11.23,12C11.23,13.96 10,16.26 7.86,17.79C7.5,18.04 7.03,17.57 7.29,17.21M16.71,17.21C16.97,17.57 16.5,18.04 16.14,17.79C14,16.26 12.77,13.96 12.77,12C12.77,10.04 14,7.74 16.14,6.21C16.5,5.96 16.97,6.43 16.71,6.79C14.91,9.29 14.91,14.7 16.71,17.21Z", # Baseball (plain ball)
    'karate': "M19.8 2L11.6 8.7L10.39 7.66L14 5.58L9.41 1L8 2.41L10.74 5.15L5 8.46L3.81 12.75L6.27 17L8 16L5.97 12.5L6.32 11.18L9.5 13L10 22H12L12.5 12L21 3.4L19.8 2M5 3C6.11 3 7 3.9 7 5S6.11 7 5 7 3 6.11 3 5 3.9 3 5 3Z", # Poomsae
}

for k, v in paths.items():
    inner_svgs[k] = f'<path fill="currentColor" d="{v}" />'

badminton_raw = fetch_svg('icon-park-solid:badminton')
badminton_inner = extract_path(badminton_raw)
badminton_html = f'<svg class="custom-icon" viewBox="0 0 48 48" style="transform: rotate(45deg);">{badminton_inner}</svg>'

def get_icon_html(sport):
    if sport == 'gymnastics': return '<i class="fa-solid fa-burst" style="font-size: 20px;"></i>'
    if sport == 'badminton': return badminton_html
    if sport == 'rehab':
        return f'<svg class="custom-icon" viewBox="0 0 24 24" style="transform: scale(1.2);">{inner_svgs["rehab"]}</svg>'
    if sport == 'gyeorugi':
        return f'<svg class="custom-icon" viewBox="0 0 48 48">{inner_svgs["gyeorugi"]}</svg>'
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
    ("유승아", "품새", "karate"),
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

# Replace left branch
content = re.sub(
    r'(<h4 class="org-group-title">체육부 전담 AT</h4>\s*<div class="staff-grid">).*?(</div>\s*</div>\s*<div class="org-line vertical-line">)',
    r'\1\n' + '\n'.join(left_html) + r'\n                            \2',
    content,
    flags=re.DOTALL
)

# Replace right branch
content = re.sub(
    r'(<h4 class="org-group-title">스포츠 재활강사</h4>\s*<div class="staff-grid">).*?(</div>\s*</div>\s*</div>\s*</div>\s*<!-- 4th Tier)',
    r'\1\n' + '\n'.join(rehab_html) + r'\n                            \2',
    content,
    flags=re.DOTALL
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html based on user quiz choices.")
