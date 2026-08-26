const fs = require('fs');

// 1. Update script.js counter logic
let js = fs.readFileSync('script.js', 'utf8');

const oldCounterCode = `    /* ==========================================================================
       4. Stats Counters (Number counting animation)
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const startCounters = () => {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10);
            const duration = 2000;
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            let current = 0;

            const updateCounter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.textContent = target.toLocaleString('en-US');
                    clearInterval(updateCounter);
                } else {
                    num.textContent = Math.floor(current).toLocaleString('en-US');
                }
            }, stepTime);
        });
    };

    const statsSection = document.getElementById('dashboard');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    startCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        statsObserver.observe(statsSection);
    }`;

const newCounterCode = `    /* ==========================================================================
       4. Stats Counters (Robust & Instant Number Counting Animation)
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const startCounters = () => {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10);
            if (isNaN(target)) return;
            const duration = 1400;
            const stepTime = 25;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            let current = 0;

            const updateCounter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.textContent = target.toLocaleString('en-US');
                    clearInterval(updateCounter);
                } else {
                    num.textContent = Math.floor(current).toLocaleString('en-US');
                }
            }, stepTime);
        });
    };

    const statsSection = document.getElementById('dashboard');
    if (statsSection) {
        if ('IntersectionObserver' in window) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !countersStarted) {
                        countersStarted = true;
                        startCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05, rootMargin: '100px 0px' });

            statsObserver.observe(statsSection);
        } else {
            startCounters();
        }
    } else {
        startCounters();
    }`;

if (js.includes('4. Stats Counters')) {
    const sIdx = js.indexOf('/* ==========================================================================\n       4. Stats Counters');
    const eIdx = js.indexOf('/* ==========================================================================\n       5. Interactive SVG Chart Tooltips');
    if (sIdx !== -1 && eIdx !== -1) {
        js = js.substring(0, sIdx) + newCounterCode + '\n\n\n    ' + js.substring(eIdx);
        fs.writeFileSync('script.js', js, 'utf8');
        console.log('Successfully updated script.js with robust counter logic');
    }
}

// 2. Update index.html HTML fallback values & cache buster
let html = fs.readFileSync('index.html', 'utf8');

const oldStatsGrid = `<div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.25z" fill="currentColor"></path></svg>
                    </div>
                    <div class="stat-number-wrapper">
                        <span class="stat-number" data-target="15000">0</span><span class="stat-suffix">+</span>
                    </div>
                    <h3 class="stat-label">선수 부상 및 컨디셔닝 케어 (건)</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="currentColor"></path></svg>
                    </div>
                    <div class="stat-number-wrapper">
                        <span class="stat-number" data-target="82">0</span><span class="stat-suffix"></span>
                    </div>
                    <h3 class="stat-label">교육 이수 스태프 및 학생 (명)</h3>
                </div>
                <div class="stat-card clickable-stat-card" id="btn-research-modal" onclick="openResearchModal()" style="cursor: pointer;">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z" fill="currentColor"></path></svg>
                    </div>
                    <div class="stat-number-wrapper">
                        <span class="stat-number" data-target="63">0</span>
                    </div>
                    <h3 class="stat-label">발표 논문 및 학술 연구 실적 (편) </h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M20 8h-3V4H3v12h17V8zM5 6h10v8H5V6zm13 8h-1V8h1v6z" fill="currentColor"></path></svg>
                    </div>
                    <div class="stat-number-wrapper">
                        <span class="stat-number" data-target="320">0</span><span class="stat-suffix">+</span>
                    </div>
                    <h3 class="stat-label">스포츠 대회 의료 지원 파견 (회)</h3>
                </div>
            </div>`;

const newStatsGrid = `<div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.25z" fill="currentColor"></path></svg>
                    </div>
                    <div class="stat-number-wrapper">
                        <span class="stat-number" data-target="15000">15,000</span><span class="stat-suffix">+</span>
                    </div>
                    <h3 class="stat-label">선수 부상 및 컨디셔닝 케어 (건)</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="currentColor"></path></svg>
                    </div>
                    <div class="stat-number-wrapper">
                        <span class="stat-number" data-target="82">82</span><span class="stat-suffix"></span>
                    </div>
                    <h3 class="stat-label">교육 이수 스태프 및 학생 (명)</h3>
                </div>
                <div class="stat-card clickable-stat-card" id="btn-research-modal" onclick="openResearchModal()" style="cursor: pointer;">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z" fill="currentColor"></path></svg>
                    </div>
                    <div class="stat-number-wrapper">
                        <span class="stat-number" data-target="63">63</span>
                    </div>
                    <h3 class="stat-label">발표 논문 및 학술 연구 실적 (편)</h3>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path d="M20 8h-3V4H3v12h17V8zM5 6h10v8H5V6zm13 8h-1V8h1v6z" fill="currentColor"></path></svg>
                    </div>
                    <div class="stat-number-wrapper">
                        <span class="stat-number" data-target="320">320</span><span class="stat-suffix">+</span>
                    </div>
                    <h3 class="stat-label">스포츠 대회 의료 지원 파견 (회)</h3>
                </div>
            </div>`;

if (html.includes(oldStatsGrid)) {
    html = html.replace(oldStatsGrid, newStatsGrid);
    console.log('Successfully updated stats grid in index.html');
}

// Update script cache buster
const now = Date.now();
html = html.replace(/script\.js\?v=\d+/, 'script.js?v=' + now);
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + now);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html with fresh cache buster');
