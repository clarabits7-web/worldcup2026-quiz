#!/usr/bin/env bash

# 프로젝트 디렉토리로 이동
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Wi-Fi 로컬 IP 주소 추출
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "127.0.0.1")
PORT=8080

echo ""
echo "================================================================"
echo "⚽ 2026 월드컵 스타 초성 퀴즈 (아이패드 로컬 서버)"
echo "================================================================"
echo ""
echo "📱 [아이패드 접속 방법]"
echo "   아이패드가 Mac과 같은 Wi-Fi에 연결되어 있는지 확인한 후,"
echo "   아이패드 Safari 주소창에 아래 주소를 입력하세요:"
echo ""
echo "   👉 http://${LOCAL_IP}:${PORT}"
echo ""
echo "💡 [아이패드 전용 꿀팁]"
echo "   1. 사파리에서 주소 접속 후 [공유 버튼(네모 화살표)] ➔ [홈 화면에 추가]"
echo "      ➔ 아이패드 바탕화면에 앱 아이콘이 생겨 주소창 없는 전체화면으로 즐길 수 있습니다!"
echo "   2. 아이패드에서는 손가락으로 화면을 좌/우로 슥 밀어서(스와이프)"
echo "      다음/이전 문제로 직관적으로 넘길 수 있습니다."
echo ""
echo "서버를 종료하려면 터미널에서 Ctrl + C 를 누르세요."
echo "================================================================"
echo ""

# 파이썬 웹서버 시작
python3 -m http.server ${PORT}
