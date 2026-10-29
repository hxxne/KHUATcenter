/**
 * ============================================================================
 * 경희대학교 체육대학 AT 센터 (KHU AT Center) 다국어 전환 엔진 (i18n.js)
 * ============================================================================
 * - 지원 언어: 한국어 (ko) | English (en)
 * - 작동 방식 (비파괴적 안전한 매핑):
 *   1. 페이지가 처음 열릴 때 모든 번역 대상 요소의 원본 한국어 HTML을
 *      각 요소의 data-ko-orig 속성에 안전하게 백업합니다.
 *   2. 사용자가 'English'를 클릭하면 지정된 스포츠의학 전문 영문으로 즉시 전환합니다.
 *   3. 사용자가 '한국어'를 클릭하면 백업해 둔 원본 한국어 HTML을 100% 그대로 복원합니다.
 *   4. 선택한 언어는 브라우저(localStorage)에 저장되어 새로고침해도 유지됩니다.
 * ============================================================================
 */

(function () {
    'use strict';

    // 현재 언어 상태 ('ko' 또는 'en')
    let currentLang = 'ko';

    // ------------------------------------------------------------------------
    // 1. 셀렉터 기반 정밀 영문 번역 사전 (단일 요소 매핑)
    // ------------------------------------------------------------------------
    const SINGLE_ELEMENT_TRANSLATIONS = [
        // [PC 상단 네비게이션 메뉴]
        { selector: '#main-header .nav-menu a[href="#about"]', en: 'About' },
        { selector: '#main-header .nav-menu a[href="#pillars"]', en: 'Core Pillars' },
        { selector: '#main-header .nav-menu a[href="#dashboard"]', en: 'Milestones' },
        { selector: '#main-header .nav-menu a[href="#members"]', en: 'Members' },
        { selector: '#main-header .nav-menu a[href="#awards"]', en: 'Hall of Fame' },
        { selector: '#main-header .nav-menu a[href="#donate"]', en: 'Giving' },
        { selector: '#main-header .nav-menu a[href="#activities"]', en: 'Gallery' },
        { selector: '#main-header .nav-menu a[href="#contact"]', en: 'Contact' },

        // [모바일 전체화면 드로어 메뉴]
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#about"]', en: '<i class="fa-regular fa-building"></i> About the Center' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#pillars"]', en: '<i class="fa-solid fa-layer-group"></i> Core Pillars' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#dashboard"]', en: '<i class="fa-solid fa-chart-line"></i> AT Center Milestones' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#members"]', en: '<i class="fa-solid fa-users"></i> Members' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#awards"]', en: '<i class="fa-solid fa-award"></i> Hall of Fame &amp; Leaders' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#donate"]', en: '<i class="fa-solid fa-hand-holding-heart"></i> Development Fund' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#activities"]', en: '<i class="fa-solid fa-camera"></i> Activity Gallery' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#contact"]', en: '<i class="fa-regular fa-paper-plane"></i> Consultation &amp; Inquiry' },
        { selector: '#mobile-nav-drawer .mobile-menu a.insta-link', en: '<i class="fa-brands fa-instagram" style="color: #E1306C;"></i> Official Instagram (@khuatcenter)' },
        { selector: '#mobile-nav-drawer .mobile-drawer-footer p:first-child', en: 'AT Center (B1), Seonseung-gwan, KHU Global Campus' },

        // [히어로 메인 배너 (#hero)]
        {
            selector: '#hero .hero-title',
            en: '<span class="thin text-white">Leading the Future of Sports Medicine</span><br><span class="bold text-white">Kyung Hee University <span class="accent-text">AT Center</span></span>'
        },
        {
            selector: '#hero .hero-description',
            en: 'Located at Kyung Hee University Global Campus, the Athletic Training Center<br>integrates sports medicine education, clinical care, and scientific research.'
        },
        { selector: '#hero .hero-actions a[href="#pillars"]', en: 'Explore Core Pillars' },
        { selector: '#hero .hero-actions a[href="#contact"]', en: 'Book a Consultation' },

        // [센터 소개 섹션 (#about)]
        { selector: '#about .section-title', en: 'About the Center' },
        { selector: '#about .section-subtitle', en: 'A Practical Sports Medicine Hub for Athletic Performance &amp; Campus Wellness' },
        {
            selector: '#about .about-hero-caption',
            en: '<i class="fa-solid fa-location-dot" style="color: #f87171; margin-right: 4px;"></i> Kyung Hee University Global Campus Open-Air Theater'
        },
        {
            selector: '#about .about-lead',
            en: 'Located in Seonseung-gwan, the <strong>Athletic Training Center (AT Center)</strong> is a practical sports medicine space<br class="pc-br"> operated by graduate researchers and undergraduate staff of the College of Physical Education.'
        },
        {
            selector: '#about .about-detail',
            en: 'We provide specialized conditioning and rehabilitation for varsity student-athletes, faculty, and students,<br class="pc-br"> advancing sports medicine through the synergy of <span class="highlight-word">Education</span>, <span class="highlight-word">Research</span>, and <span class="highlight-word">Service</span>.'
        },

        // [핵심 사업 섹션 (#pillars)]
        { selector: '#pillars .section-title', en: 'Core Pillars' },
        { selector: '#pillars .section-subtitle', en: 'Education · Research · Service' },

        // Pillar 1: Education
        { selector: '.bento-card-edu .bento-title', en: 'Education' },
        { selector: '.bento-card-edu .bento-subtitle', en: 'Nurturing Sports Medicine Specialists' },
        { selector: '.bento-card-edu .bento-tags', en: '<span>#Curriculum</span><span>#ClinicalSkills</span><span>#Practicum</span>' },
        { selector: '.bento-card-edu .bento-action-btn span', en: 'View Details' },

        // Pillar 2: Research
        { selector: '.bento-card-res .bento-title', en: 'Research' },
        { selector: '.bento-card-res .bento-subtitle', en: 'Evidence-Based Sports Medicine (EBM)' },
        { selector: '.bento-card-res .bento-tags', en: '<span>#Biomechanics</span><span>#ClinicalData</span><span>#Papers</span>' },
        { selector: '.bento-card-res .bento-action-btn span', en: 'View Details' },

        // Pillar 3: Service
        { selector: '.bento-card-srv .bento-title', en: 'Service' },
        { selector: '.bento-card-srv .bento-subtitle', en: 'Sports Care &amp; On-Field Medical Support' },
        { selector: '.bento-card-srv .bento-tags', en: '<span>#Conditioning</span><span>#MedicalSupport</span><span>#Rehab</span>' },
        { selector: '.bento-card-srv .bento-action-btn span', en: 'View Details' },

        // [핵심 사업 상세 모달 (#pillar-detail-modal)]
        { selector: '#pmodal-main-title', en: 'Core Pillars Overview' },
        { selector: '#pillar-detail-modal .pmodal-desc', en: 'Detailed initiatives and vision of KHU AT Center\'s three core pillars: Education, Research, and Service.' },
        { selector: '#ptab-btn-edu .ptab-text', en: '01. Education' },
        { selector: '#ptab-btn-res .ptab-text', en: '02. Research' },
        { selector: '#ptab-btn-srv .ptab-text', en: '03. Service' },
        {
            selector: '#pmodal-panel-edu .quote-text',
            en: '"By combining systematic academic theory with rich on-field clinical practice, we cultivate the next generation of elite sports medicine and athletic training professionals."'
        },
        { selector: '#pmodal-panel-edu .quote-author', en: 'KHU AT Center Education Vision' },
        {
            selector: '#pmodal-panel-res .quote-text',
            en: '"We scientifically investigate biomechanical injury mechanisms in sports and lead Evidence-Based Sports Medicine (EBM)."'
        },
        { selector: '#pmodal-panel-res .quote-author', en: 'KHU AT Center Research Vision' },
        {
            selector: '#pmodal-panel-res .deeplink-text',
            en: '<strong>View All 63 Research Publications</strong><span>Explore our full list of verified SCIE &amp; KCI journal articles</span>'
        },
        {
            selector: '#pmodal-panel-srv .quote-text',
            en: '"From enhancing elite athlete performance to promoting campus-wide wellness, we deliver top-tier professional sports rehabilitation care."'
        },
        { selector: '#pmodal-panel-srv .quote-author', en: 'KHU AT Center Service Vision' },

        // [AT 센터 누적 기록 대시보드 (#dashboard)]
        { selector: '#dashboard .section-title', en: 'AT Center Milestones' },
        { selector: '#dashboard .section-subtitle', en: 'Key achievements in Education, Research, and Clinical Service built by KHU AT Center.' },
        // 01 교육 지표
        { selector: '#dashboard .card-edu .stat-unit', en: 'Trainees' },
        { selector: '#dashboard .card-edu .editorial-card-title', en: 'Completed Basic AT Training' },
        { selector: '#dashboard .card-edu .editorial-card-desc', en: '100-hour clinical observation course &amp;<br>full academic seminar curriculum completed' },
        { selector: '#dashboard .card-edu .editorial-spec-tag span', en: 'Includes Modality Training' },
        // 02 연구 지표
        { selector: '#dashboard .card-res .stat-unit', en: 'Papers' },
        { selector: '#dashboard .card-res .editorial-card-title', en: 'Published Research Papers' },
        { selector: '#dashboard .card-res .editorial-card-desc', en: 'Published in top international (SCI/SCIE)<br>&amp; KCI sports medicine journals' },
        { selector: '#dashboard .card-res .editorial-action-btn span', en: 'View All 63 Publications' },
        // 03 서비스 지표
        { selector: '#dashboard .card-srv .stat-unit', en: 'Cases' },
        { selector: '#dashboard .card-srv .editorial-card-title', en: 'Injury &amp; Conditioning Care' },
        { selector: '#dashboard .card-srv .editorial-card-desc', en: 'Acute &amp; chronic rehab, conditioning,<br>resistance training, and sports taping' },
        { selector: '#dashboard .card-srv .editorial-spec-tag span', en: 'Dedicated Support for 12 Varsity Teams' },

        // [연구 논문 모달 (#research-modal)]
        { selector: '#research-modal .research-modal-header h2', en: 'Research &amp; Academic Publications' },
        { selector: '#research-modal .research-modal-header p', en: 'Explore our research achievements across 4 core Evidence-Based Sports Medicine (EBM) domains.' },
        {
            selector: '#rtab-btn-1',
            en: 'Part 1. Sports Rehabilitation <span style="background: rgba(165,0,52,0.1); color: #A50034; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">29</span>'
        },
        {
            selector: '#rtab-btn-2',
            en: 'Part 2. Fatigue Recovery <span style="background: rgba(0,0,0,0.06); color: #64748b; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">13</span>'
        },
        {
            selector: '#rtab-btn-3',
            en: 'Part 3. Performance Enhancement <span style="background: rgba(0,0,0,0.06); color: #64748b; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">15</span>'
        },
        {
            selector: '#rtab-btn-4',
            en: 'Part 4. Injury Epidemiology <span style="background: rgba(0,0,0,0.06); color: #64748b; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">6</span>'
        },

        // [구성원 소개 (#members)]
        { selector: '#members .section-title', en: 'Members' },
        { selector: '#btn-tab-sports', en: 'Varsity AT' },
        { selector: '#btn-tab-rehab', en: 'Sports Rehab Instructors' },

        // [역대 수상자 및 리더 (#awards)]
        { selector: '#awards .section-title', en: 'Hall of Fame &amp; Leadership' },
        { selector: '#awards .section-subtitle', en: 'Official archive of student award recipients and leadership at Seonseung-gwan AT Center (2015–2025).' },
        { selector: '#stream-past-leaders .stream-sub-title', en: 'Past Leaders' },
        { selector: '#stream-past-leaders .stream-sub-desc', en: 'Former team leaders who directed academic research and clinical field practice across each division.' },
        { selector: '#stream-graduate-assistants .stream-sub-title', en: 'Graduate Alumni' },
        { selector: '#stream-graduate-assistants .stream-sub-desc', en: 'Graduate alumni who completed academic research and clinical field training at Seonseung-gwan AT Center.' },

        // [발전기금 (#donate)]
        { selector: '#donate .dh-subtitle', en: 'KHU AT Center Development Fund' },
        { selector: '#donate .dh-title', en: 'Nurturing Future Sports Medicine Leaders' },
        { selector: '#donate .dh-desc', en: 'Your generous contribution is transparently used to improve student research and educational environments, and qualifies for tax benefits.' },
        { selector: '#donate .mb-header', en: 'Official Giving Guide' },
        { selector: '#donate .btn-donate-link', en: '<i class="fa-solid fa-link"></i> Official Donation Page' },
        { selector: '#donate .donation-instructions h3', en: '✅ How to Participate in Giving' },
        { selector: '#donate .donation-instructions > p', en: 'Please visit the official donation page above and enter the details as follows:' },
        {
            selector: '#donate .donation-instructions ol',
            en: '<li>Under <strong>Recipient (기부하실 곳)</strong>, enter <span style="color: var(--color-primary, #901522); font-weight: 600;">\'AT 센터\' (AT Center)</span></li>' +
                '<li>Select <strong>\'직접 입력\' (Direct Input)</strong> from the dropdown and enter <span style="color: var(--color-primary, #901522); font-weight: 600;">\'AT 센터\'</span></li>' +
                '<li><strong>Purpose of Donation (기부 사유)</strong>: AT 센터 운영 (AT Center Operations)</li>'
        },

        // [활동 사진 (#activities)]
        { selector: '#activities .section-title', en: 'Activity Gallery' },
        { selector: '#activities .section-subtitle', en: 'An archive capturing vivid moments of athlete care and center activities.' },
        { selector: '#activities .gallery-bottom-cta strong', en: 'Follow our official Instagram for more live updates!' },
        { selector: '#activities .gallery-bottom-cta p', en: 'We share weekly stories of tournament medical support, training fields, and education.' },
        { selector: '#activities .btn-insta-visit', en: 'Visit @khuatcenter <i class="fa-solid fa-arrow-up-right-from-square"></i>' },

        // [상담 및 문의 (#contact)]
        { selector: '#contact .section-title', en: 'Support &amp; Inquiry' },
        { selector: '#contact .section-subtitle', en: 'Rehabilitation Consultation &amp; Education/Research Collaboration' },
        { selector: '#contact .contact-info h3', en: 'KHU College of Physical Education AT Center' },
        {
            selector: '#contact .contact-desc',
            en: 'Inquiries regarding varsity athlete injury management &amp; rehabilitation, general student sports injuries, educational staff participation, and research collaborations are always welcome.'
        },
        {
            selector: '#contact .contact-details li:first-child span',
            en: 'AT Center (B1), Seonseung-gwan, KHU Global Campus, 1732 Deogyeong-daero, Giheung-gu, Yongin-si, Gyeonggi-do'
        },
        { selector: '#contact .map-overlay span', en: 'Seonseung-gwan B1, KHU Global Campus' },
        { selector: '#contact .map-overlay a', en: 'Directions &amp; Map' },
        { selector: 'label[for="form-name"]', en: 'Name *' },
        { selector: 'label[for="form-phone"]', en: 'Phone *' },
        { selector: 'label[for="form-affiliation"]', en: 'Affiliation *' },
        { selector: 'label[for="form-type"]', en: 'Inquiry Type *' },
        { selector: 'label[for="form-message"]', en: 'Detailed Inquiry *' },
        { selector: 'label[for="form-privacy"]', en: 'I agree to the collection and use of personal information for responding to this inquiry. *' },
        { selector: '#form-submit-btn .btn-text', en: 'Submit Inquiry' },
        { selector: '#form-success-overlay h3', en: 'Inquiry Submitted Successfully' },
        { selector: '#form-success-overlay p', en: 'Our staff will contact you shortly<br>at the phone number provided.' },
        { selector: '#success-close-btn', en: 'Back' },

        // [푸터 (#main-footer)]
        { selector: '#main-footer .footer-info h4', en: 'Kyung Hee University Seonseung-gwan AT Center' },
        {
            selector: '#main-footer .footer-address',
            en: '(17104) AT Center (B1), Seonseung-gwan, Kyung Hee University Global Campus, 1732 Deogyeong-daero, Giheung-gu, Yongin-si, Gyeonggi-do, Republic of Korea'
        },
        { selector: '#main-footer .privacy-policy', en: 'Privacy Policy' }
    ];

    // ------------------------------------------------------------------------
    // 2. 다중 리스트 요소(순서 기반) 번역 데이터
    // ------------------------------------------------------------------------
    const LIST_TRANSLATIONS = [
        // 센터 소개 5대 하이라이트 (#about)
        {
            selector: '#about .about-clean-item .about-clean-txt',
            items: [
                'Training Field Experts in Sports Medicine',
                'Clinical &amp; Data-Driven Performance Research',
                'Dedicated Care for Elite Student-Athletes',
                'Sports Rehabilitation for Faculty &amp; Staff',
                'On-Site Medical Care for Sports Events'
            ]
        },
        // 핵심 사업 슬라이드 캡션 - 교육 (#pillars)
        {
            selector: '.bento-card-edu .bento-slide-caption',
            items: [
                'Regular Academic Seminars &amp; Practical Training',
                'In-Service Hands-On &amp; Technique Practice',
                'Equipment Training &amp; Injury Case Lectures'
            ]
        },
        // 핵심 사업 슬라이드 캡션 - 연구 (#pillars)
        {
            selector: '.bento-card-res .bento-slide-caption',
            items: [
                'Presentations at Major Academic Conferences',
                'World Congress on Kinesiology Participation',
                'ECSS International Sports Medicine Exchange'
            ]
        },
        // 핵심 사업 슬라이드 캡션 - 서비스 (#pillars)
        {
            selector: '.bento-card-srv .bento-slide-caption',
            items: [
                'On-Field Sports Medicine Support at Tournaments',
                'Medical Care for Marathon &amp; Running Events',
                'Dedicated Dispatch for National Sports Festival'
            ]
        },
        // 핵심 사업 모달 슬라이드 캡션 - 교육
        {
            selector: '#pmodal-panel-edu .pmodal-slide-caption',
            items: [
                'Regular Academic Seminars &amp; Taping Practice',
                'In-Service Hands-On &amp; Technique Practice',
                'Equipment Training &amp; Injury Case Lectures'
            ]
        },
        // 핵심 사업 모달 슬라이드 캡션 - 연구
        {
            selector: '#pmodal-panel-res .pmodal-slide-caption',
            items: [
                'Presentations at Major Academic Conferences',
                'World Congress on Kinesiology Participation',
                'ECSS International Sports Medicine Exchange'
            ]
        },
        // 핵심 사업 모달 슬라이드 캡션 - 서비스
        {
            selector: '#pmodal-panel-srv .pmodal-slide-caption',
            items: [
                'On-Field Sports Medicine Support at Tournaments',
                'Medical Care for Marathon &amp; Running Events',
                'Dedicated Dispatch for National Sports Festival'
            ]
        },
        // 핵심 사업 모달 4대 핵심 영역 배지
        {
            selector: '#pillar-detail-modal .pmodal-section-badge',
            items: [
                '<i class="fa-solid fa-compass"></i> 4 Key Focus Areas',
                '<i class="fa-solid fa-compass"></i> 4 Key Focus Areas',
                '<i class="fa-solid fa-compass"></i> 4 Key Focus Areas'
            ]
        },
        // 핵심 사업 모달 12개 피처 카드 (교육 4 + 연구 4 + 서비스 4)
        {
            selector: '#pillar-detail-modal .pmodal-feat-info',
            items: [
                // Education 1~4
                '<h4>Academic Curriculum Integration</h4><p>Advanced coursework focused on injury evaluation, management, and rehabilitation practice</p><div class="pmodal-feat-tags"><span>#AdvancedMajor</span><span>#PracticalLink</span></div>',
                '<h4>Foundational AT Clinical Training</h4><p>100 hours of clinical observation and hands-on CPR &amp; First Aid instruction</p><div class="pmodal-feat-tags"><span>#100hObservation</span><span>#FirstAidCert</span></div>',
                '<h4>Academic Study &amp; Journal Club</h4><p>In-depth functional anatomy study, latest sports medicine paper reviews &amp; research</p><div class="pmodal-feat-tags"><span>#FunctionalAnatomy</span><span>#JournalClub</span></div>',
                '<h4>Regular Seminars &amp; In-Service</h4><p>Bi-weekly athlete injury case studies and regular academic seminars</p><div class="pmodal-feat-tags"><span>#CaseStudies</span><span>#ClinicalCompetency</span></div>',
                // Research 1~4
                '<h4>Injury Mechanism &amp; Prevention</h4><p>Identifying injury risk factors based on biomechanical analysis</p><div class="pmodal-feat-tags"><span>#Biomechanics</span><span>#RiskFactors</span></div>',
                '<h4>Clinical Rehab &amp; Pain Relief</h4><p>Validating clinical exercise therapy outcomes of phased rehabilitation protocols</p><div class="pmodal-feat-tags"><span>#FunctionalRehab</span><span>#ClinicalValidation</span></div>',
                '<h4>Collegiate Sports Epidemiology</h4><p>Analyzing injury trends in elite varsity teams using Injury Surveillance Systems (ISS)</p><div class="pmodal-feat-tags"><span>#InjurySurveillance</span><span>#DataAnalytics</span></div>',
                '<h4>Training &amp; Recovery Strategies</h4><p>Scientific evaluation of warm-up, resistance exercise, and recovery modalities</p><div class="pmodal-feat-tags"><span>#Recovery</span><span>#Performance</span></div>',
                // Service 1~4
                '<h4>Dedicated Care for Elite Athletes</h4><p>Team-assigned AT dispatch, injury prevention, and tailored conditioning</p><div class="pmodal-feat-tags"><span>#TeamATDispatch</span><span>#AthleteCare</span></div>',
                '<h4>Faculty, Staff &amp; Student Care</h4><p>Campus sports rehabilitation programs in partnership with the Sports Facility Corps</p><div class="pmodal-feat-tags"><span>#CampusRehab</span><span>#WellnessProgram</span></div>',
                '<h4>On-Site Event Medical Support</h4><p>AT medical dispatch for training camps, National Sports Festival, and major tournaments</p><div class="pmodal-feat-tags"><span>#NationalGames</span><span>#EventMedical</span></div>',
                '<h4>Injury Management &amp; Return-to-Play</h4><p>Monitored, step-by-step safe Return-to-Play (RTP) guidance based on injury history</p><div class="pmodal-feat-tags"><span>#ReturnToPlay(RTP)</span><span>#InjuryMonitoring</span></div>'
            ]
        },
        // 구성원 섹션 그룹 타이틀 (00 ~ 06)
        {
            selector: '#members .modern-group-title',
            items: [
                '<span class="seq">00</span> Advisory Committee',
                '<span class="seq">01</span> Faculty',
                '<span class="seq">02</span> Leaders',
                '<span class="seq">03</span> Graduate Students',
                '<span class="seq">04</span> AT Club Executives',
                '<span class="seq">05</span> Staff',
                '<span class="seq">06</span> AT Center Assistants'
            ]
        },
        // 활동 사진 메인 카테고리 탭 4개
        {
            selector: '#activities .gallery-filter-btn',
            items: [
                '<i class="fa-solid fa-folder-open"></i> By Team',
                '<i class="fa-solid fa-kit-medical"></i> Center Activities',
                '<i class="fa-solid fa-truck-medical"></i> Medical Support',
                '<i class="fa-solid fa-graduation-cap"></i> Seminars &amp; Awards'
            ]
        },
        // 활동 사진 부서별 픽토그램 버튼 이름 13개
        {
            selector: '#activities .dept-picto-btn .dpb-name',
            items: [
                'All Teams',
                'Soccer',
                'Baseball',
                'Basketball',
                'Volleyball',
                'Rugby',
                'Golf',
                'Badminton',
                'Handball',
                'TKD Demo',
                'TKD Kyorugi',
                'TKD Poomsae',
                'AT Center'
            ]
        },
        // 활동 사진 갤러리 카드 11개 배지 (센터/의무지원/세미나)
        {
            selector: '#activities .gallery-card-item:not(.dept-gallery-card) .gallery-badge',
            items: [
                'New Cohort Study',
                'Orientation',
                'The Brain Award',
                'Conference Presentation',
                'Tournament Dispatch',
                'Rivalry Match Support',
                'Marathon Medical Care',
                'Annual Awards',
                'Hall of Fame Board',
                'Regular Seminar',
                'Fall Workshop'
            ]
        },
        // 활동 사진 갤러리 카드 11개 제목
        {
            selector: '#activities .gallery-card-item:not(.dept-gallery-card) .gallery-card-title',
            items: [
                'New Cohort 10-Week Study &amp; Practical Training',
                '2026 27th Cohort Official Orientation',
                'The Brain Awards for Lab — Excellence Prize',
                '63rd KSSO Spring Congress Research Presentation',
                '37th KHU President\'s Cup High School Taekwondo',
                '1st Lion Match (KHU vs. Hanyang) Medical Support',
                '2025 Go Free Run Marathon Official Medical Care',
                '2025 AT Center Student Awards Ceremony',
                'AT Student Awards Hall of Fame Induction',
                'AT Center Spring Seminar &amp; Alumni Networking',
                'Fall Regular Seminar &amp; Sports Medicine Workshop'
            ]
        },
        // 활동 사진 갤러리 카드 11개 하단 메타 설명
        {
            selector: '#activities .gallery-card-item:not(.dept-gallery-card) .gallery-card-meta',
            items: [
                '<i class="fa-solid fa-chalkboard-user"></i> Foundational theory &amp; skills linked to 10-week Observation',
                '<i class="fa-solid fa-users"></i> Seonseung-gwan B1 Lecture Hall — Center system &amp; guide',
                '<i class="fa-solid fa-award"></i> Selected as an Outstanding Lab by KHU Graduate School',
                '<i class="fa-solid fa-book-open"></i> Grand Walkerhill Seoul — Cartilage &amp; rehabilitation research',
                '<i class="fa-solid fa-truck-medical"></i> Hongcheon, Gangwon — 10-day dedicated care by 16 AT staff',
                '<i class="fa-solid fa-truck-medical"></i> Acute injury care &amp; taping at soccer and basketball venues',
                '<i class="fa-solid fa-person-running"></i> Yeouido Park — Sports massage &amp; physical recovery support',
                '<i class="fa-solid fa-trophy"></i> Presentation of AT Student of the Year, Inspiration &amp; Rookie',
                '<i class="fa-solid fa-award"></i> 2025 AT of the Year Seung-A Yoo · Inspiration Se-Min Park',
                '<i class="fa-solid fa-graduation-cap"></i> Theory presentations, taping practice &amp; foot volleyball',
                '<i class="fa-solid fa-user-graduate"></i> Academic exchange among club members, grads &amp; alumni'
            ]
        }
    ];

    // ------------------------------------------------------------------------
    // 3. 텍스트 패턴 및 용어 자동 치환 사전 (구성원 카드, 수상자, 동문 등)
    // ------------------------------------------------------------------------
    const DEPARTMENT_KO_TO_EN = {
        '축구부': 'Soccer Team',
        '야구부': 'Baseball Team',
        '농구부': 'Basketball Team',
        '배구부': 'Volleyball Team',
        '럭비부': 'Rugby Team',
        '골프부': 'Golf Team',
        '배드민턴부': 'Badminton Team',
        '핸드볼부': 'Handball Team',
        '태권도 시범단': 'TKD Demo Team',
        '태권도 겨루기부': 'TKD Kyorugi Team',
        '태권도 품새부': 'TKD Poomsae Team',
        'AT Center (센터 AT)': 'AT Center'
    };

    // 06 AT 센터 보조 카드 헤더용 간결한 부서명
    const ASSISTANT_DEPT_TITLE_EN = {
        '축구부': 'Soccer',
        '야구부': 'Baseball',
        '농구부': 'Basketball',
        '배구부': 'Volleyball',
        '럭비부': 'Rugby',
        '골프부': 'Golf',
        '배드민턴부': 'Badminton',
        '핸드볼부': 'Handball',
        '태권도 시범단': 'TKD Demo',
        '태권도 겨루기부': 'TKD Kyorugi',
        '태권도 품새부': 'TKD Poomsae',
        'AT Center (센터 AT)': 'AT Center'
    };

    const AWARD_DESC_KO_TO_EN = {
        '올해의 AT 최우수 학생상': 'AT Student of the Year Award',
        '영감 및 헌신상': 'Inspiration & Dedication Award',
        '올해의 신인상': 'Rookie of the Year Award',
        '올해의 신인상 (2관왕)': 'Rookie of the Year (2x Winner)'
    };

    const GA_BADGE_KO_TO_EN = {
        '연구/교육': 'Res/Edu',
        '스포츠재활': 'Rehab',
        '배구': 'Volleyball',
        '배드민턴': 'Badminton',
        '축구': 'Soccer',
        '야구': 'Baseball',
        '품새': 'Poomsae',
        '시범단': 'TKD Demo',
        '럭비': 'Rugby',
        '농구': 'Basketball',
        '골프': 'Golf',
        '태권도': 'Taekwondo',
        '핸드볼': 'Handball'
    };

    // 구성원 카드 내 세부 항목 줄 단위 영문 변환 함수 (350px 카드 내 1줄 유지 보장)
    function translateMemberBulletLine(text) {
        let t = text.trim();

        const exactBulletMap = {
            '학위명: 체육과학 박사(Physical Medicine & Rehabilitation 전공)': 'Degree: Ph.D. in Physical Medicine & Rehab',
            '최종학력: Brigham Young University': 'Alma Mater: Brigham Young University',
            '담당과목: 운동손상, 재활모달리티, 저항운동과컨디셔닝': 'Courses: Athletic Injuries, Modalities, S&C',
            '연구실: 체422호 (031-201-2721)': 'Office: College of PE #422 (031-201-2721)',
            '학위명: 스포츠심리학-운동제어 박사(Motor Control 전공)': 'Degree: Ph.D. in Motor Control & Sport Psych',
            '최종학력: 성균관대학교': 'Alma Mater: Sungkyunkwan University',
            '담당과목: 운동손상평가': 'Courses: Evaluation of Athletic Injuries',
            '연구실: 경희대학교 선승관 AT Center': 'Office: Seonseung-gwan AT Center, KHU',
            '학위명: 체육학 석사 (Athletic Training 전공)': 'Degree: M.S. in PE (Athletic Training)',
            '학위명: 체육학 석사 (Sports Medicine and Science 전공)': 'Degree: M.S. in PE (Sports Medicine & Sci.)',
            '최종학력: 경희대학교': 'Alma Mater: Kyung Hee University',
            '담당부서: 체육부': 'Division: Varsity Athletics Department',
            '담당부서: 체육시설운영단': 'Division: Sports Facility Management Corps',
            '담당과목: 재활운동실습, 스포츠테이핑실습': 'Courses: Rehab Exercise & Sports Taping Lab',
            '담당과목: 저항운동과컨디셔닝, 운동손상관리, 저항운동실습': 'Courses: S&C, Athletic Injury Management',
            '경희대학교 무용학과 졸업': 'B.A. in Dance, Kyung Hee University',
            '경희대학교 무용학부 한국무용 졸업': 'B.A. in Korean Dance, Kyung Hee Univ.',
            '경희대학교 스포츠의학과 졸업': 'B.S. in Sports Medicine, Kyung Hee Univ.',
            '경희대학교 태권도학과 졸업': 'B.S. in Taekwondo, Kyung Hee University',
            '조선대학교 체육학과 졸업': 'B.S. in Physical Education, Chosun Univ.',
            '성결대학교 체육교육과 졸업': 'B.S. in Physical Education, Sungkyul Univ.',
            '경희대학교 체육대학': 'College of Physical Education, KHU',
            'AT 동아리 회장': 'President, Athletic Training Club',
            'AT 동아리 부회장': 'Vice President, Athletic Training Club',
            'AT 동아리 총무': 'Secretary General, Athletic Training Club',
            '스포츠재활 강사': 'Sports Rehabilitation Instructor',
            'AT Center 센터 AT': 'Center Athletic Trainer (AT Center)',
            '센터 AT': 'Center Athletic Trainer'
        };

        if (exactBulletMap[t]) return exactBulletMap[t];

        // 일반대학원 기수
        const gradMatch = t.match(/^일반대학원\s*(\d+)기$/);
        if (gradMatch) {
            return `KHU Graduate School of PE (Cohort ${gradMatch[1]})`;
        }

        // 연구주제 (카드 폭에 맞게 영문 변환)
        if (t.startsWith('연구주제:')) {
            return t
                .replace('연구주제: 여성 성인 체형별 혈액지표·신체구성 및 신체기능 비교', 'Research: Blood Biomarkers, Body Comp. & Function in Women')
                .replace('연구주제: 무릎 및 발목 골관절염 및 신체활동 설문조사', 'Research: Knee & Ankle OA & Physical Activity Survey')
                .replace('연구주제: 대학 핸드볼 선수 훈련부하 비율 및 부상 역학 (2026)', 'Research: Injury & ACWR in Collegiate Handball (2026)')
                .replace('연구주제: 저체중, 마른비만, 정상체중 여성 성인의 혈액지표, 신체구성, 신체기능 및 자가보고 설문 비교', 'Research: Blood Biomarkers, Body Comp. & Function in Women')
                .replace('연구주제: 1. A One-Year Follow-Up of Musculoskeletal Injury Epidemiology and the Acute: Chronic Workload Ratio in Collegiate Taekwondo Kyorugi (2024 운동학 학술대회)', 'Research: Injury & ACWR in Collegiate Handball (2026)')
                .replace('연구주제: 스포츠 부상 재활 및 맞춤형 체력 관리 프로그램', 'Research: Sports Injury Rehab & Conditioning')
                .replace('연구주제: 품새 선수 기능성 움직임 평가 및 자세 교정', 'Research: Functional Movement in Poomsae')
                .replace('연구주제: 럭비 컨택트 손상 분석 및 파워 컨디셔닝', 'Research: Rugby Contact Injury & Power S&C')
                .replace('연구주제: 운동 동호인들의 무릎, 발목 골관절염 실태조사 진행중', 'Research: Knee & Ankle OA in Active Adults')
                .replace('연구주제: 태권도 겨루기 손상 분석 및 선수 복귀 재활', 'Research: Taekwondo Injury & Return-to-Play');
        }

        // 학과 + 학번 패턴
        const majorYearMatch = t.match(/^(스포츠의학과|체육학과|스포츠지도학과|태권도학과)\s*(\d+)학번$/);
        if (majorYearMatch) {
            const majorMap = {
                '스포츠의학과': 'Sports Medicine',
                '체육학과': 'Physical Education',
                '스포츠지도학과': 'Sports Coaching',
                '태권도학과': 'Taekwondo'
            };
            return `${majorMap[majorYearMatch[1]] || majorYearMatch[1]} (Class of '${majorYearMatch[2]})`;
        }

        if (t === '일반대학원 체육학과 석사 졸업') {
            return 'M.S. in Physical Education, KHU';
        }
        if (t === '스포츠의학과 학사과정') {
            return 'B.S. Program in Sports Medicine, KHU';
        }
        if (t === '스포츠지도학과 학사과정') {
            return 'B.S. Program in Sports Coaching, KHU';
        }

        // 전담 AT / 보조 AT 패턴
        if (t.endsWith('전담 AT')) {
            const teamKo = t.replace('전담 AT', '').trim();
            const teamEn = DEPARTMENT_KO_TO_EN[teamKo] || teamKo;
            return `Head AT, ${teamEn}`;
        }
        if (t.endsWith('보조 AT')) {
            const teamKo = t.replace('보조 AT', '').trim();
            const teamEn = DEPARTMENT_KO_TO_EN[teamKo] || teamKo;
            return `Assistant AT, ${teamEn}`;
        }

        return t;
    }

    // 프로필 상세 모달(#prof-modal) 내부 텍스트 영문 변환 보조 함수
    function translateProfModalText(str) {
        if (!str) return str;
        let s = str.trim();
        return s
            .replace(/현\)\s*/g, 'Current: ')
            .replace(/전\)\s*/g, 'Former: ')
            .replace(/경희대학교 일반대학원 석사과정 \((\d+)기\)/g, 'M.S. Program, KHU Graduate School (Cohort $1)')
            .replace(/일반대학원 체육학과 석사 졸업/g, 'M.S. in Physical Education, KHU Graduate School')
            .replace(/덕성여자대학교 레저스포츠학과 졸업/g, 'B.S. in Leisure Sports, Duksung Women\'s Univ.')
            .replace(/경희대학교 스포츠의학과 졸업/g, 'B.S. in Sports Medicine, KHU')
            .replace(/경희대학교 태권도학과 졸업/g, 'B.S. in Taekwondo, KHU')
            .replace(/경희대학교 무용학부 한국무용 졸업/g, 'B.A. in Korean Dance, KHU')
            .replace(/경희대학교 무용학과 졸업/g, 'B.A. in Dance, KHU')
            .replace(/무용학부 한국무용/g, 'School of Dance (Korean Dance)')
            .replace(/저체중, 마른비만, 정상체중 여성 성인의 혈액지표, 신체구성, 신체기능 및 자가보고 설문 비교/g, 'Comparison of Blood Biomarkers, Body Composition, Physical Function, and Self-Reported Questionnaires in Underweight, Normal-Weight Obese, and Normal-Weight Adult Women')
            .replace(/무릎 및 발목 골관절염 및 신체활동 설문조사/g, 'Knee and Ankle Osteoarthritis and Physical Activity Survey')
            .replace(/2024 운동학 학술대회/g, '2024 Korean Academy of Kinesiology Conference')
            .replace(/조선대학교 체육학과 졸업/g, 'B.S. in Physical Education, Chosun Univ.')
            .replace(/성결대학교 체육교육과 졸업/g, 'B.S. in Physical Education, Sungkyul Univ.')
            .replace(/체육과학 박사\(Physical Medicine & Rehabilitation 전공\)/g, 'Ph.D. in Physical Medicine & Rehabilitation')
            .replace(/스포츠심리학-운동제어 박사\(Motor Control 전공\)/g, 'Ph.D. in Sport Psychology & Motor Control')
            .replace(/체육학 석사 \(Athletic Training 전공\)/g, 'M.S. in Physical Education (Athletic Training)')
            .replace(/체육학 석사 \(Sports Medicine and Science 전공\)/g, 'M.S. in Physical Education (Sports Medicine & Science)')
            .replace(/경희대학교 선승관 AT Center/g, 'Seonseung-gwan AT Center, KHU')
            .replace(/선승관 AT center/gi, 'Seonseung-gwan AT Center')
            .replace(/경희대학교 AT Center/g, 'KHU AT Center')
            .replace(/경희대학교 체육대학 스포츠의학과 교수/g, 'Professor, Dept. of Sports Medicine, KHU')
            .replace(/경희대학교 생명윤리위원회 위원/g, 'Member, Institutional Review Board (IRB), KHU')
            .replace(/경희대학교 스포츠의학과 학과장/g, 'Chair, Dept. of Sports Medicine, KHU')
            .replace(/경희대학교 스포츠의학과 강사/g, 'Lecturer, Dept. of Sports Medicine, KHU')
            .replace(/경희대학교 체육대학 강사/g, 'Lecturer, College of Physical Education, KHU')
            .replace(/경희대학교 체육시설운영단 팀장/g, 'Team Lead, KHU Sports Facility Management Corps')
            .replace(/스포츠재활팀 팀장/g, 'Sports Rehabilitation Team Lead')
            .replace(/경희대학교/g, 'Kyung Hee Univ.')
            .replace(/성균관대학교/g, 'Sungkyunkwan Univ.')
            .replace(/스포츠의학과/g, 'Dept. of Sports Medicine')
            .replace(/체육학과/g, 'Dept. of Physical Education')
            .replace(/스포츠지도학과/g, 'Dept. of Sports Coaching')
            .replace(/태권도학과/g, 'Dept. of Taekwondo')
            .replace(/체육교육과/g, 'Dept. of Physical Education')
            .replace(/무용학과/g, 'Dept. of Dance')
            .replace(/체육대학/g, 'College of PE')
            .replace(/체육부/g, 'Varsity Athletics')
            .replace(/체육시설운영단/g, 'Sports Facility Corps')
            .replace(/센터장/g, 'Director')
            .replace(/연구교수/g, 'Research Professor')
            .replace(/연구팀장/g, 'Research Team Lead')
            .replace(/재활팀장/g, 'Rehab Team Lead')
            .replace(/실장/g, 'General Manager')
            .replace(/교수/g, 'Professor')
            .replace(/대학원생/g, 'Graduate Researcher')
            .replace(/연구원/g, 'Researcher')
            .replace(/스포츠재활 강사/g, 'Sports Rehab Instructor')
            .replace(/AT 동아리 회장/g, 'AT Club President')
            .replace(/AT 동아리 부회장/g, 'AT Club Vice President')
            .replace(/AT 동아리 총무/g, 'AT Club Secretary')
            .replace(/축구부/g, 'Soccer Team')
            .replace(/야구부/g, 'Baseball Team')
            .replace(/농구부/g, 'Basketball Team')
            .replace(/배구부/g, 'Volleyball Team')
            .replace(/럭비부/g, 'Rugby Team')
            .replace(/골프부/g, 'Golf Team')
            .replace(/배드민턴부/g, 'Badminton Team')
            .replace(/핸드볼부/g, 'Handball Team')
            .replace(/태권도 시범단/g, 'TKD Demo Team')
            .replace(/태권도 겨루기부/g, 'TKD Kyorugi Team')
            .replace(/태권도 품새부/g, 'TKD Poomsae Team')
            .replace(/전담 AT/g, 'Head AT')
            .replace(/보조 AT/g, 'Assistant AT')
            .replace(/센터 AT/g, 'Center AT')
            .replace(/(\d+)학번/g, 'Class of \'$1')
            .replace(/석사 (\d+)기/g, 'M.S. Cohort $1')
            .replace(/학사과정/g, 'Undergraduate')
            .replace(/학사 졸업/g, 'B.S. Graduate')
            .replace(/석사 졸업/g, 'M.S. Graduate')
            .replace(/학부 연구생 \/ 보조 AT/g, 'Undergraduate Student / Assistant AT')
            .replace(/선수 케어 및 필드 의무지원/g, 'Athlete Care & Field Medical Support')
            .replace(/재학생/g, 'Undergraduate Student');
    }

    // ------------------------------------------------------------------------
    // 4. 원본 한국어 백업 함수 (최초 1회 실행)
    // ------------------------------------------------------------------------
    let isBackedUp = false;

    function backupOriginalKoreanDOM() {
        if (isBackedUp) return;

        // 1) 단일 셀렉터 요소 백업
        SINGLE_ELEMENT_TRANSLATIONS.forEach(item => {
            const el = document.querySelector(item.selector);
            if (el && el.dataset.koOrig === undefined) {
                el.dataset.koOrig = el.innerHTML;
            }
        });

        // 2) 리스트 요소 백업
        LIST_TRANSLATIONS.forEach(group => {
            const els = document.querySelectorAll(group.selector);
            els.forEach(el => {
                if (el.dataset.koOrig === undefined) {
                    el.dataset.koOrig = el.innerHTML;
                }
            });
        });

        // 3) 자문위원회 안내 박스 백업
        const groupHeaders = document.querySelectorAll('#members .modern-group-header');
        if (groupHeaders.length > 0) {
            const advisoryBox = groupHeaders[0].nextElementSibling;
            if (advisoryBox && advisoryBox.dataset.koOrig === undefined) {
                advisoryBox.dataset.koOrig = advisoryBox.innerHTML;
            }
        }

        // 4) 구성원 프로필 카드(.modern-profile-card) 원본 이름 및 리스트 백업
        document.querySelectorAll('.modern-profile-card').forEach(card => {
            const nameEl = card.querySelector('.modern-profile-name');
            if (nameEl) {
                if (card.dataset.koName === undefined) {
                    card.dataset.koName = nameEl.textContent.trim();
                }
                if (nameEl.dataset.koOrig === undefined) {
                    nameEl.dataset.koOrig = nameEl.innerHTML;
                }
            }
            card.querySelectorAll('.modern-profile-exp li').forEach(li => {
                if (li.dataset.koOrig === undefined) {
                    li.dataset.koOrig = li.innerHTML;
                }
            });
        });

        // 5) 06 AT 센터 보조(.assistant-dept-card) 부서명 및 인원수 백업
        document.querySelectorAll('.assistant-dept-card').forEach(card => {
            const titleEl = card.querySelector('.assistant-dept-title');
            const countEl = card.querySelector('.assistant-dept-count');
            if (titleEl && titleEl.dataset.koOrig === undefined) titleEl.dataset.koOrig = titleEl.innerHTML;
            if (countEl && countEl.dataset.koOrig === undefined) countEl.dataset.koOrig = countEl.innerHTML;
        });

        // 6) 역대 수상자 카드 설명, 힌트, 배지, 대학원 졸업자 종목 태그 백업
        document.querySelectorAll('#awards .award-stream-desc, #awards .award-click-hint, #awards .award-pill, #awards .ed-ga-item .gb').forEach(el => {
            if (el.dataset.koOrig === undefined) {
                el.dataset.koOrig = el.innerHTML;
            }
        });

        // 7) 연구 논문 모달 상단 스팬 백업
        const resHeaderSpans = document.querySelectorAll('#research-modal .research-modal-header span');
        resHeaderSpans.forEach(sp => {
            if (sp.dataset.koOrig === undefined) {
                sp.dataset.koOrig = sp.innerHTML;
            }
        });

        // 8) 상담 신청 폼 placeholder 및 select option 텍스트 백업
        ['#form-name', '#form-phone', '#form-message'].forEach(sel => {
            const input = document.querySelector(sel);
            if (input && input.dataset.koPlaceholder === undefined) {
                input.dataset.koPlaceholder = input.getAttribute('placeholder') || '';
            }
        });
        document.querySelectorAll('#form-affiliation option, #form-type option').forEach(opt => {
            if (opt.dataset.koOrig === undefined) {
                opt.dataset.koOrig = opt.textContent;
            }
        });

        // 8-b) 부서별 활동사진 카드(.dept-gallery-card) 원본 백업
        document.querySelectorAll('#activities .dept-gallery-card').forEach(card => {
            const bEl = card.querySelector('.gallery-badge');
            const tEl = card.querySelector('.gallery-card-title');
            const mEl = card.querySelector('.gallery-card-meta');
            if (bEl && bEl.dataset.koOrig === undefined) bEl.dataset.koOrig = bEl.innerHTML;
            if (tEl && tEl.dataset.koOrig === undefined) tEl.dataset.koOrig = tEl.innerHTML;
            if (mEl && mEl.dataset.koOrig === undefined) mEl.dataset.koOrig = mEl.innerHTML;
        });

        isBackedUp = true;
    }

    // ------------------------------------------------------------------------
    // 5. 언어 적용 메인 함수 (window.setSiteLanguage)
    // ------------------------------------------------------------------------
    window.setSiteLanguage = function (lang) {
        if (lang !== 'ko' && lang !== 'en') lang = 'ko';
        backupOriginalKoreanDOM();
        currentLang = lang;

        // HTML lang 속성 및 문서 타이틀 업데이트
        document.documentElement.setAttribute('lang', lang);
        document.title = (lang === 'en')
            ? 'Kyung Hee University - Athletic Training Center (KHU AT Center)'
            : '경희대학교 체육대학 - Athletic Training Center (AT센터)';

        // 상단 헤더 & 모바일 드로어의 토글 버튼 active 상태 동기화
        document.querySelectorAll('.lang-switcher .lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // 1) 단일 셀렉터 요소 전환
        SINGLE_ELEMENT_TRANSLATIONS.forEach(item => {
            const el = document.querySelector(item.selector);
            if (!el) return;
            el.innerHTML = (lang === 'en') ? item.en : (el.dataset.koOrig || el.innerHTML);
        });

        // 2) 리스트 요소 전환
        LIST_TRANSLATIONS.forEach(group => {
            const els = document.querySelectorAll(group.selector);
            els.forEach((el, idx) => {
                if (lang === 'en' && group.items[idx] !== undefined) {
                    el.innerHTML = group.items[idx];
                } else if (lang === 'ko' && el.dataset.koOrig !== undefined) {
                    el.innerHTML = el.dataset.koOrig;
                }
            });
        });

        // 3) 자문위원회 안내 박스 전환
        const groupHeaders = document.querySelectorAll('#members .modern-group-header');
        if (groupHeaders.length > 0) {
            const advisoryBox = groupHeaders[0].nextElementSibling;
            if (advisoryBox && advisoryBox.dataset.koOrig !== undefined) {
                advisoryBox.innerHTML = (lang === 'en')
                    ? '<i class="fa-solid fa-users-gear" style="color: var(--color-primary); font-size: 1.4rem; margin-bottom: 8px; display: block;"></i>The Kyung Hee University AT Center Advisory Committee is currently being formed.'
                    : advisoryBox.dataset.koOrig;
            }
        }

        // 4) 구성원 프로필 카드(.modern-profile-card) 직책 및 약력 전환
        document.querySelectorAll('.modern-profile-card').forEach(card => {
            const nameEl = card.querySelector('.modern-profile-name');
            if (nameEl && nameEl.dataset.koOrig !== undefined) {
                if (lang === 'en') {
                    nameEl.innerHTML = nameEl.dataset.koOrig
                        .replace('박지홍 교수', '박지홍 <span style="font-size:0.84rem; font-weight:700; color:var(--color-primary);">Prof. / Director</span>')
                        .replace('오성민 교수', '오성민 <span style="font-size:0.84rem; font-weight:700; color:var(--color-primary);">Research Prof.</span>')
                        .replace('김준영 실장', '김준영 <span style="font-size:0.84rem; font-weight:700; color:var(--color-primary);">General Manager</span>')
                        .replace('최현곤 재활팀장', '최현곤 <span style="font-size:0.84rem; font-weight:700; color:var(--color-primary);">Rehab Lead</span>')
                        .replace('이재욱 연구팀장', '이재욱 <span style="font-size:0.84rem; font-weight:700; color:var(--color-primary);">Research Lead</span>')
                        .replace('(회장)', '(President)')
                        .replace('(부회장)', '(Vice Pres.)')
                        .replace('(총무)', '(Secretary)');
                } else {
                    nameEl.innerHTML = nameEl.dataset.koOrig;
                }
            }
            card.querySelectorAll('.modern-profile-exp li').forEach(li => {
                if (li.dataset.koOrig === undefined) return;
                if (lang === 'en') {
                    li.textContent = translateMemberBulletLine(li.dataset.koOrig);
                } else {
                    li.innerHTML = li.dataset.koOrig;
                }
            });
        });

        // 5) 06 AT 센터 보조(.assistant-dept-card) 부서명 및 인원수 전환 (4열 카드 헤더 내 줄바꿈 방지)
        document.querySelectorAll('.assistant-dept-card').forEach(card => {
            const titleEl = card.querySelector('.assistant-dept-title');
            const countEl = card.querySelector('.assistant-dept-count');
            if (titleEl && titleEl.dataset.koOrig !== undefined) {
                const koTitle = titleEl.dataset.koOrig.trim();
                titleEl.innerHTML = (lang === 'en')
                    ? (ASSISTANT_DEPT_TITLE_EN[koTitle] || DEPARTMENT_KO_TO_EN[koTitle] || koTitle)
                    : titleEl.dataset.koOrig;
            }
            if (countEl && countEl.dataset.koOrig !== undefined) {
                const koCount = countEl.dataset.koOrig.trim();
                countEl.innerHTML = (lang === 'en')
                    ? koCount.replace('명', ' ATs')
                    : countEl.dataset.koOrig;
            }
        });

        // 6) 역대 수상자 카드 설명, 클릭 힌트, 공동 수상 배지, 대학원 졸업자 종목 전환
        document.querySelectorAll('#awards .award-stream-desc').forEach(el => {
            if (el.dataset.koOrig === undefined) return;
            const koTxt = el.dataset.koOrig.trim();
            el.innerHTML = (lang === 'en') ? (AWARD_DESC_KO_TO_EN[koTxt] || koTxt) : el.dataset.koOrig;
        });

        document.querySelectorAll('#awards .award-click-hint').forEach(el => {
            if (el.dataset.koOrig === undefined) return;
            el.innerHTML = (lang === 'en')
                ? 'View Profile <i class="fa-solid fa-arrow-right"></i>'
                : el.dataset.koOrig;
        });

        document.querySelectorAll('#awards .award-pill').forEach(el => {
            if (el.dataset.koOrig === undefined) return;
            el.innerHTML = (lang === 'en')
                ? el.dataset.koOrig.replace('(공동 수상)', '(CO-WINNERS)')
                : el.dataset.koOrig;
        });

        document.querySelectorAll('#awards .ed-ga-item .gb').forEach(el => {
            if (el.dataset.koOrig === undefined) return;
            const koBadge = el.dataset.koOrig.trim();
            el.innerHTML = (lang === 'en') ? (GA_BADGE_KO_TO_EN[koBadge] || koBadge) : el.dataset.koOrig;
        });

        // 7) 연구 논문 모달 상단 배지 전환
        const resHeaderSpans = document.querySelectorAll('#research-modal .research-modal-header span');
        if (resHeaderSpans.length >= 2) {
            resHeaderSpans[0].innerHTML = (lang === 'en') ? 'EBM RESEARCH (63 Papers)' : resHeaderSpans[0].dataset.koOrig;
            resHeaderSpans[1].innerHTML = (lang === 'en') ? 'KHU AT Center Academic Achievements' : resHeaderSpans[1].dataset.koOrig;
        }

        // 8) 활동 사진 부서별 카드(.dept-gallery-card) 및 Empty State 문구 동기화
        document.querySelectorAll('#activities .dept-gallery-card').forEach(card => {
            const bEl = card.querySelector('.gallery-badge');
            const tEl = card.querySelector('.gallery-card-title');
            const mEl = card.querySelector('.gallery-card-meta');
            if (bEl) bEl.innerHTML = (lang === 'en') ? (card.getAttribute('data-en-badge') || bEl.dataset.koOrig) : (bEl.dataset.koOrig || bEl.innerHTML);
            if (tEl) tEl.innerHTML = (lang === 'en') ? (card.getAttribute('data-en-title') || tEl.dataset.koOrig) : (tEl.dataset.koOrig || tEl.innerHTML);
            if (mEl) mEl.innerHTML = (lang === 'en') ? (card.getAttribute('data-en-meta') || mEl.dataset.koOrig) : (mEl.dataset.koOrig || mEl.innerHTML);
        });

        const activePictoBtn = document.querySelector('.dept-picto-btn.active');
        if (activePictoBtn && typeof window.filterDeptPhotos === 'function') {
            const onclickAttr = activePictoBtn.getAttribute('onclick') || '';
            const codeMatch = onclickAttr.match(/filterDeptPhotos\('([^']+)'/);
            if (codeMatch) {
                window.filterDeptPhotos(codeMatch[1], activePictoBtn);
            }
        } else {
            const emptyTitle = document.getElementById('dept-empty-title');
            const emptyDesc = document.getElementById('dept-empty-desc');
            if (emptyTitle) {
                emptyTitle.textContent = (lang === 'en')
                    ? 'Team Field Activity Photos Coming Soon'
                    : '부서별 현장 활동 사진 업데이트 준비 중';
            }
            if (emptyDesc) {
                emptyDesc.textContent = (lang === 'en')
                    ? 'Field care photos across our 12 varsity teams are being curated and will be uploaded sequentially.'
                    : '12개 부서 선수 케어 현장 사진은 정밀 선별 및 매칭 작업 후 순차적으로 업로드될 예정입니다.';
            }
        }

        // 9) 상담 신청 폼 placeholder 및 드롭다운 옵션 전환 (폼 전송용 value는 그대로 유지)
        const formName = document.querySelector('#form-name');
        const formPhone = document.querySelector('#form-phone');
        const formMessage = document.querySelector('#form-message');

        if (formName) {
            formName.setAttribute('placeholder', lang === 'en' ? 'Enter your name or organization' : (formName.dataset.koPlaceholder || ''));
        }
        if (formPhone) {
            formPhone.setAttribute('placeholder', lang === 'en' ? '010-1234-5678' : (formPhone.dataset.koPlaceholder || ''));
        }
        if (formMessage) {
            formMessage.setAttribute('placeholder', lang === 'en'
                ? 'Please describe the purpose of consultation (pain, performance, etc.) or your inquiry.'
                : (formMessage.dataset.koPlaceholder || ''));
        }

        const affiliationOptionMap = {
            '': 'Select your affiliation',
            '체육부': 'Varsity Team / Athlete',
            '교직원': 'Faculty / Staff',
            '학생': 'Student',
            '외부': 'External / Visitor',
            '기타': 'Other'
        };
        document.querySelectorAll('#form-affiliation option').forEach(opt => {
            const val = opt.getAttribute('value') || '';
            opt.textContent = (lang === 'en') ? (affiliationOptionMap[val] || opt.dataset.koOrig) : opt.dataset.koOrig;
        });

        const inquiryTypeOptionMap = {
            '': 'Select inquiry type',
            '스포츠 부상 상담 & 재활': 'Sports Injury Consultation & Rehab',
            '프로그램/컨디셔닝 자문': 'Conditioning / Program Advisory',
            '교육 / 자문': 'Education / Collaboration'
        };
        document.querySelectorAll('#form-type option').forEach(opt => {
            const val = opt.getAttribute('value') || '';
            opt.textContent = (lang === 'en') ? (inquiryTypeOptionMap[val] || opt.dataset.koOrig) : opt.dataset.koOrig;
        });

        // 브라우저 localStorage에 선택 언어 저장
        try {
            localStorage.setItem('khu_at_lang', lang);
        } catch (e) {
            // 시크릿 모드 등 스토리지 제한 환경 예외 무시
        }
    };

    // ------------------------------------------------------------------------
    // 6. 동적 인터랙션 함수(부서 픽토그램 필터, 구성원 모달, 동문 모달) 다국어 연동
    // ------------------------------------------------------------------------
    function hookDynamicFunctions() {
        // 1) 부서별 픽토그램 클릭 시 Empty State 안내 문구 다국어 처리
        const origFilterDeptPhotos = window.filterDeptPhotos;
        if (typeof origFilterDeptPhotos === 'function') {
            window.filterDeptPhotos = function (deptCode, btn) {
                origFilterDeptPhotos(deptCode, btn);
                if (currentLang === 'en') {
                    const deptNamesEn = {
                        'all': 'All Teams',
                        'soccer': 'Soccer Team',
                        'baseball': 'Baseball Team',
                        'basketball': 'Basketball Team',
                        'volleyball': 'Volleyball Team',
                        'rugby': 'Rugby Team',
                        'golf': 'Golf Team',
                        'badminton': 'Badminton Team',
                        'handball': 'Handball Team',
                        'demoteam': 'Taekwondo Demo Team',
                        'gyeorugi': 'Taekwondo Kyorugi Team',
                        'poomsae': 'Taekwondo Poomsae Team',
                        'center': 'AT Center'
                    };
                    const emptyTitle = document.getElementById('dept-empty-title');
                    const emptyDesc = document.getElementById('dept-empty-desc');
                    const targetName = deptNamesEn[deptCode] || 'Selected Team';

                    if (emptyTitle) {
                        emptyTitle.textContent = (deptCode === 'all')
                            ? 'Team Field Activity Photos Coming Soon'
                            : `${targetName} Activity Photos Coming Soon`;
                    }
                    if (emptyDesc) {
                        emptyDesc.textContent = (deptCode === 'all')
                            ? 'Field care photos across our 12 varsity teams are being curated and will be uploaded sequentially.'
                            : `Official archive photos of athlete care and medical support for the ${targetName} will be updated soon.`;
                    }
                }
            };
        }

        // 2) 교수진 및 구성원 상세 모달(openProfModal) 다국어 연동
        const origOpenProfModal = window.openProfModal;
        if (typeof origOpenProfModal === 'function') {
            window.openProfModal = function (cardOrName) {
                // 영문 상태에서 카드를 클릭했을 때도 원본 한국어 키(data-ko-name)로 정확히 조회하도록 보장
                if (cardOrName && cardOrName.nodeType && cardOrName.dataset && cardOrName.dataset.koName) {
                    const nameEl = cardOrName.querySelector('.modern-profile-name');
                    const currentHtml = nameEl ? nameEl.innerHTML : null;
                    if (nameEl) nameEl.textContent = cardOrName.dataset.koName;
                    origOpenProfModal(cardOrName);
                    if (nameEl && currentHtml !== null) nameEl.innerHTML = currentHtml;
                } else {
                    origOpenProfModal(cardOrName);
                }

                // 모달 내부 라벨을 현재 언어에 맞게 전환
                const labelMapEn = {
                    '학위명': 'Degree',
                    '최종학력': 'Alma Mater',
                    '담당과목': 'Courses / Topic',
                    '담당부서': 'Department / Team',
                    '연구실': 'Office / Lab',
                    '학과': 'Department',
                    '학년': 'Class / Year',
                    '전화번호': 'Phone',
                    '학위과정': 'Program',
                    '출신학력': 'Education',
                    '연구주제': 'Research Topic',
                    '보유자격': 'Certifications',
                    '소속': 'Affiliation',
                    '소속과정': 'Program / Role',
                    '소속학과': 'Department',
                    '위치/연락처': 'Location / Tel',
                    '직책': 'Position'
                };

                ['prof-modal-degree-label', 'prof-modal-edu-label', 'prof-modal-subject-label', 'prof-modal-lab-label'].forEach(id => {
                    const lbl = document.getElementById(id);
                    if (lbl && currentLang === 'en') {
                        const koText = lbl.textContent.trim();
                        if (labelMapEn[koText]) lbl.textContent = labelMapEn[koText];
                    }
                });

                // 영문 모드일 때 모달 내부 직책 및 상세 값들도 영문 변환
                if (currentLang === 'en') {
                    ['prof-modal-role', 'prof-modal-degree', 'prof-modal-edu', 'prof-modal-subject', 'prof-modal-lab'].forEach(id => {
                        const valEl = document.getElementById(id);
                        if (valEl) {
                            valEl.textContent = translateProfModalText(valEl.textContent);
                        }
                    });
                    document.querySelectorAll('#prof-modal-career li, #prof-modal-research li').forEach(li => {
                        li.textContent = translateProfModalText(li.textContent);
                    });
                }

                const sectionTitles = document.querySelectorAll('#prof-modal .prof-section-title');
                if (sectionTitles.length >= 2) {
                    if (currentLang === 'en') {
                        sectionTitles[0].textContent = 'Career Highlights';
                        sectionTitles[1].textContent = 'Research Publications';
                    } else {
                        sectionTitles[0].textContent = '주요경력';
                        sectionTitles[1].textContent = '연구실적 (최근 논문)';
                    }
                }
            };
        }

        // 3) 역대 수상자 및 동문 모달(openAlumniModal) 다국어 연동
        const origOpenAlumniModal = window.openAlumniModal;
        if (typeof origOpenAlumniModal === 'function') {
            window.openAlumniModal = function (name, badgeText) {
                origOpenAlumniModal(name, badgeText);
                if (currentLang === 'en') {
                    const badgeEl = document.getElementById('alumni-modal-badge');
                    const jobEl = document.getElementById('alumni-modal-job');

                    if (badgeEl) {
                        badgeEl.textContent = badgeEl.textContent
                            .replace('경희대학교 AT Center 동문', 'KHU AT Center Alumni')
                            .replace('공동 수상', 'Co-Winner')
                            .replace('팀장', 'Team Lead')
                            .replace('연구/교육', 'Research/Edu')
                            .replace('스포츠재활', 'Sports Rehab');
                    }
                    if (jobEl) {
                        jobEl.innerHTML = jobEl.innerHTML
                            .replace(/미공개/g, 'Undisclosed')
                            .replace(/휴직/g, 'On Leave')
                            .replace(/공동 수상/g, 'Co-Winner')
                            .replace(/현\)\s*/g, 'Current: ');
                    }
                }
            };
        }
    }

    // ------------------------------------------------------------------------
    // 7. 초기화 실행 (DOM 로드 완료 시)
    // ------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {
        backupOriginalKoreanDOM();
        hookDynamicFunctions();

        // 이전에 사용자가 선택한 언어가 있다면 복원 (기본값: 'ko')
        let savedLang = 'ko';
        try {
            savedLang = localStorage.getItem('khu_at_lang') || 'ko';
        } catch (e) {
            savedLang = 'ko';
        }

        if (savedLang === 'en') {
            window.setSiteLanguage('en');
        }
    });
})();
