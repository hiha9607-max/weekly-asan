"use client";

import { useEffect, useRef, useState } from "react";
import type { AudioTrack } from "@/types/issue";

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

const AUDIO_LABELS: Record<string, string> = {
  en: "English Audio",
  zh: "中文语音",
  vi: "Tiếng Việt Audio",
  ru: "Русское аудио",
  uz: "O‘zbekcha Audio",
  kk: "Қазақша аудио",
  ko: "한국어 음성",
};

const AUDIO_GUIDE_NAMES: Record<string, string> = {
  en: "English",
  zh: "Chinese",
  vi: "Vietnamese",
  ru: "Russian",
  uz: "Uzbek",
  kk: "Kazakh",
  ko: "Korean",
};

type Props = {
  track?: AudioTrack;
  pageNumber: number;
  stopToken: string;
};

export default function AudioPlayer({
  track,
  pageNumber,
  stopToken,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  const languageCode = track?.languageCode ?? "en";
  const languageLabel =
    AUDIO_LABELS[languageCode] ??
    `${track?.languageName ?? languageCode.toUpperCase()} Audio`;

  const guideName =
    AUDIO_GUIDE_NAMES[languageCode] ??
    track?.languageName ??
    languageCode.toUpperCase();

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setPlaying(false);
    setCurrent(0);
    setDuration(0);
    setError(false);

    audio.load();
  }, [stopToken, track?.audioUrl]);

  const toggle = async () => {
    const audio = audioRef.current;

    if (!audio || !track || error) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setError(true);
    }
  };

  const restart = async () => {
    const audio = audioRef.current;

    if (!audio || !track || error) return;

    audio.currentTime = 0;

    try {
      await audio.play();
    } catch {
      setError(true);
    }
  };

  return (
    <section
      className="audio-player"
      aria-label={`${guideName} 음성 플레이어`}
    >
      <audio
        ref={audioRef}
        src={track?.audioUrl}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) =>
          setCurrent(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) =>
          setDuration(event.currentTarget.duration)
        }
        onEnded={() => setPlaying(false)}
        onError={() => setError(true)}
      />

      <div className="player-heading">
        <div>
          <span className="eyebrow">{languageLabel}</span>
          <strong>{pageNumber}페이지 음성 안내</strong>
        </div>

        <button
          type="button"
          className="restart-button"
          onClick={restart}
          disabled={!track || error}
        >
          ↺ 처음부터
        </button>
      </div>

      {!track || error ? (
        <div className="audio-unavailable">
          이 페이지의 {guideName} 음성은 준비 중입니다.
        </div>
      ) : (
        <>
          <div className="player-controls">
            <button
              className="play-button"
              type="button"
              onClick={toggle}
              aria-label={playing ? "일시정지" : "재생"}
            >
              {playing ? "Ⅱ" : "▶"}
            </button>

            <input
              aria-label="재생 위치"
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(current, duration || 0)}
              onChange={(event) => {
                const value = Number(event.target.value);

                if (audioRef.current) {
                  audioRef.current.currentTime = value;
                }

                setCurrent(value);
              }}
            />
          </div>

          <div className="time-row">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </>
      )}
    </section>
  );
}