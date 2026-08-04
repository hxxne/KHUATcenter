import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Change Left Branch width to 450px for symmetry
# The Left Branch starts with: <div class="org-branch" style="display: flex; flex-direction: column; align-items: center; width: 350px;">
html = html.replace('width: 350px;">\n                        <div class="member-card">\n                            <div class="member-avatar" style="background-image: url(\'assets/kimjunyoung.png\')', 
                    'width: 450px;">\n                        <div class="member-card">\n                            <div class="member-avatar" style="background-image: url(\'assets/kimjunyoung.png\')')

# Also there might be inline styles we should fix, wait let's just use regex
html = re.sub(r'(<!-- Left Branch: 김준영 -->\s*<div class="org-branch" style="display: flex; flex-direction: column; align-items: center; width: )350px(">)', r'\g<1>450px\g<2>', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Change tier-3-line and tier-3-branches width from 720px to 770px
css = re.sub(r'(\.tier-3-line\s*\{\s*width:\s*)720px', r'\g<1>770px', css)
css = re.sub(r'(\.tier-3-branches\s*\{\s*display:\s*flex;\s*justify-content:\s*space-between;\s*width:\s*)720px', r'\g<1>770px', css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Alignment fixed.")
