import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace empty array for 럭비 with ["이도형", "최성찬"]
# The structure is like "럭비": [],
# We will use regex to catch potential spacing differences.
new_html = re.sub(r'"럭비":\s*\[(.*?)\]', '"럭비": ["이도형", "최성찬"]', html)

if new_html != html:
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Rugby assistant ATs updated!")
else:
    print("Could not find the target string.")
