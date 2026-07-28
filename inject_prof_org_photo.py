import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Target block
old_block = """<div class="member-avatar placeholder-avatar"></div>
                        <div class="member-info">
                            <h4 class="member-name">박지홍</h4>"""

new_block = """<div class="member-avatar" style="background-image: url('http://sports.khu.ac.kr/data/member_tmp/thumb-1563944723_111x138.jpg'); background-position: top center;"></div>
                        <div class="member-info">
                            <h4 class="member-name">박지홍</h4>"""

html = html.replace(old_block, new_block)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("Org chart photo injected!")
