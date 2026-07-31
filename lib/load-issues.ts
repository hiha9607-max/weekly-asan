import fs from "node:fs";
import path from "node:path";

import type { Issue } from "@/types/issue";

const CONTENT_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "content"
);

const IMAGE_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "webp",
  "svg",
];

const AUDIO_EXTENSIONS = [
  "mp3",
  "wav",
  "m4a",
  "ogg",
];

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  zh: "中文",
  vi: "Tiếng Việt",
  ru: "Русский",
  uz: "Oʻzbekcha",
  kk: "Қазақша",
  ko: "한국어",
};

function isDateFolder(folderName: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(folderName);
}

function makeIssueTitle(dateString: string): string {
  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  const week = Math.ceil(day / 7);

  return `${year}년 ${month}월 ${week}주 위클리아산`;
}

function getFileExtension(fileName: string): string {
  return path
    .extname(fileName)
    .replace(".", "")
    .toLowerCase();
}

function findCardImages(files: string[]) {
  return files
    .map((fileName) => {
      const match = fileName.match(
        /^card-(\d+)\.([a-z0-9]+)$/i
      );

      if (!match) {
        return null;
      }

      const order = Number(match[1]);
      const extension = getFileExtension(fileName);

      if (!IMAGE_EXTENSIONS.includes(extension)) {
        return null;
      }

      return {
        fileName,
        order,
      };
    })
    .filter(
      (
        item
      ): item is {
        fileName: string;
        order: number;
      } => item !== null
    )
    .sort((a, b) => a.order - b.order);
}

function findCardAudios(
  files: string[],
  cardNumber: number
) {
  return files
    .map((fileName) => {
      const match = fileName.match(
        new RegExp(
          `^card-${cardNumber}-([a-z]{2,3})\\.([a-z0-9]+)$`,
          "i"
        )
      );

      if (!match) {
        return null;
      }

      const languageCode = match[1].toLowerCase();
      const extension = getFileExtension(fileName);

      if (!AUDIO_EXTENSIONS.includes(extension)) {
        return null;
      }

      return {
        fileName,
        languageCode,
      };
    })
    .filter(
      (
        item
      ): item is {
        fileName: string;
        languageCode: string;
      } => item !== null
    )
    .map(({ fileName, languageCode }) => ({
      languageCode,
      languageName:
        LANGUAGE_NAMES[languageCode] ??
        languageCode.toUpperCase(),
      fileName,
    }));
}

export function loadIssues(): Issue[] {
  if (!fs.existsSync(CONTENT_DIRECTORY)) {
    return [];
  }

  const folders = fs
    .readdirSync(CONTENT_DIRECTORY, {
      withFileTypes: true,
    })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        isDateFolder(entry.name)
    )
    .map((entry) => entry.name)
    .sort((a, b) => b.localeCompare(a));

  return folders
    .map((folderName): Issue | null => {
      const folderPath = path.join(
        CONTENT_DIRECTORY,
        folderName
      );

      const files = fs.readdirSync(folderPath);
      const cardImages = findCardImages(files);

      if (cardImages.length === 0) {
        return null;
      }

      const title = makeIssueTitle(folderName);

      const cards = cardImages.map(
        ({ fileName, order }) => {
          const audios = findCardAudios(
            files,
            order
          ).map(
            ({
              fileName: audioFileName,
              languageCode,
              languageName,
            }) => ({
              languageCode,
              languageName,
              audioUrl: `/content/${folderName}/${audioFileName}`,
            })
          );

          return {
            id: `${folderName}-card-${order}`,
            order,
            imageUrl: `/content/${folderName}/${fileName}`,
            alt: `${title} 카드뉴스 ${order}페이지`,
            audios,
          };
        }
      );

      return {
        id: folderName,
        publishDate: folderName,
        title,
        cards,
      };
    })
    .filter(
      (issue): issue is Issue => issue !== null
    );
}