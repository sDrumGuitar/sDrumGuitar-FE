![Project Banner](public/banner.png)

# S-Drum & Guitar ERP System

에스드럼기타교습소의 운영 효율화를 위한 학원 관리(ERP) 시스템입니다.

## 프로젝트 소개

본 프로젝트는 에스드럼기타교습소의 학생, 수강, 스케줄 관리를 디지털화하고 자동화하여, 교직원의 업무 부담을 줄이고 교육 서비스의 질을 높이는 것을 목표로 합니다.

## 주요 기능

- **학생 관리**: 신규 학생 등록, 정보 수정 및 조회, 수강생 상태 관리
- **수강 관리**: 개설 과목 관리, 수강 등록 및 취소, 수강 이력 추적
- **회차/스케줄 관리**: 수업 스케줄 생성 및 변경, 출결/보강/이월 관리
- **청구/결제 관리**: 학생별 청구서 조회 및 납부 상태 변경
- **문자 관리**: 문자 발송, 발송 이력, 템플릿 관리

## 기능 흐름 요약

- **학생 → 수강 → 스케줄**: 학생 등록 후 수강 정보를 생성하고, 수강에 따라 레슨 스케줄/출결을 관리합니다.
- **수강 → 청구/결제**: 수강 기준으로 청구서를 조회하고, 납부 상태를 업데이트합니다.
- **메시지 발송**: 템플릿 기반으로 발송하며, 발송 이력과 템플릿을 분리해서 관리합니다.

## 기술 스택

### Frontend

- **Framework**: React (v19)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query, Zustand
- **Routing**: React Router
- **Backend Service**: Firebase (Authentication, Analytics)
- **Mock API**: json-server

### DevOps

- **CI/CD**: GitHub Actions
- **Hosting**: Firebase Hosting

## 시작하기

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

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 만들고 아래 항목을 설정합니다.

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_ADMIN_PASSWORD=
VITE_BASE_URL=
```

### 4. 개발 서버 실행

다음 명령어를 실행하여 개발 서버를 시작합니다.

```bash
npm run dev
```

서버가 시작되면 `http://localhost:3000`에서 애플리케이션을 확인할 수 있습니다.

### 5. Mock 서버 실행 (선택)

로컬에서 목 데이터를 사용하려면 json-server를 실행합니다.

```bash
npm run mock
```

기본 포트는 `http://localhost:3001`입니다.

## build 명령어

프로덕션 빌드를 생성하려면 다음 명령어를 사용하세요.

```bash
npm run build
```

빌드 결과물은 `dist` 디렉토리에 생성됩니다.

## 아키텍처 개요

### 화면/라우팅 구조

라우팅은 `src/utils/router.tsx`에서 관리하며, 인증 후 `PrivateLayout` 하위에 주요 기능 페이지가 구성됩니다.

- `/home`
- `/student`
- `/course`
- `/schedule`
- `/message/send`
- `/message/history`
- `/message/template`

### API 계층 구조

API 모듈은 `src/shared/api`에 도메인별로 분리되어 있으며, 엔트리 파일에서 re-export합니다.

- `src/shared/api/courses`
- `src/shared/api/lessons`
- `src/shared/api/students`
- `src/shared/api/invoices`

### 상태 관리 전략

- **TanStack Query**: 서버 데이터 조회/캐시 관리
- **Zustand**: 모달/임시 상태 등 UI 상태 관리

### 데이터 흐름

1. 화면 진입 시 Query 또는 API 호출로 서버 데이터 로드
2. 폼/모달 등 UI 조작은 Zustand로 제어
3. 저장/수정 시 API 호출 후 최신 데이터 재조회 또는 상태 갱신

## 폴더 구조(요약)

```
src/
  pages/            페이지 단위 UI
  shared/           공용 컴포넌트 및 유틸
    api/            도메인 API 모듈
  store/            Zustand 스토어
  utils/            유틸 함수 및 라우터
```

## 팀 구성

- **프론트엔드 개발자**: 2명
- **백엔드 개발자**: 1명
