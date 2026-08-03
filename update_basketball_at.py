import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace empty array for 농구 with ["이진호", "김민주", "황이삭", "김동언", "김성준"]
# We will use regex.
new_html = re.sub(r'"농구":\s*\[(.*?)\]', '"농구": ["이진호", "김민주", "황이삭", "김동언", "김성준"]', html)

if new_html != html:
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Basketball assistant ATs updated!")
else:
    print("Could not find the target string. Maybe it already has data?")
