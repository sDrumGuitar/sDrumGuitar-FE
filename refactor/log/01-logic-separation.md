# 브리핑: 비즈니스 로직 분리 (Custom Hooks 도입)

## 1. 개선의 필요성 (Why)
현재 `CourseForm.tsx`와 같은 주요 컴포넌트들은 UI 렌더링 외에도 다음과 같은 많은 책임을 가지고 있습니다:
- 폼 상태 관리 및 복잡한 업데이트 로직
- API 호출 전후의 데이터 매핑 (Payload 생성 등)
- 비즈니스 유효성 검사 (validation)
- API 호출 및 후속 처리 (onSuccess, close 등)

이로 인해 파일의 크기가 비대해지고(340+ lines), 로직 재사용이 어려우며, 테스트 작성이 복잡해집니다. `GEMINI.md`의 "Dumb / Smart 구조 유지" 및 "비즈니스 로직은 hooks 또는 service 계층으로 분리" 원칙에 어긋나는 상태입니다.

## 2. 개선 방안 (How)
- **`useCourseForm` 커스텀 훅 추출**: `CourseForm` 내부의 `useState`, `useEffect`, `handleSubmit`, `updateForm` 등의 로직을 전용 훅으로 옮깁니다.
- **관심사 분리**:
    - **Hook**: 데이터 fetching, 상태 변경, 유효성 검사, API 호출 로직 담당.
    - **Component**: Hook에서 반환된 상태와 핸들러를 UI 요소에 바인딩하는 역할만 수행.
- **Mapper 활용 최적화**: Payload 생성 로직을 훅 내부 또는 별도 유틸로 분리합니다.

## 3. 기대 효과 (What)
- **가독성 향상**: 컴포넌트 코드가 UI 구조에 집중되어 흐름 파악이 쉬워집니다.
- **유지보수 용이성**: 로직 변경 시 UI 코드에 영향을 주지 않고 훅만 수정하면 됩니다.
- **재사용성**: 비슷한 폼 로직이 다른 곳에서 필요할 경우 훅을 재사용할 수 있습니다.

## 4. 실행 계획 (Plan)
1.  `src/shared/hooks/course` 폴더 생성 (또는 `pages/course/hooks`).
2.  `useCourseForm.ts` 작성 및 기존 로직 이전.
3.  `CourseForm.tsx`에서 추출된 훅을 호출하도록 리팩토링.
4.  동작 테스트 및 사이드 이펙트 확인.
