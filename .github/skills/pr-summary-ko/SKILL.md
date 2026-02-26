---
name: pr-summary-ko
description: Generate Korean PR summary with fixed sections from commit lists or PR screenshot text.
---

# PR Summary (Korean)

## When to use
- User asks for PR 본문/PR summary/PR 내용 정리
- User provides commit list or PR screen capture showing commits

## Output format (fixed)
**요약**
- ...

**주요 변경사항**
- ...

**테스트/확인 포인트**
- ...

## Workflow
1) Collect commit list:
   - Prefer user-provided commit text.
   - If a PR screenshot is provided, extract commit titles from the image.
2) Group commits by feature area and summarize in 1–2 bullets.
3) List 3–8 핵심 변경사항 bullets (merge or split as needed).
4) Write 테스트/확인 포인트 as user-flow checks.
5) If tests were not run, include “테스트 실행하지 않음”.

## Rules
- Write in Korean.
- Do not copy commit titles verbatim; summarize instead.
- Avoid speculation or unstated behavior.
- Keep bullets concise and scannable.

## If the screenshot is unclear
- Ask the user to paste the commit titles as text before proceeding.
