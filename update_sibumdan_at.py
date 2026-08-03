import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace empty array for 시범단 with ["김한결", "우민서", "권인혜", "김다감", "남수현"]
# Use regex to find "시범단": []
new_html = re.sub(r'"시범단":\s*\[(.*?)\]', '"시범단": ["김한결", "우민서", "권인혜", "김다감", "남수현"]', html)

if new_html != html:
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Demonstration Team assistant ATs updated!")
else:
    print("Could not find the target string. Maybe it already has data?")
