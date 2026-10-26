# ARTREND 매거진

Next.js 정적 사이트. 내용은 content/*.json (ARTREND-DATA 가 매일 07:00 export_magazine.py 로 생성, 이미지 주소는 collect_images.py). DB 없음, 환경변수 없음.

- 전문가 글(작가 소개·편집자 노트): ARTREND-DATA/.env 의 ANTHROPIC_API_KEY 가 있으면 Claude 가 사실 기반으로 쓰고, 없으면 규칙 기반 문장.
- 이미지는 각 기관·매체 페이지의 og:image 주소를 미리보기로만 쓴다(복사 저장 안 함).
