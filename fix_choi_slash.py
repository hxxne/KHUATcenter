html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace(
    r"url(\'assets/choihyungon.png\')",
    r"url('assets/choihyungon.png')"
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Fixed backslashes in URL")
