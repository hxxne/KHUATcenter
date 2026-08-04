import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_marker = "<!-- 3rd Tier and Below Container -->"
end_marker = "<!-- Awards Section -->"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

svg_football = '<i class="fa-solid fa-futbol"></i>'
svg_volleyball = '<i class="fa-solid fa-volleyball"></i>'
svg_basketball = '<i class="fa-solid fa-basketball"></i>'
svg_baseball = '<i class="fa-solid fa-baseball-bat-ball"></i>'
svg_rugby = '<i class="fa-solid fa-football"></i>'

# Golf and Shibumdan are CSS masks
svg_golf = '<div style="-webkit-mask: url(\'assets/golf_icon.png\') no-repeat center / contain; mask: url(\'assets/golf_icon.png\') no-repeat center / contain; background-color: currentColor; width: 1.2em; height: 1.2em; display: inline-block; vertical-align: middle;"></div>'
svg_shibumdan = '<div style="-webkit-mask: url(\'assets/demo_team_icon.png\') no-repeat center / contain; mask: url(\'assets/demo_team_icon.png\') no-repeat center / contain; background-color: currentColor; width: 1.2em; height: 1.2em; display: inline-block; vertical-align: middle;"></div>'

svg_badminton = '<svg class="custom-icon" viewBox="0 0 48 48" style="transform: rotate(45deg);"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="2" stroke-width="4"><path d="M19.5 44c2.49 0 4.5-2.01 4.5-4.5V19h-4l-5 20.5c0 2.49 2.01 4.5 4.5 4.5"/><path d="M20 19h-4L6.68 37.9c-1.11 2.61.48 5.74 3.3 6.07A4.494 4.494 0 0 0 15 39.5M28.5 44c-2.49 0-4.5-2.01-4.5-4.5V19h4l5 20.5c0 2.49-2.01 4.5-4.5 4.5"/><path d="M28 19h4l9.32 18.9c1.11 2.61-.48 5.74-3.3 6.07A4.494 4.494 0 0 1 33 39.5"/><path fill="currentColor" d="M16.06 13c-.04-.33-.06-.66-.06-1c0-4.42 3.58-8 8-8s8 3.58 8 8c0 .34-.02.67-.06 1z"/></g></svg>'
svg_handball = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 19.96,11.5L16.41,9.81L16.03,6L12,4M10,6.09L9.6,9.85L6.05,11.54C6.38,8.27 8.93,5.65 12,5.1V6C11.23,6 10.53,6.34 10,6.09M3.93,12L7.33,13.62L7.75,17.43C5.55,16.5 4,14.4 3.93,12M8.19,17.8L11,19.26V20C9.64,20 8.35,19.5 7.37,18.66L8.19,17.8M13,20V19.26L15.82,17.8L16.63,18.66C15.65,19.5 14.36,20 13,20M16.25,17.43L16.67,13.62L20.07,12C20,14.4 18.45,16.5 16.25,17.43M12,11L14,12V14L12,15L10,14V12L12,11Z" /></svg>'
svg_poomsae = '<svg class="custom-icon" viewBox="0 0 32 32"><path fill="currentColor" d="M7.08 6.459A2.93 2.93 0 0 1 9.614 5h12.77c1.035 0 2.013.54 2.538 1.462l5.81 10.051a2.03 2.03 0 0 1-.703 2.736l-.013.009l-3.728 2.142l-.003.002a2 2 0 0 1-1.786.11v4.829c0 .892-.713 1.659-1.655 1.659H9.165A1.664 1.664 0 0 1 7.5 26.34v-4.828a2 2 0 0 1-1.786-.11l-.002-.002l-3.706-2.135l-.004-.003a2.01 2.01 0 0 1-.732-2.744l.002-.003zM19.091 7L16 13.57L12.908 7h-1.934l4.059 8.625l-.235.5h1.934L21.026 7zm-1.255 9.125H22.5v-1.23l.866 1.492a.7.7 0 0 1 .081.14l1.822 3.135l.001.003l.003.002l.002.001l.003.002h.003l.003.001l.003-.002l3.698-2.125a.04.04 0 0 0 .015-.022v-.007l-.002-.008l-5.813-10.055a.91.91 0 0 0-.8-.452h-.254zm-4.042 0c.001-.143.033-.287.095-.42l.038-.08L9.868 7h-.253a.93.93 0 0 0-.804.459L3.001 17.52v.002q0 .005.003.007l.004.004l3.709 2.137h.003l.008-.004l.002-.003l.002-.002L9.5 14.863v1.262zM9.5 26h13v-8.125h-4.474l1.766 3.752a.875.875 0 1 1-1.584.746l-2.116-4.498h-.184l-2.116 4.498a.875.875 0 1 1-1.584-.746l1.766-3.752H9.5z"/></svg>'
svg_kyorugi = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="m19.8 2l-8.2 6.7l-1.21-1.04L14 5.58L9.41 1L8 2.41l2.74 2.74L5 8.46l-1.19 4.29L6.27 17L8 16l-2.03-3.5l.35-1.32L9.5 13l.5 9h2l.5-10L21 3.4zM5 3a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2"/></svg>'
svg_1 = '<svg class="custom-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5c-1.11 0-2 .89-2 2s.89 2 2 2s2-.89 2-2s-.89-2-2-2m10-4v5h-2V4H4v2H2V1h2v2h16V1zm-7 10.26V23h-2v-5h-2v5H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5h2v.5C7.5 8 9.5 10 12 10s4.5-2 4.5-4.5V5h2v.5c0 2.5-1.43 4.67-3.5 5.76"/></svg>'

