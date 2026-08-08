import os
import re
import requests

icons = {
    "축구": "mdi:soccer",
    "야구": "mdi:baseball",
    "농구": "mdi:basketball",
    "배구": "mdi:volleyball",
    "럭비": "mdi:rugby",
    "골프": "mdi:golf",
    "배드민턴": "mdi:badminton",
    "핸드볼": "mdi:basketball-hoop-outline", # mdi:handball didn't actually exist maybe? Wait, my previous script returned FOUND for it. Let's use mdi:handball
    "시범단": "mdi:karate",
    "겨루기": "mdi:boxing-glove",
    "품새": "mdi:human-greeting", 
    "센터": "mdi:hospital-building"
}

# The previous script actually printed "FOUND" for all of them! I will use mdi:handball.
icons["핸드볼"] = "mdi:handball"

os.makedirs('assets/icons', exist_ok=True)

for sport, icon_id in icons.items():
    prefix, name = icon_id.split(':')
    url = f"https://api.iconify.design/{prefix}/{name}.svg"
    r = requests.get(url)
    if r.status_code == 200:
        with open(f'assets/icons/{sport}.svg', 'w', encoding='utf-8') as f:
            f.write(r.text)
    else:
        print(f"Failed to download {icon_id}")

# 2. Update style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '.custom-svg-icon' not in css:
    with open('style.css', 'a', encoding='utf-8') as f:
        f.write("\n\n/* Uniform SVG Icons */\n")
        f.write(".custom-svg-icon {\n")
        f.write("    width: 36px !important;\n")
        f.write("    height: 36px !important;\n")
        f.write("    filter: invert(12%) sepia(85%) saturate(5412%) hue-rotate(334deg) brightness(85%) contrast(116%) !important;\n")
        f.write("}\n")

# 3. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# For each sport card, replace the contents of <div class="sport-card-icon">...</div> with the new SVG
for sport in icons.keys():
    pattern = rf'(<div class="sport-card" onclick="openSportModal\(\'{sport}\'\)">\s*<div class="sport-card-icon">).*?(</div>\s*<div class="sport-card-name">{sport}</div>)'
    replacement = rf'\1<img src="assets/icons/{sport}.svg" alt="{sport}" class="custom-svg-icon">\2'
    html = re.sub(pattern, replacement, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 4. Update script.js
with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

for sport in icons.keys():
    # Find the sport in sportsData and replace its icon property
    pattern = rf'("{sport}":\s*\{{\s*icon:\s*\')<[^>]+>(.*?)(\',\s*head:)'
    # Since some had <img> tags and some had <i> tags, we match anything between single quotes
    pattern2 = rf'("{sport}":\s*\{{\s*icon:\s*\').*?(\',\s*head:)'
    replacement2 = rf'\1<img src="assets/icons/{sport}.svg" class="custom-svg-icon">\2'
    js = re.sub(pattern2, replacement2, js)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Downloaded SVGs and updated all files to use them for perfect consistency.")
