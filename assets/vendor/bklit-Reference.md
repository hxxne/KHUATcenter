# Open-Source Vendor & Design Reference Manifest

경희대학교 AT 센터 공식 웹사이트에 통합된 오픈소스 애니메이션 및 데이터 시각화 라이브러리 명세입니다.

1. **Anime.js (`assets/vendor/anime.umd.min.js`)**
   - GitHub: https://github.com/juliangarnier/anime
   - Version: `v4.5.0` (MIT License, Copyright Julian Garnier)
   - 역할: 숫자 감속 카운트업(`outExpo`), SVG 링/바 차트 시차(`stagger`) 드로잉, 마이크로 인터랙션 제어.

2. **Motion (`assets/vendor/motion.min.js`)**
   - GitHub: https://github.com/motiondivision/motion
   - Version: `v14.9.1` (MIT License, Motion Division)
   - 역할: 스크롤 진행도(`scroll`), 뷰포트 진입 감지(`inView`), 물리 스프링(`spring`) 기반 UI 전환 제어.

3. **Bklit UI Chart Architecture Port (`ui-motion-bklit.css`, `ui-motion-bklit.js`)**
   - GitHub: https://github.com/bklit/bklit-ui (MIT License)
   - 참조 원본 모듈:
     - `packages/ui/src/charts/area-gradient-defs.tsx` (수직 그라데이션 & 좌우 엣지 페이드 마스크)
     - `packages/ui/src/charts/chart-reveal-clip.tsx` (좌→우 `<clipPath>` 리빌 애니메이션)
     - `packages/ui/src/charts/ring-chart.tsx` (12시 방향 시작 동심원 멀티 링 & 중앙 `RingCenter` 요약)
     - `packages/ui/src/charts/bar-chart.tsx` & `chart-legend-hover.tsx` (점선 그리드 라운드 바 차트 & 범례 포커스 디밍)
   - 포팅 방식: React/Next.js 전용 원본 아키텍처를 정적 웹사이트(HTML5/SVG/Vanilla JS) 환경에 맞춰 무의존성 네이티브 모듈로 경량 포팅.
