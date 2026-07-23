/**
 * Kyung Hee University AT Center JavaScript Logic
 * Handles: Header scroll, mobile menu toggles, core tabs, counter animation,
 * interactive SVG chart tooltips, dynamic Instagram feed rendering (using local images),
 * lightbox modal with instagram posts data, and contact form handling.
 */

// Actual Instagram Posts Database parsed from @khuatcenter & official sports site (using local assets)
const INSTAGRAM_POSTS = [
  {
    "id": 1,
    "imageUrl": "assets/images/insta/post_1.jpg",
    "caption": "📌 AT Center 학술대회 참가제63차 대한비만학회 춘계학술대회안녕하십니까. 저희 Athletic Training Center가 3월 13-14일 그랜드 워커힐 서울에서 개최된 제63차 대한비만학회 춘계학술대회에 참여하였습니다. 1️⃣ Femoral Cartilage Thickness and Self-Reported Outcomes in Young Individuals With and Without Obesity and/or Knee Surgery저자: 진승희, 강은규, 박지홍*2️⃣ Individuals with Obesity Have Similar Muscle Thickness but Exhibit Lower Neuromuscular and Cardiovascular Capacity than Those without Obesity저자: 이예인, 강은규, 박지홍*3️⃣ Vertical Ground Reaction Force during Stair Walking Between Obese Males with Knee Surgery (Time Since Surgery: 26 vs. 113 Months)저자: 강은규, 진승희, 이재욱, 박지홍*4️⃣ Obese Females Exhibit Greater Early-Stance Impact but Reduced Late-Stance Push-Off During Stair Walking Than Non-Obese Females저자: 이재욱, 이예인, 박지홍*발표자: 이재욱",
    "location": "경희대학교 국제캠퍼스",
    "category": "practice",
    "likes": 185
  },
  {
    "id": 2,
    "imageUrl": "assets/images/insta/post_2.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다. 지난 3월 23일 월요일, 2026-1학기 2회차 In-service를 진행하였습니다. 불참자 제외 총 26명의 스태프가 참여하였습니다. 정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 학기의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ PFPS",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 185
  },
  {
    "id": 3,
    "imageUrl": "assets/images/insta/post_3.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center입니다.경희대학교 AT Center에서는 매년 3월과 9월에 동아리원, 대학원생, 지도교수님 등 모든 구성원이 모여 정기 세미나를 진행합니다. 본 행사는 오전 이론 세션과 오후 이론 및 실기 세션, 그리고 단합을 도모하는 체육활동 세션으로 구성됩니다.오전 이론 세션에서는 개회 및 지도교수 인사말 이후 다음과 같은 발표가 진행되었습니다.1️⃣ AT Center 시설 및 운영 시스템 안내 (김준영, 최현곤)2️⃣ 10년간 AT센터에서의 경험과 성장 (이재욱)3️⃣ 학부생으로서 경험한 AT센터 활동 공유 (강은규)4️⃣ 야구부 전담 AT 활동 공유 (유주승)점심시간 이후 진행된 오후 세션은 다음과 같은 내용으로 진행되었습니다. 1️⃣ 신입기수 대상 AT Center 투어 및 Taping 교육 (안은지, 유승아, 한혜서)2️⃣ 여성 운동선수의 전방십자인대 부상: 위험요인들과 재활 전략 (송상현) 3️⃣ Performance Vs. Wellness(최유림)4️⃣ 인공관절 치환술과 병원 무릎 재활의 한계 및 보완점 (마윤수)마지막 세션인 체육활동은 족구 경기를 진행하였습니다.오후 세션에서 흔쾌히 이론 발표를 준비해 주신 송상현, 최유림, 마윤수 동문 선생님들께 감사드립니다. 음료 지원해주신 태권도부 신경현 선생님께 감사드립니다.3월 정기 세미나에 함께 해주신 모든 분들 고생 많으셨습니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 145
  },
  {
    "id": 4,
    "imageUrl": "assets/images/insta/post_4.jpg",
    "caption": "📌 우수학술상 수상안녕하십니까. 2026년 2월에 졸업한 Athletic Training Lab 출신 임준형 박사 졸업생이 우수학술상을 수상하였습니다. 본 상은 일반대학원에서 2025학년도 전기 학위수여자를 대상으로 수여하는 상입니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "life",
    "likes": 164
  },
  {
    "id": 5,
    "imageUrl": "assets/images/insta/post_5.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center입니다.3월 13일 지난 금요일, 선승관 B1 계단강의실에서 2026년 신입기수인 27기 오리엔테이션을 진행하였습니다. 총 29명의 지원 인원 중 29명을 모두 선발하였고, 28명의 신입기수가 오티에 참석하였습니다.오리엔테이션은 교수님, 실장님, 팀장님 말씀, 신입기수, 안내사항, 활동 관련 팁, 그리고 질의응답 순서로 진행하였습니다. 학회 일정으로 불참하신 지도교수님을 대신하여 실장님, 재활팀장님, 연구팀장님께서 신입기수들에게 의미있고 소중한 말씀 전해 주셨습니다.신입기수 안내사항에서는 회비와 자체 정기 행사, 서류 제출, Observation 스케줄 등록 방법, 그룹 스터디 등을 공지하였으며, 활 동 관련 팁에서는 AT Center 구성(원), 규정 등을 안내하였습니다.오티 참석하시어 경청해 주신 신입기수 분들 고생 많으셨습니다. 돌아오는 월요일부터 진행되는 Observation도 열심히 임해 주시길 바라겠습니다. 감사합니다.",
    "location": "경희대학교 선승관",
    "category": "education",
    "likes": 152
  },
  {
    "id": 6,
    "imageUrl": "assets/images/insta/post_6.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다. 지난 3월 9일 월요일, 2026-1학기 1회차 In-service를 진행하였습니다. 불참자 제외 총 26명의 스태프가 참여하였습니다. 정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 학기의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ Rationale for ”Massage“ (이론) : 우리가 회원이나 선수분들께 마사지를 해야하는 이유로 현재까지 마사지가 가진 효과에 대해 간단히 발표하겠습니다.2️⃣ Deadlift (실기) : ”Hinge“와 ”Center of Mass“를 중심으로 한 데드리프트를 실습해보겠습니다.3️⃣ Lateral Plyometrics: Skating-Based Training (실기): 스케이팅 동작을 활용한 측면 플라이오메트릭의 특징과 효과를 알아본 뒤 관련 동작을 실습해보겠습니다.1회차 In-service에 참여해 주신 스태프 분들과 이번 주 발표자 분들 고생 많으셨습니다. 3/23(월)에 진행되는 다음 2회차 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 188
  },
  {
    "id": 7,
    "imageUrl": "assets/images/insta/post_7.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center입니다.방학 기간 동안 진행된 특강이 마무리되었습니다. 이번 특강은 실무에 필요한 핵심 역량을 주제별로 집중 학습함으로써 보다 효과적인 이해와 적용을 도모하고자 구성되었습니다. 각 세션은 현장에서 바로 활용 가능한 내용 중심으로 진행되어, 기초부터 응용까지 체계적으로 정리할 수 있는 시간이었습니다.특강은 총 3개의 주제로 운영되었으며 한현구 선생님, 박지홍 교수님, 한혜서 선생님께서 진행을 맡아 주셨습니다.특강 내용은 다음과 같습니다:📍한현구 선생님의 소도구 트레이닝(케틀벨): 케틀벨 클린, 저크, 벤트프레스 및 변형 동작 실습📍박지홍 교수님의 AT 실무: 지도교수님의 AT 실무 경험 공유📍한혜서 선생님의 운동상해: 부상 케이스 스터디를 통한 평가 및 재활 프로토콜방학 중에도 적극적으로 참여해 주신 선생님들, 그리고 귀한 시간을 내어 강의를 진행해 주신 강사 선생님들께 감사드립니다. 이번 특강을 통해 학습한 내용이 이후 활동과 현장 적용에 도움이 되길 바라며, 앞으로 진행될 프로그램에도 많은 관심 부탁드립니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 134
  },
  {
    "id": 8,
    "imageUrl": "assets/images/insta/post_8.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center입니다.Athletic Training Student Awards 게시판에2025 AT of the Year: 24기 유승아 선생님2025 Inspiration of the Year: 24기 유주승 선생님2025 Rookie of the Year: 26기 조연지 선생님의성함이 게시되었습니다.Athletic Training Graduate Assistants 게시판에는 김주완, 김준영, 임준형 선생님의 성함이 게시되었습니다.추가로, 역대 리더 게시판인 Past Leader 게시판을 새로이 제작하여 AT Center를 이끌어 주신 리더 분들의 성함을 게시하였습니다.AT Center와 함께 해주신 모든 분들께 감사드리며, 앞으로도 더 큰 성과를 이끌 수 있도록 노력하겠습니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "life",
    "likes": 198
  },
  {
    "id": 9,
    "imageUrl": "assets/images/insta/post_9.jpg",
    "caption": "2026년 AT 동아리 신입기수를 모집합니다. 📅 접수 기간3/4(수) 10:00-3/11(수) 18:00📍접수 방법모집 공고 확인 후 ‘AT 동아리 가입 신청서’와 ‘AT Center 동아리 규칙준수 동의서’를 선승관 지하 1층 AT Center에 직접 제출",
    "location": "경희대학교 선승관",
    "category": "life",
    "likes": 143
  },
  {
    "id": 10,
    "imageUrl": "assets/images/insta/post_10.jpg",
    "caption": "2026.02.12. 체육대학 신입생 OT 동아리 홍보 영상",
    "location": "경희대학교 국제캠퍼스",
    "category": "life",
    "likes": 158
  },
  {
    "id": 11,
    "imageUrl": "assets/images/insta/post_11.jpg",
    "caption": "📌 AT Lab 연구실적: 저널 게재안녕하십니까. 저희 Athletic Training Lab 출신 전성규 석사원생의 논문이 Exercise Science에 게재되었습니다. 본 논문은 스쿼트 수행 시 반복 횟수와 체중을 기반으로 특정 반복최대치(RM)에 해당하는 부하를 간단한 선형식으로 예측하는 방법을 주제로 다루고 있습니다.1️⃣ Simple Linear Equations to Estimate a Workload of Specific Repetition Maximum for Squat Exercise in Trained and Untrained Males저자: 전성규, 서동균, 이승훈, 김훈, 박지홍*저널: Exercise Science앞으로 출간될 논문들의 소식도 전달드릴 예정이니 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "life",
    "likes": 146
  },
  {
    "id": 12,
    "imageUrl": "assets/images/insta/post_12.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center입니다.경희대학교 AT Center에서는 매년말 AT 동아리원, 대학원생, 출신 동문님들, 지도교수님 등 모든 구성원이 모여 한 해를 마무리하는 AT Center Student Awards 행사를 진행합니다.본 행사에서는 동아리 기수별 소개, 스포츠 재활팀 및 전담 AT 소개, 참석 동문 소개, 역대 리더 소개, 올해 활동 영상과 스태프 인터뷰 영상 시청, 그리고 수상자 수여식이 이어졌습니다. Rookie of the Year, Inspiration of the Year, AT of the Year의 세 가지 상을 수여합니다.2025년의 수상자는 Rookie of the Year에 26기 조연지, Inspiration of the Year에 24기 유주승, AT of the Year에는 24기 유승아가 수상하였습니다. 또한, 지도교수님께서 ’올해를 마치며‘라는 주제로 소중한 말씀을 전해주셨습니다.2025년 한 해 함께 해주신 모든 분들께 감사드리며, 2026년에도 더 큰 성과를 이룰 수 있도록 힘차게 나아가겠습니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "life",
    "likes": 173
  },
  {
    "id": 13,
    "imageUrl": "assets/images/insta/post_13.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.어제인 12월 9일 화요일, 2025-2학기의 마지막 In-service를 진행하였습니다. 인서비스에는 총 30명의 스태프가 참여합니다.정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 2주간의 센터 운영에 대해 피드백을 나누었습니다. 그리고 이번 학기를 끝으로 활동을 마무리하는 인원, 새롭게 스태프가 되는 인원의 소감 한 마디가 있었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ Periodization (김준영): 주기화 이론에 대해 알아보고 현장 적용 및 주기화 프로그래밍에 대한 발표2️⃣ Active release technique (김주완): Manual technique 중 하나인 ART에 대해 알아보고 고관절에 실습3️⃣ Flatback Workout (우지윤): Flatback 정렬 특징을 알아보고 개선할 수 있는 동작들을 실습이번 학기 마지막 In-service까지 참여해 주신 스태프 분들과 발표자 분들 고생 많으셨습니다. 얼마 후 진행될 2026-1학기 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 155
  },
  {
    "id": 14,
    "imageUrl": "assets/images/insta/post_14.jpg",
    "caption": "📌 제1회 라이언매치(@thelionmatch_official) 의무지원안녕하십니까, Athletic Training Center 입니다.지난 11/19(수) 경희대학교 국제캠퍼스에서 진행된 제1회 경희대x한양대 교류전(경한전)에 저희 AT센터에서 스포츠테이핑 및 컨디셔닝 의무지원을 다녀왔습니다. (유승아, 한혜서, 이상준, 정시우)",
    "location": "경희대학교 국제캠퍼스",
    "category": "practice",
    "likes": 164
  },
  {
    "id": 15,
    "imageUrl": "assets/images/insta/post_15.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.지난 11월 25일 화요일 2025-2학기 7회차 In-service를 진행하였습니다. 인서비스에는 총 30명의 스태프가 참여합니다.정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 2주간의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ Suspension Training for Seniors (윤서연): 서스펜션 트레이닝을 노인에게 적용했을 때 예상되는 이점과 실제 효과에 대한 이론2️⃣ 그립에 따른 바벨로우와 랫풀다운 (정상문): 바벨로우와 랫풀다운을 그립 별로 운동했을 때, 등 근육 각 부위의 활성 차이를 생각하며 실습3️⃣ Power Clean (이재욱): Clean과 Jerk에 대해 배우고 실습7회차 In-service에 참여해 주신 스태프 분들과 발표자 분들 고생 많으셨습니다. 12/08(화)에 진행되는 8회차 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 163
  },
  {
    "id": 16,
    "imageUrl": "assets/images/insta/post_16.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.지난 11월 11일 화요일 2025-2학기 6회차 In-service를 진행하였습니다. 인서비스에는 총 30명의 스태프가 참여합니다.정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 2주간의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ Fabella Syndrome (진승희): 무릎의 후외측 통증을 야기하는 원인 중 하나인 파벨라 증후군에 대한 이론2️⃣ 여성 생리주기와 트레이닝 (안은지): 여성 생리주기와 트레이닝의 연관성에 대한 이론3️⃣ Foot exercises (문채연): 발의 기능들을 알아보고 그 기능들을 이용한 운동을 실습6회차 In-service에 참여해 주신 스태프 분들과 발표자 분들 고생 많으셨습니다. 11/25(화)에 진행되는 7회차 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 160
  },
  {
    "id": 17,
    "imageUrl": "assets/images/insta/post_17.jpg",
    "caption": "📌 2025 Go Free Run 의무지원안녕하십니까, Athletic Training Center 입니다.지난 11/9(일) 여의도공원에서 진행된 2025 자유민주 마라톤에 저희 AT센터에서 스포츠테이핑 및 스포츠마사지 의무지원을 다녀왔습니다.",
    "location": "여의도공원",
    "category": "practice",
    "likes": 164
  },
  {
    "id": 18,
    "imageUrl": "assets/images/insta/post_18.jpg",
    "caption": "📌 AT Center 학술대회 참가2025 WORLD CONGRESS ON KINESIOLOGY",
    "location": "경희대학교 국제캠퍼스",
    "category": "practice",
    "likes": 164
  },
  {
    "id": 19,
    "imageUrl": "assets/images/insta/post_19.jpg",
    "caption": "[AT Center 기부자 명단 및 감사 인사]안녕하십니까, Athletic Training Center 입니다.AT Center의 발전을 위해 마음을 모아 주신 모든 기부자 여러분께 깊은 감사의 말씀을 드립니다.* 기부자 명단(가나다순)동문 김장수님동문 김지원님동문 노윤서님동문 박상협님동문 박은수님교수 박지홍님동문 민경은님교수 오성민님실장 이재욱님교수 이현욱님팀장 임준형님교수 한승욱님* 사용처: 행사 경비, 장비 및 물품 구매비, 시설 보수비 등* 추가 기부: https://www.ihappynanum.com/Nanum/api/4WUYJE8U2T* 문의: 실장 이재욱 031-201-2787",
    "location": "경희대학교 국제캠퍼스",
    "category": "life",
    "likes": 134
  },
  {
    "id": 20,
    "imageUrl": "assets/images/insta/post_20.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.10월 28일 오늘, 2025-2학기 5회차 In-service를 진행하였습니다. 인서비스에는 총 30명의 스태프가 참여합니다.정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 2주간의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ Reactive Oxygen Species and Aging (문수연): 운동 중 생성되는 활성산소의 역할과 활성산소 균형 조절의 중요성에 대해 발표2️⃣ EXOS training system (이정재) : EXOS system에 대해 알아보고, 보다 빠르고 효율적인 움직임을 위한 warm-up 동작과 movement 동작 패턴 실습3️⃣ Cybex (최현곤): Cybex 사용법 실습5회차 In-service에 참여해 주신 스태프 분들과 발표자 분들 고생 많으셨습니다. 11/11(화)에 진행되는 6회차 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 195
  },
  {
    "id": 21,
    "imageUrl": "assets/images/insta/post_21.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.지난 10월 14일 화요일, 2025-2학기 4회차 In-service를 진행하였습니다. 인서비스에는 총 30명의 스태프가 참여합니다.정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 2주간의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ Bankart rehabilitation: case study (기윤서): Bankart 수술 후 재활 과정에 대한 경험 발표2️⃣ Vertimax exercise (한혜서): Vertimax를 활용하여 스포츠 종목 특성에 맞게 적용할 수 있는 파워 트레이닝 실습3️⃣ 시합 전 골프 스트레칭 및 웜업 프로그램 실습(이예인): 시합장에서 경기 전에 수행할 수 있는 15분 웜업 프로그램 실습4회차 In-service에 참여해 주신 스태프 분들과 발표자 분들 고생 많으셨습니다. 10/28(화)에 진행되는 5회차 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 192
  },
  {
    "id": 22,
    "imageUrl": "assets/images/insta/post_22.jpg",
    "caption": "📌 제106회 전국체육대회 출정식안녕하십니까. 지난 9월 25일 진행된 전국체전 출정식에 저희 Athletic Training Center도 참여하였습니다.본 행사는 제106회 전국체육대회에 출전하는 우리 경희대학교 체육부 소속 선수들의 성공적인 활약을 응원하기 위함입니다. 경기도 대표팀의 건승을 기원합니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "life",
    "likes": 168
  },
  {
    "id": 23,
    "imageUrl": "assets/images/insta/post_23.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center입니다.경희대학교 AT Center에서는 매년 3월과 9월에 동아리원, 대학원생, 지도교수님 등 모든 구성원이 모여 정기 세미나를 진행합니다. 본 행사는 오전 이론 세션과 오후 실기 세션, 그리고 단합을 도모하는 체육활동 세션으로 구성됩니다.오전 이론 세션에서는 개회 및 지도교수 인사말 이후 다음과 같은 발표가 진행되었습니다.1️⃣ 스포츠 현장에서 AT의 역할 (김민준)2️⃣ 운동 지도 전 신체 기능 평가 방법 (박상협)3️⃣ 국가대표 스포츠과학 지원센터 분석연구원 경험 공유 (이강훈)점심시간 이후 진행된 오후 실기 세션은 다음과 같은 내용으로 구성되었습니다.1️⃣ Overhead press training (유영민)2️⃣ Dynamic balance training (임준형)3️⃣ Thorax mobility training (유주승)마지막 세션인 체육활동은 이전에 진행하였던 배구, 피구, 계주 등이 아닌 족구 경기를 새롭게 진행해 보았습니다.오전 세션에서 흔쾌히 이론 발표를 준비해 주신 박상협, 이강훈 동문 선생님들께 감사드립니다. 9월 정기 세미나에 함께 해주신 모든 분들 고생 많으셨으며, 2025년 마지막 행사인 12월 Awards도 성공적으로 마무리할 수 있도록 하겠습니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "practice",
    "likes": 125
  },
  {
    "id": 24,
    "imageUrl": "assets/images/insta/post_24.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.지난 9월 16일 화요일, 2025-2학기 2회차 In-service를 진행하였습니다. 불참자 제외 총 29명의 스태프가 참여하였습니다.정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 2주간의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ Anterior pelvic tilt의 여러 요인들 (김지훈) : Anterior pelvic tilt의 여러 요인에 대한 이론 발표2️⃣ 근막 단위 스트레칭 및 강화법 (유현준) : 근막의 개념에 대한 정의와 근막 단위 스트레칭 및 강화법 실습3️⃣ Kettlebell training: Hard style vs. Sports style (한현구) : Kettlebell Hard style과 Sports style을 비교 및 실습2회차 In-service에 참여해 주신 스태프 분들과 이번주 발표자 분들 고생 많으셨습니다. 9/30(화)에 진행되는 다음 3회차 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 199
  },
  {
    "id": 25,
    "imageUrl": "assets/images/insta/post_25.jpg",
    "caption": "📌 AT Lab 학술대회 참가International Congress on Obesity and Metabolic Syndrome (ICOMES 2025)안녕하십니까. 저희 Athletic Training Laboratory가 2025년 9월 5일 서울 콘래드 호텔에서 개최된 국제비만대사증후군 학술대회에 참가하였습니다. 교수님과 연구팀장님이 아래 주제로 발표 하였습니다. 1️⃣ Body Mass Index Is Differentially Associated with Quadriceps Neuromuscular Function and Self-reported Outcomes in Individuals with and without Patellofemoral Pain: An Exploratory Sex Subgroup Analysis저자: 박지홍*, 김성완발표자: 박지홍2️⃣ Functional Outcomes and Femoral Cartilage Morphology Across Body Mass Index Categories and History of Knee Surgery in Korean Young Adults: A Cross-Sectional Study저자: 임준형, 박지홍*발표자: 임준형",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 163
  },
  {
    "id": 26,
    "imageUrl": "assets/images/insta/post_26.jpg",
    "caption": "📌 AT Lab 연구실적: 저널 게재안녕하십니까. 저희 Athletic Training Lab 소속 이재욱 박사원생의 논문이 Journal of Athletic Training에 게재되었습니다. 본 논문은 태권도 겨루기 선수의 근골격계 부상과 급성:만성 부하 비율의 관계를 주제로 다루고 있습니다.1️⃣ Injury Incidences related to Acute-to-Chronic Workload Ratios in Taekwondo: A Prospective Study with a 3-Year Follow-Up저자: 이재욱, 임준형, 김승연, 송인수, 임선주, 윤정섭, 박지홍*저널: Journal of Athletic Training앞으로 출간될 논문들의 소식도 전달드릴 예정이니 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 146
  },
  {
    "id": 27,
    "imageUrl": "assets/images/insta/post_27.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.지난 9월 2일 화요일, 2025-2학기 1회차 In-service를 진행하였습니다. 불참자 제외 총 28명의 스태프가 참여하였습니다.정기회의는 실장, 재활팀장, 연구팀장, 동아리장의 안건 공유 후, 스태프 전원이 지난 학기의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ 파워포지션 (조현준) : 파워포지션 자세에 대한 이론2️⃣ Core Anti-Movement Training (박세은) : 안티코어 운동의 장점을 알아보고, 코어 안정성을 향상시킬 수 있는 프로그램을 실습3️⃣ Stability Ball Core Exercises (한승민) : 코어의 중요성과 Stability Ball의 장점을 알아보고, Stability Ball을 활용한 코어 운동을 실습1회차 In-service에 참여해 주신 스태프 분들과 이번주 발표자 분들 고생 많으셨습니다. 9/16(화)에 진행되는 다음 2회차 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 185
  },
  {
    "id": 28,
    "imageUrl": "assets/images/insta/post_28.jpg",
    "caption": "📌 AT Center 후원 캠페인안녕하십니까. AT Center의 교육 및 연구 인프라의 향상을 위한 후원을 요청 드립니다. 출연해주신 후원금은 법정기부금으로 연간 소득금액 한도 내에서 세금감면 혜택을 받으실 수 있습니다. ✅ 후원 참여 방법: 아래 링크에 들어가서1️⃣ 기부하실 곳에 ‘AT 센터’ 작성2️⃣ 드롭다운 메뉴에서 ‘직접 입력’ 선택 후 ‘AT 센터’ 입력3️⃣ 기부 사유: AT 센터 운영4️⃣ 기부 추천인: 박지홍후원금은 장비 및 소모품 구매, 행사 운영 등에 사용될 예정입니다.🔗 후원 링크https://www.ihappynanum.com/Nanum/api/4WUYJE8U2T(또는 프로필 링크 참고)더 나은 미래를 함께 만들어 갈 수 있도록 많은 관심과 참여를 부탁드립니다.감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 194
  },
  {
    "id": 29,
    "imageUrl": "assets/images/insta/post_29.jpg",
    "caption": "📌 The Brain Awards for Lab 수상안녕하십니까. 저희 Athletic Training Laboratory가 2025년 7월 11일 경희대학교 대학원 혁신기획팀 주관 ’The Brain Awards for Lab‘ 사업에서 장려상을 수상하였습니다.본 사업은 연구 성과에 기반해 서울/국제 캠퍼스 통합 5개 연구실을 선정하여 학술연구비 및 연구인프라 개선을 지원하는 프로그램입니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "life",
    "likes": 124
  },
  {
    "id": 30,
    "imageUrl": "assets/images/insta/post_30.jpg",
    "caption": "📌 AT Lab 학술대회 참가European College of Sport Science Rimini 2025 (ECSS 2025)2025. 7. 1 ~ 7. 4 (Rimini, Italy)1️⃣ Musculoskeletal Injury Characteristics and Acute-to-Chronic Workload Ratios in Collegiate Handball: A One-Year Follow-Up Prospective Study저자: 임준형, 이준혁, 이재욱, 박지홍*발표자: 이예인2️⃣ Static and Dynamic Postural Control under Different Levels of Visual Information in Individuals with Anterior Cruciate Ligament Reconstruction, Meniscus Surgery, and Healthy Controls저자: 이재욱, 이준혁, 김준영, 홍혜원, 박지홍*발표자: 이재욱3️⃣ Medial Meniscus Extrusion Before and After 30-min Running in Individuals with Meniscus Surgery, Anterior Cruciate Ligament Reconstruction, and Healthy Controls저자: 강은규, 김지원, 박지홍*발표자: 강은규",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 194
  },
  {
    "id": 31,
    "imageUrl": "assets/images/insta/post_31.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.6월 20일부터 6월 29일까지 강원도 홍천에서 진행된 제37회 경희대학교 총장기 전국 남여 고등학교 태권도대회 의무지원을 성공적으로 마쳤습니다.열흘간 고등학교 격파, 겨루기, 품새 선수들을 대상으로 테이핑, 마사지, 컨디셔닝 등을 제공하며 경희대학교 체육대학에서 주최한 대회가 좋은 환경에서 진행될 수 있도록 최선을 다하였습니다. 또한, Observation을 마무리하고 정식 활동을 시작한 신입기수 선생님들에게 현장 경험을 제공할 수 있는 뜻깊은 기회였습니다.이번 파견에는 총 16명의 AT센터 소속 선생님들이 참여하였습니다.(팀장) 이재욱, 이준혁 / (기존기수) 김주완, 문채연, 유승아, 함다원, 박하연 / (신입기수) 박서현, 권남준, 정예찬, 이진호, 김채은, 김지훈, 박세민, 황수연, 조연지열흘 간의 파견에 열정적으로 참여해 주신 선생님들 모두 고생 많으셨습니다. 더불어 소중한 현장 경험 기회를 제공해 주신 경희대학교 태권도학과와 좋은 사진 남겨주신 JMT(@khu_jmtstudio) 감사드립니다. 이후 진행될 활동들도 많은 관심 부탁드립니다.",
    "location": "강원도 홍천",
    "category": "practice",
    "likes": 183
  },
  {
    "id": 32,
    "imageUrl": "assets/images/insta/post_32.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.4월 14일부터 6월 20일까지 총 10주간의 신입기수 스터디가 마무리 되었습니다. 총 12시간의 스터디는 Observation 과정에 포함되었고, 단순히 눈으로 보고 배우는 것에 그치지 않고 습득한 내용을 이론적으로 함께 학습함으로써 보다 효과적인 이해와 적용을 도모하였습니다. 실무에 필수적인 기본 이론 지식을 함께 다루며, 실제 상황에서 요구되는 기초 역량을 체계적으로 갖출 수 있도록 구성되었습니다.스터디에는 총 49명의 26기 선생님들이 참여하였고, 스터디장은 기존기수인 한혜서, 유승아, 조현준, 이정재, 김준영, 천지훈, 김호정, 이현나, 함다원 선생님이 맡아 주셨습니다.스터디 내용은 다음과 같습니다:📍 기초/기능해부학, 운동상해, 운동손상평가 등📍 재활운동실습, 테이핑 및 마사지 실습, 아이스백 실습 등약 3개월간의 스터디에 열정적으로 참여해 주신 신입기수 선생님들, 운영해 주신 기존기수 선생님들 모두 고생 많으셨습니다. Observation 이후 진행될 활동들도 많은 관심 부탁드립니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 133
  },
  {
    "id": 33,
    "imageUrl": "assets/images/insta/post_33.jpg",
    "caption": "안녕하십니까, 경희대학교 Athletic Training Center 입니다.지난 6월 10일 화요일, 이번 학기의 마지막인 7회차 In-service를 진행하였습니다. 불참자 제외 총 24명의 스태프가 참여하였습니다.정기회의는 교수님, 실장, 재활팀장, 연구팀장, 동아리장 순으로 안건 공유 후, 스태프 전원이 지난 2주간의 센터 운영에 대해 피드백을 나누었습니다. 이후 이론 발표 및 운동 실습 진행하였습니다.1️⃣ 타자를 위한 시각 트레이닝 (김민준) : 타격 메커니즘과 시각 정보를 결합한 트레이닝 전략에 대해2️⃣ 운동 중추신경계 피로와 경기력의 관계 (한보현) : 중추신경계 피로가 무엇이며 중추신경계 피로가 운동선수의 경기력에 어떤 영향을 미치는지에 대해3️⃣ In-season golf power training program (이예인) : 골프 시즌에 대해 알아보고, 시즌 중 파워를 향상시킬 수 있는 프로그램을 실습7회차 In-service에 참여해 주신 스태프 분들과 이번주 발표자 분들 고생 많으셨습니다. 다음 학기에 진행될 인서비스도 많은 관심 부탁드립니다. 감사합니다.",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 128
  },
  {
    "id": 34,
    "imageUrl": "assets/images/insta/post_34.jpg",
    "caption": "📌 AT Lab 연구실적 PART 4: 부상 조사 분석1️⃣ Injury Incidences related to Acute-to-Chronic Workload Ratios in Taekwondo: A Prospective Study with a 3-Year Follow-Up저자: 이재욱, 임준형, 김승연, 송인수, 임선주, 윤정섭, 박지홍*저널: Journal of Athletic Training2️⃣ Comparisons of Musculoskeletal Injuries Among Three Different Modalities of Taekwondo (Kyorugi, Poomsae, and Shibum): A One-Year Follow-Up Prospective Epidemiologic Study저자: 두현지, 김동현, 김채린, 이서영, 박지홍*저널: Research in Sports Medicine3️⃣ Epidemiology of Injuries in Collegiate Men‘s Badminton: A Five-Year Prospective Study저자: 장영훈, 장휘수, 박상협, 윤현준, 김대호, 박지홍*저널: Medicina dello Sport",
    "location": "경희대학교 국제캠퍼스",
    "category": "education",
    "likes": 147
  }
];

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Header Scroll Effects & Mobile Navigation
       ========================================================================== */
    const header = document.getElementById('main-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Sticky header on scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mobile nav toggle
    const toggleMobileMenu = () => {
        mobileToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });


    /* ==========================================================================
       2. Dynamic Rendering of Instagram Gallery Grid
       ========================================================================== */
    const postsContainer = document.getElementById('instagram-gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-desc');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentGalleryIndex = 0;
    let activeFilter = 'all';
    let currentFilteredItems = [];

    // Main render function
    const renderPosts = () => {
        if (!postsContainer) return;
        postsContainer.innerHTML = '';

        INSTAGRAM_POSTS.forEach((post, index) => {
            const card = document.createElement('div');
            card.className = 'gallery-item';
            card.setAttribute('data-category', post.category);
            card.setAttribute('data-index', index);

            card.innerHTML = `
                <div class="insta-card">
                    <div class="insta-header">
                        <div class="insta-avatar">AT</div>
                        <div class="insta-meta">
                            <span class="insta-username">khuatcenter</span>
                            <span class="insta-location">${post.location}</span>
                        </div>
                        <span class="insta-more">&#8226;&#8226;&#8226;</span>
                    </div>
                    <div class="gallery-img-wrapper" data-post-index="${index}">
                        <img src="${post.imageUrl}" alt="${post.location}">
                        <div class="insta-doubleclick-heart">
                            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 22 12.28 18.6 15.36 13.45 20.03L12 21.35z"/></svg>
                        </div>
                    </div>
                    <div class="insta-actions">
                        <div class="actions-left">
                            <button class="action-btn like-btn" aria-label="좋아요">
                                <svg class="icon-heart" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 22 12.28 18.6 15.36 13.45 20.03L12 21.35z"/></svg>
                            </button>
                            <button class="action-btn" aria-label="댓글">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6-4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                            </button>
                            <button class="action-btn" aria-label="공유">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                            </button>
                        </div>
                        <button class="action-btn" aria-label="북마크">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                        </button>
                    </div>
                    <div class="insta-feedback-info">
                        <span class="likes-count">좋아요 ${post.likes}개</span>
                    </div>
                    <div class="insta-caption">
                        <p><strong>khuatcenter</strong> ${post.caption.replace(/\n/g, '<br>')}</p>
                    </div>
                    <div class="insta-comments-link">댓글 모두 보기</div>
                </div>
            `;

            postsContainer.appendChild(card);

            // Double Click & Likes logic setup
            const imgWrapper = card.querySelector('.gallery-img-wrapper');
            const dbClickHeart = card.querySelector('.insta-doubleclick-heart');
            const likeBtn = card.querySelector('.like-btn');
            const likesText = card.querySelector('.likes-count');

            let isLiked = false;
            const toggleLike = () => {
                isLiked = !isLiked;
                likeBtn.classList.toggle('liked', isLiked);
                let currentLikes = post.likes;
                if (isLiked) {
                    currentLikes++;
                    likeBtn.querySelector('svg').style.fill = 'var(--color-primary)';
                } else {
                    likeBtn.querySelector('svg').style.fill = 'none';
                }
                likesText.textContent = `좋아요 ${currentLikes}개`;
            };

            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleLike();
            });

            imgWrapper.addEventListener('dblclick', (e) => {
                dbClickHeart.classList.remove('animate');
                void dbClickHeart.offsetWidth; // Force reflow
                dbClickHeart.classList.add('animate');

                if (!isLiked) {
                    toggleLike();
                }
            });

            // Click image to trigger Lightbox (with debounce for double-click)
            let clickTimeout;
            imgWrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                if (e.detail === 2) return; // Ignore on double click

                clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => {
                    updateFilteredList();
                    const filteredIndex = currentFilteredItems.indexOf(card);
                    if (filteredIndex !== -1) {
                        openLightbox(filteredIndex);
                    }
                }, 200);
            });
        });
        updateFilteredList();
    };

    const updateFilteredList = () => {
        const allCards = postsContainer.querySelectorAll('.gallery-item');
        currentFilteredItems = Array.from(allCards).filter(card => {
            return card.style.display !== 'none';
        });
    };

    // Lightbox modal functions
    const openLightbox = (filteredIndex) => {
        const card = currentFilteredItems[filteredIndex];
        if (!card) return;

        currentGalleryIndex = filteredIndex;
        const postIndex = parseInt(card.querySelector('.gallery-img-wrapper').getAttribute('data-post-index'), 10);
        const post = INSTAGRAM_POSTS[postIndex];

        lightboxImg.src = post.imageUrl;
        lightboxTitle.textContent = post.location;
        lightboxDesc.innerHTML = `<strong>@khuatcenter</strong> ${post.caption.replace(/\n/g, '<br>')}`;

        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    const prevImage = () => {
        let index = currentGalleryIndex - 1;
        if (index < 0) {
            index = currentFilteredItems.length - 1;
        }
        openLightbox(index);
    };

    const nextImage = () => {
        let index = currentGalleryIndex + 1;
        if (index >= currentFilteredItems.length) {
            index = 0;
        }
        openLightbox(index);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    lightbox.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-content-wrapper').addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // Gallery Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const allCards = postsContainer.querySelectorAll('.gallery-item');
            allCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (activeFilter === 'all' || category === activeFilter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.85)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 350);
                }
            });

            // Update local list after transit
            setTimeout(updateFilteredList, 380);
        });
    });

    // Initialize rendering
    renderPosts();


    /* ==========================================================================
       3. Core Pillars Tab Switcher
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });


    /* ==========================================================================
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
    }


    /* ==========================================================================
       5. Interactive SVG Chart Tooltips
       ========================================================================== */
    const barGroups = document.querySelectorAll('.bar-group');
    const chartDots = document.querySelectorAll('.chart-dot, .chart-dot-blue');
    const chartTooltip = document.getElementById('chart-tooltip');
    const chartContainer = document.querySelector('.chart-container');

    const showTooltip = (e, valText, labelText) => {
        chartTooltip.innerHTML = `<strong>${labelText}</strong>: <span style="color:#A50034;">${valText}</span>`;
        chartTooltip.style.opacity = '1';
        
        const rect = chartContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        chartTooltip.style.left = `${x}px`;
        chartTooltip.style.top = `${y}px`;
        chartTooltip.style.transform = 'translate(-50%, -125%)';
    };

    const hideTooltip = () => {
        chartTooltip.style.opacity = '0';
    };

    barGroups.forEach(group => {
        group.addEventListener('mousemove', (e) => {
            const val = group.getAttribute('data-value');
            const xCoord = group.querySelector('.chart-bar') ? parseFloat(group.querySelector('.chart-bar').getAttribute('x')) : 0;
            let year = '2026';
            if (xCoord < 100) year = '2022';
            else if (xCoord < 200) year = '2023';
            else if (xCoord < 300) year = '2024';
            else if (xCoord < 400) year = '2025';

            showTooltip(e, val, `${year}년 선수 케어`);
        });
        group.addEventListener('mouseleave', hideTooltip);
    });

    chartDots.forEach(dot => {
        dot.addEventListener('mousemove', (e) => {
            const val = dot.getAttribute('data-value');
            const cx = parseFloat(dot.getAttribute('cx'));
            let year = '2026';
            if (cx < 100) year = '2022';
            else if (cx < 200) year = '2023';
            else if (cx < 300) year = '2024';
            else if (cx < 400) year = '2025';

            const isBlue = dot.classList.contains('chart-dot-blue');
            const label = isBlue ? `${year}년 의료 지원` : `${year}년 연구 실적`;
            showTooltip(e, val, label);
        });
        dot.addEventListener('mouseleave', hideTooltip);
    });


    /* ==========================================================================
       6. Contact Form Validation, Submission & Feedback
       ========================================================================== */
    const inquiryForm = document.getElementById('inquiry-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const successOverlay = document.getElementById('form-success-overlay');
    const successCloseBtn = document.getElementById('success-close-btn');

    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const phoneInput = document.getElementById('form-phone');
        const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
        const rawPhone = phoneInput.value.replace(/\s+/g, '');
        
        let formattedPhone = rawPhone;
        if (!phoneRegex.test(rawPhone)) {
            const cleaned = ('' + rawPhone).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
            if (match) {
                formattedPhone = match[1] + '-' + match[2] + '-' + match[3];
                phoneInput.value = formattedPhone;
            } else {
                alert('연락처 형식을 확인해 주세요. (예: 010-1234-5678)');
                phoneInput.focus();
                return;
            }
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const formData = new FormData();
        formData.append("이름_단체명", document.getElementById('form-name').value);
        formData.append("연락처", phoneInput.value);
        
        const affiliationSelect = document.getElementById('form-affiliation');
        formData.append("소속구분", affiliationSelect.options[affiliationSelect.selectedIndex].text);
        
        const typeSelect = document.getElementById('form-type');
        formData.append("문의유형", typeSelect.options[typeSelect.selectedIndex].text);
        
        formData.append("상세내용", document.getElementById('form-message').value);
        formData.append("_captcha", "false"); // Disable recaptcha
        formData.append("_template", "table"); // Use clean table template for email

        fetch("https://formsubmit.co/ajax/wlgns10212@khu.ac.kr", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            successOverlay.classList.add('active');
            inquiryForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('이메일 전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    });

    const closeSuccessOverlay = () => {
        successOverlay.classList.remove('active');
    };
    successCloseBtn.addEventListener('click', closeSuccessOverlay);

    /* ==========================================================================
       7. Scroll Spy (Active Navigation Link Highlighting)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLinks = document.querySelectorAll(`.nav-link[href="#${currentId}"], .mobile-link[href="#${currentId}"]`);
                activeLinks.forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(sec => {
        observer.observe(sec);
    });
});
