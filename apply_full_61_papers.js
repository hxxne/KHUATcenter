const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const papersData = require('./papers_data.json.js');

// Generate the HTML for all 4 parts
let partsHTML = '';
const partNames = [
    { num: 1, name: 'Part 1. 스포츠재활', color: '#A50034', count: papersData['1'].length },
    { num: 2, name: 'Part 2. 운동유발 피로 회복', color: '#1E293B', count: papersData['2'].length },
    { num: 3, name: 'Part 3. 경기력 향상', color: '#D97706', count: papersData['3'].length },
    { num: 4, name: 'Part 4. 부상 조사 분석', color: '#0284C7', count: papersData['4'].length }
];

let tabsButtonsHTML = '';
partNames.forEach((p, idx) => {
    const isActive = idx === 0;
    tabsButtonsHTML += `<button class="rtab-btn ${isActive ? 'active' : ''}" id="rtab-btn-${p.num}" onclick="switchResearchTab(${p.num})" style="padding: 15px 22px; font-weight: ${isActive ? '800' : '600'}; font-size: 0.95rem; border: none; background: transparent; cursor: pointer; border-bottom: 3px solid ${isActive ? '#A50034' : 'transparent'}; color: ${isActive ? '#A50034' : '#64748b'}; white-space: nowrap; transition: all 0.2s ease;">${p.name} <span style="background: ${isActive ? 'rgba(165,0,52,0.1)' : 'rgba(0,0,0,0.06)'}; color: ${isActive ? '#A50034' : '#64748b'}; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">${p.count}편</span></button>\n                    `;
});

let panesHTML = '';
partNames.forEach((p, idx) => {
    const isActive = idx === 0;
    const papers = papersData[String(p.num)] || [];
    
    let listHTML = '';
    papers.forEach((paper, pIdx) => {
        const authorsHTML = paper.authors ? `<div class="paper-authors" style="font-size: 0.88rem; color: #64748b; margin-bottom: 5px;"><i class="fa-solid fa-user-pen" style="font-size: 0.75rem; margin-right: 4px; opacity: 0.7;"></i>${paper.authors}</div>` : '';
        const journalHTML = paper.journal ? `<span class="paper-journal" style="font-size: 0.8rem; font-weight: 700; color: ${p.color}; background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.08); padding: 3px 10px; border-radius: 6px; display: inline-block;"><i class="fa-solid fa-book-bookmark" style="font-size: 0.75rem; margin-right: 4px;"></i>${paper.journal}</span>` : '';
        
        listHTML += `
                        <li class="paper-item" style="background: #ffffff; border-radius: 12px; padding: 18px 22px; border: 1px solid #e2e8f0; border-left: 4.5px solid ${p.color}; box-shadow: 0 2px 8px rgba(0,0,0,0.03); transition: transform 0.2s ease;">
                            <div style="display: flex; gap: 8px; align-items: flex-start; margin-bottom: 6px;">
                                <span style="background: ${p.color}; color: white; font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; flex-shrink: 0; margin-top: 2px;">#${pIdx + 1}</span>
                                <h4 style="margin: 0; font-size: 1.02rem; font-weight: 700; color: #0f172a; line-height: 1.45;">${paper.title}</h4>
                            </div>
                            ${authorsHTML}
                            ${journalHTML}
                        </li>`;
    });

    panesHTML += `
                    <!-- Pane ${p.num}: ${p.name} -->
                    <div id="rtab-pane-${p.num}" class="rtab-pane ${isActive ? 'active' : ''}" style="display: ${isActive ? 'block' : 'none'};">
                        <ul class="paper-list" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px;">
                            ${listHTML}
                        </ul>
                    </div>`;
});

