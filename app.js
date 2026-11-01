// 상태 관리
const ALL_CONTINENTS = ['유럽', '남미', '아프리카', '북중미'];
const CONTINENT_EMOJIS = {
  '유럽': '🌍',
  '남미': '🌎',
  '아프리카': '🌍',
  '북중미': '🌎'
};

let selectedContinents = new Set(ALL_CONTINENTS); // 기본값: 전체 대륙 선택
let selectedCountLimit = 'ALL'; // '10', '30', '50', '100', 'ALL'
let currentBasePool = [];
let deck = [];
let currentIndex = 0;
let isAnswerRevealed = false;
let isHintRevealed = false;
const solvedPlayerIds = new Set();
const wikiPhotoCache = new Map();

// DOM 요소
const continentChips = document.getElementById('continentChips');
const selectAllContinentsBtn = document.getElementById('selectAllContinentsBtn');
const resetContinentsBtn = document.getElementById('resetContinentsBtn');
const countChips = document.getElementById('countChips');
const totalPoolCountEl = document.getElementById('totalPoolCount');
const quizModeBadge = document.getElementById('quizModeBadge');

const countryFlagEl = document.getElementById('countryFlag');
const countryNameEl = document.getElementById('countryName');
const showCountryNameToggle = document.getElementById('showCountryNameToggle');
const choseongDisplayEl = document.getElementById('choseongDisplay');

const hintZoneEl = document.getElementById('hintZone');
const hintListEl = document.getElementById('hintList');
const hintBtn = document.getElementById('hintBtn');
const hintBtnText = document.getElementById('hintBtnText');

const answerZoneEl = document.getElementById('answerZone');
const photoLoadingEl = document.getElementById('photoLoading');
const playerPhotoEl = document.getElementById('playerPhoto');
const jerseyFallbackEl = document.getElementById('jerseyFallback');
const fallbackNumberEl = document.getElementById('fallbackNumber');
const fallbackEnNameEl = document.getElementById('fallbackEnName');
const playerNumberBadgeEl = document.getElementById('playerNumberBadge');

const answerContinentTagEl = document.getElementById('answerContinentTag');
const answerCountryTagEl = document.getElementById('answerCountryTag');
const answerPosTagEl = document.getElementById('answerPosTag');
const answerKoreanNameEl = document.getElementById('answerKoreanName');
const answerEnglishNameEl = document.getElementById('answerEnglishName');
const answerFullDescEl = document.getElementById('answerFullDesc');
const markCorrectBtn = document.getElementById('markCorrectBtn');

const answerBtn = document.getElementById('answerBtn');
const answerBtnText = document.getElementById('answerBtnText');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const listOpenBtn = document.getElementById('listOpenBtn');
const modalListCountEl = document.getElementById('modalListCount');
const correctCountEl = document.getElementById('correctCount');
const questionCounterEl = document.getElementById('questionCounter');
const progressBarFillEl = document.getElementById('progressBarFill');

// BGM 플레이어 DOM 요소
const bgmPlayerBar = document.querySelector('.bgm-player-bar');
const bgmToggleBtn = document.getElementById('bgmToggleBtn');
const bgmPulseIcon = document.getElementById('bgmPulseIcon');
const bgmStatusLabel = document.getElementById('bgmStatusLabel');
const bgmTrackSelect = document.getElementById('bgmTrackSelect');
const muteToggleBtn = document.getElementById('muteToggleBtn');
const bgmVolumeSlider = document.getElementById('bgmVolumeSlider');
const volValueText = document.getElementById('volValueText');

