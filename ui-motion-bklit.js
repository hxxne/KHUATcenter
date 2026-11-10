/**
 * KHU AT Center × anime.js · Motion · Bklit UI 통합 컨트롤러 (Step 1 · 2 · 3 완비)
 * --------------------------------------------------------------------------
 * [Step 1: 데이터 시각화]
 * 1) AT 센터 누적 기록 (#dashboard):
 *    - anime.js (v4.5) outExpo 감속 숫자 카운트업 (547명 / 64편 / 173,316건)
 *    - Bklit UI AreaGradientDefs + ChartRevealClip 스타일 누적 성장 스파크라인 & 크로스헤어 스냅 툴팁
 *    - Motion (v14.9) inView 뷰포트 감지 트리거
 * 2) 연구 논문 64편 모달 (#research-modal):
 *    - Bklit UI 동심원 4중 RingChart (파트별 비중 31 / 9 / 18 / 6편) + 탭 양방향 연동
 *    - Bklit UI 2011–2026 실제 64편 연도별 게재 추이 BarChart + 호버 스냅 툴팁
 * [Step 2: 스크롤 프로그레스 & 절제된 아카데믹 리빌]
 * 3) 상단 헤더 하단 초슬림 경희 버건디 스크롤 진행 바 (Motion scroll())
 * 4) 주요 섹션 및 카드 그리드 미세 시차(Stagger) 1회 리빌 (Motion inView() + anime.js stagger())
 * [Step 3: 탭 슬라이딩 인디케이터 & 모달 스프링 전환]
 * 5) 활동 사진 카테고리 탭 버건디 캡슐 & 연구 논문 파트 탭 밑줄 슬라이딩 (Motion spring())
 * 6) 활동 사진 카테고리·12개 부서 픽토그램 필터 시차 정돈 (anime.js stagger())
 * 7) 5대 주요 모달(구성원·동문·논문·핵심사업·부서) 팝업 스프링 스케일 오픈 (Motion spring())
 */
