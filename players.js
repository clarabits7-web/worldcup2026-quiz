const CHOSEONG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
  'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

function getChoseong(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) {
      result += CHOSEONG_LIST[Math.floor(code / 588)];
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

const RAW_PLAYERS = [
  // 🇫🇷 프랑스 (9명)

  // 🇫🇷 프랑스 (9명)
  {
    id: 11,
    name: "우스만 뎀벨레",
    enName: "Ousmane Dembélé",
    wikiTitle: "Ousmane_Dembélé",
    country: "프랑스",
    flagCode: "fr",
    number: 11,
    position: "공격수 (RW / LW)",
    birthYear: 1997,
    hints: [
      "포지션: 윙어 | 1997년생 | 완벽한 양발잡이 드리블러",
      "주요 경력: 보루시아 도르트문트 → FC 바르셀로나 → 파리 생제르맹(PSG)",
      "어느 발이 주발인지 본인도 헷갈릴 만큼 뛰어난 양발 드리블 능력을 지닌 프랑스 측면 공격수"
    ]
  },
  {
    id: 12,
    name: "킬리안 음바페",
    enName: "Kylian Mbappé",
    wikiTitle: "Kylian_Mbappé",
    country: "프랑스",
    flagCode: "fr",
    number: 10,
    position: "공격수 (ST / LW)",
    birthYear: 1998,
    hints: [
      "포지션: 스트라이커 / 윙어 | 1998년생 | 등번호 10번",
      "주요 경력: AS 모나코 → 파리 생제르맹(PSG) → 레알 마드리드",
      "카타르 월드컵 결승전 해트트릭의 주인공이자 폭발적인 스피드를 가진 프랑스 대표팀 주장"
    ]
  },
  {
    id: 13,
    name: "앙투안 그리즈만",
    enName: "Antoine Griezmann",
    wikiTitle: "Antoine_Griezmann",
    country: "프랑스",
    flagCode: "fr",
    number: 7,
    position: "공격수 / 공격형 미드필더 (SS / CAM)",
    birthYear: 1991,
    hints: [
      "포지션: 세컨드 스트라이커 / 플레이메이커 | 1991년생 | 등번호 7번",
      "주요 경력: 레알 소시에다드 → FC 바르셀로나 → 아틀레티코 마드리드",
      "2018 러시아 월드컵 우승 주역이자 아틀레티코 마드리드 구단 역대 최다 득점 기록 보유자"
    ]
  },
  {
    id: 14,
    name: "윌리엄 살리바",
    enName: "William Saliba",
    wikiTitle: "William_Saliba",
    country: "프랑스",
    flagCode: "fr",
    number: 17,
    position: "수비수 (CB)",
    birthYear: 2001,
    hints: [
      "포지션: 센터백 | 2001년생",
      "주요 경력: 생테티엔 → 마르세유(임대) → 아스널 FC",
      "침착한 수비와 완벽한 피지컬로 '수비진의 롤스로이스'라 불리는 아스널과 프랑스의 핵심 수비수"
    ]
  },
  {
    id: 15,
    name: "오렐리앵 추아메니",
    enName: "Aurélien Tchouaméni",
    wikiTitle: "Aurélien_Tchouaméni",
    country: "프랑스",
    flagCode: "fr",
    number: 8,
    position: "미드필더 (CDM / CM)",
    birthYear: 2000,
    hints: [
      "포지션: 수비형 미드필더 | 2000년생 | 등번호 8번",
      "주요 경력: 지롱댕 보르도 → AS 모나코 → 레알 마드리드",
      "강력한 중거리 슛과 수비력을 겸비한 레알 마드리드와 프랑스 중원의 기둥"
    ]
  },
  {
    id: 16,
    name: "에두아르도 카마빙가",
    enName: "Eduardo Camavinga",
    wikiTitle: "Eduardo_Camavinga",
    country: "프랑스",
    flagCode: "fr",
    number: 6,
    position: "미드필더 (CM / LB)",
    birthYear: 2002,
    hints: [
      "포지션: 중앙 미드필더 / 레프트백 | 2002년생",
      "주요 경력: 스타드 렌 → 레알 마드리드",
      "미드필더는 물론 풀백까지 완벽히 소화해 '카마빙가 정리'라는 밈을 만든 만능 멀티플레이어"
    ]
  },
  {
    id: 17,
    name: "테오 에르난데스",
    enName: "Theo Hernandez",
    wikiTitle: "Theo_Hernandez",
    country: "프랑스",
    flagCode: "fr",
    number: 22,
    position: "수비수 (LB)",
    birthYear: 1997,
    hints: [
      "포지션: 레프트백 | 1997년생 | 등번호 22번",
      "주요 경력: 아틀레티코 마드리드 → 레알 마드리드 → AC 밀란",
      "형 뤼카 에르난데스와 함께 프랑스 대표팀에서 뛰며 폭주 기관차 같은 오버래핑을 자랑하는 풀백"
    ]
  },
  {
    id: 18,
    name: "마이크 메냥",
    enName: "Mike Maignan",
    wikiTitle: "Mike_Maignan",
    country: "프랑스",
    flagCode: "fr",
    number: 16,
    position: "골키퍼 (GK)",
    birthYear: 1995,
    hints: [
      "포지션: 골키퍼 | 1995년생 | 별명 '매직 마이크'",
      "주요 경력: 파리 생제르맹 → LOSC 릴 → AC 밀란",
      "위고 요리스 은퇴 후 프랑스 대표팀의 NO.1 골키퍼로 자리잡은 동물적 반사신경의 수문장"
    ]
  },
  {
    id: 19,
    name: "마르퀴스 튀랑",
    enName: "Marcus Thuram",
    wikiTitle: "Marcus_Thuram",
    country: "프랑스",
    flagCode: "fr",
    number: 15,
    position: "공격수 (ST)",
    birthYear: 1997,
    hints: [
      "포지션: 스트라이커 | 1997년생",
      "주요 경력: 보루시아 묀헨글라트바흐 → 인터 밀란",
      "1998 프랑스 월드컵 전설 릴리앙 튀랑의 큰아들이자 인터 밀란의 주전 스트라이커"
    ]
  },

  // 🇦🇷 아르헨티나 (9명)
  {
    id: 20,
    name: "리오넬 메시",
    enName: "Lionel Messi",
    wikiTitle: "Lionel_Messi",
    country: "아르헨티나",
    flagCode: "ar",
    number: 10,
    position: "공격수 (RW / FW)",
    birthYear: 1987,
    hints: [
      "포지션: 공격수 / 플레이메이커 | 1987년생 | 등번호 10번",
      "주요 경력: FC 바르셀로나 → 파리 생제르맹 → 인터 마이애미",
      "발롱도르 8회 수상 및 2022 카타르 월드컵 우승에 빛나는 축구 역사상 최고의 선수(GOAT)"
    ]
  },
  {
    id: 21,
    name: "라우타로 마르티네스",
    enName: "Lautaro Martínez",
    wikiTitle: "Lautaro_Martínez",
    country: "아르헨티나",
    flagCode: "ar",
    number: 22,
    position: "공격수 (ST)",
    birthYear: 1997,
    hints: [
      "포지션: 스트라이커 | 1997년생 | 별명 '황소(El Toro)'",
      "주요 경력: 라싱 클루브 → 인테르나치오날레 밀라노(인터 밀란) 주장",
      "2024 코파 아메리카 득점왕이자 세리에 A 득점왕 출신의 아르헨티나 간판 스트라이커"
    ]
  },
  {
    id: 22,
    name: "훌리안 알바레스",
    enName: "Julián Álvarez",
    wikiTitle: "Julián_Álvarez",
    country: "아르헨티나",
    flagCode: "ar",
    number: 9,
    position: "공격수 (ST / SS)",
    birthYear: 2000,
    hints: [
      "포지션: 스트라이커 / 세컨드 스트라이커 | 2000년생 | 등번호 9번",
      "주요 경력: 리버 플레이트 → 맨체스터 시티 → 아틀레티코 마드리드",
      "월드컵 우승과 트레블을 한 시즌에 동시에 달성한 '스파이더(La Araña)'"
    ]
  },
  {
    id: 23,
    name: "에밀리아노 마르티네스",
    enName: "Emiliano Martínez",
    wikiTitle: "Emiliano_Martínez",
    country: "아르헨티나",
    flagCode: "ar",
    number: 23,
    position: "골키퍼 (GK)",
    birthYear: 1992,
    hints: [
      "포지션: 골키퍼 | 1992년생 | 등번호 23번",
      "주요 경력: 아스널 FC → 애스턴 빌라 FC",
      "승부차기의 달인이자 야신상 2연속 수상자, '디부(Dibu)'"
    ]
  },
  {
    id: 24,
    name: "엔소 페르난데스",
    enName: "Enzo Fernández",
    wikiTitle: "Enzo_Fernández",
    country: "아르헨티나",
    flagCode: "ar",
    number: 24,
    position: "미드필더 (CM)",
    birthYear: 2001,
    hints: [
      "포지션: 중앙 미드필더 | 2001년생",
      "주요 경력: 리버 플레이트 → SL 벤피카 → 첼시 FC",
      "2022 카타르 월드컵 영플레이어상 수상자이자 정교한 롱패스를 자랑하는 미드필더"
    ]
  },
  {
    id: 25,
    name: "알렉시스 맥 알리스터",
    enName: "Alexis Mac Allister",
    wikiTitle: "Alexis_Mac_Allister",
    country: "아르헨티나",
    flagCode: "ar",
    number: 20,
    position: "미드필더 (CM / CAM)",
    birthYear: 1998,
    hints: [
      "포지션: 중앙 미드필더 | 1998년생 | 등번호 20번",
      "주요 경력: 브라이튼 앤 호브 알비온 → 리버풀 FC",
      "스코틀랜드·아일랜드계 성씨를 가진 아르헨티나와 리버풀의 핵심 중원 엔진"
    ]
  },
  {
    id: 26,
    name: "로드리고 데 파울",
    enName: "Rodrigo De Paul",
    wikiTitle: "Rodrigo_De_Paul",
    country: "아르헨티나",
    flagCode: "ar",
    number: 7,
    position: "미드필더 (CM)",
    birthYear: 1994,
    hints: [
      "포지션: 중앙 미드필더 | 1994년생 | 등번호 7번",
      "주요 경력: 우디네세 칼초 → 아틀레티코 마드리드",
      "경기장 안팎에서 메시를 호위해 '메시의 보디가드'라는 별명으로 유명한 열정적인 미드필더"
    ]
  },
  {
    id: 27,
    name: "크리스티안 로메로",
    enName: "Cristian Romero",
    wikiTitle: "Cristian_Romero",
    country: "아르헨티나",
    flagCode: "ar",
    number: 13,
    position: "수비수 (CB)",
    birthYear: 1998,
    hints: [
      "포지션: 센터백 | 1998년생 | 별명 '꾸띠(Cuti)'",
      "주요 경력: 아탈란타 BC → 토트넘 홋스퍼",
      "손흥민의 토트넘 동료이자 거친 대인 방어와 태클 능력을 자랑하는 아르헨티나 수비의 핵"
    ]
  },
  {
    id: 28,
    name: "알레한드로 가르나초",
    enName: "Alejandro Garnacho",
    wikiTitle: "Alejandro_Garnacho",
    country: "아르헨티나",
    flagCode: "ar",
    number: 17,
    position: "공격수 (LW)",
    birthYear: 2004,
    hints: [
      "포지션: 좌측 윙어 | 2004년생",
      "주요 경력: 아틀레티코 유스 → 맨체스터 유나이티드",
      "환상적인 바이시클 킥 골로 푸스카스상을 노리는 맨체스터 유나이티드와 아르헨티나의 크랙"
    ]
  },

  // 🏴󠁧󠁢󠁥󠁮󠁧󠁿 잉글랜드 (9명)
  {
    id: 29,
    name: "해리 케인",
    enName: "Harry Kane",
    wikiTitle: "Harry_Kane",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 9,
    position: "공격수 (ST)",
    birthYear: 1993,
    hints: [
      "포지션: 스트라이커 | 1993년생 | 등번호 9번",
      "주요 경력: 토트넘 홋스퍼 → 바이에른 뮌헨",
      "잉글랜드 대표팀 역대 최다 득점자이자 손흥민과 EPL 역대 최다 합작골 기록을 세운 월드클래스 공격수"
    ]
  },
  {
    id: 30,
    name: "주드 벨링엄",
    enName: "Jude Bellingham",
    wikiTitle: "Jude_Bellingham",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 10,
    position: "미드필더 (CAM / CM)",
    birthYear: 2003,
    hints: [
      "포지션: 공격형/중앙 미드필더 | 2003년생",
      "주요 경력: 버밍엄 시티 → 보루시아 도르트문트 → 레알 마드리드",
      "두 팔을 벌리는 시그니처 세리머니와 클러치 능력으로 유명한 레알 마드리드와 잉글랜드의 슈퍼스타"
    ]
  },
  {
    id: 31,
    name: "부카요 사카",
    enName: "Bukayo Saka",
    wikiTitle: "Bukayo_Saka",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 7,
    position: "공격수 (RW)",
    birthYear: 2001,
    hints: [
      "포지션: 우측 윙어 | 2001년생 | 등번호 7번",
      "주요 경력: 아스널 FC 유스 출신 원클럽 에이스",
      "'스타보이(Starboy)'라는 별명으로 불리는 아스널과 잉글랜드 대표팀의 부동의 오른쪽 날개"
    ]
  },
  {
    id: 32,
    name: "필 포든",
    enName: "Phil Foden",
    wikiTitle: "Phil_Foden",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 11,
    position: "미드필더 / 윙어 (AM / RW)",
    birthYear: 2000,
    hints: [
      "포지션: 공격형 미드필더 / 윙어 | 2000년생",
      "주요 경력: 맨체스터 시티 성골 유스 (23-24 EPL 올해의 선수)",
      "유려한 볼 터치와 왼발 슈팅으로 '스톡포트 이니에스타'라 불리는 맨시티의 에이스"
    ]
  },
  {
    id: 33,
    name: "콜 파머",
    enName: "Cole Palmer",
    wikiTitle: "Cole_Palmer",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 24,
    position: "미드필더 / 윙어 (CAM / RW)",
    birthYear: 2002,
    hints: [
      "포지션: 공격형 미드필더 / 윙어 | 2002년생",
      "주요 경력: 맨체스터 시티 → 첼시 FC",
      "팔을 쓸어내리는 '추위(Cold Palmer)' 세리머니와 100%에 가까운 PK 성공률로 유명한 첼시의 에이스"
    ]
  },
  {
    id: 34,
    name: "데클란 라이스",
    enName: "Declan Rice",
    wikiTitle: "Declan_Rice",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 4,
    position: "미드필더 (CDM / CM)",
    birthYear: 1999,
    hints: [
      "포지션: 수비형/중앙 미드필더 | 1999년생 | 등번호 4번",
      "주요 경력: 웨스트햄 유나이티드 → 아스널 FC",
      "웨스트햄의 유럽대항전 우승을 이끌고 아스널 클럽 레코드로 이적한 잉글랜드 중원의 핵심"
    ]
  },
  {
    id: 35,
    name: "트렌트 알렉산더아놀드",
    enName: "Trent Alexander-Arnold",
    wikiTitle: "Trent_Alexander-Arnold",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 8,
    position: "수비수 / 미드필더 (RB / CM)",
    birthYear: 1998,
    hints: [
      "포지션: 라이트백 / 미드필더 | 1998년생",
      "주요 경력: 리버풀 FC 성골 유스 출신",
      "역대급 오른발 킥력과 택배 크로스로 EPL 수비수 최다 어시스트 기록을 보유한 선수"
    ]
  },
  {
    id: 36,
    name: "조던 픽포드",
    enName: "Jordan Pickford",
    wikiTitle: "Jordan_Pickford",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 1,
    position: "골키퍼 (GK)",
    birthYear: 1994,
    hints: [
      "포지션: 골키퍼 | 1994년생 | 등번호 1번",
      "주요 경력: 선덜랜드 AFC → 에버턴 FC",
      "물병에 상대 키커 분석표를 적어 승부차기를 막아내는 것으로 유명한 잉글랜드 부동의 수문장"
    ]
  },
  {
    id: 37,
    name: "존 스톤스",
    enName: "John Stones",
    wikiTitle: "John_Stones",
    country: "잉글랜드",
    flagCode: "gb-eng",
    number: 5,
    position: "수비수 (CB / CDM)",
    birthYear: 1994,
    hints: [
      "포지션: 센터백 / 수비형 미드필더 | 1994년생 | 등번호 5번",
      "주요 경력: 에버턴 FC → 맨체스터 시티",
      "수비수이면서도 미드필더로 전진해 빌드업을 지휘하는 맨시티 트레블의 일등공신"
    ]
  },

  // 🇪🇸 스페인 (9명)
  {
    id: 38,
    name: "라민 야말",
    enName: "Lamine Yamal",
    wikiTitle: "Lamine_Yamal",
    country: "스페인",
    flagCode: "es",
    number: 19,
    position: "공격수 (RW)",
    birthYear: 2007,
    hints: [
      "포지션: 우측 윙어 | 2007년생 | 왼발잡이 크랙",
      "주요 경력: FC 바르셀로나 라 마시아 출신",
      "만 16~17세의 나이로 유로 2024 최연소 득점 및 우승을 이끌며 세계를 충격에 빠뜨린 초신성"
    ]
  },
  {
    id: 39,
    name: "로드리",
    enName: "Rodri",
    wikiTitle: "Rodri_(footballer,_born_1996)",
    country: "스페인",
    flagCode: "es",
    number: 16,
    position: "미드필더 (CDM)",
    birthYear: 1996,
    hints: [
      "포지션: 수비형 미드필더 | 1996년생 | 등번호 16번",
      "주요 경력: 비야레알 → 아틀레티코 마드리드 → 맨체스터 시티",
      "유로 2024 MVP 및 2024 발롱도르 수상자, 상의를 바지 안에 넣어 입는 현시대 최고의 수비형 미드필더"
    ]
  },
  {
    id: 40,
    name: "페드리",
    enName: "Pedri",
    wikiTitle: "Pedri",
    country: "스페인",
    flagCode: "es",
    number: 20,
    position: "미드필더 (CM / CAM)",
    birthYear: 2002,
    hints: [
      "포지션: 중앙 미드필더 | 2002년생",
      "주요 경력: UD 라스팔마스 → FC 바르셀로나 (등번호 8번)",
      "안드레스 이니에스타의 후계자로 불리며 골든보이와 코파 트로피를 석권한 스페인의 천재 미드필더"
    ]
  },
  {
    id: 41,
    name: "가비",
    enName: "Gavi",
    wikiTitle: "Gavi_(footballer)",
    country: "스페인",
    flagCode: "es",
    number: 9,
    position: "미드필더 (CM)",
    birthYear: 2004,
    hints: [
      "포지션: 중앙 미드필더 | 2004년생",
      "주요 경력: FC 바르셀로나 (등번호 6번)",
      "풀어진 축구화 끈과 몸을 사리지 않는 투지 넘치는 플레이로 유명한 바르셀로나와 스페인의 미드필더"
    ]
  },
  {
    id: 42,
    name: "니코 윌리암스",
    enName: "Nico Williams",
    wikiTitle: "Nico_Williams",
    country: "스페인",
    flagCode: "es",
    number: 17,
    position: "공격수 (LW)",
    birthYear: 2002,
    hints: [
      "포지션: 좌측 윙어 | 2002년생 | 등번호 17번",
      "주요 경력: 아틀레틱 빌바오",
      "라민 야말과 함께 스페인 양 날개를 책임지며 유로 2024 결승전 선제골을 터뜨린 폭발적인 드리블러"
    ]
  },
  {
    id: 43,
    name: "다니 올모",
    enName: "Dani Olmo",
    wikiTitle: "Dani_Olmo",
    country: "스페인",
    flagCode: "es",
    number: 10,
    position: "미드필더 (CAM / LW)",
    birthYear: 1998,
    hints: [
      "포지션: 공격형 미드필더 | 1998년생 | 등번호 10번",
      "주요 경력: 디나모 자그레브 → RB 라이프치히 → FC 바르셀로나",
      "유로 2024 공동 득점왕이자 손목시계를 가리키는 '데임 타임(Dame Time)' 세리머니로 유명한 테크니션"
    ]
  },
  {
    id: 44,
    name: "다니 카르바할",
    enName: "Dani Carvajal",
    wikiTitle: "Dani_Carvajal",
    country: "스페인",
    flagCode: "es",
    number: 2,
    position: "수비수 (RB)",
    birthYear: 1992,
    hints: [
      "포지션: 라이트백 | 1992년생 | 등번호 2번",
      "주요 경력: 바이어 레버쿠젠 → 레알 마드리드",
      "UEFA 챔피언스리그 6회 우승에 빛나는 레알 마드리드와 스페인 대표팀의 전설적인 우측 풀백"
    ]
  },
  {
    id: 45,
    name: "알바로 모라타",
    enName: "Álvaro Morata",
    wikiTitle: "Álvaro_Morata",
    country: "스페인",
    flagCode: "es",
    number: 7,
    position: "공격수 (ST)",
    birthYear: 1992,
    hints: [
      "포지션: 스트라이커 | 1992년생 | 등번호 7번",
      "주요 경력: 레알 마드리드 → 유벤투스 → 첼시 → 아틀레티코 마드리드 → AC 밀란",
      "스페인 대표팀 주장 완장을 차고 유로 2024 우승 트로피를 들어 올린 베테랑 공격수"
    ]
  },
  {
    id: 46,
    name: "파우 쿠바르시",
    enName: "Pau Cubarsí",
    wikiTitle: "Pau_Cubarsí",
    country: "스페인",
    flagCode: "es",
    number: 2,
    position: "수비수 (CB)",
    birthYear: 2007,
    hints: [
      "포지션: 센터백 | 2007년생",
      "주요 경력: FC 바르셀로나 라 마시아 유스 출신",
      "만 17세의 나이에 챔피언스리그 16강 POTM을 차지하고 2024 파리 올림픽 금메달을 이끈 천재 수비수"
    ]
  },

  // 🇧🇷 브라질 (9명)
  {
    id: 47,
    name: "비니시우스 주니오르",
    enName: "Vinícius Júnior",
    wikiTitle: "Vinícius_Júnior",
    country: "브라질",
    flagCode: "br",
    number: 7,
    position: "공격수 (LW)",
    birthYear: 2000,
    hints: [
      "포지션: 좌측 윙어 | 2000년생 | 등번호 7번",
      "주요 경력: 플라멩구 → 레알 마드리드",
      "화려한 삼바 드리블과 폭발적인 스피드로 레알 마드리드의 챔피언스리그 우승을 이끈 슈퍼 크랙"
    ]
  },
  {
    id: 48,
    name: "네이마르",
    enName: "Neymar",
    wikiTitle: "Neymar",
    country: "브라질",
    flagCode: "br",
    number: 10,
    position: "공격수 (LW / CAM)",
    birthYear: 1992,
    hints: [
      "포지션: 공격수 / 플레이메이커 | 1992년생 | 등번호 10번",
      "주요 경력: 산투스 → FC 바르셀로나 → 파리 생제르맹 → 알 힐랄",
      "펠레를 넘어 브라질 국가대표팀 역대 A매치 최다 득점자에 오른 영원한 '삼바 축구의 아이콘'"
    ]
  },
  {
    id: 49,
    name: "호드리구",
    enName: "Rodrygo",
    wikiTitle: "Rodrygo",
    country: "브라질",
    flagCode: "br",
    number: 10,
    position: "공격수 (RW / ST)",
    birthYear: 2001,
    hints: [
      "포지션: 우측 윙어 / 세컨드 스트라이커 | 2001년생",
      "주요 경력: 산투스 FC → 레알 마드리드 (등번호 11번)",
      "비니시우스와 함께 레알 마드리드와 브라질의 공격을 이끄는 챔피언스리그 해결사"
    ]
  },
  {
    id: 50,
    name: "하피냐",
    enName: "Raphinha",
    wikiTitle: "Raphinha",
    country: "브라질",
    flagCode: "br",
    number: 11,
    position: "공격수 (RW / LW)",
    birthYear: 1996,
    hints: [
      "포지션: 윙어 | 1996년생 | 등번호 11번",
      "주요 경력: 스타드 렌 → 리즈 유나이티드 → FC 바르셀로나",
      "날카로운 왼발 킥과 엄청난 활동량으로 FC 바르셀로나의 주장단이자 에이스로 활약 중인 브라질 윙어"
    ]
  },
  {
    id: 51,
    name: "알리송 베케르",
    enName: "Alisson Becker",
    wikiTitle: "Alisson_Becker",
    country: "브라질",
    flagCode: "br",
    number: 1,
    position: "골키퍼 (GK)",
    birthYear: 1992,
    hints: [
      "포지션: 골키퍼 | 1992년생 | 등번호 1번",
      "주요 경력: AS 로마 → 리버풀 FC",
      "초대 야신상 수상자이자 1대1 방어 능력에 있어 타의 추종을 불허하는 리버풀과 브라질의 수문장"
    ]
  },
  {
    id: 52,
    name: "마르키뉴스",
    enName: "Marquinhos",
    wikiTitle: "Marquinhos",
    country: "브라질",
    flagCode: "br",
    number: 4,
    position: "수비수 (CB)",
    birthYear: 1994,
    hints: [
      "포지션: 센터백 | 1994년생 | 등번호 4번",
      "주요 경력: AS 로마 → 파리 생제르맹(PSG) 주장",
      "이강인의 소속팀 파리 생제르맹의 주장이자 브라질 수비진을 오랫동안 이끌어온 리더"
    ]
  },
  {
    id: 53,
    name: "엔드릭",
    enName: "Endrick",
    wikiTitle: "Endrick_(footballer,_born_2006)",
    country: "브라질",
    flagCode: "br",
    number: 9,
    position: "공격수 (ST)",
    birthYear: 2006,
    hints: [
      "포지션: 스트라이커 | 2006년생 | 등번호 9번",
      "주요 경력: 파우메이라스 → 레알 마드리드",
      "10대 나이에 웸블리에서 A매치 결승골을 터뜨리며 호나우두의 후계자로 주목받는 브라질 신성"
    ]
  },
  {
    id: 54,
    name: "브루누 기마랑이스",
    enName: "Bruno Guimarães",
    wikiTitle: "Bruno_Guimarães",
    country: "브라질",
    flagCode: "br",
    number: 5,
    position: "미드필더 (CM / CDM)",
    birthYear: 1997,
    hints: [
      "포지션: 중앙/수비형 미드필더 | 1997년생",
      "주요 경력: 아틀레치쿠 파라나엔시 → 올림피크 리옹 → 뉴캐슬 유나이티드",
      "뉴캐슬의 중원 사령관이자 브라질 대표팀의 핵심 중원 자원으로 손꼽히는 테크니션"
    ]
  },
  {
    id: 55,
    name: "가브리에우 마갈량이스",
    enName: "Gabriel Magalhães",
    wikiTitle: "Gabriel_Magalhães",
    country: "브라질",
    flagCode: "br",
    number: 14,
    position: "수비수 (CB)",
    birthYear: 1997,
    hints: [
      "포지션: 센터백 | 1997년생",
      "주요 경력: 아바이 FC → LOSC 릴 → 아스널 FC",
      "윌리엄 살리바와 함께 프리미어리그 최소 실점 통곡의 벽을 구축한 왼발잡이 센터백"
    ]
  },

  // 🇩🇪 독일 (8명)
  {
    id: 56,
    name: "자말 무시알라",
    enName: "Jamal Musiala",
    wikiTitle: "Jamal_Musiala",
    country: "독일",
    flagCode: "de",
    number: 10,
    position: "미드필더 (CAM / LW)",
    birthYear: 2003,
    hints: [
      "포지션: 공격형 미드필더 / 윙어 | 2003년생 | 등번호 10번",
      "주요 경력: 첼시 유스 → 바이에른 뮌헨",
      "좁은 공간에서 수비수들을 유유히 제쳐내는 드리블로 '밤비(Bambi)'라는 별명을 가진 독일의 에이스"
    ]
  },
  {
    id: 57,
    name: "플로리안 비르츠",
    enName: "Florian Wirtz",
    wikiTitle: "Florian_Wirtz",
    country: "독일",
    flagCode: "de",
    number: 17,
    position: "미드필더 (CAM)",
    birthYear: 2003,
    hints: [
      "포지션: 공격형 미드필더 | 2003년생 | 등번호 17번",
      "주요 경력: 바이어 04 레버쿠젠",
      "레버쿠젠의 분데스리가 사상 첫 무패 우승을 이끌고 분데스리가 올해의 선수로 선정된 천재 플레이메이커"
    ]
  },
  {
    id: 58,
    name: "카이 하베르츠",
    enName: "Kai Havertz",
    wikiTitle: "Kai_Havertz",
    country: "독일",
    flagCode: "de",
    number: 7,
    position: "공격수 / 미드필더 (ST / CAM)",
    birthYear: 1999,
    hints: [
      "포지션: 스트라이커 / 공격형 미드필더 | 1999년생 | 등번호 7번",
      "주요 경력: 바이어 레버쿠젠 → 첼시 FC → 아스널 FC",
      "190cm의 큰 키와 지능적인 움직임으로 아스널과 독일 대표팀의 최전방을 맡고 있는 공격수"
    ]
  },
  {
    id: 59,
    name: "요주아 키미히",
    enName: "Joshua Kimmich",
    wikiTitle: "Joshua_Kimmich",
    country: "독일",
    flagCode: "de",
    number: 6,
    position: "미드필더 / 수비수 (RB / CDM)",
    birthYear: 1995,
    hints: [
      "포지션: 라이트백 / 수비형 미드필더 | 1995년생 | 등번호 6번",
      "주요 경력: RB 라이프치히 → 바이에른 뮌헨",
      "필립 람의 후계자로 불리며 라이트백과 수비형 미드필더 모두 월드클래스 기량을 보여주는 독일 대표팀 주장"
    ]
  },
  {
    id: 60,
    name: "안토니오 뤼디거",
    enName: "Antonio Rüdiger",
    wikiTitle: "Antonio_Rüdiger",
    country: "독일",
    flagCode: "de",
    number: 2,
    position: "수비수 (CB)",
    birthYear: 1993,
    hints: [
      "포지션: 센터백 | 1993년생 | 등번호 2번",
      "주요 경력: AS 로마 → 첼시 FC → 레알 마드리드",
      "무릎을 높이 드는 독특한 타조 주법과 엄청난 스피드, 기행으로 유명한 독일과 레알 마드리드의 철벽 수비수"
    ]
  },
  {
    id: 61,
    name: "마르크안드레 테어 슈테겐",
    enName: "Marc-André ter Stegen",
    wikiTitle: "Marc-André_ter_Stegen",
    country: "독일",
    flagCode: "de",
    number: 1,
    position: "골키퍼 (GK)",
    birthYear: 1992,
    hints: [
      "포지션: 골키퍼 | 1992년생 | 등번호 1번",
      "주요 경력: 보루시아 묀헨글라트바흐 → FC 바르셀로나",
      "마누엘 노이어 은퇴 후 독일 골문을 지키게 된 FC 바르셀로나의 주장이자 발밑 기술이 뛰어난 골키퍼"
    ]
  },
  {
    id: 62,
    name: "일카이 귄도안",
    enName: "İlkay Gündoğan",
    wikiTitle: "İlkay_Gündoğan",
    country: "독일",
    flagCode: "de",
    number: 21,
    position: "미드필더 (CM / CAM)",
    birthYear: 1990,
    hints: [
      "포지션: 중앙 미드필더 | 1990년생",
      "주요 경력: 도르트문트 → 맨체스터 시티 (주장으로 트레블 달성) → 바르셀로나 → 맨체스터 시티",
      "박스 안으로 침투해 클러치 골을 터뜨리는 능력과 뛰어난 축구 지능을 겸비한 독일의 전설적인 미드필더"
    ]
  },
  {
    id: 63,
    name: "르로이 자네",
    enName: "Leroy Sané",
    wikiTitle: "Leroy_Sané",
    country: "독일",
    flagCode: "de",
    number: 19,
    position: "공격수 (RW / LW)",
    birthYear: 1996,
    hints: [
      "포지션: 윙어 | 1996년생 | 등번호 19번",
      "주요 경력: 샬케 04 → 맨체스터 시티 → 바이에른 뮌헨",
      "폭발적인 스프린트와 강력한 왼발 슈팅으로 상대 측면을 허무는 독일 대표팀의 주전 윙어"
    ]
  },

  // 🇵🇹 포르투갈 (8명)
  {
    id: 64,
    name: "크리스티아누 호날두",
    enName: "Cristiano Ronaldo",
    wikiTitle: "Cristiano_Ronaldo",
    country: "포르투갈",
    flagCode: "pt",
    number: 7,
    position: "공격수 (ST)",
    birthYear: 1985,
    hints: [
      "포지션: 스트라이커 | 1985년생 | 등번호 7번",
      "주요 경력: 스포르팅 CP → 맨체스터 유나이티드 → 레알 마드리드 → 유벤투스 → 알 나스르",
      "A매치 역대 최다 출장 및 최다 득점 기록 보유자이자 '호우(Siuuu)' 세리머니의 창시자, CR7"
    ]
  },
  {
    id: 65,
    name: "브루노 페르난데스",
    enName: "Bruno Fernandes",
    wikiTitle: "Bruno_Fernandes",
    country: "포르투갈",
    flagCode: "pt",
    number: 8,
    position: "미드필더 (CAM)",
    birthYear: 1994,
    hints: [
      "포지션: 공격형 미드필더 | 1994년생 | 등번호 8번",
      "주요 경력: 스포르팅 CP → 맨체스터 유나이티드 (주장)",
      "지치지 않는 철강왕 체력과 창의적인 킬패스를 자랑하는 맨유와 포르투갈의 핵심 플레이메이커"
    ]
  },
  {
    id: 66,
    name: "베르나르두 실바",
    enName: "Bernardo Silva",
    wikiTitle: "Bernardo_Silva",
    country: "포르투갈",
    flagCode: "pt",
    number: 10,
    position: "미드필더 / 윙어 (CM / RW)",
    birthYear: 1994,
    hints: [
      "포지션: 공격형 미드필더 / 우측 윙어 | 1994년생 | 등번호 10번",
      "주요 경력: SL 벤피카 → AS 모나코 → 맨체스터 시티",
      "엄청난 활동량과 발에 공이 붙어 다니는 듯한 탈압박 능력으로 펩 과르디올라 감독의 총애를 받는 테크니션"
    ]
  },
  {
    id: 67,
    name: "하파엘 레앙",
    enName: "Rafael Leão",
    wikiTitle: "Rafael_Leão",
    country: "포르투갈",
    flagCode: "pt",
    number: 17,
    position: "공격수 (LW)",
    birthYear: 1999,
    hints: [
      "포지션: 좌측 윙어 | 1999년생 | 등번호 17번",
      "주요 경력: 스포르팅 CP → LOSC 릴 → AC 밀란 (등번호 10번)",
      "웃으면서 수비수를 제치는 특유의 표정과 폭발적인 탄력을 자랑하는 세리에 A MVP 출신 크랙"
    ]
  },
  {
    id: 68,
    name: "후벵 디아스",
    enName: "Rúben Dias",
    wikiTitle: "Rúben_Dias",
    country: "포르투갈",
    flagCode: "pt",
    number: 4,
    position: "수비수 (CB)",
    birthYear: 1997,
    hints: [
      "포지션: 센터백 | 1997년생 | 등번호 4번",
      "주요 경력: SL 벤피카 → 맨체스터 시티",
      "이적 첫 시즌 만에 EPL 올해의 선수상을 수상하며 맨시티와 포르투갈 수비진을 이끄는 커맨더형 수비수"
    ]
  },
  {
    id: 69,
    name: "비티냐",
    enName: "Vitinha",
    wikiTitle: "Vitinha_(footballer,_born_2000)",
    country: "포르투갈",
    flagCode: "pt",
    number: 23,
    position: "미드필더 (CM)",
    birthYear: 2000,
    hints: [
      "포지션: 중앙 미드필더 | 2000년생 | 등번호 23번",
      "주요 경력: FC 포르투 → 울버햄튼 → 파리 생제르맹(PSG)",
      "이강인의 PSG 동료이자 정교한 볼 배급과 중거리 슛으로 포르투갈 중원의 사령관으로 거듭난 미드필더"
    ]
  },
  {
    id: 70,
    name: "주앙 펠릭스",
    enName: "João Félix",
    wikiTitle: "João_Félix",
    country: "포르투갈",
    flagCode: "pt",
    number: 11,
    position: "공격수 (SS / LW)",
    birthYear: 1999,
    hints: [
      "포지션: 세컨드 스트라이커 / 윙어 | 1999년생",
      "주요 경력: SL 벤피카 → 아틀레티코 마드리드 → 바르셀로나 → 첼시 FC",
      "골든보이 수상자 출신으로 감각적인 퍼스트 터치와 창의적인 플레이를 펼치는 포르투갈 공격수"
    ]
  },
  {
    id: 71,
    name: "디오구 조타",
    enName: "Diogo Jota",
    wikiTitle: "Diogo_Jota",
    country: "포르투갈",
    flagCode: "pt",
    number: 21,
    position: "공격수 (ST / LW)",
    birthYear: 1996,
    hints: [
      "포지션: 공격수 | 1996년생",
      "주요 경력: 아틀레티코 마드리드 → 울버햄튼 → 리버풀 FC",
      "작은 체구에도 놀라운 헤더 득점력과 박스 안 결정력을 자랑하는 리버풀과 포르투갈의 해결사"
    ]
  },

  // 🇳🇱 네덜란드 (6명)
  {
    id: 72,
    name: "버질 반 다이크",
    enName: "Virgil van Dijk",
    wikiTitle: "Virgil_van_Dijk",
    country: "네덜란드",
    flagCode: "nl",
    number: 4,
    position: "수비수 (CB)",
    birthYear: 1991,
    hints: [
      "포지션: 센터백 | 1991년생 | 등번호 4번",
      "주요 경력: 셀틱 → 사우샘프턴 → 리버풀 FC (주장)",
      "압도적인 제공권과 수비 지휘력으로 수비수로서 발롱도르 2위까지 올랐던 네덜란드와 리버풀의 캡틴"
    ]
  },
  {
    id: 73,
    name: "코디 각포",
    enName: "Cody Gakpo",
    wikiTitle: "Cody_Gakpo",
    country: "네덜란드",
    flagCode: "nl",
    number: 11,
    position: "공격수 (LW / ST)",
    birthYear: 1999,
    hints: [
      "포지션: 좌측 윙어 / 스트라이커 | 1999년생 | 등번호 11번",
      "주요 경력: PSV 에인트호번 → 리버풀 FC",
      "카타르 월드컵과 유로 2024에서 모두 맹활약하며 메이저 대회에 유독 강한 면모를 보이는 네덜란드 공격수"
    ]
  },
  {
    id: 74,
    name: "프렝키 더 용",
    enName: "Frenkie de Jong",
    wikiTitle: "Frenkie_de_Jong",
    country: "네덜란드",
    flagCode: "nl",
    number: 21,
    position: "미드필더 (CM)",
    birthYear: 1997,
    hints: [
      "포지션: 중앙 미드필더 | 1997년생 | 등번호 21번",
      "주요 경력: AFC 아약스 → FC 바르셀로나",
      "유려한 볼 운반과 전진 드리블로 아약스의 챔스 4강 돌풍을 이끌고 바르셀로나의 핵심이 된 미드필더"
    ]
  },
  {
    id: 75,
    name: "사비 시몬스",
    enName: "Xavi Simons",
    wikiTitle: "Xavi_Simons",
    country: "네덜란드",
    flagCode: "nl",
    number: 7,
    position: "미드필더 (CAM / LW)",
    birthYear: 2003,
    hints: [
      "포지션: 공격형 미드필더 / 윙어 | 2003년생 | 등번호 7번",
      "주요 경력: 바르셀로나 유스 → PSG → PSV 에인트호번 → RB 라이프치히",
      "스페인 레전드 사비 에르난데스의 이름을 따서 지어진 이름과 화려한 드리블로 유명한 네덜란드 신성"
    ]
  },
  {
    id: 76,
    name: "미키 판 더 펜",
    enName: "Micky van de Ven",
    wikiTitle: "Micky_van_de_Ven",
    country: "네덜란드",
    flagCode: "nl",
    number: 15,
    position: "수비수 (CB / LB)",
    birthYear: 2001,
    hints: [
      "포지션: 센터백 / 레프트백 | 2001년생",
      "주요 경력: VfL 볼프스부르크 → 토트넘 홋스퍼",
      "손흥민의 토트넘 동료로, 최고 시속 37.38km/h를 기록해 EPL 역대 최고 속도 신기록을 세운 왼발잡이 수비수"
    ]
  },
  {
    id: 77,
    name: "덴젤 둠프리스",
    enName: "Denzel Dumfries",
    wikiTitle: "Denzel_Dumfries",
    country: "네덜란드",
    flagCode: "nl",
    number: 22,
    position: "수비수 (RWB / RB)",
    birthYear: 1996,
    hints: [
      "포지션: 우측 윙백 | 1996년생 | 등번호 22번",
      "주요 경력: PSV 에인트호번 → 인터 밀란",
      "폭발적인 피지컬과 공격 가담으로 국가대표 메이저 대회마다 공격포인트를 쓸어 담는 네덜란드의 탱크"
    ]
  },

  // 🇧🇪 벨기에 (5명)
  {
    id: 78,
    name: "케빈 더 브라위너",
    enName: "Kevin De Bruyne",
    wikiTitle: "Kevin_De_Bruyne",
    country: "벨기에",
    flagCode: "be",
    number: 7,
    position: "미드필더 (CAM / CM)",
    birthYear: 1991,
    hints: [
      "포지션: 공격형 미드필더 | 1991년생 | 등번호 7번",
      "주요 경력: VfL 볼프스부르크 → 맨체스터 시티",
      "대지를 가르는 킬패스로 현시대 최고의 패스마스터로 군림하는 벨기에 황금세대의 리더, '덕배'"
    ]
  },
  {
    id: 79,
    name: "제레미 도쿠",
    enName: "Jérémy Doku",
    wikiTitle: "Jérémy_Doku",
    country: "벨기에",
    flagCode: "be",
    number: 11,
    position: "공격수 (LW / RW)",
    birthYear: 2002,
    hints: [
      "포지션: 윙어 | 2002년생",
      "주요 경력: RSC 안데를레흐트 → 스타드 렌 → 맨체스터 시티",
      "엄청난 순간 가속도와 1대1 돌파 성공률을 자랑하는 벨기에와 맨시티의 크랙"
    ]
  },
  {
    id: 80,
    name: "로멜루 루카쿠",
    enName: "Romelu Lukaku",
    wikiTitle: "Romelu_Lukaku",
    country: "벨기에",
    flagCode: "be",
    number: 9,
    position: "공격수 (ST)",
    birthYear: 1993,
    hints: [
      "포지션: 스트라이커 | 1993년생 | 등번호 9번",
      "주요 경력: 에버턴 → 맨유 → 인터 밀란 → 첼시 → AS 로마 → SSC 나폴리",
      "벨기에 국가대표팀 역대 A매치 최다 득점자이자 압도적인 피지컬을 가진 스트라이커"
    ]
  },
  {
    id: 81,
    name: "레안드로 트로사르",
    enName: "Leandro Trossard",
    wikiTitle: "Leandro_Trossard",
    country: "벨기에",
    flagCode: "be",
    number: 19,
    position: "공격수 / 윙어 (LW / SS)",
    birthYear: 1994,
    hints: [
      "포지션: 윙어 / 세컨드 스트라이커 | 1994년생",
      "주요 경력: KRC 헹크 → 브라이튼 → 아스널 FC",
      "두 눈에 동그라미를 그리는 안경 세리머니와 클러치 득점력으로 유명한 아스널의 특급 해결사"
    ]
  },
  {
    id: 82,
    name: "아마두 오나나",
    enName: "Amadou Onana",
    wikiTitle: "Amadou_Onana",
    country: "벨기에",
    flagCode: "be",
    number: 24,
    position: "미드필더 (CDM / CM)",
    birthYear: 2001,
    hints: [
      "포지션: 수비형 미드필더 | 2001년생",
      "주요 경력: LOSC 릴 → 에버턴 FC → 애스턴 빌라 FC",
      "195cm의 거구에서 나오는 피지컬과 공중볼 장악력으로 벨기에 중원을 지키는 핵심 미드필더"
    ]
  },

  // 🇮🇹 이탈리아 (5명)
  {
    id: 83,
    name: "잔루이지 돈나룸마",
    enName: "Gianluigi Donnarumma",
    wikiTitle: "Gianluigi_Donnarumma",
    country: "이탈리아",
    flagCode: "it",
    number: 1,
    position: "골키퍼 (GK)",
    birthYear: 1999,
    hints: [
      "포지션: 골키퍼 | 1999년생 | 등번호 1번",
      "주요 경력: AC 밀란 → 파리 생제르맹(PSG)",
      "만 16세에 AC 밀란 주전을 꿰차고 유로 2020 MVP를 수상한 196cm의 이탈리아 거미손"
    ]
  },
  {
    id: 84,
    name: "니콜로 바렐라",
    enName: "Nicolò Barella",
    wikiTitle: "Nicolò_Barella",
    country: "이탈리아",
    flagCode: "it",
    number: 18,
    position: "미드필더 (CM)",
    birthYear: 1997,
    hints: [
      "포지션: 중앙 미드필더 | 1997년생 | 등번호 18번",
      "주요 경력: 칼리아리 칼초 → 인테르나치오날레 밀라노(인터 밀란)",
      "지치지 않는 활동량과 공수 겸장 능력으로 세리에 A 최우수 미드필더로 꼽히는 이탈리아의 심장"
    ]
  },
  {
    id: 85,
    name: "페데리코 키에사",
    enName: "Federico Chiesa",
    wikiTitle: "Federico_Chiesa",
    country: "이탈리아",
    flagCode: "it",
    number: 14,
    position: "공격수 (RW / LW)",
    birthYear: 1997,
    hints: [
      "포지션: 윙어 | 1997년생 | 등번호 14번",
      "주요 경력: 피오렌티나 → 유벤투스 FC → 리버풀 FC",
      "이탈리아의 유로 2020 우승 주역이자 전설적인 공격수 엔리코 키에사의 아들"
    ]
  },
  {
    id: 86,
    name: "알레산드로 바스토니",
    enName: "Alessandro Bastoni",
    wikiTitle: "Alessandro_Bastoni",
    country: "이탈리아",
    flagCode: "it",
    number: 23,
    position: "수비수 (CB)",
    birthYear: 1999,
    hints: [
      "포지션: 센터백 | 1999년생",
      "주요 경력: 아탈란타 → 인터 밀란",
      "왼발 킥력과 공격 빌드업 전개 능력이 미드필더 수준이라는 평가를 받는 아주리 군단의 수비 에이스"
    ]
  },
  {
    id: 87,
    name: "페데리코 디마르코",
    enName: "Federico Dimarco",
    wikiTitle: "Federico_Dimarco",
    country: "이탈리아",
    flagCode: "it",
    number: 3,
    position: "수비수 (LB / LWB)",
    birthYear: 1997,
    hints: [
      "포지션: 레프트백 / 좌측 윙백 | 1997년생 | 등번호 3번",
      "주요 경력: 인터 밀란 유스 출신",
      "정교하고 날카로운 왼발 킥으로 원더골과 택배 크로스를 쏟아내는 인터 밀란과 이탈리아의 날개"
    ]
  },

  // 🇭🇷 크로아티아 (5명)
  {
    id: 88,
    name: "루카 모드리치",
    enName: "Luka Modrić",
    wikiTitle: "Luka_Modrić",
    country: "크로아티아",
    flagCode: "hr",
    number: 10,
    position: "미드필더 (CM)",
    birthYear: 1985,
    hints: [
      "포지션: 중앙 미드필더 | 1985년생 | 등번호 10번",
      "주요 경력: 디나모 자그레브 → 토트넘 홋스퍼 → 레알 마드리드",
      "2018 러시아 월드컵 골든볼 및 발롱도르 수상자, 아웃프런트 패스의 달인이자 크로아티아의 영원한 캡틴"
    ]
  },
  {
    id: 89,
    name: "요슈코 그바르디올",
    enName: "Joško Gvardiol",
    wikiTitle: "Joško_Gvardiol",
    country: "크로아티아",
    flagCode: "hr",
    number: 4,
    position: "수비수 (CB / LB)",
    birthYear: 2002,
    hints: [
      "포지션: 센터백 / 레프트백 | 2002년생 | 등번호 4번",
      "주요 경력: 디나모 자그레브 → RB 라이프치히 → 맨체스터 시티",
      "카타르 월드컵에서 검은 안면 마스크를 쓰고 철벽 수비를 펼쳤으며 공격력까지 갖춘 왼발 수비수"
    ]
  },
  {
    id: 90,
    name: "마테오 코바치치",
    enName: "Mateo Kovačić",
    wikiTitle: "Mateo_Kovačić",
    country: "크로아티아",
    flagCode: "hr",
    number: 8,
    position: "미드필더 (CM)",
    birthYear: 1994,
    hints: [
      "포지션: 중앙 미드필더 | 1994년생 | 등번호 8번",
      "주요 경력: 인터 밀란 → 레알 마드리드 → 첼시 FC → 맨체스터 시티",
      "UCL 우승 트로피만 4번 들어 올린 크로아티아 중원의 탈압박 스페셜리스트"
    ]
  },
  {
    id: 91,
    name: "이반 페리시치",
    enName: "Ivan Perišić",
    wikiTitle: "Ivan_Perišić",
    country: "크로아티아",
    flagCode: "hr",
    number: 14,
    position: "공격수 / 윙백 (LW / LWB)",
    birthYear: 1989,
    hints: [
      "포지션: 윙어 / 윙백 | 1989년생 | 등번호 14번",
      "주요 경력: 도르트문트 → 볼프스부르크 → 인터 밀란 → 바이에른 뮌헨 → 토트넘 → PSV",
      "월드컵 결승전 득점 및 유로와 월드컵 메이저 대회마다 결정적 골을 터뜨리는 크로아티아의 영웅"
    ]
  },
  {
    id: 92,
    name: "도미니크 리바코비치",
    enName: "Dominik Livaković",
    wikiTitle: "Dominik_Livaković",
    country: "크로아티아",
    flagCode: "hr",
    number: 1,
    position: "골키퍼 (GK)",
    birthYear: 1995,
    hints: [
      "포지션: 골키퍼 | 1995년생 | 등번호 1번",
      "주요 경력: 디나모 자그레브 → 페네르바체 SK",
      "2022 카타르 월드컵 일본전과 브라질전 승부차기에서 신들린 선방 쇼로 4강 진출을 이끈 수문장"
    ]
  },

  // 🇺🇾 우루과이 (5명)
  {
    id: 93,
    name: "페데리코 발베르데",
    enName: "Federico Valverde",
    wikiTitle: "Federico_Valverde",
    country: "우루과이",
    flagCode: "uy",
    number: 15,
    position: "미드필더 (CM / RW)",
    birthYear: 1998,
    hints: [
      "포지션: 중앙 미드필더 / 우측 윙어 | 1998년생",
      "주요 경력: 페냐롤 → 레알 마드리드 (토니 크로스에게 8번 계승)",
      "대포알 같은 중거리 슛과 지치지 않는 체력으로 '매(El Halcón)'라는 별명을 가진 우루과이와 레알의 핵심"
    ]
  },
  {
    id: 94,
    name: "다르윈 누녜스",
    enName: "Darwin Núñez",
    wikiTitle: "Darwin_Núñez",
    country: "우루과이",
    flagCode: "uy",
    number: 9,
    position: "공격수 (ST)",
    birthYear: 1999,
    hints: [
      "포지션: 스트라이커 | 1999년생 | 등번호 9번",
      "주요 경력: UD 알메리아 → SL 벤피카 → 리버풀 FC",
      "엄청난 스피드와 운동 능력으로 루이스 수아레스의 뒤를 잇는 우루과이의 주전 스트라이커"
    ]
  },
  {
    id: 95,
    name: "로날드 아라우호",
    enName: "Ronald Araújo",
    wikiTitle: "Ronald_Araújo",
    country: "우루과이",
    flagCode: "uy",
    number: 4,
    position: "수비수 (CB / RB)",
    birthYear: 1999,
    hints: [
      "포지션: 센터백 / 라이트백 | 1999년생 | 등번호 4번",
      "주요 경력: 보스턴 리버 → FC 바르셀로나 (부주장)",
      "압도적인 스피드와 피지컬로 상대 공격수를 지워버리는 바르셀로나와 우루과이의 핵심 수비수"
    ]
  },
  {
    id: 96,
    name: "마누엘 우가르테",
    enName: "Manuel Ugarte",
    wikiTitle: "Manuel_Ugarte_(footballer)",
    country: "우루과이",
    flagCode: "uy",
    number: 5,
    position: "미드필더 (CDM)",
    birthYear: 2001,
    hints: [
      "포지션: 수비형 미드필더 | 2001년생 | 등번호 5번",
      "주요 경력: 스포르팅 CP → 파리 생제르맹(PSG) → 맨체스터 유나이티드",
      "경기당 태클과 인터셉트 1위를 다투는 저돌적인 하드워커 수비형 미드필더"
    ]
  },
  {
    id: 97,
    name: "로드리고 벤탄쿠르",
    enName: "Rodrigo Bentancur",
    wikiTitle: "Rodrigo_Bentancur",
    country: "우루과이",
    flagCode: "uy",
    number: 6,
    position: "미드필더 (CM)",
    birthYear: 1997,
    hints: [
      "포지션: 중앙 미드필더 | 1997년생 | 등번호 6번",
      "주요 경력: 보카 주니어스 → 유벤투스 FC → 토트넘 홋스퍼",
      "손흥민의 토트넘 동료이자 부드러운 턴과 전진성으로 우루과이 중원을 책임지는 미드필더"
    ]
  },

  // 🇨🇴 콜롬비아 (3명)
  {
    id: 98,
    name: "루이스 디아스",
    enName: "Luis Díaz",
    wikiTitle: "Luis_Díaz_(Colombian_footballer)",
    country: "콜롬비아",
    flagCode: "co",
    number: 7,
    position: "공격수 (LW)",
    birthYear: 1997,
    hints: [
      "포지션: 좌측 윙어 | 1997년생 | 등번호 7번",
      "주요 경력: 주니오르 → FC 포르투 → 리버풀 FC",
      "지칠 줄 모르는 에너지와 현란한 드리블로 리버풀과 콜롬비아의 왼쪽 측면을 지배하는 에이스"
    ]
  },
  {
    id: 99,
    name: "하메스 로드리게스",
    enName: "James Rodríguez",
    wikiTitle: "James_Rodríguez",
    country: "콜롬비아",
    flagCode: "co",
    number: 10,
    position: "미드필더 (CAM)",
    birthYear: 1991,
    hints: [
      "포지션: 공격형 미드필더 | 1991년생 | 등번호 10번",
      "주요 경력: FC 포르투 → AS 모나코 → 레알 마드리드 → 바이에른 뮌헨 → 라요 바예카노",
      "2014 브라질 월드컵 득점왕이자 2024 코파 아메리카 MVP를 수상한 콜롬비아의 전설적인 10번"
    ]
  },
  {
    id: 100,
    name: "존 두란",
    enName: "Jhon Durán",
    wikiTitle: "Jhon_Durán",
    country: "콜롬비아",
    flagCode: "co",
    number: 9,
    position: "공격수 (ST)",
    birthYear: 2003,
    hints: [
      "포지션: 스트라이커 | 2003년생",
      "주요 경력: 엔비가도 → 시카고 파이어 → 애스턴 빌라 FC",
      "경기 후반 교체 투입될 때마다 엄청난 중거리 슈퍼골을 터뜨려 화제가 된 콜롬비아의 특급 스트라이커"
    ]
  },

  // 🇪🇬 이집트 (아프리카 - 2명)
  {
    id: 101,
    name: "모하메드 살라",
    enName: "Mohamed Salah",
    wikiTitle: "Mohamed_Salah",
    country: "이집트",
    flagCode: "eg",
    number: 10,
    position: "공격수 (RW)",
    birthYear: 1992,
    hints: [
      "포지션: 우측 윙어 | 1992년생 | 등번호 10번",
      "주요 경력: 첼시 → AS 로마 → 리버풀 FC",
      "프리미어리그 득점왕 3회 수상에 빛나는 리버풀의 살아있는 전설이자 '파라오'"
    ]
  },
  {
    id: 102,
    name: "오마르 마르무시",
    enName: "Omar Marmoush",
    wikiTitle: "Omar_Marmoush",
    country: "이집트",
    flagCode: "eg",
    number: 7,
    position: "공격수 (ST / LW)",
    birthYear: 1999,
    hints: [
      "포지션: 스트라이커 / 윙어 | 1999년생",
      "주요 경력: VfL 볼프스부르크 → 아인트라흐트 프랑크푸르트",
      "분데스리가 득점 선두를 다투며 환상적인 프리킥과 폭발적인 스피드로 유럽 빅클럽의 러브콜을 받는 공격수"
    ]
  },

  // 🇲🇦 모로코 (아프리카 - 3명)
  {
    id: 103,
    name: "아슈라프 하키미",
    enName: "Achraf Hakimi",
    wikiTitle: "Achraf_Hakimi",
    country: "모로코",
    flagCode: "ma",
    number: 2,
    position: "수비수 (RB)",
    birthYear: 1998,
    hints: [
      "포지션: 라이트백 | 1998년생 | 등번호 2번",
      "주요 경력: 레알 마드리드 → 도르트문트 → 인터 밀란 → 파리 생제르맹(PSG)",
      "모로코의 카타르 월드컵 4강 신화를 이끈 주역이자 이강인의 소속팀 PSG의 월드클래스 우측 풀백"
    ]
  },
  {
    id: 104,
    name: "브라힘 디아스",
    enName: "Brahim Díaz",
    wikiTitle: "Brahim_Díaz",
    country: "모로코",
    flagCode: "ma",
    number: 10,
    position: "미드필더 (CAM / RW)",
    birthYear: 1999,
    hints: [
      "포지션: 공격형 미드필더 / 윙어 | 1999년생 | 등번호 10번",
      "주요 경력: 맨체스터 시티 → AC 밀란 → 레알 마드리드",
      "스페인 연령별 대표를 거쳤으나 모로코 국가대표팀을 선택해 에이스 등번호 10번을 단 레알 마드리드의 테크니션"
    ]
  },
  {
    id: 105,
    name: "야신 보노",
    enName: "Yassine Bounou",
    wikiTitle: "Yassine_Bounou",
    country: "모로코",
    flagCode: "ma",
    number: 1,
    position: "골키퍼 (GK)",
    birthYear: 1991,
    hints: [
      "포지션: 골키퍼 | 1991년생 | 등번호 1번",
      "주요 경력: 아틀레티코 마드리드 → 세비야 FC → 알 힐랄 SFC",
      "카타르 월드컵 승부차기에서 신들린 선방으로 모로코를 아프리카 사상 최초 월드컵 4강으로 이끈 수문장"
    ]
  },

  // 🇳🇬 나이지리아 (아프리카 - 3명)
  {
    id: 106,
    name: "빅터 오시멘",
    enName: "Victor Osimhen",
    wikiTitle: "Victor_Osimhen",
    country: "나이지리아",
    flagCode: "ng",
    number: 9,
    position: "공격수 (ST)",
    birthYear: 1998,
    hints: [
      "포지션: 스트라이커 | 1998년생 | 등번호 9번",
      "주요 경력: LOSC 릴 → SSC 나폴리 → 갈라타사라이 SK",
      "김민재와 함께 나폴리의 세리에 A 우승을 이끌며 세리에 A 득점왕과 아프리카 올해의 선수를 수상한 특급 공격수"
    ]
  },
  {
    id: 107,
    name: "아데몰라 루크먼",
    enName: "Ademola Lookman",
    wikiTitle: "Ademola_Lookman",
    country: "나이지리아",
    flagCode: "ng",
    number: 18,
    position: "공격수 (SS / LW)",
    birthYear: 1997,
    hints: [
      "포지션: 세컨드 스트라이커 / 윙어 | 1997년생",
      "주요 경력: 에버턴 → RB 라이프치히 → 아탈란타 BC",
      "무패 행진을 달리던 레버쿠젠을 상대로 유로파리그 결승전에서 해트트릭을 터뜨리며 아탈란타에 우승을 안긴 영웅"
    ]
  },
  {
    id: 108,
    name: "빅터 보니페이스",
    enName: "Victor Boniface",
    wikiTitle: "Victor_Boniface",
    country: "나이지리아",
    flagCode: "ng",
    number: 22,
    position: "공격수 (ST)",
    birthYear: 2000,
    hints: [
      "포지션: 스트라이커 | 2000년생 | 등번호 22번",
      "주요 경력: 보되/글림트 → 위니옹 SG → 바이어 04 레버쿠젠",
      "사비 알론소 감독 아래 레버쿠젠의 창단 120년 만의 첫 분데스리가 무패 우승을 이끈 파워풀한 스트라이커"
    ]
  },

  // 🇸🇳 세네갈 (아프리카 - 2명)
  {
    id: 109,
    name: "사디오 마네",
    enName: "Sadio Mané",
    wikiTitle: "Sadio_Mané",
    country: "세네갈",
    flagCode: "sn",
    number: 10,
    position: "공격수 (LW / ST)",
    birthYear: 1992,
    hints: [
      "포지션: 윙어 / 스트라이커 | 1992년생 | 등번호 10번",
      "주요 경력: 잘츠부르크 → 사우샘프턴 → 리버풀 FC → 바이에른 뮌헨 → 알 나스르",
      "리버풀 마네-피르미누-살라(마누라 라인)의 주역이자 세네갈을 아프리카 네이션스컵 우승으로 이끈 영웅"
    ]
  },
  {
    id: 110,
    name: "니콜라 잭슨",
    enName: "Nicolas Jackson",
    wikiTitle: "Nicolas_Jackson",
    country: "세네갈",
    flagCode: "sn",
    number: 15,
    position: "공격수 (ST)",
    birthYear: 2001,
    hints: [
      "포지션: 스트라이커 | 2001년생 | 등번호 15번",
      "주요 경력: 비야레알 CF → 첼시 FC",
      "뛰어난 연계 플레이와 침투 능력으로 첼시의 주전 최전방을 책임지고 있는 세네갈 대표팀 공격수"
    ]
  },

  // 🇨🇲 카메룬 (아프리카 - 2명)
  {
    id: 111,
    name: "안드레 오나나",
    enName: "André Onana",
    wikiTitle: "André_Onana",
    country: "카메룬",
    flagCode: "cm",
    number: 24,
    position: "골키퍼 (GK)",
    birthYear: 1996,
    hints: [
      "포지션: 골키퍼 | 1996년생 | 등번호 24번",
      "주요 경력: AFC 아약스 → 인터 밀란 → 맨체스터 유나이티드",
      "필드 플레이어 못지않은 과감한 빌드업과 스위퍼 키퍼 능력으로 유명한 맨유의 카메룬 국적 골키퍼"
    ]
  },
  {
    id: 112,
    name: "브라이언 음뵈모",
    enName: "Bryan Mbeumo",
    wikiTitle: "Bryan_Mbeumo",
    country: "카메룬",
    flagCode: "cm",
    number: 19,
    position: "공격수 (RW / ST)",
    birthYear: 1999,
    hints: [
      "포지션: 우측 윙어 / 공격수 | 1999년생 | 등번호 19번",
      "주요 경력: 트루아 AC → 브렌트포드 FC",
      "경기 시작 1분 만에 골을 넣는 '초고속 득점' 기록과 강력한 왼발 슈팅으로 EPL 득점 상위권을 달리는 공격수"
    ]
  },

  // 🇬🇭 가나 (아프리카 - 2명)
  {
    id: 113,
    name: "모하메드 쿠두스",
    enName: "Mohammed Kudus",
    wikiTitle: "Mohammed_Kudus",
    country: "가나",
    flagCode: "gh",
    number: 20,
    position: "미드필더 / 윙어 (RW / CAM)",
    birthYear: 2000,
    hints: [
      "포지션: 우측 윙어 / 공격형 미드필더 | 2000년생 | 등번호 20번",
      "주요 경력: AFC 아약스 → 웨스트햄 유나이티드",
      "광고판에 걸터앉는 세리머니와 환상적인 원더골로 유명하며 2022 카타르 월드컵 한국전 멀티골의 주인공"
    ]
  },
  {
    id: 114,
    name: "토마스 파티",
    enName: "Thomas Partey",
    wikiTitle: "Thomas_Partey",
    country: "가나",
    flagCode: "gh",
    number: 5,
    position: "미드필더 (CDM / CM)",
    birthYear: 1993,
    hints: [
      "포지션: 수비형 미드필더 | 1993년생 | 등번호 5번",
      "주요 경력: 아틀레티코 마드리드 → 아스널 FC",
      "단단한 피지컬과 탈압박, 레이저 같은 중거리 슛으로 아스널과 가나 대표팀의 허리를 든든히 받치는 미드필더"
    ]
  },

  // 🇺🇸 미국 (3명) - 개최국
  {
    id: 115,
    name: "크리스천 풀리식",
    enName: "Christian Pulisic",
    wikiTitle: "Christian_Pulisic",
    country: "미국",
    flagCode: "us",
    number: 10,
    position: "공격수 (RW / LW / CAM)",
    birthYear: 1998,
    hints: [
      "포지션: 윙어 / 공격형 미드필더 | 1998년생 | 등번호 10번",
      "주요 경력: 보루시아 도르트문트 → 첼시 FC → AC 밀란",
      "'캡틴 아메리카'라는 별명으로 불리며 2026 월드컵 개최국 미국의 에이스를 맡고 있는 공격수"
    ]
  },
  {
    id: 116,
    name: "웨스턴 맥케니",
    enName: "Weston McKennie",
    wikiTitle: "Weston_McKennie",
    country: "미국",
    flagCode: "us",
    number: 8,
    position: "미드필더 (CM)",
    birthYear: 1998,
    hints: [
      "포지션: 중앙 미드필더 | 1998년생 | 등번호 8번",
      "주요 경력: 샬케 04 → 유벤투스 FC",
      "해리포터의 마법 지팡이 세리머니로 유명하며 왕성한 활동량으로 미국 중원을 책임지는 미드필더"
    ]
  },
  {
    id: 117,
    name: "티모시 웨아",
    enName: "Timothy Weah",
    wikiTitle: "Timothy_Weah",
    country: "미국",
    flagCode: "us",
    number: 21,
    position: "공격수 / 윙백 (RW / RWB)",
    birthYear: 2000,
    hints: [
      "포지션: 윙어 / 우측 윙백 | 2000년생 | 등번호 21번",
      "주요 경력: 파리 생제르맹 → LOSC 릴 → 유벤투스 FC",
      "발롱도르 수상자이자 라이베리아 대통령이었던 조지 웨아의 아들로, 미국의 카타르 월드컵 첫 골 주인공"
    ]
  },

  // 🇨🇦 캐나다 (2명) - 개최국
  {
    id: 118,
    name: "알폰소 데이비스",
    enName: "Alphonso Davies",
    wikiTitle: "Alphonso_Davies",
    country: "캐나다",
    flagCode: "ca",
    number: 19,
    position: "수비수 / 윙어 (LB / LW)",
    birthYear: 2000,
    hints: [
      "포지션: 레프트백 / 좌측 윙어 | 2000년생 | 등번호 19번",
      "주요 경력: 밴쿠버 화이트캡스 → 바이에른 뮌헨",
      "난민 캠프에서 태어나 세계 최고의 풀백으로 성장한 '로드러너', 캐나다의 월드컵 본선 사상 첫 득점자"
    ]
  },
  {
    id: 119,
    name: "조너선 데이비드",
    enName: "Jonathan David",
    wikiTitle: "Jonathan_David",
    country: "캐나다",
    flagCode: "ca",
    number: 9,
    position: "공격수 (ST)",
    birthYear: 2000,
    hints: [
      "포지션: 스트라이커 | 2000년생 | 등번호 9번",
      "주요 경력: KAA 헨트 → LOSC 릴",
      "프랑스 리그 1 릴의 리그 우승을 이끌고 캐나다 역대 최다 득점 기록을 갈아치운 간판 스트라이커"
    ]
  },

  // 🇲🇽 멕시코 (2명) - 개최국
  {
    id: 120,
    name: "산티아고 히메네스",
    enName: "Santiago Giménez",
    wikiTitle: "Santiago_Giménez",
    country: "멕시코",
    flagCode: "mx",
    number: 11,
    position: "공격수 (ST)",
    birthYear: 2001,
    hints: [
      "포지션: 스트라이커 | 2001년생 | 등번호 11번",
      "주요 경력: 크루스 아술 → 페예노르트 로테르담",
      "네덜란드 에레디비시 페예노르트에서 폭격기 같은 득점력을 보여준 멕시코의 간판 스트라이커"
    ]
  },
  {
    id: 121,
    name: "에드손 알바레스",
    enName: "Edson Álvarez",
    wikiTitle: "Edson_Álvarez",
    country: "멕시코",
    flagCode: "mx",
    number: 4,
    position: "미드필더 / 수비수 (CDM / CB)",
    birthYear: 1997,
    hints: [
      "포지션: 수비형 미드필더 / 센터백 | 1997년생 | 등번호 4번",
      "주요 경력: 클루브 아메리카 → AFC 아약스 → 웨스트햄 유나이티드",
      "멕시코 국가대표팀의 주장이자 프리미어리그 웨스트햄의 수비형 미드필더로 활약하는 기둥"
    ]
  }
];

const CONTINENT_MAP = {
  '프랑스': '유럽',
  '잉글랜드': '유럽',
  '스페인': '유럽',
  '독일': '유럽',
  '포르투갈': '유럽',
  '네덜란드': '유럽',
  '벨기에': '유럽',
  '이탈리아': '유럽',
  '크로아티아': '유럽',
  '아르헨티나': '남미',
  '브라질': '남미',
  '우루과이': '남미',
  '콜롬비아': '남미',
  '이집트': '아프리카',
  '모로코': '아프리카',
  '나이지리아': '아프리카',
  '세네갈': '아프리카',
  '카메룬': '아프리카',
  '가나': '아프리카',
  '미국': '북중미',
  '캐나다': '북중미',
  '멕시코': '북중미'
};

const PLAYERS = RAW_PLAYERS.map((player) => ({
  ...player,
  continent: CONTINENT_MAP[player.country] || '기타',
  choseong: getChoseong(player.name),
  flagUrl: `https://flagcdn.com/w320/${player.flagCode}.png`
}));
