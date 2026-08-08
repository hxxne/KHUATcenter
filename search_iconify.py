import requests
import json

queries = ['golf', 'shirt', 'helmet', 'armor', 'vest', 'taekwondo', 'martial', 'karate']

results = {}
for q in queries:
    r = requests.get(f"https://api.iconify.design/search?query={q}&limit=5")
    if r.status_code == 200:
        results[q] = r.json().get('icons', [])

print(json.dumps(results, indent=2))