(function () {
    'use strict';

    // 기존 script.js의 등속(setInterval) 카운터 중복 실행 방지 플래그
    window.__bklitCountersHandled = true;

    const prefersReducedMotion = () =>
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getLang = () =>
        (document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ko');

    /* ======================================================================
       공통 유틸: 부드러운 카트멀-롬(Catmull-Rom) -> 3차 베지어 곡선 SVG 패스 생성기
       ====================================================================== */
    function buildSmoothPath(points) {
        if (!points.length) return '';
        if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
        let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i === 0 ? i : i - 1];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = p1.y + (p2.y - p0.y) / 6;
            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = p2.y - (p3.y - p1.y) / 6;

            d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
        }
        return d;
    }

    /* ======================================================================
       1. AT 센터 누적 기록 (#dashboard) — 스파크라인 데이터 및 렌더링
       ====================================================================== */
    const SPARK_CONFIGS = [
        {
            id: 'spark-edu',
            color: '#A50034',
            unitKo: '명',
            unitEn: 'Trainees',
            labelKo: '연도별 누적 이수 추이',
            labelEn: 'Cumulative Trainees',
            badgeKo: '+45명 / 년 평균',
            badgeEn: '+45 / yr avg',
            series: [
                { year: '2016', val: 91 },
                { year: '2018', val: 182 },
                { year: '2020', val: 274 },
                { year: '2022', val: 365 },
                { year: '2024', val: 456 },
                { year: '2026', val: 547 }
            ]
        },
        {
            id: 'spark-res',
            color: '#002244',
            unitKo: '편',
            unitEn: 'Papers',
            labelKo: '누적 논문 게재 추이 (실측)',
            labelEn: 'Cumulative Publications',
            badgeKo: '최근 5년 +32편',
            badgeEn: '+32 in 5 yrs',
            // 실제 등록된 64편 논문의 연도별 누적 건수 (100% 실측 데이터)
            series: [
                { year: '2016', val: 13 },
                { year: '2018', val: 18 },
                { year: '2020', val: 23 },
                { year: '2022', val: 41 },
                { year: '2024', val: 52 },
                { year: '2026', val: 64 }
            ]
        },
        {
            id: 'spark-srv',
            color: '#A67C1E',
            unitKo: '건',
            unitEn: 'Cases',
            labelKo: '누적 임상·현장 케어 추이',
            labelEn: 'Cumulative Clinical Care',
            badgeKo: '연평균 1.5만+ 건',
            badgeEn: '15k+ / yr',
            series: [
                { year: '2016', val: 24500 },
                { year: '2018', val: 52800 },
                { year: '2020', val: 81400 },
                { year: '2022', val: 114200 },
                { year: '2024', val: 143600 },
                { year: '2026', val: 173316 }
            ]
        }
    ];

    const sparkClipRects = [];

    function renderDashboardSparklines() {
        const lang = getLang();
        const W = 260;
        const H = 52;
        const padX = 6;
        const padTop = 7;
        const padBot = 6;

        SPARK_CONFIGS.forEach((cfg) => {
            const mount = document.getElementById(cfg.id);
            if (!mount) return;

            const vals = cfg.series.map((d) => d.val);
            const minV = Math.min.apply(null, vals) * 0.85;
            const maxV = Math.max.apply(null, vals);
            const spanV = Math.max(1, maxV - minV);

            const pts = cfg.series.map((d, idx) => {
                const x = padX + (idx / (cfg.series.length - 1)) * (W - padX * 2);
                const y = padTop + (1 - (d.val - minV) / spanV) * (H - padTop - padBot);
                return { x, y, year: d.year, val: d.val };
            });

            const lineD = buildSmoothPath(pts);
            const areaD = `${lineD} L ${pts[pts.length - 1].x.toFixed(2)} ${H} L ${pts[0].x.toFixed(2)} ${H} Z`;
            const lastPt = pts[pts.length - 1];

            const gradId = `${cfg.id}-grad`;
            const edgeGradId = `${cfg.id}-edge-grad`;
            const edgeMaskId = `${cfg.id}-edge-mask`;
            const clipId = `${cfg.id}-reveal-clip`;

            mount.innerHTML = `
                <div class="bklit-spark-meta">
                    <span class="bklit-spark-label" data-ko="${cfg.labelKo}" data-en="${cfg.labelEn}">${lang === 'en' ? cfg.labelEn : cfg.labelKo}</span>
                    <span class="bklit-spark-trend" data-ko="${cfg.badgeKo}" data-en="${cfg.badgeEn}">${lang === 'en' ? cfg.badgeEn : cfg.badgeKo}</span>
                </div>
                <div class="bklit-spark-tooltip" aria-hidden="true"></div>
                <svg class="bklit-spark-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${cfg.labelKo}">
                    <defs>
                        <!-- Bklit UI AreaGradientDefs 수직 그라데이션 -->
                        <linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="${cfg.color}" stop-opacity="0.24" />
                            <stop offset="100%" stop-color="${cfg.color}" stop-opacity="0.0" />
                        </linearGradient>
                        <!-- 좌우 가장자리 소프트 페이드 마스크 -->
                        <linearGradient id="${edgeGradId}" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="white" stop-opacity="0.2" />
                            <stop offset="8%" stop-color="white" stop-opacity="1" />
                            <stop offset="95%" stop-color="white" stop-opacity="1" />
                            <stop offset="100%" stop-color="white" stop-opacity="0.85" />
                        </linearGradient>
                        <mask id="${edgeMaskId}">
                            <rect x="0" y="0" width="${W}" height="${H}" fill="url(#${edgeGradId})" />
                        </mask>
                        <!-- Bklit UI ChartRevealClip 좌->우 리빌 클립 -->
                        <clipPath id="${clipId}">
                            <rect class="bklit-clip-rect" x="-4" y="-8" width="${prefersReducedMotion() ? W + 12 : 0}" height="${H + 16}" data-full-w="${W + 12}" />
                        </clipPath>
                    </defs>

                    <!-- 수평 기준 점선 -->
                    <line x1="${padX}" y1="${(H / 2).toFixed(1)}" x2="${W - padX}" y2="${(H / 2).toFixed(1)}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3" />

                    <g clip-path="url(#${clipId})">
                        <path d="${areaD}" fill="url(#${gradId})" mask="url(#${edgeMaskId})" />
                        <path d="${lineD}" fill="none" stroke="${cfg.color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="${lastPt.x.toFixed(2)}" cy="${lastPt.y.toFixed(2)}" r="3.4" fill="#FFFFFF" stroke="${cfg.color}" stroke-width="2.2" />
                    </g>

                    <!-- 인터랙티브 스냅 가이드라인 & 활성 포인터 도트 -->
                    <line class="bklit-scrub-line" x1="0" y1="2" x2="0" y2="${H}" stroke="${cfg.color}" stroke-width="1" stroke-dasharray="2 2" opacity="0" />
                    <circle class="bklit-scrub-dot" cx="0" cy="0" r="4.2" fill="${cfg.color}" stroke="#FFFFFF" stroke-width="2" opacity="0" />
                </svg>
                <div class="bklit-spark-axis">
                    <span>${cfg.series[0].year}</span>
                    <span>${cfg.series[2].year}</span>
                    <span>${cfg.series[cfg.series.length - 1].year}</span>
                </div>
            `;

            const clipRect = mount.querySelector('.bklit-clip-rect');
            if (clipRect) sparkClipRects.push(clipRect);

            // 마우스/터치 스냅 인터랙션 (카드 클릭 이벤트를 방해하지 않도록 mousemove/mouseleave만 사용)
            const svgEl = mount.querySelector('.bklit-spark-svg');
            const scrubLine = mount.querySelector('.bklit-scrub-line');
            const scrubDot = mount.querySelector('.bklit-scrub-dot');
            const tooltipEl = mount.querySelector('.bklit-spark-tooltip');

            const handleMove = (clientX) => {
                const rect = svgEl.getBoundingClientRect();
                if (!rect.width) return;
                const relX = ((clientX - rect.left) / rect.width) * W;
                let nearest = pts[0];
                let minDist = Infinity;
                pts.forEach((p) => {
                    const dist = Math.abs(p.x - relX);
                    if (dist < minDist) {
                        minDist = dist;
                        nearest = p;
                    }
                });
                mount.classList.add('is-scrubbing');
                scrubLine.setAttribute('x1', nearest.x.toFixed(2));
                scrubLine.setAttribute('x2', nearest.x.toFixed(2));
                scrubLine.setAttribute('opacity', '0.65');
                scrubDot.setAttribute('cx', nearest.x.toFixed(2));
                scrubDot.setAttribute('cy', nearest.y.toFixed(2));
                scrubDot.setAttribute('opacity', '1');

                const curLang = getLang();
                const unit = curLang === 'en' ? ' ' + cfg.unitEn : cfg.unitKo;
                tooltipEl.textContent = `${nearest.year} · ${nearest.val.toLocaleString('en-US')}${unit}`;
            };

            svgEl.addEventListener('mousemove', (e) => handleMove(e.clientX));
            svgEl.addEventListener('mouseleave', () => {
                mount.classList.remove('is-scrubbing');
                scrubLine.setAttribute('opacity', '0');
                scrubDot.setAttribute('opacity', '0');
            });
        });
    }

    function animateDashboardMetrics() {
        const statEls = document.querySelectorAll('#dashboard .stat-number');
        const reduced = prefersReducedMotion();

        // 1) anime.js v4 outExpo 감속 카운트업
        statEls.forEach((el, idx) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            if (reduced || !window.anime || typeof window.anime.animate !== 'function') {
                el.textContent = target.toLocaleString('en-US');
                return;
            }

            const counterObj = { val: 0 };
            el.textContent = '0';
            window.anime.animate(counterObj, {
                val: target,
                duration: 1900,
                delay: idx * 110,
                ease: 'outExpo',
                onUpdate: function () {
                    el.textContent = Math.round(counterObj.val).toLocaleString('en-US');
                }
            });
        });

        // 2) Bklit UI ChartRevealClip 좌->우 스파크라인 리빌
        if (!reduced && window.anime && typeof window.anime.animate === 'function' && sparkClipRects.length) {
            sparkClipRects.forEach((rectEl, idx) => {
                const fullW = parseFloat(rectEl.getAttribute('data-full-w')) || 272;
                const clipObj = { w: 0 };
                rectEl.setAttribute('width', '0');
                window.anime.animate(clipObj, {
                    w: fullW,
                    duration: 1350,
                    delay: 140 + idx * 130,
                    ease: 'outQuart',
                    onUpdate: function () {
                        rectEl.setAttribute('width', clipObj.w.toFixed(2));
                    }
                });
            });
        }
    }

    function setupDashboardObserver() {
        const section = document.getElementById('dashboard');
        if (!section) return;
        let triggered = false;

        const runOnce = () => {
            if (triggered) return;
            triggered = true;
            animateDashboardMetrics();
        };

        // Motion v14 inView 우선 활용, 미지원 환경에서는 IntersectionObserver 폴백
        if (window.Motion && typeof window.Motion.inView === 'function') {
            window.Motion.inView(section, () => {
                runOnce();
            }, { amount: 0.2 });
        } else if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        runOnce();
                        obs.disconnect();
                    }
                });
            }, { threshold: 0.2 });
            obs.observe(section);
        } else {
            runOnce();
        }
    }

    /* ======================================================================
       2. 연구 논문 64편 모달 (#research-modal) — Bklit UI RingChart & BarChart
       ====================================================================== */
    const RESEARCH_PARTS = [
        { part: 1, count: 31, color: '#A50034', nameKo: 'Part 1. 스포츠재활',   nameEn: 'Part 1. Sports Rehab' },
        { part: 2, count: 9,  color: '#1E293B', nameKo: 'Part 2. 피로 회복',     nameEn: 'Part 2. Recovery' },
        { part: 3, count: 18, color: '#D97706', nameKo: 'Part 3. 경기력 향상',   nameEn: 'Part 3. Performance' },
        { part: 4, count: 6,  color: '#0284C7', nameKo: 'Part 4. 부상 조사 분석', nameEn: 'Part 4. Injury Epi.' }
    ];
    const TOTAL_PAPERS = 64;

    // 실제 등록된 64편 논문의 연도별 출판 건수 (2011~2026 합계 = 64편)
    const ANNUAL_PAPERS = [
        { year: '2011', count: 1 },
        { year: '2012', count: 3 },
        { year: '2013', count: 3 },
        { year: '2014', count: 1 },
        { year: '2015', count: 2 },
        { year: '2016', count: 3 },
        { year: '2017', count: 4 },
        { year: '2018', count: 1 },
        { year: '2019', count: 1 },
        { year: '2020', count: 4 },
        { year: '2021', count: 9 },
        { year: '2022', count: 9 },
        { year: '2023', count: 4 },
        { year: '2024', count: 7 },
        { year: '2025', count: 5 },
        { year: '2026', count: 7 }
    ];

    let activeResearchPart = 1;

    function buildResearchSummaryCharts() {
        const mount = document.getElementById('bklit-research-summary');
        if (!mount) return;
        const lang = getLang();

        // 1) 동심원 4중 RingChart 기하 계산 (Bklit UI RingChart 규격: 12시 방향 시작)
        const size = 132;
        const cx = size / 2;
        const cy = size / 2;
        const strokeW = 7.5;
        const gap = 4.2;
        const outerR = 58;

        let ringsSvgMarkup = '';
        let legendMarkup = '';

        RESEARCH_PARTS.forEach((item, idx) => {
            const r = outerR - idx * (strokeW + gap);
            const circum = 2 * Math.PI * r;
            // 가장 큰 파트(31편)가 약 82% 호를 채우도록 정규화하여 4개 동심원 비례감이 한눈에 드러나게 구성
            const ratioOfTotal = item.count / TOTAL_PAPERS;
            const visualSweepRatio = Math.min(0.92, 0.16 + ratioOfTotal * 1.38);
            const targetOffset = circum * (1 - visualSweepRatio);
            const pctStr = Math.round(ratioOfTotal * 100) + '%';

            ringsSvgMarkup += `
                <circle class="bklit-ring-track" data-part="${item.part}" cx="${cx}" cy="${cy}" r="${r.toFixed(1)}"
                    fill="none" stroke="${item.color}" stroke-opacity="0.11" stroke-width="${strokeW}" />
                <circle class="bklit-ring-arc" data-part="${item.part}" data-circum="${circum.toFixed(2)}" data-target-offset="${targetOffset.toFixed(2)}"
                    cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${item.color}" stroke-width="${strokeW}"
                    stroke-linecap="round" stroke-dasharray="${circum.toFixed(2)}" stroke-dashoffset="${circum.toFixed(2)}"
                    transform="rotate(-90 ${cx} ${cy})" />
            `;

            const unitTxt = lang === 'en' ? '' : '편';
            legendMarkup += `
                <li class="bklit-legend-item ${item.part === activeResearchPart ? 'is-active' : ''}" data-part="${item.part}" role="button" tabindex="0">
                    <span class="bklit-legend-left">
                        <span class="bklit-legend-dot" style="background:${item.color};"></span>
                        <span class="bklit-legend-name" data-ko="${item.nameKo}" data-en="${item.nameEn}">${lang === 'en' ? item.nameEn : item.nameKo}</span>
                    </span>
                    <span class="bklit-legend-right">
                        <span class="bklit-legend-count" data-count="${item.count}">${item.count}${unitTxt}</span>
                        <span class="bklit-legend-pct">(${pctStr})</span>
                    </span>
                </li>
            `;
        });

        // 2) 2011–2026 연도별 BarChart 기하 계산
        const bW = 360;
        const bH = 108;
        const padTop = 10;
        const padBot = 6;
        const plotH = bH - padTop - padBot;
        const maxCount = Math.max.apply(null, ANNUAL_PAPERS.map((d) => d.count));
        const slotW = bW / ANNUAL_PAPERS.length;
        const barW = Math.max(8, slotW * 0.62);

        let barsMarkup = '';
        ANNUAL_PAPERS.forEach((d, i) => {
            const h = Math.max(4, (d.count / maxCount) * plotH);
            const x = i * slotW + (slotW - barW) / 2;
            const y = padTop + (plotH - h);
            const isRecent = parseInt(d.year, 10) >= 2024;
            const fill = isRecent ? '#A50034' : '#1E293B';

            barsMarkup += `
                <g class="bklit-bar-col" data-year="${d.year}" data-count="${d.count}" data-cx="${(x + barW / 2).toFixed(1)}">
                    <rect x="${(i * slotW).toFixed(1)}" y="0" width="${slotW.toFixed(1)}" height="${bH}" fill="transparent" />
                    <rect class="bklit-bar-rect" x="${x.toFixed(1)}" y="${(padTop + plotH).toFixed(1)}" width="${barW.toFixed(1)}" height="0"
                        rx="3.5" fill="${fill}" data-target-y="${y.toFixed(1)}" data-target-h="${h.toFixed(1)}" />
                </g>
            `;
        });

        mount.innerHTML = `
            <!-- 좌측 패널: Bklit UI 동심원 RingChart -->
            <div class="bklit-chart-panel">
                <div class="bklit-panel-head">
                    <h4 class="bklit-panel-title" data-ko="4대 핵심 파트별 연구 비중" data-en="Distribution by Research Track">${lang === 'en' ? 'Distribution by Research Track' : '4대 핵심 파트별 연구 비중'}</h4>
                    <span class="bklit-panel-sub" data-ko="클릭하여 탭 전환" data-en="Click to filter">${lang === 'en' ? 'Click to filter' : '클릭하여 탭 전환'}</span>
                </div>
                <div class="bklit-ring-layout" id="bklit-ring-layout">
                    <div class="bklit-ring-stage">
                        <svg class="bklit-ring-svg" viewBox="0 0 ${size} ${size}" aria-label="Research Track Ring Chart">
                            ${ringsSvgMarkup}
                        </svg>
                        <div class="bklit-ring-center">
                            <span class="bklit-ring-center-val" id="bklit-ring-val">${TOTAL_PAPERS}</span>
                            <span class="bklit-ring-center-lbl" id="bklit-ring-lbl" data-ko="전체 논문" data-en="Total Papers">${lang === 'en' ? 'Total Papers' : '전체 논문'}</span>
                        </div>
                    </div>
                    <ul class="bklit-ring-legend">
                        ${legendMarkup}
                    </ul>
                </div>
            </div>

            <!-- 우측 패널: Bklit UI 연도별 게재 추이 BarChart -->
            <div class="bklit-chart-panel">
                <div class="bklit-panel-head">
                    <h4 class="bklit-panel-title" data-ko="연도별 학술지 게재 추이 (2011–2026)" data-en="Annual Publications (2011–2026)">${lang === 'en' ? 'Annual Publications (2011–2026)' : '연도별 학술지 게재 추이 (2011–2026)'}</h4>
                    <span class="bklit-panel-sub" data-ko="최근 3년 19편 게재" data-en="19 papers in 2024–26">${lang === 'en' ? '19 papers in 2024–26' : '최근 3년 19편 게재'}</span>
                </div>
                <div class="bklit-bar-stage" id="bklit-bar-stage">
                    <div class="bklit-bar-tooltip" id="bklit-bar-tooltip"></div>
                    <svg class="bklit-bar-svg" viewBox="0 0 ${bW} ${bH}" preserveAspectRatio="none" aria-label="Annual Publications Bar Chart">
                        <line x1="0" y1="${padTop}" x2="${bW}" y2="${padTop}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3" />
                        <line x1="0" y1="${(padTop + plotH / 2).toFixed(1)}" x2="${bW}" y2="${(padTop + plotH / 2).toFixed(1)}" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3" />
                        <line x1="0" y1="${(padTop + plotH).toFixed(1)}" x2="${bW}" y2="${(padTop + plotH).toFixed(1)}" stroke="#CBD5E1" stroke-width="1" />
                        ${barsMarkup}
                    </svg>
                    <div class="bklit-bar-axis">
                        <span>2011</span>
                        <span>2016</span>
                        <span>2021</span>
                        <span>2026</span>
                    </div>
                </div>
            </div>
        `;

        bindResearchChartEvents(mount, bW);
    }

    function bindResearchChartEvents(mount, bW) {
        const ringLayout = mount.querySelector('#bklit-ring-layout');
        const ringValEl = mount.querySelector('#bklit-ring-val');
        const ringLblEl = mount.querySelector('#bklit-ring-lbl');
        const arcs = mount.querySelectorAll('.bklit-ring-arc');
        const legendItems = mount.querySelectorAll('.bklit-legend-item');

        const focusPart = (partNum) => {
            const found = RESEARCH_PARTS.find((p) => p.part === partNum);
            if (!found || !ringLayout) return;
            ringLayout.classList.add('has-hover');
            arcs.forEach((a) => {
                const match = parseInt(a.getAttribute('data-part'), 10) === partNum;
                a.style.opacity = match ? '1' : '0.22';
            });
            legendItems.forEach((li) => {
                const match = parseInt(li.getAttribute('data-part'), 10) === partNum;
                li.classList.toggle('is-hovered', match);
            });
            const pct = Math.round((found.count / TOTAL_PAPERS) * 100);
            ringValEl.textContent = `${found.count}`;
            ringLblEl.textContent = `${pct}% · Part ${found.part}`;
        };

        const clearFocus = () => {
            if (!ringLayout) return;
            ringLayout.classList.remove('has-hover');
            arcs.forEach((a) => { a.style.opacity = '1'; });
            legendItems.forEach((li) => li.classList.remove('is-hovered'));
            ringValEl.textContent = `${TOTAL_PAPERS}`;
            ringLblEl.textContent = getLang() === 'en' ? 'Total Papers' : '전체 논문';
        };

        const selectPart = (partNum) => {
            activeResearchPart = partNum;
            legendItems.forEach((li) => {
                li.classList.toggle('is-active', parseInt(li.getAttribute('data-part'), 10) === partNum);
            });
            if (typeof window.switchResearchTab === 'function') {
                window.switchResearchTab(partNum);
            }
        };

        arcs.forEach((arc) => {
            const p = parseInt(arc.getAttribute('data-part'), 10);
            arc.addEventListener('mouseenter', () => focusPart(p));
            arc.addEventListener('mouseleave', clearFocus);
            arc.addEventListener('click', () => selectPart(p));
        });

        legendItems.forEach((li) => {
            const p = parseInt(li.getAttribute('data-part'), 10);
            li.addEventListener('mouseenter', () => focusPart(p));
            li.addEventListener('mouseleave', clearFocus);
            li.addEventListener('click', () => selectPart(p));
            li.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectPart(p);
                }
            });
        });

        // 우측 BarChart 호버 인터랙션
        const barStage = mount.querySelector('#bklit-bar-stage');
        const barTooltip = mount.querySelector('#bklit-bar-tooltip');
        const barCols = mount.querySelectorAll('.bklit-bar-col');

        barCols.forEach((col) => {
            const rect = col.querySelector('.bklit-bar-rect');
            const yr = col.getAttribute('data-year');
            const cnt = col.getAttribute('data-count');
            const cx = parseFloat(col.getAttribute('data-cx'));

            col.addEventListener('mouseenter', () => {
                barStage.classList.add('has-hover');
                mount.querySelectorAll('.bklit-bar-rect').forEach((r) => r.classList.remove('is-hovered'));
                rect.classList.add('is-hovered');

                const pctLeft = Math.min(88, Math.max(12, (cx / bW) * 100));
                barTooltip.style.left = `${pctLeft}%`;
                barTooltip.textContent = getLang() === 'en'
                    ? `${yr} · ${cnt} ${parseInt(cnt, 10) === 1 ? 'Paper' : 'Papers'}`
                    : `${yr}년 · ${cnt}편 게재`;
            });

            col.addEventListener('mouseleave', () => {
                barStage.classList.remove('has-hover');
                rect.classList.remove('is-hovered');
            });
        });
    }

    function playResearchChartAnimations() {
        const mount = document.getElementById('bklit-research-summary');
        if (!mount) return;
        const arcs = mount.querySelectorAll('.bklit-ring-arc');
        const bars = mount.querySelectorAll('.bklit-bar-rect');
        const reduced = prefersReducedMotion();

        if (reduced || !window.anime || typeof window.anime.animate !== 'function') {
            arcs.forEach((a) => a.setAttribute('stroke-dashoffset', a.getAttribute('data-target-offset')));
            bars.forEach((b) => {
                b.setAttribute('y', b.getAttribute('data-target-y'));
                b.setAttribute('height', b.getAttribute('data-target-h'));
            });
            return;
        }

        // 1) RingChart 동심원 시차 드로잉
        arcs.forEach((arc, idx) => {
            const circum = parseFloat(arc.getAttribute('data-circum'));
            const targetOff = parseFloat(arc.getAttribute('data-target-offset'));
            const state = { off: circum };
            arc.setAttribute('stroke-dashoffset', circum.toFixed(2));
            window.anime.animate(state, {
                off: targetOff,
                duration: 1050,
                delay: 80 + idx * 90,
                ease: 'outExpo',
                onUpdate: function () {
                    arc.setAttribute('stroke-dashoffset', state.off.toFixed(2));
                }
            });
        });

        // 2) BarChart 16개 연도 막대 시차 상승
        const baselineY = 92; // padTop(10) + plotH(82) = 92 (108 - 6 = 102)
        bars.forEach((bar, idx) => {
            const targetY = parseFloat(bar.getAttribute('data-target-y'));
            const targetH = parseFloat(bar.getAttribute('data-target-h'));
            const base = targetY + targetH;
            const state = { h: 0 };
            bar.setAttribute('y', base.toFixed(1));
            bar.setAttribute('height', '0');
            window.anime.animate(state, {
                h: targetH,
                duration: 820,
                delay: 100 + idx * 32,
                ease: 'outQuart',
                onUpdate: function () {
                    bar.setAttribute('y', (base - state.h).toFixed(2));
                    bar.setAttribute('height', state.h.toFixed(2));
                }
            });
        });
    }

    // Step 3 공유 참조 변수 (언어 전환·모달 오픈 시 인디케이터 위치 재동기화용)
    let syncGalleryPillFn = null;
    let syncResearchLineFn = null;
    let isLangSwitching = false;

    function hookResearchModalAndLang() {
        // 1) openResearchModal 래핑: 모달 열릴 때마다 차트 애니메이션 & 탭 밑줄 초기 위치 동기화
        const origOpen = window.openResearchModal;
        if (typeof origOpen === 'function') {
            window.openResearchModal = function () {
                origOpen.apply(this, arguments);
                requestAnimationFrame(() => {
                    playResearchChartAnimations();
                    if (typeof syncResearchLineFn === 'function') syncResearchLineFn(true);
                });
            };
        }

        // 대시보드 카드 클릭 이벤트와도 연동 보장
        const btnRes = document.getElementById('btn-research-modal');
        if (btnRes) {
            btnRes.addEventListener('click', () => {
                setTimeout(() => {
                    playResearchChartAnimations();
                    if (typeof syncResearchLineFn === 'function') syncResearchLineFn(true);
                }, 40);
            });
        }

        // 2) switchResearchTab 래핑: 아래 탭 클릭 시 위쪽 차트 범례 & 스프링 밑줄 동기화
        const origSwitch = window.switchResearchTab;
        if (typeof origSwitch === 'function') {
            window.switchResearchTab = function (partNum) {
                origSwitch.apply(this, arguments);
                activeResearchPart = Number(partNum) || 1;
                document.querySelectorAll('#research-modal .rtab-btn').forEach((b) => {
                    b.classList.toggle('active', b.id === `rtab-btn-${activeResearchPart}`);
                });
                document.querySelectorAll('#bklit-research-summary .bklit-legend-item').forEach((li) => {
                    li.classList.toggle('is-active', parseInt(li.getAttribute('data-part'), 10) === activeResearchPart);
                });
                if (typeof syncResearchLineFn === 'function') syncResearchLineFn(false);
            };
        }

        // 3) 다국어 전환(setSiteLanguage) 래핑: 차트 텍스트 동기화 및 탭 인디케이터 폭 재계산
        const origSetLang = window.setSiteLanguage;
        if (typeof origSetLang === 'function') {
            window.setSiteLanguage = function (lang) {
                isLangSwitching = true;
                try {
                    origSetLang.apply(this, arguments);
                } finally {
                    isLangSwitching = false;
                }
                syncChartLanguage(lang);
                requestAnimationFrame(() => {
                    if (typeof syncGalleryPillFn === 'function') syncGalleryPillFn(true);
                    if (typeof syncResearchLineFn === 'function') syncResearchLineFn(true);
                });
            };
        }
    }

    function syncChartLanguage(lang) {
        const isEn = lang === 'en';
        document.querySelectorAll('[data-ko][data-en]').forEach((el) => {
            el.textContent = isEn ? el.getAttribute('data-en') : el.getAttribute('data-ko');
        });
        document.querySelectorAll('.bklit-legend-count').forEach((el) => {
            const c = el.getAttribute('data-count');
            if (c) el.textContent = isEn ? c : `${c}편`;
        });
    }

    /* ======================================================================
       3. 상단 헤더 초슬림 스크롤 진행 바 (Step 2 — Motion scroll())
       ====================================================================== */
    function setupScrollProgressBar() {
        const bar = document.getElementById('bklit-scroll-progress-bar');
        if (!bar) return;

        const applyProgress = (p) => {
            const clamped = Math.max(0, Math.min(1, Number(p) || 0));
            bar.style.transform = `scaleX(${clamped.toFixed(4)})`;
        };

        // Motion v14 scroll() 엔진 우선 바인딩 (GPU 합성 레이어 scaleX만 갱신)
        if (window.Motion && typeof window.Motion.scroll === 'function') {
            window.Motion.scroll((progress) => {
                applyProgress(progress);
            });
        } else {
            const updateFallback = () => {
                const docEl = document.documentElement;
                const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
                applyProgress(window.scrollY / maxScroll);
            };
            window.addEventListener('scroll', updateFallback, { passive: true });
            window.addEventListener('resize', updateFallback, { passive: true });
            updateFallback();
        }
    }

    /* ======================================================================
       4. 절제된 아카데믹 스크롤 리빌 (Step 2 — Motion inView() + anime.js stagger())
       ====================================================================== */
    function setupAcademicScrollReveals() {
        if (prefersReducedMotion()) return;
        const hasAnime = !!(window.anime && typeof window.anime.animate === 'function');
        if (!hasAnime) return;

        const cleanElementStyles = (els) => {
            els.forEach((el) => {
                el.classList.remove('bklit-reveal-pending');
                el.style.opacity = '';
                el.style.transform = '';
                el.style.willChange = '';
            });
        };

        const pendingGroups = [];

        const registerRevealGroup = (triggerEl, targetEls, staggerMs, amount) => {
            if (!triggerEl || !targetEls || !targetEls.length) return;
            if (triggerEl.closest('.member-dir-panel:not(.active), .archive-tab-panel:not(.active)')) {
                return;
            }

            // 새로고침 시 이미 화면 위쪽이나 현재 뷰포트 안에 보이는 요소는 깜빡임 방지를 위해 즉시 노출 유지
            const rect = triggerEl.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight || 800;
            if (rect.top < vh * 0.90) {
                return;
            }

            targetEls.forEach((el) => el.classList.add('bklit-reveal-pending'));

            const groupState = { triggerEl, targetEls, revealed: false };
            pendingGroups.push(groupState);

            const playReveal = () => {
                if (groupState.revealed) return;
                groupState.revealed = true;

                const delayOpt = (targetEls.length > 1 && typeof window.anime.stagger === 'function')
                    ? window.anime.stagger(staggerMs || 45)
                    : 0;

                window.anime.animate(targetEls, {
                    opacity: [0, 1],
                    translateY: [14, 0],
                    duration: 620,
                    delay: delayOpt,
                    ease: 'outQuart',
                    onComplete: function () {
                        cleanElementStyles(targetEls);
                    }
                });
            };

            if (window.Motion && typeof window.Motion.inView === 'function') {
                const stop = window.Motion.inView(triggerEl, () => {
                    playReveal();
                    if (typeof stop === 'function') stop();
                }, { amount: amount || 0.12 });
            } else if ('IntersectionObserver' in window) {
                const obs = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            playReveal();
                            obs.disconnect();
                        }
                    });
                }, { threshold: amount || 0.12 });
                obs.observe(triggerEl);
            } else {
                groupState.revealed = true;
                cleanElementStyles(targetEls);
            }
        };

        // 1) 주요 섹션 헤더 및 단독 블록 리빌
        const singleSelectors = [
            '#about .section-header',
            '#about .about-hero-image-wrap',
            '#about .about-text-block',
            '#pillars .section-header',
            '#dashboard .section-header',
            '#members .section-header',
            '#members .modern-group-header',
            '#awards .section-header',
            '#awards .award-carousel-container',
            '#awards .stream-sub-header',
            '#activities .section-header',
            '#activities .gallery-filter-container',
            '#contact .section-header'
        ];
        document.querySelectorAll(singleSelectors.join(', ')).forEach((el) => {
            registerRevealGroup(el, [el], 0, 0.15);
        });

        // 2) 시차(Stagger) 그룹 리빌 — 섹션별 리듬에 맞춘 정갈한 시차 간격
        const staggerConfigs = [
            { container: '#about .about-clean-highlights', items: '.about-clean-item', stagger: 48, amount: 0.15 },
            { container: '#pillars .bento-pillars-grid',   items: '.bento-card',       stagger: 80, amount: 0.12 },
            { container: '#dashboard .editorial-metric-grid', items: '.editorial-card', stagger: 80, amount: 0.12 },
            { container: '#members .modern-profile-grid',  items: '.modern-profile-card', stagger: 38, amount: 0.08 },
            { container: '#members .assistant-dept-grid',  items: '.assistant-dept-card', stagger: 30, amount: 0.08 },
            { container: '#stream-past-leaders .ed-leaders-split-grid', items: '.ed-stream-block', stagger: 70, amount: 0.12 },
            { container: '#stream-graduate-assistants .ed-ga-grid',     items: '.ed-ga-item',      stagger: 16, amount: 0.08 },
            { container: '#donate .donate-content-container', items: '.minimal-banking-card, .donation-instructions', stagger: 75, amount: 0.15 },
            { container: '#contact .contact-wrapper',      items: '.contact-info, .contact-form-container', stagger: 85, amount: 0.12 }
        ];

        staggerConfigs.forEach((cfg) => {
            document.querySelectorAll(cfg.container).forEach((box) => {
                const children = Array.from(box.querySelectorAll(cfg.items));
                if (children.length) {
                    registerRevealGroup(box, children, cfg.stagger, cfg.amount);
                }
            });
        });

        // 고속 앵커 점프(예: 상단 메뉴에서 맨 아래 #contact 클릭) 시 이미 지나간 위쪽 섹션을 즉시 표시하는 안전망
        window.addEventListener('scroll', () => {
            pendingGroups.forEach((g) => {
                if (!g.revealed && g.triggerEl.getBoundingClientRect().bottom < 0) {
                    g.revealed = true;
                    cleanElementStyles(g.targetEls);
                }
            });
        }, { passive: true });
    }

    /* ======================================================================
       5. 슬라이딩 탭 인디케이터 (Step 3 — Motion spring())
       ====================================================================== */
    function setupSpringTabIndicators() {
        const hasMotionSpring = !!(
            window.Motion &&
            typeof window.Motion.animate === 'function' &&
            typeof window.Motion.spring === 'function'
        );

        // (A) 활동 사진 4대 카테고리 탭 버건디 캡슐 인디케이터
        const galleryTabWrap = document.querySelector('#activities .gallery-filter-container');
        if (galleryTabWrap) {
            const pill = document.createElement('span');
            pill.className = 'bklit-gallery-spring-pill';
            pill.setAttribute('aria-hidden', 'true');
            galleryTabWrap.appendChild(pill);
            galleryTabWrap.classList.add('has-spring-pill');

            const moveGalleryPill = (instant) => {
                const activeBtn = galleryTabWrap.querySelector('.gallery-filter-btn.active');
                if (!activeBtn) return;
                const x = activeBtn.offsetLeft;
                const y = activeBtn.offsetTop;
                const w = activeBtn.offsetWidth;
                const h = activeBtn.offsetHeight;
                if (!w || !h) return;

                if (instant || prefersReducedMotion() || !hasMotionSpring) {
                    pill.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                    pill.style.width = `${w}px`;
                    pill.style.height = `${h}px`;
                } else {
                    window.Motion.animate(
                        pill,
                        {
                            transform: `translate3d(${x}px, ${y}px, 0)`,
                            width: `${w}px`,
                            height: `${h}px`
                        },
                        { type: window.Motion.spring, stiffness: 430, damping: 32, mass: 0.78 }
                    );
                }
            };

            syncGalleryPillFn = moveGalleryPill;
            moveGalleryPill(true);

            // 웹폰트 로드 완료 및 창 리사이즈 시 캡슐 위치 정밀 보정
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => moveGalleryPill(true));
            }
            window.addEventListener('resize', () => moveGalleryPill(true), { passive: true });
        }

        // (B) 연구 논문 64편 모달 4개 파트 탭 슬라이딩 밑줄 인디케이터
        const researchTabWrap = document.querySelector('#research-modal .research-tabs-container');
        if (researchTabWrap) {
            const line = document.createElement('span');
            line.className = 'bklit-rtab-spring-line';
            line.setAttribute('aria-hidden', 'true');
            researchTabWrap.appendChild(line);
            researchTabWrap.classList.add('has-spring-underline');

            const moveResearchLine = (instant) => {
                const activeBtn =
                    document.getElementById(`rtab-btn-${activeResearchPart}`) ||
                    researchTabWrap.querySelector('.rtab-btn.active');
                if (!activeBtn) return;
                const x = activeBtn.offsetLeft;
                const w = activeBtn.offsetWidth;
                if (!w) return;

                if (instant || prefersReducedMotion() || !hasMotionSpring) {
                    line.style.transform = `translate3d(${x}px, 0px, 0)`;
                    line.style.width = `${w}px`;
                } else {
                    window.Motion.animate(
                        line,
                        {
                            transform: `translate3d(${x}px, 0px, 0)`,
                            width: `${w}px`
                        },
                        { type: window.Motion.spring, stiffness: 450, damping: 33, mass: 0.75 }
                    );
                }
            };

            syncResearchLineFn = moveResearchLine;
            window.addEventListener('resize', () => moveResearchLine(true), { passive: true });
        }
    }

    /* ======================================================================
       6. 활동 사진 카테고리 & 12개 부서 픽토그램 필터 시차 정돈 (Step 3 — anime.js)
       ====================================================================== */
    function setupGalleryStaggerFilter() {
        let galleryReady = false;
        // 초기 자동 세팅(50ms) 이후 실제 사용자 클릭부터 시차 정돈 모션 활성화
        setTimeout(() => { galleryReady = true; }, 160);

        const animateVisibleGalleryCards = () => {
            if (!galleryReady || isLangSwitching || prefersReducedMotion()) return;
            if (!window.anime || typeof window.anime.animate !== 'function') return;

            const allItems = Array.from(document.querySelectorAll('#activities .gallery-card-item'));
            if (typeof window.anime.remove === 'function') {
                window.anime.remove(allItems);
            }
            allItems.forEach((el) => {
                el.classList.remove('bklit-gallery-animating');
                el.style.opacity = '';
                el.style.transform = '';
                el.style.willChange = '';
            });

            const visibleItems = allItems.filter((el) => el.style.display !== 'none');
            if (!visibleItems.length) return;

            visibleItems.forEach((el) => el.classList.add('bklit-gallery-animating'));

            window.anime.animate(visibleItems, {
                opacity: [0, 1],
                translateY: [10, 0],
                scale: [0.985, 1],
                duration: 420,
                delay: function (_, idx) {
                    // 사진 수가 많을 때 전체 대기 시간이 길어지지 않도록 최대 14번째 카드까지만 시차 부여
                    return Math.min(idx, 14) * 22;
                },
                ease: 'outQuart',
                onComplete: function () {
                    visibleItems.forEach((el) => {
                        el.classList.remove('bklit-gallery-animating');
                        el.style.opacity = '';
                        el.style.transform = '';
                        el.style.willChange = '';
                    });
                }
            });
        };

        // 1) 메인 4대 카테고리 필터(filterGallery) 래핑
        const origFilterGallery = window.filterGallery;
        if (typeof origFilterGallery === 'function') {
            window.filterGallery = function (category, btn) {
                origFilterGallery.apply(this, arguments);
                if (typeof syncGalleryPillFn === 'function') syncGalleryPillFn(false);
                // 'dept' 카테고리는 내부에서 filterDeptPhotos를 바로 호출하므로 중복 실행 방지
                if (category !== 'dept') {
                    animateVisibleGalleryCards();
                }
            };
        }

        // 2) 12개 부서 픽토그램 필터(filterDeptPhotos) 래핑
        const origFilterDept = window.filterDeptPhotos;
        if (typeof origFilterDept === 'function') {
            window.filterDeptPhotos = function () {
                origFilterDept.apply(this, arguments);
                animateVisibleGalleryCards();
            };
        }
    }

    /* ======================================================================
       7. 주요 모달 팝업 스프링 스케일 오픈 (Step 3 — Motion spring())
       ====================================================================== */
    function setupModalSpringTransitions() {
        const hasMotionSpring = !!(
            window.Motion &&
            typeof window.Motion.animate === 'function' &&
            typeof window.Motion.spring === 'function'
        );

        const springOpenModalBox = (selector, keepScaleOneInline) => {
            if (prefersReducedMotion() || !hasMotionSpring) return;
            const box = document.querySelector(selector);
            if (!box) return;

            box.classList.add('bklit-modal-springing');
            const ctrl = window.Motion.animate(
                box,
                {
                    transform: ['translate3d(0, 12px, 0) scale(0.96)', 'translate3d(0, 0px, 0) scale(1)'],
                    opacity: [0.35, 1]
                },
                { type: window.Motion.spring, stiffness: 450, damping: 31, mass: 0.78 }
            );

            if (ctrl && ctrl.finished && typeof ctrl.finished.then === 'function') {
                ctrl.finished.then(() => {
                    box.classList.remove('bklit-modal-springing');
                    box.style.opacity = '';
                    box.style.transform = keepScaleOneInline ? 'scale(1)' : '';
                }).catch(() => {
                    box.classList.remove('bklit-modal-springing');
                });
            }
        };

        const modalHooks = [
            { fnName: 'openProfModal',     boxSel: '#prof-modal .prof-modal-content',             keepScale: false },
            { fnName: 'openAlumniModal',   boxSel: '#alumni-modal .alumni-modal-content',         keepScale: true  },
            { fnName: 'openResearchModal', boxSel: '#research-modal .research-modal-content',     keepScale: false },
            { fnName: 'openPillarModal',   boxSel: '#pillar-detail-modal .pillar-modal-content',  keepScale: false },
            { fnName: 'openSportModal',    boxSel: '#department-modal .sport-modal-container',    keepScale: false }
        ];

        modalHooks.forEach((cfg) => {
            const orig = window[cfg.fnName];
            if (typeof orig === 'function') {
                window[cfg.fnName] = function () {
                    const res = orig.apply(this, arguments);
                    requestAnimationFrame(() => {
                        springOpenModalBox(cfg.boxSel, cfg.keepScale);
                    });
                    return res;
                };
            }
        });
    }

    /* ======================================================================
       초기화 실행
       ====================================================================== */
    document.addEventListener('DOMContentLoaded', function () {
        renderDashboardSparklines();
        setupDashboardObserver();
        buildResearchSummaryCharts();
        setupScrollProgressBar();
        setupAcademicScrollReveals();
        setupSpringTabIndicators();
        // i18n.js 및 인라인 스크립트가 모두 등록된 뒤 래핑되도록 마이크로태스크 지연 후 연결
        setTimeout(() => {
            hookResearchModalAndLang();
            setupGalleryStaggerFilter();
            setupModalSpringTransitions();
        }, 0);
    });
})();
