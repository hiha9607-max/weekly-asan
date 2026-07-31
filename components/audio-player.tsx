"use client";

import { useEffect, useRef, useState } from "react";
import type { AudioTrack } from "@/types/issue";

function formatTime(value: number) {
  if (!Number.isFinite(value)) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);

  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

type Props = {
  track?: AudioTrack;
  pageNumber: number;
  stopToken: string;
};

export default function AudioPlayer({
  track,
  stopToken,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

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

    if (!audio || !track || error) {
      return;
    }

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

    if (!audio || !track || error) {
      return;
    }

    audio.currentTime = 0;

    try {
      await audio.play();
    } catch {
      setError(true);
    }
  };

  if (!track || error) {
    return (
      <div className="audio-unavailable">
        음성을 준비 중입니다.
      </div>
    );
  }

  return (
    <section className="audio-player">
      <audio
        ref={audioRef}
        src={track.audioUrl}
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

      <div className="player-controls">
        <button
          className="play-button"
          type="button"
          onClick={toggle}
          aria-label={playing ? "일시정지" : "재생"}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>

        <div className="audio-progress">
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

          <div className="time-row">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <button
          type="button"
          className="compact-restart-button"
          onClick={restart}
          aria-label="처음부터 재생"
        >
          ↺
        </button>
      </div>
    </section>
  );
}