const playerListModal = document.getElementById('playerListModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const searchPlayerInput = document.getElementById('searchPlayerInput');
const playerGridList = document.getElementById('playerGridList');

const ipadGuideBtn = document.getElementById('ipadGuideBtn');
const ipadGuideModal = document.getElementById('ipadGuideModal');
const closeIpadGuideBtn = document.getElementById('closeIpadGuideBtn');

const quizResultModal = document.getElementById('quizResultModal');
const resultSubtitle = document.getElementById('resultSubtitle');
const resultTotalQuestions = document.getElementById('resultTotalQuestions');
const resultCorrectQuestions = document.getElementById('resultCorrectQuestions');
const resultAccuracy = document.getElementById('resultAccuracy');
const restartSameDeckBtn = document.getElementById('restartSameDeckBtn');
const restartNewDeckBtn = document.getElementById('restartNewDeckBtn');
const closeResultBtn = document.getElementById('closeResultBtn');

// ==========================================
// 🎵 월드컵 공식 BGM 엔진 (음악 스트리밍 + 스타디움 신시사이저)
// ==========================================
const BGM_TRACKS = {
  dreamers: {
    title: '정국 - Dreamers (2022 카타르 공식 주제가)',
    url: 'https://archive.org/download/jung-kook-dreamers-fifa-world-cup-2022-soundtrack/Jung%20Kook%20-%20Dreamers%20%28FIFA%20World%20Cup%202022%20Soundtrack%29.mp3'
  },
  wakawaka: {
    title: 'Shakira - Waka Waka (2010 남아공 공식 주제가)',
    url: 'https://archive.org/download/shakira-waka-waka-this-time-for-africa-the-official-2010-fifa-world-cup-song/Shakira%20-%20Waka%20Waka%20%28This%20Time%20for%20Africa%29%20%5BThe%20Official%202010%20FIFA%20World%20Cup%20Song%5D.mp3'
  },
  wavinflag: {
    title: "K'NAAN - Wavin' Flag (월드컵 셀레브레이션 명곡)",
    url: "https://archive.org/download/k-naan-wavin-flag-coca-cola-celebration-mix/K%27NAAN%20-%20Wavin%27%20Flag%20%28Coca-Cola%20Celebration%20Mix%29.mp3"
  },
  anthem: {
    title: 'FIFA Official Anthem (피파 공식 선수 입장곡)',
    url: 'https://archive.org/download/fifa-anthem/fifa-anthem.mp3'
  },
  stadium: {
    title: '스타디움 비트 (현장 응원 앰비언스)',
    isSynth: true
  }
};

class WorldCupBgmManager {
  constructor() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.preload = 'none';
    this.isPlaying = false;
    this.currentTrackKey = 'dreamers';
    this.volume = 0.35;
    this.isMuted = false;

    // Web Audio Synthesizer (스타디움 비트 및 오프라인 백업)
    this.audioCtx = null;
    this.synthInterval = null;
    this.synthStep = 0;

    this.initAudioEvents();
  }

  initAudioEvents() {
    this.audio.addEventListener('error', (e) => {
      console.warn('BGM 로드 지연 또는 실패, 스타디움 비트로 자동 전환합니다.', e);
      if (this.isPlaying && !BGM_TRACKS[this.currentTrackKey].isSynth) {
        this.startSynth();
      }
    });
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  play() {
    this.initAudioContext();
    this.isPlaying = true;

    if (BGM_TRACKS[this.currentTrackKey].isSynth) {
      this.audio.pause();
      this.startSynth();
    } else {
      this.stopSynth();
      this.audio.src = BGM_TRACKS[this.currentTrackKey].url;
      this.audio.volume = this.isMuted ? 0 : this.volume;
      this.audio.play().catch((err) => {
        console.warn('오디오 자동재생 제한 또는 스트림 지연:', err);
        // 네트워크 차단 시 스타디움 비트로 즉시 폴백
        this.startSynth();
      });
    }

    this.updateUI(true);
  }

  pause() {
    this.isPlaying = false;
    this.audio.pause();
    this.stopSynth();
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setTrack(trackKey) {
    if (!BGM_TRACKS[trackKey]) return;
    this.currentTrackKey = trackKey;
    if (this.isPlaying) {
      this.play();
    }
  }

  setVolume(val) {
    this.volume = parseFloat(val);
    this.isMuted = this.volume === 0;
    this.audio.volume = this.isMuted ? 0 : this.volume;
    volValueText.textContent = `${Math.round(this.volume * 100)}%`;
    muteToggleBtn.textContent = this.isMuted ? '🔇' : (this.volume < 0.4 ? '🔉' : '🔊');
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.audio.volume = 0;
      muteToggleBtn.textContent = '🔇';
    } else {
      this.audio.volume = this.volume;
      muteToggleBtn.textContent = this.volume < 0.4 ? '🔉' : '🔊';
    }
  }

  // Web Audio API 웅장한 경기장 응원 북소리 + 앤섬 멜로디 루프
  startSynth() {
    this.initAudioContext();
    if (!this.audioCtx) return;
    this.stopSynth();

    const melody = [
      261.63, 0, 329.63, 0, 392.00, 0, 523.25, 0,
      493.88, 0, 440.00, 0, 392.00, 0, 329.63, 0,
      349.23, 0, 392.00, 0, 440.00, 0, 523.25, 0,
      392.00, 392.00, 349.23, 329.63, 261.63, 0, 0, 0
    ];

    this.synthInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const effectiveVol = this.isMuted ? 0 : this.volume;
      if (effectiveVol === 0) return;

      const now = this.audioCtx.currentTime;

      // 1) 킥 드럼 (경기장 대북 쿵쿵 비트)
      if (this.synthStep % 4 === 0 || this.synthStep % 8 === 6) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.14);
        gain.gain.setValueAtTime(effectiveVol * 0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }

      // 2) 앤섬 브라스 멜로디
      const noteFreq = melody[this.synthStep % melody.length];
      if (noteFreq > 0) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(noteFreq, now);
        gain.gain.setValueAtTime(effectiveVol * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.24);
      }

      this.synthStep = (this.synthStep + 1) % 32;
    }, 220);
  }

  stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.synthStep = 0;
  }

  updateUI(playing) {
    if (playing) {
      bgmPlayerBar.classList.add('playing');
      bgmStatusLabel.textContent = 'BGM 일시정지';
      bgmPulseIcon.textContent = '⏸';
    } else {
      bgmPlayerBar.classList.remove('playing');
      bgmStatusLabel.textContent = 'BGM 재생';
      bgmPulseIcon.textContent = '🎵';
    }
  }
}

