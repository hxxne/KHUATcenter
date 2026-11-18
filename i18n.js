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
        { selector: '#main-header .nav-menu a[href="#about"]', en: 'Who We Are' },
        { selector: '#main-header .nav-menu a[href="#pillars"]', en: 'What We Do' },
        { selector: '#main-header .nav-menu a[href="#dashboard"]', en: 'Achievements' },
        { selector: '#main-header .nav-menu a[href="#awards"]', en: 'Our Journey' },
        { selector: '#main-header .nav-menu a[href="#activities"]', en: 'Photo &amp; Video' },
        { selector: '#main-header .nav-menu a[href="#donate"]', en: 'Sponsorship' },
        { selector: '#main-header .nav-menu a[href="#contact"]', en: 'Contact' },

        // [모바일 전체화면 드로어 메뉴]
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#about"]', en: '<i class="fa-regular fa-building"></i> Who We Are' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#pillars"]', en: '<i class="fa-solid fa-layer-group"></i> What We Do' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#dashboard"]', en: '<i class="fa-solid fa-chart-line"></i> Achievements' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#awards"]', en: '<i class="fa-solid fa-award"></i> Our Journey' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#activities"]', en: '<i class="fa-solid fa-camera"></i> Photo &amp; Video' },
        { selector: '#mobile-nav-drawer .mobile-menu a[href="#donate"]', en: '<i class="fa-solid fa-hand-holding-heart"></i> Sponsorship' },
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
            en: 'Bringing specialized Athletic Training services to every sports field!<br>Driving digital transformation and intelligence in sports medicine through standardized physical activity data!<br>Cultivating field-ready professionals where learning turns into expertise and expertise serves the field!'
        },
        { selector: '#hero .hero-actions a[href="#pillars"]', en: 'What We Do' },
        { selector: '#hero .hero-actions a[href="#contact"]', en: 'Book a Consultation' },

        // [소개 섹션 (#about, 구성원 통합)]
        { selector: '#about .section-title', en: 'Who We Are' },
        {
            selector: '#about .about-hero-caption',
            en: '<i class="fa-solid fa-location-dot" style="color: #f87171; margin-right: 4px;"></i> Kyung Hee University Global Campus Open-Air Theater'
        },
        {
            selector: '#about .about-lead',
            en: 'Located in Seonseung-gwan at Kyung Hee University Global Campus, the <strong>Athletic Training Center</strong> conducts sports medicine research with AT Club undergraduates and AT Lab graduate researchers, delivers hands-on field-oriented professional education, and provides diverse services for varsity athletes, faculty, and staff.'
        },

        // [활동 섹션 (#pillars)]
        { selector: '#pillars .section-title', en: 'What We Do' },
        { selector: '#pillars .section-subtitle', en: 'Education · Research · Service' },

        // Pillar 1: Education
        { selector: '.bento-card-edu .bento-title', en: 'Education' },
        { selector: '.bento-card-edu .bento-subtitle', en: 'Nurturing Sports Medicine Specialists' },
        { selector: '.bento-card-edu .bento-tags', en: '<span>Curriculum</span><span>Clinical Skills</span><span>Practicum</span>' },
        { selector: '.bento-card-edu .bento-action-btn span', en: 'View Details' },

        // Pillar 2: Research
        { selector: '.bento-card-res .bento-title', en: 'Research' },
        { selector: '.bento-card-res .bento-subtitle', en: 'Evidence-Based Sports Medicine (EBM)' },
        { selector: '.bento-card-res .bento-tags', en: '<span>Biomechanics</span><span>Clinical Data</span><span>Publications</span>' },
        { selector: '.bento-card-res .bento-action-btn span', en: 'View Details' },

        // Pillar 3: Service
        { selector: '.bento-card-srv .bento-title', en: 'Service' },
        { selector: '.bento-card-srv .bento-subtitle', en: 'Sports Care &amp; On-Field Medical Support' },
        { selector: '.bento-card-srv .bento-tags', en: '<span>Conditioning</span><span>Medical Support</span><span>Rehab</span>' },
        { selector: '.bento-card-srv .bento-action-btn span', en: 'View Details' },

        // [핵심 사업 상세 모달 (#pillar-detail-modal)]
        { selector: '#pmodal-main-title', en: 'Core Pillars Overview' },
        { selector: '#pillar-detail-modal .pmodal-desc', en: 'Detailed initiatives and vision of KHU AT Center\'s three core pillars: Education, Research, and Service.' },
        { selector: '#ptab-btn-edu .ptab-text', en: 'Education' },
        { selector: '#ptab-btn-res .ptab-text', en: 'Research' },
        { selector: '#ptab-btn-srv .ptab-text', en: 'Service' },
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
            en: '<strong>View All 64 Research Publications</strong><span>Explore our full list of verified SCIE &amp; KCI journal articles</span>'
        },
        {
            selector: '#pmodal-panel-srv .quote-text',
            en: '"From enhancing elite athlete performance to promoting campus-wide wellness, we deliver top-tier professional sports rehabilitation care."'
        },
        { selector: '#pmodal-panel-srv .quote-author', en: 'KHU AT Center Service Vision' },

        // [누적기록 대시보드 (#dashboard)]
        { selector: '#dashboard .section-title', en: 'Achievements' },
        // 01 교육 지표
        { selector: '#dashboard .card-edu .stat-unit', en: 'Trainees' },
        { selector: '#dashboard .card-edu .editorial-card-title', en: 'Completed Basic AT Training' },
        { selector: '#dashboard .card-edu .editorial-card-desc', en: '100 hours of AT Center observation experience, first aid &amp; CPR certification, harassment &amp; violence prevention education, modality training, and full academic seminars completed' },
        { selector: '#dashboard .card-edu .editorial-action-btn span', en: 'Explore Education Curriculum' },
        // 02 연구 지표
        { selector: '#dashboard .card-res .stat-unit', en: 'Papers' },
        { selector: '#dashboard .card-res .editorial-card-title', en: 'Published Research Papers' },
        { selector: '#dashboard .card-res .editorial-card-desc', en: 'Published in domestic and international sports science &amp; clinical journals and presented at academic conferences' },
        { selector: '#dashboard .card-res .editorial-action-btn span', en: 'View All 64 Publications' },
        // 03 서비스 지표
        { selector: '#dashboard .card-srv .stat-unit', en: 'Cases' },
        { selector: '#dashboard .card-srv .editorial-card-title', en: 'Injury &amp; Conditioning Care' },
        { selector: '#dashboard .card-srv .editorial-card-desc', en: 'Acute &amp; chronic rehab, conditioning,<br>resistance training, and sports taping' },

        // [연구 논문 모달 (#research-modal)]
        { selector: '#research-modal .research-modal-header h2', en: 'Research &amp; Academic Publications' },
        { selector: '#research-modal .research-modal-header p', en: 'Explore our research achievements across 4 core Evidence-Based Sports Medicine (EBM) domains.' },
        {
            selector: '#rtab-btn-1',
            en: 'Part 1. Sports Rehabilitation <span style="background: rgba(165,0,52,0.1); color: #A50034; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">31</span>'
        },
        {
            selector: '#rtab-btn-2',
            en: 'Part 2. Fatigue Recovery <span style="background: rgba(0,0,0,0.06); color: #64748b; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">9</span>'
        },
        {
            selector: '#rtab-btn-3',
            en: 'Part 3. Performance Enhancement <span style="background: rgba(0,0,0,0.06); color: #64748b; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">18</span>'
        },
        {
            selector: '#rtab-btn-4',
            en: 'Part 4. Injury Epidemiology <span style="background: rgba(0,0,0,0.06); color: #64748b; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; margin-left: 4px;">6</span>'
        },

        // [소개 내 구성원 탭 (#members)]
        { selector: '#adv-header-title', en: 'Advisory Board' },
        { selector: '#adv-name-jung', en: 'Taeyou Jung, PhD, ATC, CAPE' },
        { selector: '#adv-jung-line1', en: 'Affiliation: Professor, Dept. of Kinesiology, California State University, Northridge' },
        { selector: '#adv-jung-line2', en: 'Position: Executive Director, The Center of Achievement through Adapted Physical Activity' },
        { selector: '#adv-jung-line3', en: 'Degree &amp; Cert: PhD (University of Virginia) · ATC · CAPE' },
        { selector: '#adv-jung-line4', en: 'Career: Tenured Professor at CSUN · Lead in Adapted PE, Aquatic Rehab &amp; Neuromuscular Research' },
        { selector: '#adv-name-parkwook', en: 'Wook Park, PhD' },
        { selector: '#adv-parkwook-line1', en: 'Affiliation: Professor, Dept. of Electronic Engineering, Kyung Hee University' },
        { selector: '#adv-parkwook-line2', en: 'Position: Vice Director, KHU Industry-Academic Cooperation Foundation · Director, KHU Tech Holdings' },
        { selector: '#adv-parkwook-line3', en: 'Degree &amp; Cert: PhD · Registered Technology Trader (MOTIE)' },
        { selector: '#adv-parkwook-line4', en: 'Career: Former Chair, Graduate Dept. of EE · Nature Materials Cover · Young Researcher Award' },
        { selector: '#adv-name-bang', en: 'Hyeongsig Bang, MD, PhD' },
        { selector: '#adv-bang-line1', en: 'Affiliation: Director of Orthopedics, GODOIL Hospital' },
        { selector: '#adv-bang-line2', en: 'Position: Team Physician, Korea National Short Track Speed Skating Team (KSU)' },
        { selector: '#adv-bang-line3', en: 'Degree &amp; Cert: MD, PhD (CHA Univ.) · Orthopedic Surgeon · FIFA / IOC Diploma' },
        { selector: '#adv-bang-line4', en: 'Career: National Short Track Team Physician · Asan/Samsung Sub-Intern · SNUH Ortho Rotation' },
        { selector: '#adv-name-son', en: 'Jin-won Son, KICPA' },
        { selector: '#adv-son-line1', en: 'Affiliation: Vice President / Partner, CLUST YEIN ACC. · CEO, CLUST VENTURES' },
        { selector: '#adv-son-line2', en: 'Position: Director, KSIA · Professor, Eulji Univ. FMP · Mentor, KHU Campus Town' },
        { selector: '#adv-son-line3', en: 'Degree &amp; Cert: Certified Public Accountant (KICPA)' },
        { selector: '#adv-son-line4', en: 'Career: Former CPA, Deloitte Anjin · Seoul/KISED Evaluator · Samsung Biologics IPO Advisor' },
        { selector: '#btn-tab-sports', en: 'Team AT' },
        { selector: '#btn-tab-rehab', en: 'Sports Rehab Instructors' },

        // [역사 (#awards)]
        { selector: '#awards .section-title', en: 'Our Journey' },
        { selector: '#stream-awards-title', en: 'Athletic Training Student Awards' },
        { selector: '#stream-past-leaders .stream-sub-title', en: 'Past Leaders' },
        { selector: '#stream-graduate-assistants .stream-sub-title', en: 'Graduate Alumni' },
        { selector: '#stream-graduate-assistants .stream-sub-desc', en: 'Graduate alumni who completed academic research and clinical field training at Seonseung-gwan AT Center.' },

        // [후원 (#donate)]
        { selector: '#donate .donate-section-title', en: 'Sponsorship' },
        { selector: '#donate .dh-subtitle', en: 'KHU AT Center Development Fund' },
        { selector: '#donate .dh-title', en: 'Nurturing Future Sports Medicine Leaders' },
        { selector: '#donate .dh-desc', en: 'Your generous contribution is transparently used to improve student research and educational environments, and qualifies for tax benefits.' },
        { selector: '#donate .mb-header', en: 'Official Giving Guide' },
        { selector: '#donate .btn-donate-link', en: '<i class="fa-solid fa-link"></i> Official Donation Page' },
        { selector: '#donate .donation-instructions h3', en: '<i class="fa-solid fa-circle-check" style="color: #A50034; margin-right: 6px;"></i>How to Participate in Giving' },
        { selector: '#donate .donation-instructions > p', en: 'Please visit the official donation page above and enter the details as follows:' },
        {
            selector: '#donate .donation-instructions ol',
            en: '<li>Under <strong>Recipient (기부하실 곳)</strong>, enter <span style="color: var(--color-primary, #901522); font-weight: 600;">\'AT 센터\' (AT Center)</span></li>' +
                '<li>Select <strong>\'직접 입력\' (Direct Input)</strong> from the dropdown and enter <span style="color: var(--color-primary, #901522); font-weight: 600;">\'AT 센터\'</span></li>' +
                '<li><strong>Purpose of Donation (기부 사유)</strong>: AT 센터 운영 (AT Center Operations)</li>'
        },

        // [갤러리 (#activities)]
        { selector: '#activities .section-title', en: 'Photo &amp; Video' },
        { selector: '#activities .gallery-bottom-cta strong', en: 'Follow our official Instagram for more live updates!' },
        { selector: '#activities .gallery-bottom-cta p', en: 'We share weekly stories of tournament medical support, training fields, and education.' },
        { selector: '#activities .btn-insta-visit', en: 'Visit @khuatcenter <i class="fa-solid fa-arrow-up-right-from-square"></i>' },

        // [상담 및 문의 (#contact)]
        { selector: '#contact .section-title', en: 'Support &amp; Inquiry' },
        { selector: '#contact .section-subtitle', en: 'Rehabilitation Consultation &amp; Education/Research Collaboration' },
        { selector: '#contact .contact-info h3', en: 'Athletic Training Laboratory &amp; Center' },
        {
            selector: '#contact .contact-desc',
            en: 'Inquiries regarding varsity athlete injury management &amp; rehabilitation, general student sports injuries, educational staff participation, and research collaborations are always welcome.'
        },
        {
            selector: '#contact .contact-details li:first-child span',
            en: 'AT Lab &amp; Center (B1), Seonseung-gwan, KHU Global Campus, 1732 Deogyeong-daero, Giheung-gu, Yongin-si, Gyeonggi-do'
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
        { selector: '#main-footer .footer-info h4', en: 'AT Lab &amp; Center' },
        {
            selector: '#main-footer .footer-address',
            en: '(17104) AT Lab &amp; Center (B1), Seonseung-gwan, Kyung Hee University Global Campus, 1732 Deogyeong-daero, Giheung-gu, Yongin-si, Gyeonggi-do, Republic of Korea'
        },
        { selector: '#main-footer .privacy-policy', en: 'Privacy Policy' }
    ];

    // ------------------------------------------------------------------------
    // 2. 다중 리스트 요소(순서 기반) 번역 데이터
    // ------------------------------------------------------------------------
    const LIST_TRANSLATIONS = [
        // 역대 리더 분과 한글 서브라벨 (#stream-past-leaders)
        {
            selector: '#stream-past-leaders .ed-stream-sublabel',
            items: [
                'Athletic Training',
                'Sports Rehabilitation',
                'Academic Research'
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
        // 구성원 섹션 그룹 타이틀
        {
            selector: '#members .modern-group-title',
            items: [
                'Advisory Board',
                'Faculty members',
                'Leaders',
                'Graduate Students',
                'AT Club Executives',
                'Staff',
                'AT Center Assistants'
            ]
        },
        // 활동 사진 메인 카테고리 탭 4개
        {
            selector: '#activities .gallery-filter-btn',
            items: [
                '<i class="fa-solid fa-folder-open"></i> By Team',
                '<i class="fa-solid fa-kit-medical"></i> Center Activities',
                '<i class="fa-solid fa-truck-medical"></i> Field Support',
                '<i class="fa-solid fa-graduation-cap"></i> Events'
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
                'The Brain Awards for Lab - Excellence Prize',
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
                '<i class="fa-solid fa-users"></i> Seonseung-gwan B1 Lecture Hall - Center system &amp; guide',
                '<i class="fa-solid fa-award"></i> Selected as an Outstanding Lab by KHU Graduate School',
                '<i class="fa-solid fa-book-open"></i> Grand Walkerhill Seoul - Cartilage &amp; rehabilitation research',
                '<i class="fa-solid fa-truck-medical"></i> Hongcheon, Gangwon - 10-day dedicated care by 16 AT staff',
                '<i class="fa-solid fa-truck-medical"></i> Acute injury care &amp; taping at soccer and basketball venues',
                '<i class="fa-solid fa-person-running"></i> Yeouido Park - Sports massage &amp; physical recovery support',
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
        'AT Center (센터 AT)': 'AT Center',
        'AT Center (센터)': 'AT Center'
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
        'AT Center (센터 AT)': 'AT Center',
        'AT Center (센터)': 'AT Center'
    };

    const AWARD_DESC_KO_TO_EN = {
        '올해의 AT 최우수 학생상': 'AT Student of the Year Award',
        '영감 및 헌신상': 'Inspiration & Dedication Award',
        '올해의 신인상': 'Rookie of the Year Award',
        '올해의 신인상 (2관왕)': 'Rookie of the Year (2x Winner)'
    };

    const GA_BADGE_KO_TO_EN = {
        '연구/교육': 'Research / Education',
        '스포츠재활': 'Sports Rehabilitation',
        '배구': 'Volleyball',
        '배드민턴': 'Badminton',
        '축구': 'Soccer',
        '야구': 'Baseball',
        '품새': 'Poomsae',
        '시범단': 'Taekwondo Demonstration',
        '럭비': 'Rugby',
        '농구': 'Basketball',
        '골프': 'Golf',
        '태권도': 'Taekwondo',
        '핸드볼': 'Handball'
    };

    // 전체 구성원 · 보조 AT · 역대 수상자 · 역대 리더 · 대학원 졸업자 성명 영문 표기 사전 (132인 전수 매핑)
    const PERSON_NAME_KO_TO_EN = {
        '강석': 'Seok Kang',
        '강성훈': 'Sunghoon Kang',
        '고준영': 'Junyoung Ko',
        '권남준': 'Namjun Kwon',
        '권인혜': 'Inhye Kwon',
        '권준홍': 'Junhong Kwon',
        '권준휘': 'Junhwi Kwon',
        '기윤서': 'Yunseo Ki',
        '김다감': 'Dagam Kim',
        '김다영': 'Dayoung Kim',
        '김다은': 'Daeun Kim',
        '김대호': 'Daeho Kim',
        '김동언': 'Dongeon Kim',
        '김동현': 'Donghyeon Kim',
        '김무건': 'Mugeon Kim',
        '김무성': 'Moo Sung Kim',
        '김민주': 'Minju Kim',
        '김민준': 'Minjune Kim',
        '김민지': 'Minji Kim',
        '김성완': 'Sungwan Kim',
        '김성준': 'Seongjun Kim',
        '김승연': 'Seungyeon Kim',
        '김예종': 'Yejong Kim',
        '김재원': 'Jaewon Kim',
        '김주완': 'Juwan Kim',
        '김준영': 'Junyoung Kim',
        '김지원': 'Jiwon Kim',
        '김채은': 'Chaeeun Kim',
        '김태진': 'Taejin Kim',
        '김한결': 'Hangyeol Kim',
        '김형우': 'Hyeongwoo Kim',
        '남가민': 'Gamin Nam',
        '남수현': 'Suhyeon Nam',
        '남아공': 'Agong Nam',
        '노유연': 'Yuyeon Roh',
        '노윤서': 'Yunseo Roh',
        '두현지': 'Hyunji Doo',
        '문민서': 'Minseo Moon',
        '문수연': 'Suyeon Moon',
        '문정은': 'Jeongeun Moon',
        '문채연': 'Chaeyeon Moon',
        '민경은': 'Kyeong Eun Min',
        '박다은': 'Daeun Park',
        '박상협': 'Sanghyup Park',
        '박서현': 'Seohyun Park',
        '박세민': 'Semin Park',
        '박욱': 'Wook Park',
        '박유빈': 'Yubin Park',
        '박은지': 'Eunji Park',
        '박인서': 'Inseo Park',
        '박지현': 'Jihyeon Park',
        '박지홍': 'Jihong Park',
        '박효진': 'Hyojin Park',
        '방수일': 'Sooil Bang',
        '방형식': 'Hyeongsig Bang',
        '서동균': 'Dongkyun Seo',
        '성락훈': 'Rakhoon Sung',
        '손진원': 'Jin-won Son',
        '송서옥': 'Seook Song',
        '송찬': 'Chan Song',
        '신재윤': 'Jaeyoon Shin',
        '안은지': 'Eunji Ahn',
        '안효은': 'Hyoeun Ahn',
        '양창욱': 'Changwook Yang',
        '오민섭': 'Minsub Oh',
        '오성민': 'Sungmin Oh',
        '오승진': 'Seungjin Oh',
        '우민서': 'Minseo Woo',
        '우지윤': 'Jiyun Woo',
        '우태희': 'Taehee Woo',
        '유승아': 'Seunga Yu',
        '유승원': 'Seungwon Yu',
        '유영민': 'Youngmin Yoo',
        '유영수': 'Youngsoo Yu',
        '유주승': 'Juseung Yu',
        '유지민': 'Jimin Yu',
        '윤서연': 'Seoyeon Yun',
        '윤정섭': 'Jungseob Yoon',
        '이강훈': 'Kanghun Lee',
        '이남송': 'Namsong Lee',
        '이다현': 'Dahyeon Lee',
        '이도형': 'Dohyeong Lee',
        '이복음': 'Bokeum Lee',
        '이상준': 'Sangjun Lee',
        '이서영': 'Seo Young Lee',
        '이선화': 'Seonhwa Lee',
        '이송현': 'Songhyeon Lee',
        '이승민': 'Seungmin Lee',
        '이승훈': 'Seunghun Lee',
        '이승희': 'Seunghee Lee',
        '이예인': 'Yein Lee',
        '이은채': 'Eunchae Lee',
        '이재욱': 'Jaewook Lee',
        '이정재': 'Jeongjae Lee',
        '이주희': 'Joohee Lee',
        '이준혁': 'Junhyeok Lee',
        '이진우': 'Jinwoo Lee',
        '이진주': 'Jinju Lee',
        '이진호': 'Jinho Lee',
        '이채원': 'Chaewon Lee',
        '이천이': 'Cheoni Lee',
        '이태현': 'Taehyeon Lee',
        '이현욱': 'Hyunwook Lee',
        '임선주': 'Sunjoo Lim',
        '임준형': 'Junhyeong Lim',
        '장서현': 'Seohyeon Jang',
        '장영훈': 'Yeong-Hun Jang',
        '장휘수': 'Hwi-Su Jang',
        '전성규': 'Seonggyu Jeon',
        '정도엽': 'Doyeop Jeong',
        '정준영': 'Junyoung Jeong',
        '정태유': 'Taeyou Jung',
        '조연지': 'Yeonji Cho',
        '조유진': 'Yujin Cho',
        '조재희': 'Jaehee Cho',
        '조현준': 'Hyunjoon Cho',
        '진승희': 'Sung Hee Jin',
        '차정수': 'Jeongsoo Cha',
        '채상우': 'Sangwoo Chae',
        '천지훈': 'Jihoon Chun',
        '최성찬': 'Seongchan Choi',
        '최유빈': 'Yubin Choi',
        '최윤관': 'Yungwan Choi',
        '최주영': 'Juyoung Choi',
        '최지현': 'Jihyeon Choi',
        '최현곤': 'Hyungon Choi',
        '한승욱': 'Seunguk Han',
        '한현구': 'Hyeongu Han',
        '한혜서': 'Hyeseo Han',
        '홍진후': 'Jinhoo Hong',
        '황성윤': 'Seongyun Hwang',
        '황이삭': 'Isak Hwang'
    };

    // 사진 미등록 보조 AT 원형 아바타 이니셜 영문 매핑
    const AVATAR_INITIAL_KO_TO_EN = {
        '복음': 'BE',
        '채은': 'CE',
        '태현': 'TH',
        '상우': 'SW',
        '민서': 'MS',
        '다현': 'DH',
        '한결': 'HG',
        '다은': 'DE',
        '인혜': 'IH',
        '다감': 'DG',
        '수현': 'SH',
        '은지': 'EJ',
        '도엽': 'DY',
        '준휘': 'JH',
        '형우': 'HW',
        '은채': 'EC',
        '천이': 'CI'
    };

    function translatePersonNameToEn(koNameStr) {
        if (!koNameStr) return koNameStr;
        const trimmed = koNameStr.trim();
        if (PERSON_NAME_KO_TO_EN[trimmed]) return PERSON_NAME_KO_TO_EN[trimmed];
        // 쉼표로 구분된 공동 수상자(예: '조재희, 양창욱') 처리
        if (trimmed.includes(',')) {
            return trimmed.split(',').map(part => {
                const p = part.trim();
                return PERSON_NAME_KO_TO_EN[p] || p;
            }).join(', ');
        }
        return trimmed;
    }

    // 01 Faculty members & 02 Leaders 영문 통일 프로필 카드 (Education / Courses / Office / Laboratory / Email)
    const FACULTY_LEADER_EN_BULLETS = {
        '정태유':
            '<li id="adv-jung-line1">Affiliation: Professor, Dept. of Kinesiology, California State University, Northridge</li>' +
            '<li id="adv-jung-line2">Position: Executive Director, The Center of Achievement through Adapted Physical Activity</li>' +
            '<li id="adv-jung-line3">Degree &amp; Cert: PhD (University of Virginia) · ATC · CAPE</li>' +
            '<li id="adv-jung-line4">Career: Tenured Professor at CSUN · Lead in Adapted PE, Aquatic Rehab &amp; Neuromuscular Research</li>',
        '박욱':
            '<li id="adv-parkwook-line1">Affiliation: Professor, Dept. of Electronic Engineering, Kyung Hee University</li>' +
            '<li id="adv-parkwook-line2">Position: Vice Director, KHU Industry-Academic Cooperation Foundation · Director, KHU Tech Holdings</li>' +
            '<li id="adv-parkwook-line3">Degree &amp; Cert: PhD · Registered Technology Trader (MOTIE)</li>' +
            '<li id="adv-parkwook-line4">Career: Former Chair, Graduate Dept. of EE · Nature Materials Cover · Young Researcher Award</li>',
        '방형식':
            '<li id="adv-bang-line1">Affiliation: Director of Orthopedics, GODOIL Hospital</li>' +
            '<li id="adv-bang-line2">Position: Team Physician, Korea National Short Track Speed Skating Team (KSU)</li>' +
            '<li id="adv-bang-line3">Degree &amp; Cert: MD, PhD (CHA Univ.) · Orthopedic Surgeon · FIFA / IOC Diploma</li>' +
            '<li id="adv-bang-line4">Career: National Short Track Team Physician · Asan/Samsung Sub-Intern · SNUH Ortho Rotation</li>',
        '손진원':
            '<li id="adv-son-line1">Affiliation: Vice President / Partner, CLUST YEIN ACC. · CEO, CLUST VENTURES</li>' +
            '<li id="adv-son-line2">Position: Director, KSIA · Professor, Eulji Univ. FMP · Mentor, KHU Campus Town</li>' +
            '<li id="adv-son-line3">Degree &amp; Cert: Certified Public Accountant (KICPA)</li>' +
            '<li id="adv-son-line4">Career: Former CPA, Deloitte Anjin · Seoul/KISED Evaluator · Samsung Biologics IPO Advisor</li>',
        '박지홍, PhD, AT, CSCS':
            '<li>Professor, Dept. of Sports Medicine, Kyung Hee University</li>' +
            '<li>PhD in Exercise Sciences (Physical Medicine &amp; Rehabilitation), Brigham Young University</li>' +
            '<li>Office: College of Physical Education #422 (031-201-2721)</li>' +
            '<li>jihong.park@khu.ac.kr</li>',
        '오성민, PhD':
            '<li>Research Professor, Dept. of Sports Medicine, Kyung Hee University</li>' +
            '<li>Ph.D. in Motor Control &amp; Sport Psych, Sungkyunkwan University</li>' +
            '<li>Laboratory: Seonseung-gwan AT Center</li>' +
            '<li>sungminoh@khu.ac.kr</li>',
        '김준영 실장':
            '<li>Education: M.S. in Physical Education (Athletic Training),<br>Kyung Hee University</li>' +
            '<li>Courses: Rehab Exercise &amp; Sports Taping Lab</li>' +
            '<li>junyoung0366@khu.ac.kr</li>',
        '최현곤 재활팀장':
            '<li>Education: M.S in Sports medicine &amp; science (Athletic Training),<br>Kyung Hee University</li>' +
            '<li>gusrhs24@khu.ac.kr</li>',
        '이재욱 연구팀장':
            '<li>Education: M.S. in Physical Education (Athletic Training),<br>Kyung Hee University</li>' +
            '<li>Courses: S&amp;C, Athletic Injury Management,<br>Resistance Exercise Lab</li>' +
            '<li>jwlee0102@khu.ac.kr</li>'
    };

    // 구성원 카드 내 세부 항목 줄 단위 영문 변환 함수 (350px 카드 내 1줄 유지 보장)
    function translateMemberBulletLine(text) {
        let t = text.replace(/&amp;/g, '&').trim();

        const exactBulletMap = {
            '학위명: 체육과학 박사(Physical Medicine & Rehabilitation 전공)': 'Education: PhD in Exercise Sciences (Physical Medicine & Rehabilitation),<br>Brigham Young University, Utah, USA',
            '최종학력: Brigham Young University': 'Courses: Athletic Training, Therapeutic Modalities,<br>Strength & Conditioning Techniques',
            '담당과목: 운동손상, 재활모달리티, 저항운동과컨디셔닝': 'Office: College of Physical Education #422 (031-201-2721)',
            '연구실: 체422호 (031-201-2721)': 'Laboratory: Seonseung-gwan (031-201-2786)',
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
            '경희대학교 무용학부 졸업': 'B.A. in Dance, Kyung Hee University',
            '경희대학교 무용학과 졸업': 'B.A. in Dance, Kyung Hee University',
            '경희대학교 무용학부 한국무용 졸업': 'B.A. in Korean Dance, Kyung Hee Univ.',
            '경희대학교 체육학과 졸업': 'B.S. in Physical Education, Kyung Hee Univ.',
            '일반대학원 석사 졸업': 'M.S. in Physical Education, KHU',
            '경희대학교 일반대학원 석사 졸업': 'M.S. in Physical Education, KHU',
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
            '센터 AT': 'Center Athletic Trainer',
            '연구주제: 미정': 'Research: TBD'
        };

        if (exactBulletMap[t]) return exactBulletMap[t];

        // 일반대학원 기수
        const gradMatch = t.match(/^일반대학원\s*(?:석사과정\s*)?(\d+)기$/);
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
                .replace('연구주제: 운동 동호인들의 무릎, 발목 골관절염 실태조사', 'Research: Knee & Ankle OA in Active Adults')
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
            .replace(/경희대학교 무용학부 졸업/g, 'B.A. in Dance, KHU')
            .replace(/경희대학교 무용학과 졸업/g, 'B.A. in Dance, KHU')
            .replace(/경희대학교 체육학과 졸업/g, 'B.S. in Physical Education, KHU')
            .replace(/일반대학원 석사 졸업/g, 'M.S. in Physical Education, KHU Graduate School')
            .replace(/무용학부 한국무용/g, 'School of Dance (Korean Dance)')
            .replace(/무용학부/g, 'School of Dance')
            .replace(/저체중, 마른비만, 정상체중 여성 성인의 혈액지표, 신체구성, 신체기능 및 자가보고 설문 비교/g, 'Comparison of Blood Biomarkers, Body Composition, Physical Function, and Self-Reported Questionnaires in Underweight, Normal-Weight Obese, and Normal-Weight Adult Women')
            .replace(/운동 동호인들의 무릎, 발목 골관절염 실태조사/g, 'Knee & Ankle Osteoarthritis Survey in Active Adults')
            .replace(/무릎 및 발목 골관절염 및 신체활동 설문조사/g, 'Knee and Ankle Osteoarthritis and Physical Activity Survey')
            .replace(/2024 운동학 학술대회/g, '2024 Korean Academy of Kinesiology Conference')
            .replace(/조선대학교 체육학과 졸업/g, 'B.S. in Physical Education, Chosun Univ.')
            .replace(/성결대학교 체육교육과 졸업/g, 'B.S. in Physical Education, Sungkyul Univ.')
            .replace(/체육과학 박사\(Physical Medicine & Rehabilitation 전공\)/g, 'PhD in Exercise Sciences (Physical Medicine & Rehabilitation)')
            .replace(/^Brigham Young University$/g, 'Brigham Young University, Utah, USA')
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
            .replace(/\((\d+)기\)/g, '(Cohort $1)')
            .replace(/\(석사학위논문\)/g, '(Master\'s Thesis)')
            .replace(/운동손상, 재활모달리티, 저항운동과컨디셔닝/g, 'Athletic Training, Therapeutic Modalities, Strength & Conditioning Techniques')
            .replace(/운동손상평가/g, 'Evaluation of Athletic Injuries')
            .replace(/재활운동실습, 스포츠테이핑실습/g, 'Rehabilitation Exercise Lab, Sports Taping Lab')
            .replace(/저항운동과컨디셔닝, 운동손상관리, 저항운동실습/g, 'S&C, Athletic Injury Management, Resistance Exercise Lab')
            .replace(/체422호 \(031-201-2721\)/g, 'College of Physical Education #422 (031-201-2721) / Laboratory: Seonseung-gwan (031-201-2786)')
            .replace(/체422호/g, 'College of Physical Education #422')
            .replace(/KATA 공인 AT \(선수트레이너\)/g, 'KATA Certified Athletic Trainer (AT)')
            .replace(/운동처방사/g, 'Exercise Prescription Specialist')
            .replace(/건강운동관리사/g, 'Health & Exercise Specialist')
            .replace(/생활스포츠지도사/g, 'Certified Sports Instructor')
            .replace(/스포츠테이핑/g, 'Sports Taping')
            .replace(/스포츠마사지/g, 'Sports Massage')
            .replace(/응급처치/g, 'First Aid')
            .replace(/BNK 썸 여자프로농구단 트레이너/g, 'Athletic Trainer, BNK Sum Women\'s Pro Basketball')
            .replace(/평창군보건의료원/g, 'Pyeongchang County Medical Center')
            .replace(/시설운영공단 트레이너/g, 'Sports Facility Management Trainer')
            .replace(/스포츠재활팀 트레이너/g, 'Sports Rehabilitation Team Trainer')
            .replace(/격파부/g, 'Breaking Team')
            .replace(/근골격계 질환 맞춤형 재활 및 운동처방/g, 'Customized Musculoskeletal Rehab & Exercise Prescription')
            .replace(/AT 동아리 운영 및 스포츠의학 현장 실무 지원/g, 'AT Club Operations & Sports Medicine Field Practice')
            .replace(/AT 동아리 회계·총무 및 스포츠의학 실무 지원/g, 'AT Club Accounting, Administration & Field Support')
            .replace(/스포츠 부상 예방 및 재활/g, 'Sports Injury Prevention & Rehabilitation')
            .replace(/선수 트레이닝 및 재활운동/g, 'Athletic Training & Rehabilitation Exercise')
            .replace(/근골격계 기능 평가 및 스포츠재활 트레이닝/g, 'Musculoskeletal Assessment & Sports Rehab Training')
            .replace(/노인 및 선수 서스펜션 트레이닝, 기능성 재활운동/g, 'Suspension Training & Functional Rehab Exercise')
            .replace(/스포츠 손상 재활 및 운동 지도/g, 'Sports Injury Rehabilitation & Exercise Coaching')
            .replace(/라켓 스포츠 상해 예방 및 선수 재활 트레이닝/g, 'Racket Sports Injury Prevention & Rehab Training')
            .replace(/선수 컨디셔닝 및 기능성 스트렝스 트레이닝/g, 'Athlete Conditioning & Functional Strength Training')
            .replace(/학사과정/g, 'Undergraduate')
            .replace(/학사 졸업/g, 'B.S. Graduate')
            .replace(/석사 졸업/g, 'M.S. Graduate')
            .replace(/학부 연구생 \/ 보조 AT/g, 'Undergraduate Student / Assistant AT')
            .replace(/선수 케어 및 필드 의무지원/g, 'Athlete Care & Field Medical Support')
            .replace(/재학생/g, 'Undergraduate Student')
            .replace(/^미정$/g, 'TBD');
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

        // 3) 구성원 프로필 카드(.modern-profile-card) 원본 이름 및 리스트 백업
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
            const ulEl = card.querySelector('.modern-profile-exp');
            if (ulEl && ulEl.dataset.koOrig === undefined) {
                ulEl.dataset.koOrig = ulEl.innerHTML;
            }
            card.querySelectorAll('.modern-profile-exp li').forEach(li => {
                if (li.dataset.koOrig === undefined) {
                    li.dataset.koOrig = li.innerHTML;
                }
            });
        });

        // 5) 06 AT 센터 보조(.assistant-dept-card) 부서명, 인원수, 보조 AT 이름 및 이니셜 백업
        document.querySelectorAll('.assistant-dept-card').forEach(card => {
            const titleEl = card.querySelector('.assistant-dept-title');
            const countEl = card.querySelector('.assistant-dept-count');
            if (titleEl && titleEl.dataset.koOrig === undefined) titleEl.dataset.koOrig = titleEl.innerHTML;
            if (countEl && countEl.dataset.koOrig === undefined) countEl.dataset.koOrig = countEl.innerHTML;
        });
        document.querySelectorAll('.assistant-person-item').forEach(item => {
            const pNameEl = item.querySelector('.assistant-person-name');
            if (pNameEl) {
                if (item.dataset.koName === undefined) {
                    item.dataset.koName = pNameEl.textContent.trim();
                }
                if (pNameEl.dataset.koOrig === undefined) {
                    pNameEl.dataset.koOrig = pNameEl.innerHTML;
                }
            }
            const initEl = item.querySelector('.avatar-initial');
            if (initEl && initEl.dataset.koOrig === undefined) {
                initEl.dataset.koOrig = initEl.innerHTML;
            }
        });

        // 6) 역대 수상자 카드 성명, 설명, 힌트, 배지, 역대 리더 성명, 대학원 졸업자 성명 및 종목 태그 백업
        document.querySelectorAll('#awards .award-stream-name, #awards .dual-name-row, #awards .ed-name, #awards .ed-ga-item .gn, #awards .award-stream-desc, #awards .award-click-hint, #awards .award-pill, #awards .ed-ga-item .gb').forEach(el => {
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

        // 3) 구성원 프로필 카드(.modern-profile-card) 성명, 직책 및 약력 전환
        document.querySelectorAll('.modern-profile-card').forEach(card => {
            const nameEl = card.querySelector('.modern-profile-name');
            if (nameEl && nameEl.dataset.koOrig !== undefined) {
                if (lang === 'en') {
                    let translatedName = nameEl.dataset.koOrig
                        .replace('정태유, PhD, ATC, CAPE', 'Taeyou Jung, PhD, ATC, CAPE')
                        .replace('박욱, PhD', 'Wook Park, PhD')
                        .replace('방형식, MD, PhD', 'Hyeongsig Bang, MD, PhD')
                        .replace('손진원, KICPA', 'Jin-won Son, KICPA')
                        .replace('박지홍, PhD, AT, CSCS', 'Jihong Park, PhD, AT, CSCS')
                        .replace('오성민, PhD', 'Sungmin Oh, PhD')
                        .replace('김준영 실장', 'Junyoung Kim <span style="font-size:0.84rem; font-weight:700; color:var(--color-primary);">Athletic Training</span>')
                        .replace('최현곤 재활팀장', 'Hyungon Choi <span style="font-size:0.84rem; font-weight:700; color:var(--color-primary);">Sports Rehabilitation</span>')
                        .replace('이재욱 연구팀장', 'Jaewook Lee <span style="font-size:0.84rem; font-weight:700; color:var(--color-primary);">Research</span>')
                        .replace('(회장)', '(President)')
                        .replace('(부회장)', '(Vice Pres.)')
                        .replace('(총무)', '(Secretary)');
                    // 일반 구성원 성명(예: '조연지 (President)' 또는 '우지윤' 등) 영문 치환
                    translatedName = translatedName.replace(/^([가-힣]{2,4})(\s|<|$)/, function (match, koName, suffix) {
                        return (PERSON_NAME_KO_TO_EN[koName] || koName) + suffix;
                    });
                    nameEl.innerHTML = translatedName;
                } else {
                    nameEl.innerHTML = nameEl.dataset.koOrig;
                }
            }
            const ulEl = card.querySelector('.modern-profile-exp');
            const koCardName = card.dataset.koName || '';
            if (ulEl && FACULTY_LEADER_EN_BULLETS[koCardName]) {
                if (lang === 'en') {
                    ulEl.innerHTML = FACULTY_LEADER_EN_BULLETS[koCardName];
                } else if (ulEl.dataset.koOrig !== undefined) {
                    ulEl.innerHTML = ulEl.dataset.koOrig;
                }
            } else {
                card.querySelectorAll('.modern-profile-exp li').forEach(li => {
                    if (li.dataset.koOrig === undefined) return;
                    if (lang === 'en') {
                        li.innerHTML = translateMemberBulletLine(li.dataset.koOrig);
                    } else {
                        li.innerHTML = li.dataset.koOrig;
                    }
                });
            }
        });

        // 5) 06 AT 센터 보조(.assistant-dept-card) 부서명, 인원수, 보조 AT 성명 및 이니셜 전환
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
        document.querySelectorAll('.assistant-person-item').forEach(item => {
            const pNameEl = item.querySelector('.assistant-person-name');
            if (pNameEl && pNameEl.dataset.koOrig !== undefined) {
                const koName = pNameEl.dataset.koOrig.trim();
                pNameEl.innerHTML = (lang === 'en')
                    ? (PERSON_NAME_KO_TO_EN[koName] || koName)
                    : pNameEl.dataset.koOrig;
            }
            const initEl = item.querySelector('.avatar-initial');
            if (initEl && initEl.dataset.koOrig !== undefined) {
                const koInit = initEl.dataset.koOrig.trim();
                initEl.innerHTML = (lang === 'en')
                    ? (AVATAR_INITIAL_KO_TO_EN[koInit] || koInit)
                    : initEl.dataset.koOrig;
            }
        });

        // 6) 역대 수상자 성명, 역대 리더 성명, 대학원 졸업자 성명 및 설명·배지 전환
        document.querySelectorAll('#awards .award-stream-name, #awards .dual-name-row, #awards .ed-name, #awards .ed-ga-item .gn').forEach(el => {
            if (el.dataset.koOrig === undefined) return;
            const koName = el.dataset.koOrig.trim();
            el.innerHTML = (lang === 'en')
                ? (PERSON_NAME_KO_TO_EN[koName] || koName)
                : el.dataset.koOrig;
        });

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
            resHeaderSpans[0].innerHTML = (lang === 'en') ? 'EBM RESEARCH (64 Papers)' : resHeaderSpans[0].dataset.koOrig;
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
            '교육 / 자문': 'Education / Collaboration',
            '스포츠의학 현장 지원 서비스': 'Sports Medicine Field Support Service'
        };
        document.querySelectorAll('#form-type option').forEach(opt => {
            const val = opt.getAttribute('value') || '';
            opt.textContent = (lang === 'en') ? (inquiryTypeOptionMap[val] || opt.dataset.koOrig) : opt.dataset.koOrig;
        });

        // 10) 통합 멤버 디렉토리 & 역대 기록 아카이브 탭 라벨 / 활동사진 더보기 동기화
        document.querySelectorAll('.member-dir-tab-btn [data-ko][data-en], .awards-archive-tab-btn [data-ko][data-en], #skip-to-content[data-ko][data-en], #btn-open-privacy-modal[data-ko][data-en], #footer-privacy-notice-btn[data-ko][data-en], #privacy-notice-modal [data-ko][data-en]').forEach(el => {
            el.innerHTML = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-ko');
        });
        const expandLabel = document.getElementById('gallery-expand-label');
        if (expandLabel) {
            const totalDeptCards = document.querySelectorAll('#activities .gallery-card-item[data-category="dept"]').length;
            const remain = Math.max(0, totalDeptCards - 9);
            if (window.__activitiesExpanded) {
                expandLabel.textContent = (lang === 'en') ? 'Show Fewer Photos' : '활동사진 접기';
            } else {
                expandLabel.textContent = (lang === 'en') ? `View All Activity Photos (+${remain})` : `활동사진 더보기 (+${remain}장)`;
            }
        }

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
                // 이전 모달에서 숨겼던 라벨·값 칸 표시 상태 초기화 (origOpenProfModal 실행 전)
                ['prof-modal-degree-label', 'prof-modal-degree', 'prof-modal-edu-label', 'prof-modal-edu', 'prof-modal-subject-label', 'prof-modal-subject', 'prof-modal-lab-label', 'prof-modal-lab', 'prof-modal-email-label', 'prof-modal-email'].forEach(id => {
                    const elem = document.getElementById(id);
                    if (elem) elem.style.display = '';
                });

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
                    '담당 역할': 'Role',
                    '기수': 'Cohort',
                    '보직': 'Position',
                    '학위·자격': 'Degree & Cert',
                    '전문 분야': 'Focus Area',
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

                    // 01 Faculty members & 02 Leaders 영문 상세 모달 통일 매핑
                    const modalNameEl = document.getElementById('prof-modal-name');
                    const mName = modalNameEl ? modalNameEl.textContent.trim() : '';
                    const degLbl = document.getElementById('prof-modal-degree-label');
                    const eduLbl = document.getElementById('prof-modal-edu-label');
                    const subLbl = document.getElementById('prof-modal-subject-label');
                    const labLbl = document.getElementById('prof-modal-lab-label');
                    const degVal = document.getElementById('prof-modal-degree');
                    const eduVal = document.getElementById('prof-modal-edu');
                    const subVal = document.getElementById('prof-modal-subject');
                    const labVal = document.getElementById('prof-modal-lab');

                    const MODAL_UNIFIED_EN = {
                        '정태유': {
                            role: 'Advisory Board Member · Professor, CSUN',
                            customRows: [
                                { label: 'Affiliation', value: 'Professor, Dept. of Kinesiology, California State University, Northridge' },
                                { label: 'Position', value: 'Executive Director, The Center of Achievement through Adapted Physical Activity' },
                                { label: 'Degree & Cert', value: 'PhD (University of Virginia) · ATC · CAPE' },
                                { label: 'Focus Area', value: 'Sports Medicine · Adapted Physical Activity · Aquatic & Neuromuscular Rehab' }
                            ],
                            career: [
                                'Professor (Tenured), Dept. of Kinesiology, California State University, Northridge',
                                'Executive Director, The Center of Achievement through Adapted Physical Activity',
                                'Advisory Board Member, Kyung Hee University Athletic Training Center',
                                'Certified Athletic Trainer (ATC)',
                                'Certified Adapted Physical Educator (CAPE)'
                            ],
                            research: [
                                'Sports Medicine and Adapted Physical Activity',
                                'Aquatic Therapy and Motor Function for Individuals with Disabilities',
                                'Neuromuscular Rehabilitation and Clinical Exercise Physiology'
                            ]
                        },
                        '박욱': {
                            role: 'Advisory Board Member · Professor, Dept. of Electronic Engineering, KHU',
                            customRows: [
                                { label: 'Affiliation', value: 'Professor, Dept. of Electronic Engineering, Kyung Hee University' },
                                { label: 'Position', value: 'Vice Director, KHU Industry-Academic Cooperation Foundation · Director, KHU Tech Holdings' },
                                { label: 'Degree & Cert', value: 'PhD in Engineering · Registered Technology Trader (MOTIE)' },
                                { label: 'Focus Area', value: 'Biochips · Microfluidics · Advanced Sensors & Tech Commercialization' }
                            ],
                            career: [
                                'Professor, Dept. of Electronic Engineering, Kyung Hee University',
                                'Vice Director, KHU Industry-Academic Cooperation Foundation · Director, KHU Technology Holdings',
                                'Advisory Board Member, Kyung Hee University Athletic Training Center',
                                'Former Chair, Graduate Dept. of Electronic Engineering, Kyung Hee University',
                                'Young Researcher Academic Award, Korean Biochip Society (2017)',
                                'Researcher, Elesign Inc. (2002–2006, VoIP/IP Phone Development)'
                            ],
                            research: [
                                'Published in Nature Materials (Cover), Nature Photonics, Nature Communications & Advanced Materials (Multiple Covers)',
                                'Biochips, Microfluidics, Advanced Sensors & Industry-Academic Tech Commercialization'
                            ]
                        },
                        '방형식': {
                            role: 'Advisory Board Member · Director of Orthopedics, GODOIL Hospital',
                            customRows: [
                                { label: 'Affiliation', value: 'Director of Orthopedics, GODOIL Hospital' },
                                { label: 'Position', value: 'Team Physician, Korea National Short Track Speed Skating Team (KSU)' },
                                { label: 'Degree & Cert', value: 'MD, PhD (CHA Univ.) · Board-Certified Orthopedic Surgeon · FIFA / IOC Diploma' },
                                { label: 'Focus Area', value: 'Orthopedic Conditions & Elite National Athlete Sports Injury Care' }
                            ],
                            career: [
                                'Director of Orthopedics, GODOIL Hospital',
                                'Team Physician, Korea National Short Track Speed Skating Team (KSU)',
                                'Advisory Board Member, Kyung Hee University Athletic Training Center',
                                'FIFA & IOC Certified Sports Medicine Physician',
                                'Sub-Internship at Asan Medical Center & Samsung Medical Center',
                                'Orthopedic Surgery Residency Rotation at Seoul National University Hospital (SNUH)'
                            ],
                            research: []
                        },
                        '손진원': {
                            role: 'Advisory Board Member · VP, CLUST YEIN ACC. / CEO, CLUST VENTURES',
                            customRows: [
                                { label: 'Affiliation', value: 'Vice President / Partner, CLUST YEIN ACC. · CEO, CLUST VENTURES' },
                                { label: 'Position', value: 'Director, KSIA · Professor, Eulji Univ. FMP · Mentor, KHU Campus Town' },
                                { label: 'Degree & Cert', value: 'Certified Public Accountant (KICPA)' },
                                { label: 'Focus Area', value: 'Startups & VC · Clinics & MSO · Sports & Fitness · Corporate Finance' }
                            ],
                            career: [
                                'Vice President / Partner, CLUST YEIN Accounting Corp.',
                                'CEO, CLUST VENTURES',
                                'Director, KSIA · Professor, Eulji Univ. FMP · Mentor, KHU Campus Town',
                                'Evaluator, Seoul Metropolitan Government PPP & KISED',
                                'Former CPA, Audit Division, Deloitte Anjin LLC',
                                'Key Advisory: Samsung Biologics IPO · Ulsan U-STAR · SsangYong / Hyundai M&A',
                                'National Assembly Commendation · Former National Shooting Reserve Athlete'
                            ],
                            research: [
                                'Lectures on Startup & Sports Industry Tax/Accounting (Ajou Univ., Sejong Univ., Eulji Univ. FMP, SPOEX)',
                                'Accelerator & Venture Fund Financial Strategy Lectures (MYSC, Genexis, KAIA, CNT Tech)'
                            ]
                        },
                        '박지홍': {
                            edu: 'PhD in Exercise Sciences (Physical Medicine & Rehabilitation), Brigham Young University, Utah, USA',
                            courses: 'Athletic Training, Therapeutic Modalities, Strength & Conditioning Techniques',
                            office: 'College of Physical Education #422 (031-201-2721)',
                            lab: 'Seonseung-gwan (031-201-2786)'
                        },
                        '오성민': {
                            edu: 'Ph.D. in Motor Control & Sport Psych, Sungkyunkwan University',
                            courses: 'Evaluation of Athletic Injuries',
                            office: null,
                            lab: 'Seonseung-gwan AT Center (031-201-2786)'
                        },
                        '김준영': {
                            edu: 'M.S. in Physical Education (Athletic Training), Kyung Hee University',
                            courses: 'Rehab Exercise & Sports Taping Lab',
                            office: null,
                            lab: null
                        },
                        '최현곤': {
                            edu: 'M.S in Sports medicine & science (Athletic Training), Kyung Hee University',
                            courses: null,
                            office: null,
                            lab: null
                        },
                        '이재욱': {
                            edu: 'M.S. in Physical Education (Athletic Training), Kyung Hee University',
                            courses: 'S&C, Athletic Injury Management, Resistance Exercise Lab',
                            office: null,
                            lab: null
                        }
                    };

                    const unified = MODAL_UNIFIED_EN[mName];
                    if (unified) {
                        if (unified.role) {
                            const roleEl = document.getElementById('prof-modal-role');
                            if (roleEl) roleEl.textContent = unified.role;
                        }
                        const rows = unified.customRows ? unified.customRows.slice() : [];
                        if (!unified.customRows) {
                            rows.push({ label: 'Education', value: unified.edu });
                            if (unified.courses) rows.push({ label: 'Courses', value: unified.courses });
                            if (unified.office) rows.push({ label: 'Office', value: unified.office });
                            if (unified.lab) rows.push({ label: 'Laboratory', value: unified.lab });
                        }

                        const slots = [
                            [degLbl, degVal],
                            [eduLbl, eduVal],
                            [subLbl, subVal],
                            [labLbl, labVal]
                        ];
                        slots.forEach(([lEl, vEl], idx) => {
                            if (rows[idx]) {
                                if (lEl) { lEl.textContent = rows[idx].label; lEl.style.display = ''; }
                                if (vEl) { vEl.textContent = rows[idx].value; vEl.style.display = ''; }
                            } else {
                                if (lEl) lEl.style.display = 'none';
                                if (vEl) vEl.style.display = 'none';
                            }
                        });

                        if (unified.career) {
                            const careerList = document.getElementById('prof-modal-career');
                            if (careerList) {
                                careerList.innerHTML = unified.career.map(item => `<li>${item}</li>`).join('');
                            }
                        }
                        if (unified.research) {
                            const researchList = document.getElementById('prof-modal-research');
                            const researchSec = document.getElementById('prof-modal-research-sec');
                            if (researchList) {
                                if (unified.research.length > 0) {
                                    researchList.innerHTML = unified.research.map(item => `<li>${item}</li>`).join('');
                                    if (researchSec) researchSec.style.display = 'block';
                                } else {
                                    researchList.innerHTML = '';
                                    if (researchSec) researchSec.style.display = 'none';
                                }
                            }
                        }
                    }

                    // 모달 상단 인물 성명도 영문 이름으로 변환
                    if (modalNameEl && mName) {
                        modalNameEl.textContent = translatePersonNameToEn(mName);
                    }

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
                    const nameEl = document.getElementById('alumni-modal-name');
                    const badgeEl = document.getElementById('alumni-modal-badge');
                    const jobEl = document.getElementById('alumni-modal-job');

                    if (nameEl) {
                        nameEl.textContent = translatePersonNameToEn(nameEl.textContent);
                    }

                    if (badgeEl) {
                        let bTxt = badgeEl.textContent
                            .replace('경희대학교 AT Center 동문', 'KHU AT Center Alumni')
                            .replace('공동 수상', 'Co-Winner')
                            .replace('팀장', 'Team Lead')
                            .replace('연구/교육', 'Research / Education')
                            .replace('스포츠재활', 'Sports Rehabilitation');
                        Object.keys(GA_BADGE_KO_TO_EN).forEach(function (koKey) {
                            bTxt = bTxt.replace(koKey, GA_BADGE_KO_TO_EN[koKey]);
                        });
                        badgeEl.textContent = bTxt.replace(/\s*—\s*/g, ' - ');
                    }
                    if (jobEl) {
                        let jHtml = jobEl.innerHTML
                            .replace(/미공개/g, 'Undisclosed')
                            .replace(/휴직/g, 'On Leave')
                            .replace(/공동 수상/g, 'Co-Winner')
                            .replace(/현\)\s*/g, 'Current: ');
                        Object.keys(PERSON_NAME_KO_TO_EN).forEach(function (koName) {
                            if (jHtml.includes(koName)) {
                                jHtml = jHtml.split(koName).join(PERSON_NAME_KO_TO_EN[koName]);
                            }
                        });
                        jobEl.innerHTML = jHtml;
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
