"use client";

import { useEffect, useMemo, useState } from "react";
import type { Issue } from "@/types/issue";
import AudioPlayer from "./audio-player";
import CardSlider from "./card-slider";
import FirstUseGuide from "./first-use-guide";
import IssueSelector from "./issue-selector";

export default function IssueViewer({ initialIssues }: { initialIssues: Issue[] }) {
  const [issueId, setIssueId] = useState(initialIssues[0]?.id ?? "");
  const [cardIndex, setCardIndex] = useState(0);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [guideVisible, setGuideVisible] = useState(false);

  useEffect(() => {
    setGuideVisible(localStorage.getItem("asan-guide-seen") !== "yes");
  }, []);

  const issue = useMemo(
    () => initialIssues.find((item) => item.id === issueId) ?? initialIssues[0],
    [initialIssues, issueId]
  );

  if (!issue) {
    return <main className="empty-state">등록된 아산톡톡이 없습니다.</main>;
  }

  const card = issue.cards[cardIndex];
  const englishTrack = card?.audios.find((audio) => audio.languageCode === "en");
  const stopToken = `${issue.id}-${card?.id ?? "none"}`;

  const dismissGuide = () => {
    localStorage.setItem("asan-guide-seen", "yes");
    setGuideVisible(false);
  };

  return (
    <main className="app-shell" onPointerDown={() => guideVisible && dismissGuide()}>
      <header className="topbar">
        <div>
          <span className="brand">아산톡톡</span>
          <span className="language-label">English Audio</span>
        </div>
        <button type="button" className="archive-button" onClick={(e) => { e.stopPropagation(); setSelectorOpen(true); }}>지난 호</button>
      </header>

      <section className="issue-meta">
        <div>
          <h1>{issue.title}</h1>
          <time dateTime={issue.publishDate}>{issue.publishDate}</time>
        </div>
        <span>{cardIndex + 1} / {issue.cards.length}</span>
      </section>

      <section className="viewer-area">
        <FirstUseGuide visible={guideVisible} onDismiss={dismissGuide} />
        <CardSlider cards={issue.cards} currentIndex={cardIndex} onChange={setCardIndex} />
      </section>

      <AudioPlayer track={englishTrack} pageNumber={cardIndex + 1} stopToken={stopToken} />

      <IssueSelector
        open={selectorOpen}
        issues={initialIssues}
        selectedId={issue.id}
        onClose={() => setSelectorOpen(false)}
        onSelect={(nextId) => {
          setIssueId(nextId);
          setCardIndex(0);
          setSelectorOpen(false);
        }}
      />
    </main>
  );
}
