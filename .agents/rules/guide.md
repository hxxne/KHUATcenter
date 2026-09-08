---
trigger: always_on
glob: "*"
description: 작업 완료 시 GitHub 자동 동기화 및 프로젝트 작업 가이드
---

# KHU AT Center 작업 규칙 및 Git 가이드

1. **작업 완료 시 자동 GitHub 동기화 (필수)**:
   - 파일 수정, 신규 기능 구현, 스타일 변경 등 하나의 작업 단위가 완료될 때마다 반드시 Git 상태를 확인하고 원격 저장소(`origin main`)로 커밋 및 푸시합니다.
   - 커밋 메시지는 어떤 내용이 변경되었는지 명확하고 정결하게 작성합니다. (예: `Feat: ...`, `Fix: ...`, `Style: ...`, `Media: ...`)

2. **작업 안정성 및 백업**:
   - 푸시 전 `git status`를 확인하여 누락된 파일이나 불필요한 임시 파일이 포함되지 않도록 점검합니다.
   - 프로젝트 메모리([PROJECT_MEMORY.md](file:///c:/Users/LG/OneDrive/바탕%20화면/AI/khu-at-center/PROJECT_MEMORY.md))도 주요 변경 사항이 있을 때 함께 최신화하여 관리합니다.
