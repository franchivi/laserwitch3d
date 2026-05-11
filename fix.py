import re
import os

filepath = 'catalogo.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    filename = match.group(1)
    return f'src="assets/images/{filename.lower()}"'

new_content = re.sub(r'src="assets/images/([^"]+)"', replacer, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("done")
