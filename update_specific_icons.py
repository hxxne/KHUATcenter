import requests

icons_to_update = {
    "겨루기": "game-icons:armor-vest", # Hogu
    "품새": "emojione-monotone:martial-arts-uniform", # Dobok
    "골프": "material-symbols:sports-golf" # Person playing golf
}

for sport, icon_id in icons_to_update.items():
    prefix, name = icon_id.split(':')
    url = f"https://api.iconify.design/{prefix}/{name}.svg"
    r = requests.get(url)
    if r.status_code == 200:
        with open(f'assets/icons/{sport}.svg', 'w', encoding='utf-8') as f:
            f.write(r.text)
        print(f"Updated {sport} icon successfully with {icon_id}.")
    else:
        print(f"Failed to download {icon_id}")

print("Done.")
