import re

def update_icon(content, name, badge, new_icon_html):
    # Use exact string match to avoid regex greedy bugs
    suffix = f'</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">{badge}</div></div></div>'
    parts = content.split(suffix)
    if len(parts) > 1:
        for i in range(len(parts)-1):
            prefix_idx = parts[i].rfind('<div class="staff-avatar-icon">')
            if prefix_idx != -1:
                parts[i] = parts[i][:prefix_idx] + f'<div class="staff-avatar-icon">{new_icon_html}'
        return suffix.join(parts)
    else:
        print(f"Failed to match: {name} / {badge}")
    return content

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Restore Poomsae to uniform
poomsae_svg = '<svg class="custom-icon" viewBox="0 0 32 32"><path fill="currentColor" d="M7.08 6.459A2.93 2.93 0 0 1 9.614 5h12.77c1.035 0 2.013.54 2.538 1.462l5.81 10.051a2.03 2.03 0 0 1-.703 2.736l-.013.009l-3.728 2.142l-.003.002a2 2 0 0 1-1.786.11v4.829c0 .892-.713 1.659-1.655 1.659H9.165A1.664 1.664 0 0 1 7.5 26.34v-4.828a2 2 0 0 1-1.786-.11l-.002-.002l-3.706-2.135l-.004-.003a2.01 2.01 0 0 1-.732-2.744l.002-.003zM19.091 7L16 13.57L12.908 7h-1.934l4.059 8.625l-.235.5h1.934L21.026 7zm-1.255 9.125H22.5v-1.23l.866 1.492a.7.7 0 0 1 .081.14l1.822 3.135l.001.003l.003.002l.002.001l.003.002h.003l.003.001l.003-.002l3.698-2.125a.04.04 0 0 0 .015-.022v-.007l-.002-.008l-5.813-10.055a.91.91 0 0 0-.8-.452h-.254zm-4.042 0c.001-.143.033-.287.095-.42l.038-.08L9.868 7h-.253a.93.93 0 0 0-.804.459L3.001 17.52v.002q0 .005.003.007l.004.004l3.709 2.137h.003l.008-.004l.002-.003l.002-.002L9.5 14.863v1.262zM9.5 26h13v-8.125h-4.474l1.766 3.752a.875.875 0 1 1-1.584.746l-2.116-4.498h-.184l-2.116 4.498a.875.875 0 1 1-1.584-.746l1.766-3.752H9.5z"/></svg>'
content = update_icon(content, '유승아', '품새', poomsae_svg)

# Change Tumbling to intact board
intact_board_svg = '<svg class="custom-icon" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="1" transform="rotate(-10 12 12)" fill="currentColor"/></svg>'
content = update_icon(content, '문채연', '시범단', intact_board_svg)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

# Update CSS for lines
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

css_content = re.sub(
    r'\.vertical-line\s*{\s*width:\s*2px;\s*height:\s*30px;\s*margin:\s*0 auto;\s*background-color:\s*transparent;\s*}',
    r'.vertical-line {\n    width: 2px;\n    height: 30px;\n    margin: 0 auto;\n    background-color: #ddd;\n}',
    css_content
)
css_content = re.sub(
    r'\.horizontal-line\s*{\s*height:\s*2px;\s*margin:\s*0 auto;\s*background-color:\s*transparent;\s*}',
    r'.horizontal-line {\n    height: 2px;\n    margin: 0 auto;\n    background-color: #ddd;\n}',
    css_content
)

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

print("Updates applied safely!")
