# 아산톡톡 English Audio 시제품

QR로 접속해 카드뉴스를 넘기고, 카드별 영어 음성을 재생하는 Next.js 웹앱입니다.

## 1. 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 2. 실제 파일로 교체

`public/content/발행일/` 폴더에 카드뉴스 이미지와 음성을 넣습니다.

예시:

```text
public/content/2026-08-05/
  card-1.jpg
  card-1-en.mp3
  card-2.jpg
  card-2-en.mp3
```

그다음 `data/issues.ts`에서 파일 경로를 바꿉니다.

```ts
imageUrl: "/content/2026-08-05/card-1.jpg"
audioUrl: "/content/2026-08-05/card-1-en.mp3"
```

## 3. 새 아산톡톡 추가

1. `public/content/새날짜/` 폴더 생성
2. 이미지와 음성 파일 복사
3. `data/issues.ts` 맨 위에 새 Issue 추가
4. 저장 후 재배포

첫 번째 항목이 최신호로 자동 표시됩니다. 데이터는 발행일 기준으로도 최신순 정렬됩니다.

## 4. Vercel 배포

1. GitHub에 이 폴더 업로드
2. Vercel에서 `Add New Project`
3. GitHub 저장소 선택
4. Framework는 Next.js 자동 인식
5. `Deploy` 클릭

배포 주소를 QR코드로 만들면 됩니다.

## 5. 현재 포함 기능

- 최신호 자동 표시
- 좌우 스와이프 및 이전/다음
- 카드별 영어 음성
- 재생·일시정지·처음부터 듣기
- 재생 위치 이동
- 카드/호 변경 시 음성 정지
- 지난 호 Bottom Sheet
- 최초 이용 안내
- 모바일·PC 반응형
- 파일 오류 안내
