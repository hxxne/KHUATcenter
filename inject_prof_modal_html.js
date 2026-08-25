const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const profModalHTML = `
    <!-- Professor / Staff Detail Modal -->
    <div id="prof-modal" class="modal-overlay" onclick="closeProfModal()">
        <div class="prof-modal-content" onclick="event.stopPropagation()">
            <div class="prof-modal-header-bg">
                <button class="prof-modal-close-btn" id="prof-modal-close-btn" onclick="closeProfModal()"><i class="fa-solid fa-xmark"></i></button>
                <div class="prof-modal-profile">
                    <div class="prof-modal-photo" id="prof-modal-photo">
                        <i class="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                        <h3 class="prof-modal-name" id="prof-modal-name">홍길동</h3>
                        <div class="prof-modal-role" id="prof-modal-role">교수</div>
                    </div>
                </div>
            </div>
            
            <div class="prof-modal-body">
                <div class="prof-info-grid">
                    <div class="prof-info-label">학위명</div>
                    <div class="prof-info-value" id="prof-modal-degree">-</div>
                    
                    <div class="prof-info-label">최종학력</div>
                    <div class="prof-info-value" id="prof-modal-edu">-</div>
                    
                    <div class="prof-info-label" id="prof-modal-subject-label">담당과목</div>
                    <div class="prof-info-value" id="prof-modal-subject">-</div>
                    
                    <div class="prof-info-label">연구실</div>
                    <div class="prof-info-value" id="prof-modal-lab">-</div>
                    
                    <div class="prof-info-label">E-mail</div>
                    <div class="prof-info-value" id="prof-modal-email">-</div>
                </div>
                
                <div class="prof-section" style="margin-top: 20px;">
                    <div class="prof-section-title">주요경력</div>
                    <ul class="prof-list" id="prof-modal-career">
                    </ul>
                </div>
                
                <div class="prof-section" style="margin-top: 20px;">
                    <div class="prof-section-title">연구실적 (최근 논문)</div>
                    <ul class="prof-list" id="prof-modal-research">
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;

// Insert profModalHTML right after the department-modal div closing tag
const deptModalEndTag = '<!-- Modal Logic -->';
if (html.includes(deptModalEndTag) && !html.includes('id="prof-modal"')) {
    html = html.replace(deptModalEndTag, profModalHTML + '\n    ' + deptModalEndTag);
    console.log('Successfully inserted prof-modal HTML markup');
}

// 2. Update style.css so prof-modal-header-bg has KHU Burgundy gradient
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(
    '.prof-modal-header-bg {\n    background: var(--color-khu-blue);',
    '.prof-modal-header-bg {\n    background: linear-gradient(135deg, #A50034 0%, #700023 100%);'
);
fs.writeFileSync('style.css', css, 'utf8');
console.log('Updated prof-modal-header-bg in style.css');

// Bump cache version in index.html
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
