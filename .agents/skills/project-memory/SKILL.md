---
name: project-memory
description: Comprehensive memory and context persistence skill for KHU AT Center website development. Automatically tracks and maintains staff records, sports AT rosters, modal architectures, design guidelines, and historical changes.
---

# KHU AT Center Project Memory Skill

Use this skill whenever working on the KHU AT Center (경희대학교 선승관 Athletic Training Center) official website codebase.

## 1. Project Overview & Repository
- **Repository:** `https://github.com/hxxne/KHUATcenter.git`
- **Location:** `C:\Users\LG\.gemini\antigravity\scratch\khu-at-center`
- **Primary Files:**
  - `index.html`: Main landing page, Bento grids, modals, staff profiles, gallery
  - `style.css`: Modern responsive styles, Burgundy gradient theme (`#A50034`), Bento cards, animations
  - `assets/`: AI generated pictograms, staff profile photos, logos, emblems

---

## 2. Staff Profiles & Unification Rules
- **Laboratory Location (연구실):** Unified to `선승관 AT center (031-201-2787)` for Oh Sung-min, Lee Jae-wook, Kim Jun-young, and Choi Hyun-gon.
  - Exception: Professor Park Ji-hong (`체411호 (031-201-2721)`).
- **Degrees & Titles:**
  - **Park Ji-hong:** 체육과학 박사(Physical Medicine & Rehabilitation 전공), Brigham Young University
  - **Oh Sung-min:** 스포츠심리학-운동제어 박사(Motor Control 전공), 성균관대학교
  - **Kim Jun-young:** 체육학 석사(Sports Medicine and Science 전공), 경희대학교, 연구실: 선승관 AT center (031-201-2787)
  - **Lee Jae-wook:** 체육학 석사 (Athletic Training 전공), 경희대학교, 연구실: 선승관 AT center (031-201-2787)
  - **Choi Hyun-gon:** 체육학 석사(Sports Medicine and Science 전공), 최종학력: 경희대학교, 담당부서: 체육시설운영단, 연구실: 선승관 AT center (031-201-2787)

---

## 3. Sports AT Roster & Modal Architecture
- **Head AT & Assistant AT Mappings:**
  - **축구:** Head `강석` / Sub `["조현준", "김예종", "오승진", "이복음"]`
  - **야구:** Head `유주승` / Sub `["송서옥", "채상우", "박서현", "홍진후"]`
  - **농구:** Head `이상준` / Sub `["이진호", "정연우", "김민주", "김성준", "김동언", "황이삭"]`
  - **배구:** Head `박세민` / Sub `["문민서", "장서현", "이다현", "황성윤", "박인서", "박유빈"]`
  - **럭비:** Head `유영민` / Sub `["이도형", "최성찬"]`
  - **골프:** Head `이예인` / Sub `["문수연", "유승원", "최주영", "김무건"]`
  - **배드민턴:** Head `권남준` / Sub `["이채원"]`
  - **핸드볼:** Head `기윤서` / Sub `["정준영", "남가민", "박다은", "김민지"]`
  - **시범단:** Head `문채연` / Sub `["우민서", "김한결", "김다은", "권인혜", "김다감", "남수현"]`
  - **겨루기:** Head `["유지민", "한혜서"]` / Sub `["정도엽", "조연지", "박은지"]`
  - **품새:** Head `유승아` / Sub `["홍혜원", "권준휘", "이은채", "김형우"]`
  - **센터 AT:** Head `null` (Head block auto-hidden) / Sub `["권준홍", "천지훈", "안은지", "이천이"]`

- **Sports Pictograms:**
  - All 11 sports use custom unified AI-generated dynamic action pictograms saved in `assets/pictogram_{sport}.jpg` with `mix-blend-mode: multiply` on cards and `mix-blend-mode: screen` inside modals.

---

## 4. Awards & Alumni Career Modal
- Clickable names across:
  1. `ATHLETIC TRAINING STUDENT AWARDS`
  2. `PAST LEADERS`
  3. `ATHLETIC TRAINING GRADUATE ASSISTANTS`
- Displays individual current careers (e.g., Kiwoom Heroes Trainer, Lee Kang-in Exclusive Trainer, University Professors, National Team Trainers, etc.) via `#alumni-modal`.

---

## 5. Core Pillars (핵심 사업)
- **01. EDUCATION:** 미래 스포츠의학 전문가 양성 (#전공연계, #실무역량)
- **02. RESEARCH:** 근거 중심 스포츠의학(EBM) 구현 (#생체역학, #임상데이터)
- **03. SERVICE:** 실천적 스포츠 케어 및 현장 지원 (#선수컨디셔닝, #현장의무지원)
