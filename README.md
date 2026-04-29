# 🎂 Birthday Celebration Event Page (HBD)
본 프로젝트는 누군가에게 특별한 생일 축하 메시지와 선물을 전달하기 위해 제작된 **React 기반의 인터랙티브 웹 애플리케이션**입니다. 파스텔톤의 깔끔한 디자인과 다채로운 애니메이션 효과를 통해 감동적인 사용자 경험을 선사합니다.
---
## ✨ 주요 기능 (Key Features)
### 1. 🔒 보안 입장 (Password Protection)
- **주인공 인증**: 사전에 설정된 비밀번호(기본: `0429`)를 입력해야만 접속 가능합니다.
- **애니메이션 피드백**: 잘못된 비밀번호 입력 시 입력창이 흔들리는 시각적 효과를 제공합니다.
### 2. 🎊 축하 인터랙션 (Celebration)
- **애니메이션 선물 박스**: 사용자가 박스를 클릭하면 뚜껑이 열리며 화려한 폭죽(Confetti)이 터집니다.
- **감동 메시지**: 박스 개봉 후 나타나는 진심 어린 생일 축하 메시지 카드.
### 3. 🛤️ 운명의 사다리타기 게임 (Ladder Game)
- **실시간 경로 애니메이션**: 선택한 번호에서 가로줄을 타고 꺾이며 내려가는 정교한 사다리 애니메이션을 구현했습니다.
- **선물 추첨**: 미리 준비된 선물 목록 중 하나를 랜덤으로 뽑는 미니게임 요소.
- **결과 확인**: 당첨된 선물을 팝업으로 보여주고, 다른 선물들도 함께 확인할 수 있습니다.
---
## 🛠 기술 스택 (Technology Stack)
본 프로젝트는 최신 프론트엔드 기술을 사용하여 구축되었습니다.
- **Framework**: `React 19` (TypeScript)
- **Build Tool**: `Vite` (빠른 개발 환경 및 최적화된 빌드)
- **Animation**: `Framer Motion` (컴포넌트 기반 애니메이션)
- **Icons**: `Lucide React` (심플한 벡터 아이콘)
- **Visual Effects**: `Canvas-confetti` (폭죽 효과)
- **Styling**: `Vanilla CSS` (파스텔 테마 시스템)
---
## 🚀 시작하기 (Getting Started)
프로젝트를 로컬 환경에서 실행하려면 아래 절차를 따르세요.
### 1. 의존성 패키지 설치
이 프로젝트는 패키지 매니저로 `pnpm`을 권장합니다.
```bash
pnpm install
```

### 2. 로컬 개발 서버 실행
설치가 완료된 후 아래 명령어로 개발 서버를 실행합니다.
```bash
pnpm dev
```
터미널에 표시되는 주소(예: http://localhost:5173)로 접속하여 확인할 수 있습니다.

### 3. 프로젝트 빌드 (배포용)
배포를 위한 최적화 빌드는 아래 명령어를 사용합니다.

```bash
pnpm build
```

### 📂 프로젝트 구조 (Project Structure)
```text
src/
├── components/          # UI 컴포넌트 (Password, Celebration, Ladder, GiftBox)
├── App.tsx              # 메인 상태 관리 및 라우팅
├── index.css            # 전역 스타일 및 파스텔 테마
└── main.tsx             # 앱 엔트리 포인트
```

