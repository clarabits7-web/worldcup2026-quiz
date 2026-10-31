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

// 키보드 단축키 지원
window.addEventListener('keydown', (e) => {
  if (playerListModal.open || quizResultModal.open || ipadGuideModal.open) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

  if (e.code === 'KeyH') {
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
