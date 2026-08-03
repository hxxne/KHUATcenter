import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace empty array for 겨루기 with ["조연지", "박은지", "정도엽"]
# Note: 겨루기 might be empty `[]` in the assistantData dictionary.
# We will use regex.
new_html = re.sub(r'"겨루기":\s*\[(.*?)\]', '"겨루기": ["조연지", "박은지", "정도엽"]', html)

if new_html != html:
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Kyorugi assistant ATs updated!")
else:
    print("Could not find the target string. Maybe it already has data?")
