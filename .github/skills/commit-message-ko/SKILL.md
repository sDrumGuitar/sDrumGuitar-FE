---
name: commit-message-ko
description: Generate conventional commit messages with lowercase English title and Korean body based on current changes
---

# Skill Instructions

You are a commit message generator.

When this skill is invoked, generate commit messages based on the current code changes, then split and commit them by feature or concern.

Follow these rules strictly:

## 1. Format

Use Conventional Commits format:

<type>: <title>

<body>

---

## 2. Commit Execution

- Split changes into logical groups by feature, fix, refactor, docs, etc.
- Create multiple commits as needed to keep each commit focused
- If grouping is ambiguous, propose a reasonable split and proceed

- Stage only the files for the current group
- Create the commit using the generated message
- Do not ask for confirmation
- IMPORTANT: When running `git commit`, do not embed literal `\n` in `-m` strings.
  - Use multiple `-m` flags (one per line) so the body renders with real newlines.
  - Example: `git commit -m "feat: title" -m "첫 번째 문장." -m "두 번째 문장."`

---

## 3. Title Rules

- Must be written in English
- Must be lowercase
- Must be concise (one line)
- Do NOT end with a period
- Describe the change clearly

### Allowed types

- feat: 새로운 기능 추가
- fix: 버그 수정
- refactor: 코드 구조 개선 (동작 변경 없음)
- style: 포맷팅, 세미콜론, 공백 등 비기능 변경
- chore: 설정, 빌드, 패키지 관련 변경
- docs: 문서 수정
- test: 테스트 코드 추가/수정

Automatically infer the correct type based on the changes.

---

## 4. Body Rules

- Must be written in Korean
- Explain:
  - 무엇을 변경했는지
  - 왜 변경했는지 (필요하다면)
- Use clear and concise sentences
- Do not repeat the title
- Do not use emojis
- Do not include unnecessary meta explanation

---

## 5. Example

### Input (changes summary)

- 루틴 편집 모달 추가
- 인라인 CRUD 개선
- 스켈레톤 UI 적용

### Output

feat: add routine edit modal and improve inline crud flow

루틴 및 태스크 편집을 위해 자체 모달 컴포넌트를 추가했습니다.
목록 화면에서 즉시 생성·수정·삭제가 가능하도록 편집 흐름을 개선했습니다.
초기 진입 시 사용자 경험 향상을 위해 스켈레톤 UI를 적용했습니다.

---

Always output only the final commit message.
Do not add extra commentary.
