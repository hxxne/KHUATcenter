import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the hardcoded tier-3-line and tier-3-branches
html = re.sub(r'<div class="org-line horizontal-line tier-3-line"></div>\s*<div class="org-line vertical-branches tier-3-branches">\s*<!-- Middle vertical drop for the 3-way split -->\s*<div class="org-line" style="width: 2px; height: 20px;"></div>\s*</div>', '', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Inject the new robust CSS for level-3 lines
new_css = """
/* Robust dynamic org chart lines for Level 3 */
@media (min-width: 1101px) {
    .level-3-container > .org-branch {
        position: relative;
        padding-top: 20px;
    }

    .level-3-container > .org-branch::before {
        content: '';
        position: absolute;
        top: 0;
        height: 2px;
        background-color: #ddd;
    }

    /* Left Branch horizontal line */
    .level-3-container > .org-branch:first-child::before {
        left: 50%;
        width: calc(50% + 20px);
    }

    /* Right Branch horizontal line */
    .level-3-container > .org-branch:last-child::before {
        right: 50%;
        width: calc(50% + 20px);
    }

    /* Middle Branch horizontal line */
    .level-3-container > .org-branch:nth-child(2)::before {
        left: -20px;
        width: calc(100% + 40px);
    }
    
    /* Vertical drops for all branches */
    .level-3-container > .org-branch::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 20px;
        background-color: #ddd;
    }
}
"""

css += new_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Applied dynamic line fix.")