const bgmManager = new WorldCupBgmManager();

// Fisher-Yates 셔플
function shuffleArray(arr) {
  const cloned = [...arr];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

// 1. 대륙 복수 선택 필터 및 문제 수 버튼 초기화
function setupFilters() {
  // 대륙별 인원 수 집계
  const continentCounts = {};
  PLAYERS.forEach((p) => {
    continentCounts[p.continent] = (continentCounts[p.continent] || 0) + 1;
  });

  continentChips.innerHTML = '';
  ALL_CONTINENTS.forEach((continent) => {
    const count = continentCounts[continent] || 0;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `continent-chip-btn active`;
    btn.dataset.continent = continent;
    btn.innerHTML = `
      <span class="check-icon">✓</span>
      <span>${CONTINENT_EMOJIS[continent] || '🌐'} ${continent}</span>
      <span class="count-badge">${count}명</span>
    `;

    // 칩 클릭 시 복수 선택 토글
    btn.addEventListener('click', () => {
      if (selectedContinents.has(continent)) {
        if (selectedContinents.size <= 1) {
          alert('최소 1개 이상의 대륙을 선택해야 합니다.');
          return;
        }
        selectedContinents.delete(continent);
        btn.classList.remove('active');
      } else {
        selectedContinents.add(continent);
        btn.classList.add('active');
      }
      buildDeck(true);
    });

    continentChips.appendChild(btn);
  });

  // 전체 선택 버튼
  selectAllContinentsBtn.addEventListener('click', () => {
    ALL_CONTINENTS.forEach((c) => selectedContinents.add(c));
    continentChips.querySelectorAll('.continent-chip-btn').forEach((b) => b.classList.add('active'));
    buildDeck(true);
  });

  // 기본값 초기화 버튼
  resetContinentsBtn.addEventListener('click', () => {
    ALL_CONTINENTS.forEach((c) => selectedContinents.add(c));
    continentChips.querySelectorAll('.continent-chip-btn').forEach((b) => b.classList.add('active'));
    buildDeck(true);
  });

  // 문제 수(인원수) 칩 이벤트
  const countButtons = countChips.querySelectorAll('.count-chip-btn');
  countButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      countButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCountLimit = btn.dataset.count;
      buildDeck(true);
    });
  });
}

