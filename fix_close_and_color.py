import re

html_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/index.html'
css_file = 'C:/Users/LG/.gemini/antigravity/scratch/khu-at-center/style.css'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# The errant block to remove
errant_block = """
            const profModal = document.getElementById('prof-modal');
            const profCloseBtn = document.getElementById('prof-modal-close-btn');
            
            profCloseBtn.addEventListener('click', () => {
                profModal.classList.remove('show');
            });
            
            profModal.addEventListener('click', (e) => {
                if (e.target === profModal) {
                    profModal.classList.remove('show');
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && profModal.classList.contains('show')) {
                    profModal.classList.remove('show');
                }
            });
"""

# Remove all instances of the errant block
html = html.replace(errant_block, "")

# Now add it correctly inside the DOMContentLoaded block
# We can find the end of the DOMContentLoaded block which has:
#             document.addEventListener('keydown', (e) => {
#                 if (e.key === 'Escape' && modal.classList.contains('show')) {
#                     modal.classList.remove('show');
#                 }
#             });
#         });
#     </script>

target_insertion_point = """            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('show')) {
                    modal.classList.remove('show');
                }
            });"""

correct_block = target_insertion_point + "\n" + """
            // Professor Modal Close Events
            const profModal = document.getElementById('prof-modal');
            const profCloseBtn = document.getElementById('prof-modal-close-btn');
            
            if(profCloseBtn) {
                profCloseBtn.addEventListener('click', () => {
                    profModal.classList.remove('show');
                });
            }
            
            if(profModal) {
                profModal.addEventListener('click', (e) => {
                    if (e.target === profModal) {
                        profModal.classList.remove('show');
                    }
                });
            }
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && profModal && profModal.classList.contains('show')) {
                    profModal.classList.remove('show');
                }
            });
"""

if "// Professor Modal Close Events" not in html:
    html = html.replace(target_insertion_point, correct_block)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

# --- CSS Fix ---
with open(css_file, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace var(--color-khu-blue) with var(--color-khu-crimson) in prof-modal-header-bg
css = css.replace('.prof-modal-header-bg {\n    background: var(--color-khu-blue);', '.prof-modal-header-bg {\n    background: var(--color-khu-crimson);')

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css)

print("Fixed HTML close listeners and CSS Burgundy color!")
