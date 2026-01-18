# S-Drum & Guitar ERP System

에스드럼기타교습소의 운영 효율화를 위한 학원 관리(ERP) 시스템입니다.

## 🚀 프로젝트 소개

본 프로젝트는 에스드럼기타교습소의 학생, 수강, 스케줄 관리를 디지털화하고 자동화하여, 교직원의 업무 부담을 줄이고 교육 서비스의 질을 높이는 것을 목표로 합니다.

## ✨ 주요 기능

- **👨‍🎓 학생 관리**: 신규 학생 등록, 정보 수정 및 조회, 수강생 상태 관리
- **📚 수강 관리**: 개설 과목 관리, 수강 등록 및 취소, 수강 이력 추적
- **🗓️ 회차 관리**: 수업 스케줄 생성 및 변경, 학생별 출결 및 보강 관리
- **📱 문자 관리**: 자동화된 알림 메시지(수업 안내, 결제 요청 등) 발송 및 템플릿 관리

## 🛠️ 기술 스택

### Frontend
- **Framework**: React (v19)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router
- **Backend Service**: Firebase (Authentication, Firestore, etc.)

### DevOps
- **CI/CD**: GitHub Actions
- **Hosting**: Firebase Hosting

## ⚙️ 시작하기

### 1. 프로젝트 클론
```bash
git clone https://github.com/sdrumguitar/sdrumguitar.git
cd sdrumguitar
```

### 2. 종속성 설치
프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 필요한 패키지를 설치합니다.
```bash
npm install
```

### 3. 개발 서버 실행
다음 명령어를 실행하여 개발 서버를 시작합니다.
```bash
npm run dev
```
서버가 시작되면 `http://localhost:5173` (또는 다른 포트)에서 애플리케이션을 확인할 수 있습니다.

## build 명령어

프로덕션 빌드를 생성하려면 다음 명령어를 사용하세요.
```bash
npm run build
```
빌드 결과물은 `dist` 디렉토리에 생성됩니다.


## 🧑‍💻 팀 구성

- **프론트엔드 개발자**: 2명
- **백엔드 개발자**: 1명