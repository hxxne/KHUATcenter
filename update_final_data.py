import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update the lab for the three professors
professors = ["김준영", "오성민", "최현곤"]
new_lab = "경희대학교 선승관 AT center (031-201-2787)"

for prof in professors:
    # We find the block for the professor and replace their lab
    # Look for "ProfName": { ... lab: "...", ... }
    pattern = rf'("{prof}":\s*\{{[^}}]*?lab:\s*")[^"]*(")'
    replacement = rf'\g<1>{new_lab}\g<2>'
    html = re.sub(pattern, replacement, html)

# 2. Add '골프' and '스포츠재활' to assistantData if they don't exist
# We will inject them right before "재활강사": []
golf_data = '                "골프": ["문수연", "유승원", "최주영", "김무건"],\n'
rehab_data = '                "스포츠재활": ["이진주", "송찬", "권준홍", "박서현"],\n'

if '"골프"' not in html:
    html = re.sub(r'(\s*"재활강사": \[\])', rf'\n{golf_data}{rehab_data}\1', html)
else:
    # If it exists, replace it
    html = re.sub(r'"골프":\s*\[.*?\]', '"골프": ["문수연", "유승원", "최주영", "김무건"]', html)
    html = re.sub(r'"스포츠재활":\s*\[.*?\]', '"스포츠재활": ["이진주", "송찬", "권준홍", "박서현"]', html)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Lab locations and missing assistant ATs updated successfully.")
