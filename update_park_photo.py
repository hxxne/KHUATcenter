html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace(
    'http://sports.khu.ac.kr/data/member_tmp/thumb-1563944723_111x138.jpg',
    'assets/parkjihong.jpg'
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
    print("Park Ji-hong photo URL updated to local path.")
