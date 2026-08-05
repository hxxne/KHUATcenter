import re

def remove_cards():
    names_to_remove = ["송찬"]
    
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    for name in names_to_remove:
        # Regex to match the staff card for the specific name with sport-badge "재활강사"
        pattern = r'<div class="staff-card"><div class="staff-avatar-icon">.*?</div><div class="staff-details"><div class="staff-name">' + name + r'</div><div class="sport-badge">재활강사</div></div></div>'
        html = re.sub(pattern, '', html)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == "__main__":
    remove_cards()
    print("Cards removed successfully.")
