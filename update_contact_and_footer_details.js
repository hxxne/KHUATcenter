const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Contact Section in index.html
const oldContactSnippet = `                    <p class="contact-desc">
                        체육부 운동선수들의 부상 관리 및 재활, 일반 학생들의 스포츠 부상 문의, 
                        그리고 교육 연계 스태프 참가 및 연구 협업 제안은 언제든지 열려 있습니다.
                    </p>
                    
                    <ul class="contact-details">
                        <li>
                            <svg class="contact-icon" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"></path></svg>
                            <span>경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 선승관 AT센터</span>
                        </li>
                        <li>
                            <svg class="contact-icon" viewBox="0 0 24 24" width="24" height="24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a.977.977 0 0 0-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" fill="currentColor"></path></svg>
                            <span>031-201-2787 (at center) / 031-201-2786 (lab)</span>
                        </li>
                        <li>
                            <svg class="contact-icon" viewBox="0 0 24 24" width="24" height="24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"></path></svg>
                            <span><a href="mailto:khuatcenter@khu.ac.kr" style="color: inherit; text-decoration: underline;">khuatcenter@khu.ac.kr</a></span>
                        </li>
                    </ul>

                    <div class="map-stub">
                        <div class="map-bg"></div>
                        <div class="map-overlay">
                            <span>경희대 국제캠퍼스 선승관 B1F</span>
                            <a href="http://sports.khu.ac.kr/01/07_01.php" target="_blank" class="btn btn-secondary btn-sm">찾아오시는 길 안내</a>
                        </div>
                    </div>`;

const newContactSnippet = `                    <p class="contact-desc">
                        체육부 운동선수들의 부상 관리 및 재활, 일반 학생들의 스포츠 부상 문의,<br class="pc-br">
                        그리고 교육 연계 스태프 참가 및 연구 협업 제안은 언제든지 열려 있습니다.
                    </p>
                    
                    <ul class="contact-details">
                        <li>
                            <svg class="contact-icon" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"></path></svg>
                            <span>경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 선승관 AT 센터 (B1)</span>
                        </li>
                        <li>
                            <svg class="contact-icon" viewBox="0 0 24 24" width="24" height="24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a.977.977 0 0 0-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" fill="currentColor"></path></svg>
                            <span>031-201-2787 (AT center) / 031-201-2786 (Laboratory)</span>
                        </li>
                        <li>
                            <svg class="contact-icon" viewBox="0 0 24 24" width="24" height="24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"></path></svg>
                            <span><a href="mailto:khuatcenter@khu.ac.kr" style="color: inherit; text-decoration: underline;">khuatcenter@khu.ac.kr</a></span>
                        </li>
                    </ul>

                    <div class="map-stub">
                        <div class="map-bg"></div>
                        <div class="map-overlay">
                            <span>경희대 국제캠퍼스 선승관 B1</span>
                            <a href="http://sports.khu.ac.kr/01/07_01.php" target="_blank" class="btn btn-secondary btn-sm">찾아오시는 길 안내</a>
                        </div>
                    </div>`;

if (html.includes(oldContactSnippet)) {
    html = html.replace(oldContactSnippet, newContactSnippet);
    console.log('Successfully updated Contact section in index.html');
}

// 2. Update Footer in index.html
const oldFooterAddress = '<p class="footer-address">(우)17104 경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 선승관 AT 센터 (B1F)</p>';
const newFooterAddress = '<p class="footer-address">(우)17104 경기도 용인시 기흥구 덕영대로 1732 경희대학교 국제캠퍼스 선승관 AT 센터 (B1)</p>';
html = html.replace(oldFooterAddress, newFooterAddress);

const oldFooterContacts = '<p class="footer-contacts">TEL : 031-201-2787 (at center) | 031-201-2786 (lab) | <a href="https://www.instagram.com/khuatcenter/" target="_blank" rel="noopener noreferrer" style="color: #E1306C; font-weight: 700; text-decoration: none; margin-left: 6px;"><i class="fa-brands fa-instagram"></i> @khuatcenter</a></p>';
const newFooterContacts = '<p class="footer-contacts">TEL : 031-201-2787 (AT center) | 031-201-2786 (Laboratory) | <a href="https://www.instagram.com/khuatcenter/" target="_blank" rel="noopener noreferrer" style="color: #E1306C; font-weight: 700; text-decoration: none; margin-left: 6px;"><i class="fa-brands fa-instagram"></i> @khuatcenter</a></p>';
html = html.replace(oldFooterContacts, newFooterContacts);

// 3. Update style.css to guarantee clean word-wrapping in contact section
let css = fs.readFileSync('style.css', 'utf8');

const contactCSS = `
.contact-desc {
    color: var(--color-text-muted);
    font-weight: 400;
    margin-bottom: 30px;
    line-height: 1.75;
    word-break: keep-all;
    overflow-wrap: break-word;
    text-wrap: pretty;
}

.contact-details span {
    font-size: 0.95rem;
    color: var(--color-text-main);
    line-height: 1.55;
    word-break: keep-all;
    overflow-wrap: break-word;
    text-wrap: pretty;
}`;

css = css.replace(/\.contact-desc \{[\s\S]*?margin-bottom: 30px;\s*\}/, contactCSS.trim());

fs.writeFileSync('style.css', css, 'utf8');
console.log('Updated style.css with clean contact word-wrapping rules');

// Bump version
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('index.html', html, 'utf8');
console.log('Saved index.html');
