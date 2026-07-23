"use client";

import { useRef, useState } from "react";
import type { CardItem } from "@/types/issue";

type Props = {
  cards: CardItem[];
  currentIndex: number;
  onChange: (next: number) => void;
};

export default function CardSlider({ cards, currentIndex, onChange }: Props) {
  const startX = useRef<number | null>(null);
  const [imageError, setImageError] = useState(false);
  const card = cards[currentIndex];

  const move = (delta: number) => {
    const next = Math.min(Math.max(currentIndex + delta, 0), cards.length - 1);
    if (next !== currentIndex) {
      setImageError(false);
      onChange(next);
    }
  };

  return (
    <div
      className="slider"
      onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (startX.current === null) return;
        const diff = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(diff) > 45) move(diff > 0 ? -1 : 1);
        startX.current = null;
      }}
    >
      <div className="story-progress" aria-hidden="true">
        {cards.map((item, index) => (
          <span key={item.id} className={index < currentIndex ? "done" : index === currentIndex ? "current" : ""} />
        ))}
      </div>

      <div className="image-stage">
        <button className="tap-zone left" type="button" onClick={() => move(-1)} aria-label="이전 카드" disabled={currentIndex === 0} />
        {!imageError ? (
          <img src={card.imageUrl} alt={card.alt} onError={() => setImageError(true)} />
        ) : (
          <div className="image-error">
            <strong>이미지를 불러오지 못했습니다.</strong>
            <span>{card.imageUrl} 파일을 확인해 주세요.</span>
          </div>
        )}
        <button className="tap-zone right" type="button" onClick={() => move(1)} aria-label="다음 카드" disabled={currentIndex === cards.length - 1} />
      </div>

      <div className="navigation-row">
        <button type="button" onClick={() => move(-1)} disabled={currentIndex === 0}>‹ 이전</button>
        <span>{currentIndex + 1} / {cards.length}</span>
        <button type="button" onClick={() => move(1)} disabled={currentIndex === cards.length - 1}>다음 ›</button>
      </div>
    </div>
  );
}
