import re

css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# 1. Remove .tier-3-line pseudo-elements
css_content = re.sub(
    r'\.tier-3-line::before,\s*\.tier-3-line::after\s*{[^}]*}',
    '',
    css_content,
    flags=re.DOTALL
)
css_content = re.sub(r'\.tier-3-line::before\s*{\s*left:\s*0;\s*}', '', css_content)
css_content = re.sub(r'\.tier-3-line::after\s*{\s*right:\s*0;\s*}', '', css_content)

# 2. Update .tier-3-branches widths to 720px
css_content = re.sub(
    r'(\.tier-3-branches\s*{[^}]*width:\s*)1040px(;[^}]*})',
    r'\g<1>720px\2',
    css_content,
    flags=re.DOTALL
)
css_content = re.sub(
    r'\.tier-3-branches\s*{\s*width:\s*680px;\s*}',
    r'.tier-3-branches { width: 720px; }',
    css_content
)
# Just in case, replace any remaining 680px or 1040px for tier-3-branches
css_content = re.sub(r'\.tier-3-branches\s*{\s*width:\s*\d+px;\s*}', r'.tier-3-branches { width: 720px; }', css_content)

# 3. Update .vertical-branches pseudo-elements color to #ddd
css_content = re.sub(
    r'(\.vertical-branches::before,\s*\.vertical-branches::after\s*{[^}]*background-color:\s*)#cbd5e1(;[^}]*})',
    r'\g<1>#ddd\2',
    css_content,
    flags=re.DOTALL
)

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("CSS duplicated lines fixed!")