// 2. 퀴즈 덱 구성 (대륙 복수 필터 + 문제 수 제한 적용)
function buildDeck(isNewShuffle = true) {
  // 1) 선택된 대륙들에 속한 선수들만 필터링
  currentBasePool = PLAYERS.filter((p) => selectedContinents.has(p.continent));
  totalPoolCountEl.textContent = currentBasePool.length;

  if (currentBasePool.length === 0) {
    deck = [];
    renderCurrentPlayer();
    return;
  }

  // 2) 셔플 적용
  let pool = isNewShuffle ? shuffleArray(currentBasePool) : [...currentBasePool];

  // 초기 전체 모드 첫 실행 시 '우스만 뎀벨레'를 첫 문제로 배치 (사용자 질문 예시 일치)
  if (selectedContinents.size === ALL_CONTINENTS.length && selectedCountLimit === 'ALL' && !isNewShuffle) {
    const dembeleIdx = pool.findIndex((p) => p.name === '우스만 뎀벨레');
    if (dembeleIdx > 0) {
      const [dembele] = pool.splice(dembeleIdx, 1);
      pool.unshift(dembele);
    }
  }

  // 3) 문제 수 제한 적용
  if (selectedCountLimit !== 'ALL') {
    const limit = parseInt(selectedCountLimit, 10);
    deck = pool.slice(0, Math.min(limit, pool.length));
  } else {
    deck = pool;
  }

  currentIndex = 0;
  modalListCountEl.textContent = deck.length;

  // 배지 텍스트 업데이트
  let continentText = '';
  if (selectedContinents.size === ALL_CONTINENTS.length) {
    continentText = '전 대륙';
  } else {
    continentText = Array.from(selectedContinents).join('·');
  }

  const countText = selectedCountLimit === 'ALL' ? `전체 ${deck.length}명` : `${deck.length}명`;
  quizModeBadge.textContent = `${continentText} · ${countText} 모드`;

  renderCurrentPlayer();
}

