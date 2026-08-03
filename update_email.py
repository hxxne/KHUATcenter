import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
js_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/script.js'

with open(js_file, 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('https://formsubmit.co/ajax/wlgns10212@khu.ac.kr', 'https://formsubmit.co/ajax/khuatlab@gmail.com')

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js)

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('sports@khu.ac.kr', 'khuatlab@gmail.com')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("Email changed!")
