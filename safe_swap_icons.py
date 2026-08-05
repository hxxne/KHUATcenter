import os

old_kyorugi_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="m19.8 2l-8.2 6.7l-1.21-1.04L14 5.58L9.41 1L8 2.41l2.74 2.74L5 8.46l-1.19 4.29L6.27 17L8 16l-2.03-3.5l.35-1.32L9.5 13l.5 9h2l.5-10L21 3.4zM5 3a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2"/></svg>'
old_demo_mask = '<div style="-webkit-mask: url(\'assets/demo_team_icon.png\') no-repeat center / contain; mask: url(\'assets/demo_team_icon.png\') no-repeat center / contain; background-color: currentColor; width: 1.2em; height: 1.2em; display: inline-block; vertical-align: middle;"></div>'
new_kyorugi_mask = '<div style="-webkit-mask: url(\'assets/kyorugi_icon.png\') no-repeat center / contain; mask: url(\'assets/kyorugi_icon.png\') no-repeat center / contain; background-color: currentColor; width: 1.2em; height: 1.2em; display: inline-block; vertical-align: middle;"></div>'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply exactly as planned
    content = content.replace(old_kyorugi_svg, '___TEMP_KYORUGI___')
    content = content.replace(old_demo_mask, old_kyorugi_svg)
    content = content.replace('___TEMP_KYORUGI___', new_kyorugi_mask)
    
    # Also handle the escaped version for script.js
    old_kyorugi_svg_esc = old_kyorugi_svg.replace('"', '\\"')
    old_demo_mask_esc = old_demo_mask.replace('"', '\\"')
    new_kyorugi_mask_esc = new_kyorugi_mask.replace('"', '\\"')
    
    content = content.replace(old_kyorugi_svg_esc, '___TEMP_KYORUGI_ESC___')
    content = content.replace(old_demo_mask_esc, old_kyorugi_svg_esc)
    content = content.replace('___TEMP_KYORUGI_ESC___', new_kyorugi_mask_esc)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('index.html')
process_file('script.js')

print("Safe icon swap completed successfully.")