// 3. Wikipedia 실제 선수 사진 가져오기
async function fetchPlayerPhotoUrl(player) {
  if (wikiPhotoCache.has(player.id)) {
    return wikiPhotoCache.get(player.id);
  }

  try {
    const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(player.wikiTitle)}`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Wiki fetch failed');
    const data = await response.json();
    const imgUrl = (data.originalimage && data.originalimage.source) ||
                   (data.thumbnail && data.thumbnail.source) ||
                   null;

    let finalUrl = imgUrl;
    if (data.thumbnail && data.thumbnail.source) {
      finalUrl = data.thumbnail.source.replace(/\/\d+px-/, '/500px-');
    }

    wikiPhotoCache.set(player.id, finalUrl);
    return finalUrl;
  } catch (err) {
    wikiPhotoCache.set(player.id, null);
    return null;
  }
}

function preloadAdjacentPhotos() {
  if (deck.length === 0) return;
  const current = deck[currentIndex];
  const next = deck[(currentIndex + 1) % deck.length];
  [current, next].forEach((p) => {
    if (p && !wikiPhotoCache.has(p.id)) {
      fetchPlayerPhotoUrl(p).then((url) => {
        if (url) {
          const img = new Image();
          img.src = url;
        }
      });
    }
  });
}

// 초성 또는 정답 글자 타일 렌더링
function renderLetterTiles(text, revealed = false) {
  choseongDisplayEl.innerHTML = '';
  const words = text.split(' ');

  words.forEach((word) => {
    const wordSpan = document.createElement('div');
    wordSpan.className = 'choseong-word';

    for (const char of word) {
      const tile = document.createElement('div');
      tile.className = `choseong-tile${revealed ? ' revealed' : ''}`;
      tile.textContent = char;
      wordSpan.appendChild(tile);
    }

    choseongDisplayEl.appendChild(wordSpan);
  });
}

// 국가명 표시 토글 업데이트
function updateCountryVisibility() {
  if (deck.length === 0) return;
  const player = deck[currentIndex];
  if (showCountryNameToggle.checked || isAnswerRevealed) {
    countryNameEl.textContent = player.country;
    countryNameEl.classList.remove('hidden');
  } else {
    countryNameEl.classList.add('hidden');
  }
}

// 현재 선수 문제 화면 렌더링
function renderCurrentPlayer() {
  if (deck.length === 0) return;
  const player = deck[currentIndex];
  isAnswerRevealed = false;
  isHintRevealed = false;

  // 상단 카운터 및 진행 바
  questionCounterEl.textContent = `PLAYER ${currentIndex + 1} / ${deck.length}`;
  const progressPercent = ((currentIndex + 1) / deck.length) * 100;
  progressBarFillEl.style.width = `${progressPercent}%`;

  // 국기 및 국가명 설정
  countryFlagEl.src = player.flagUrl;
  countryFlagEl.alt = `${player.country} 국기`;
  updateCountryVisibility();

  // 초성 타일 렌더링
  renderLetterTiles(player.choseong, false);

  // 힌트 영역 초기화
  hintZoneEl.classList.add('hidden');
  hintListEl.innerHTML = '';
  hintBtn.disabled = false;
  hintBtnText.textContent = '힌트 보기';

  // 정답 영역 초기화
  answerZoneEl.classList.add('hidden');
  answerBtnText.textContent = '정답 확인';

  // 맞췄어요 버튼 상태 동기화
  syncSolvedButtonState(player.id);

  // 인접 선수 사진 백그라운드 프리로드
  preloadAdjacentPhotos();
}

// 4. 힌트 한꺼번에 전체 표시
function handleShowAllHints() {
  if (deck.length === 0) return;
  const player = deck[currentIndex];

  hintListEl.innerHTML = '';
  player.hints.forEach((hintText) => {
    const li = document.createElement('li');
    li.className = 'hint-item';
    li.innerHTML = `
      <span class="hint-icon-bullet">⚽</span>
      <span>${hintText}</span>
    `;
    hintListEl.appendChild(li);
  });

  hintZoneEl.classList.remove('hidden');
  hintBtnText.textContent = '💡 힌트 열림';
  hintBtn.disabled = true;
  isHintRevealed = true;
}

// 5. 정답 확인 (선수 사진 + 풀네임 + 설명 전체 공개)
async function handleRevealAnswer() {
  if (deck.length === 0) return;
  const player = deck[currentIndex];

  if (isAnswerRevealed) {
    // 이미 정답이 공개된 상태에서 다시 누르면 다음 선수로 이동
    goToNextPlayer();
    return;
  }

  isAnswerRevealed = true;
  updateCountryVisibility();

  // 초성 타일 자리에 실제 선수 이름 글자 표시
  renderLetterTiles(player.name, true);

  // 정답 정보 채우기
  answerContinentTagEl.textContent = `${CONTINENT_EMOJIS[player.continent] || ''} ${player.continent}`;
  answerCountryTagEl.textContent = player.country;
  answerPosTagEl.textContent = player.position;
  answerKoreanNameEl.textContent = player.name;
  answerEnglishNameEl.textContent = player.enName;
  playerNumberBadgeEl.textContent = `#${player.number}`;

  // 전체 설명 리스트 표시
  answerFullDescEl.innerHTML = '';
  player.hints.forEach((desc) => {
    const li = document.createElement('li');
    li.textContent = desc;
    answerFullDescEl.appendChild(li);
  });

  // 사진 초기화 후 로딩
  photoLoadingEl.classList.remove('hidden');
  playerPhotoEl.classList.add('hidden');
  jerseyFallbackEl.classList.add('hidden');

  answerZoneEl.classList.remove('hidden');
  answerBtnText.textContent = currentIndex === deck.length - 1 ? '퀴즈 결과 보기 🏆' : '다음 선수로 이동 →';

  const photoUrl = await fetchPlayerPhotoUrl(player);
  if (deck[currentIndex].id !== player.id) return;

  if (photoUrl) {
    playerPhotoEl.onload = () => {
      photoLoadingEl.classList.add('hidden');
      jerseyFallbackEl.classList.add('hidden');
      playerPhotoEl.classList.remove('hidden');
    };
    playerPhotoEl.onerror = () => {
      showJerseyFallback(player);
    };
    playerPhotoEl.src = photoUrl;
  } else {
    showJerseyFallback(player);
  }
}