const completeResearchModalHTML = `
    <!-- Research Publications Modal (Full 63 Research Papers) -->
    <div id="research-modal" class="modal-overlay" onclick="closeResearchModal()">
        <div class="modal-content research-modal-content" style="max-width: 950px; width: 94%; border-radius: 20px; overflow: hidden; background: #ffffff; padding: 0; box-shadow: 0 25px 50px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">
            <button class="modal-close-btn" id="close-research-modal" onclick="closeResearchModal()" style="position: absolute; top: 18px; right: 22px; z-index: 10; color: #fff; background: rgba(0,0,0,0.25); border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem; transition: all 0.2s ease;"><i class="fa-solid fa-xmark"></i></button>
            
            <div class="research-modal-header" style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); padding: 28px 35px; color: white;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                    <span style="background: rgba(255,255,255,0.15); color: #cbd5e1; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.5px;">EBM RESEARCH (총 ${papersData['1'].length + papersData['2'].length + papersData['3'].length + papersData['4'].length}편)</span>
                    <span style="color: rgba(255,255,255,0.6); font-size: 0.85rem;">경희대학교 AT Center 학술 연구 실적</span>
                </div>
                <h2 style="font-size: 1.7rem; font-weight: 800; margin: 0; color: #ffffff;">연구실적 및 학술 논문 (Publications)</h2>
                <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 0.95rem;">근거 중심 스포츠의학(EBM) 기반 4개 핵심 파트별 연구 성과를 확인하실 수 있습니다.</p>
            </div>
            
            <div class="research-modal-body" style="background: #f8fafc;">
                <div class="research-tabs-container" style="display: flex; background: #ffffff; border-bottom: 1px solid #e2e8f0; overflow-x: auto; padding: 0 20px;">
                    ${tabsButtonsHTML}
                </div>
                
                <div class="rtab-content-area" style="padding: 25px 30px; max-height: 60vh; overflow-y: auto;">
                    ${panesHTML}
                </div>
            </div>
        </div>
    </div>
`;

// Replace existing research-modal or insert before alumni-modal
const rModalStart = html.indexOf('<div id="research-modal"');
if (rModalStart !== -1) {
    const rModalEnd = html.indexOf('</div>\n    </div>\n', rModalStart);
    if (rModalEnd !== -1) {
        html = html.substring(0, rModalStart) + completeResearchModalHTML.trim() + '\n\n    ' + html.substring(rModalEnd + 18);
        console.log('Replaced research-modal with complete 63 papers HTML');
    }
} else {
    const targetTag = '<!-- Alumni Career Modal -->';
    if (html.includes(targetTag)) {
        html = html.replace(targetTag, completeResearchModalHTML + '\n    ' + targetTag);
        console.log('Injected complete research-modal HTML');
    }
}

// Update switchResearchTab in JavaScript
const updatedSwitchResearchTabJS = `
        // Research Publications Modal Handlers
        window.openResearchModal = function() {
            const rModal = document.getElementById('research-modal');
            if (rModal) {
                rModal.style.display = 'flex';
                setTimeout(() => { rModal.classList.add('show'); }, 10);
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeResearchModal = function() {
            const rModal = document.getElementById('research-modal');
            if (rModal) {
                rModal.classList.remove('show');
                setTimeout(() => { rModal.style.display = 'none'; }, 250);
                document.body.style.overflow = '';
            }
        };

        window.switchResearchTab = function(partNum) {
            for (let i = 1; i <= 4; i++) {
                const btn = document.getElementById('rtab-btn-' + i);
                const pane = document.getElementById('rtab-pane-' + i);
                if (btn) {
                    btn.classList.remove('active');
                    btn.style.borderBottomColor = 'transparent';
                    btn.style.color = '#64748b';
                    btn.style.fontWeight = '600';
                }
                if (pane) {
                    pane.style.display = 'none';
                    pane.classList.remove('active');
                }
            }
            const activeBtn = document.getElementById('rtab-btn-' + partNum);
            const activePane = document.getElementById('rtab-pane-' + partNum);
            if (activeBtn) {
                activeBtn.classList.add('active');
                activeBtn.style.borderBottomColor = '#A50034';
                activeBtn.style.color = '#A50034';
                activeBtn.style.fontWeight = '800';
            }
            if (activePane) {
                activePane.style.display = 'block';
                activePane.classList.add('active');
            }
        };
`;

const oldSwitchStart = html.indexOf('// Research Publications Modal Handlers');
const oldSwitchEnd = html.indexOf('// Attach DOM event listeners', oldSwitchStart);

if (oldSwitchStart !== -1 && oldSwitchEnd !== -1) {
    html = html.substring(0, oldSwitchStart) + updatedSwitchResearchTabJS + '\n        ' + html.substring(oldSwitchEnd);
    console.log('Successfully updated switchResearchTab JS');
}

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html with all 63 research papers');