jeondam = [
    ('강석', '축구', svg_football),
    ('기윤서', '핸드볼', svg_handball),
    ('이상준', '농구', svg_basketball),
    ('박세민', '배구', svg_volleyball),
    ('권남준', '배드민턴', svg_badminton),
    ('유영민', '럭비', svg_rugby),
    ('유승아', '품새', svg_poomsae),
    ('문채연', '시범단', svg_shibumdan),
    ('유지민', '겨루기', svg_kyorugi),
    ('한혜서', '겨루기', svg_kyorugi),
    ('이예인', '골프', svg_golf),
    ('유주승', '야구', svg_baseball)
]
jeondam_cards = "".join([f'<div class="staff-card"><div class="staff-avatar-icon">{icon}</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">{badge}</div></div></div>' for name, badge, icon in jeondam])

non_jeondam = ['권준홍', '천지훈', '안은지', '이천이']
# Notice the extra inline styles to make the card "smaller"
non_jeondam_cards = "".join([f'<div class="staff-card" style="padding: 6px 12px; gap: 6px;"><div class="staff-avatar-icon" style="font-size: 1.1em; width: 32px; height: 32px;"><i class="fa-solid fa-user-plus"></i></div><div class="staff-details"><div class="staff-name" style="font-size: 0.85rem;">{name}</div><div class="sport-badge" style="font-size: 0.65rem; padding: 2px 6px;">센터 AT</div></div></div>' for name in non_jeondam])

# Removed the 4 from rehabs
rehabs = ['기윤서', '문수연', '문채연', '박서현', '송찬', '우지윤', '유승아', '유영민', '윤서연', '이예인', '이진주', '이채원', '조연지', '조현준', '진승희', '최민혁']
rehabs.sort()
rehab_cards = "".join([f'<div class="staff-card"><div class="staff-avatar-icon">{svg_1}</div><div class="staff-details"><div class="staff-name">{name}</div><div class="sport-badge">재활강사</div></div></div>' for name in rehabs])

new_html = f"""<!-- 3rd Tier and Below Container -->
                <div class="org-level level-3-container" style="display: flex; width: 100%; justify-content: center; gap: 40px; align-items: flex-start; flex-wrap: nowrap; max-width: 1400px; margin: 0 auto;">
                    
                    <!-- Left Branch: 김준영 -->
                    <div class="org-branch" style="display: flex; flex-direction: column; align-items: center; width: 350px;">
                        <div class="member-card">
                            <div class="member-avatar" style="background-image: url('assets/kimjunyoung.png'); background-position: center; background-size: cover;"></div>
                            <div class="member-info">
                                <h4 class="member-name">김준영</h4>
                                <p class="member-role">실장</p>
                            </div>
                        </div>
                        <div class="org-line vertical-line"></div>
                        <div class="org-group" style="width: 100%; margin-bottom: 20px;">
                            <h4 class="org-group-title">체육부 전담 AT</h4>
                            <!-- Use grid to enforce exactly 2 columns -->
                            <div class="staff-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                                {jeondam_cards}
                            </div>
                        </div>
                        <div class="org-line vertical-line" style="height: 30px;"></div>
                        <div class="org-group" style="width: 100%;">
                            <h4 class="org-group-title">체육부 비전담 AT</h4>
                            <!-- Smaller cards, 2 columns -->
                            <div class="staff-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                                {non_jeondam_cards}
                            </div>
                        </div>
                    </div>

                    <!-- Middle Branch: 이재욱 -->
                    <div class="org-branch" style="display: flex; flex-direction: column; align-items: center; width: 240px;">
                        <div class="member-card">
                            <div class="member-avatar placeholder-avatar"></div>
                            <div class="member-info">
                                <h4 class="member-name">이재욱</h4>
                                <p class="member-role">연구팀장</p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Branch: 최현곤 -->
                    <div class="org-branch" style="display: flex; flex-direction: column; align-items: center; width: 450px;">
                        <div class="member-card">
                            <div class="member-avatar" style="background-image: url('assets/choihyungon.png'); background-position: center; background-size: cover;"></div>
                            <div class="member-info">
                                <h4 class="member-name">최현곤</h4>
                                <p class="member-role">재활팀장</p>
                            </div>
                        </div>
                        <div class="org-line vertical-line"></div>
                        <div class="org-group" style="width: 100%;">
                            <h4 class="org-group-title">스포츠 재활강사</h4>
                            <!-- Use grid to enforce exactly 3 columns -->
                            <div class="staff-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                                {rehab_cards}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    """

final_html = html[:start_idx] + new_html + html[end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)
    print("Re-added non-dedicated AT as small cards.")