function showJerseyFallback(player) {
  photoLoadingEl.classList.add('hidden');
  playerPhotoEl.classList.add('hidden');
  fallbackNumberEl.textContent = player.number;
  fallbackEnNameEl.textContent = player.enName.toUpperCase();
  jerseyFallbackEl.classList.remove('hidden');
}

function syncSolvedButtonState(playerId) {
  if (solvedPlayerIds.has(playerId)) {
    markCorrectBtn.classList.add('checked');
    markCorrectBtn.textContent = '✅ 맞춘 선수 (클릭 시 취소)';
  } else {
    markCorrectBtn.classList.remove('checked');
    markCorrectBtn.textContent = '⭕ 맞췄어요! (+1)';
  }
  correctCountEl.textContent = solvedPlayerIds.size;
}

function toggleMarkCorrect() {
  if (deck.length === 0) return;
  const player = deck[currentIndex];
  if (solvedPlayerIds.has(player.id)) {
    solvedPlayerIds.delete(player.id);
  } else {
    solvedPlayerIds.add(player.id);
  }
  syncSolvedButtonState(player.id);
}

function goToPrevPlayer() {
  if (deck.length === 0) return;
  currentIndex = (currentIndex - 1 + deck.length) % deck.length;
  renderCurrentPlayer();
}

function goToNextPlayer() {
  if (deck.length === 0) return;

  // 마지막 문제에 도달했을 때 결과 모달 오픈
  if (currentIndex === deck.length - 1) {
    showQuizResultModal();
    return;
  }

  currentIndex = currentIndex + 1;
  renderCurrentPlayer();
}

// 퀴즈 완료 모달 표시
function showQuizResultModal() {
  const total = deck.length;
  const correct = deck.filter((p) => solvedPlayerIds.has(p.id)).length;
  const rate = Math.round((correct / total) * 100);

  resultSubtitle.textContent = `선택하신 ${total}명의 선수를 모두 풀었습니다!`;
  resultTotalQuestions.textContent = total;
  resultCorrectQuestions.textContent = correct;
  resultAccuracy.textContent = `${rate}%`;

  quizResultModal.showModal();
}

// 선수 목록 모달 렌더링
function renderPlayerListModal(filterKeyword = '') {
  const keyword = filterKeyword.trim().toLowerCase();
  playerGridList.innerHTML = '';

  deck.forEach((player, idx) => {
    const isSolved = solvedPlayerIds.has(player.id);
    const matchTarget = `${player.continent} ${player.country} ${player.choseong} ${isSolved ? player.name : ''}`.toLowerCase();
    if (keyword && !matchTarget.includes(keyword)) return;

    const item = document.createElement('button');
    item.type = 'button';
    item.className = `grid-player-item${idx === currentIndex ? ' active' : ''}${isSolved ? ' solved' : ''}`;
    item.innerHTML = `
      <img src="${player.flagUrl}" alt="${player.country}" class="grid-flag" />
      <div class="grid-text">
        <span class="grid-num">#${idx + 1} · ${player.continent} (${player.country})</span>
        <span class="grid-choseong">${isSolved ? `✅ ${player.name}` : player.choseong}</span>
      </div>
    `;

    item.addEventListener('click', () => {
      currentIndex = idx;
      renderCurrentPlayer();
      playerListModal.close();
    });

    playerGridList.appendChild(item);
  });
}

