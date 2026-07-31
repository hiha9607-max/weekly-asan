import type { Issue } from "@/types/issue";

export const issues: Issue[] = [
  {
    id: "2026-08-05",
    publishDate: "2026-08-05",
    title: "2026년 8월 1주 위클리아산",
    cards: [
      {
        id: "2026-08-05-card-1",
        order: 1,
        imageUrl: "/content/2026-08-05/card-1.png",
        alt: "2026년 8월 1주 위클리아산 카드뉴스 1페이지",
        audios: [
          {
            languageCode: "en",
            languageName: "English",
            audioUrl: "/content/2026-08-05/card-1-en.mp3",
          },
        ],
      },
      {
        id: "2026-08-05-card-2",
        order: 2,
        imageUrl: "/content/2026-08-05/card-2.png",
        alt: "2026년 8월 1주 위클리아산 카드뉴스 2페이지",
        audios: [
          {
            languageCode: "en",
            languageName: "English",
            audioUrl: "/content/2026-08-05/card-2-en.mp3",
          },
        ],
      },
      {
        id: "2026-08-05-card-3",
        order: 3,
        imageUrl: "/content/2026-08-05/card-3.png",
        alt: "2026년 8월 1주 위클리아산 카드뉴스 3페이지",
        audios: [
          {
            languageCode: "en",
            languageName: "English",
            audioUrl: "/content/2026-08-05/card-3-en.mp3",
          },
        ],
      },
    ],
  },
  {
    id: "2026-07-29",
    publishDate: "2026-07-29",
    title: "2026년 7월 5주 위클리아산",
    cards: [
      {
        id: "2026-07-29-card-1",
        order: 1,
        imageUrl: "/content/2026-07-29/card-1.svg",
        alt: "2026년 7월 5주 위클리아산 카드뉴스 1페이지",
        audios: [
          {
            languageCode: "en",
            languageName: "English",
            audioUrl: "/content/2026-07-29/card-1-en.wav",
          },
        ],
      },
    ],
  },
].sort((a, b) => b.publishDate.localeCompare(a.publishDate));