// 이벤트 리스너 연결
hintBtn.addEventListener('click', handleShowAllHints);
answerBtn.addEventListener('click', handleRevealAnswer);
prevBtn.addEventListener('click', goToPrevPlayer);
nextBtn.addEventListener('click', goToNextPlayer);
markCorrectBtn.addEventListener('click', toggleMarkCorrect);
showCountryNameToggle.addEventListener('change', updateCountryVisibility);

shuffleBtn.addEventListener('click', () => {
  deck = shuffleArray(deck);
  currentIndex = 0;
  renderCurrentPlayer();
});

listOpenBtn.addEventListener('click', () => {
  searchPlayerInput.value = '';
  renderPlayerListModal('');
  playerListModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
  playerListModal.close();
});

playerListModal.addEventListener('click', (e) => {
  if (e.target === playerListModal) {
    playerListModal.close();
  }
});

searchPlayerInput.addEventListener('input', (e) => {
  renderPlayerListModal(e.target.value);
});

// 결과 모달 관련 이벤트
restartSameDeckBtn.addEventListener('click', () => {
  quizResultModal.close();
  currentIndex = 0;
  renderCurrentPlayer();
});

restartNewDeckBtn.addEventListener('click', () => {
  quizResultModal.close();
  buildDeck(true);
});

closeResultBtn.addEventListener('click', () => {
  quizResultModal.close();
});

quizResultModal.addEventListener('click', (e) => {
  if (e.target === quizResultModal) {
    quizResultModal.close();
  }
});

// 아이패드 안내 모달
ipadGuideBtn.addEventListener('click', () => {
  ipadGuideModal.showModal();
});

closeIpadGuideBtn.addEventListener('click', () => {
  ipadGuideModal.close();
});

ipadGuideModal.addEventListener('click', (e) => {
  if (e.target === ipadGuideModal) {
    ipadGuideModal.close();
  }
});

// BGM 컨트롤러 이벤트 연결
bgmToggleBtn.addEventListener('click', () => {
  bgmManager.toggle();
});

bgmTrackSelect.addEventListener('change', (e) => {
  bgmManager.setTrack(e.target.value);
});

bgmVolumeSlider.addEventListener('input', (e) => {
  bgmManager.setVolume(e.target.value);
});

muteToggleBtn.addEventListener('click', () => {
  bgmManager.toggleMute();
});

// 키보드 단축키 지원
window.addEventListener('keydown', (e) => {
  if (playerListModal.open || quizResultModal.open || ipadGuideModal.open) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

  if (e.code === 'KeyM') {
    e.preventDefault();
    bgmManager.toggle();
  } else if (e.code === 'KeyH') {
    e.preventDefault();
    if (!hintBtn.disabled) handleShowAllHints();
  } else if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault();
    handleRevealAnswer();
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    goToNextPlayer();
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault();
    goToPrevPlayer();
  }
});

// 아이패드 및 모바일 터치 스와이프 제스처 (좌우 넘기기)
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  if (playerListModal.open || quizResultModal.open || ipadGuideModal.open) return;
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  if (playerListModal.open || quizResultModal.open || ipadGuideModal.open) return;
  const touchEndX = e.changedTouches[0].screenX;
  const touchEndY = e.changedTouches[0].screenY;

  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  // 수평 스와이프 판정 (수직 이동보다 수평 이동이 더 크고 50px 이상 이동했을 때)
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 55) {
    if (diffX < 0) {
      // 왼쪽으로 슥 밀기 -> 다음 선수
      goToNextPlayer();
    } else {
      // 오른쪽으로 슥 밀기 -> 이전 선수
      goToPrevPlayer();
    }
  }
}, { passive: true });

// 시작
setupFilters();
buildDeck(false);
