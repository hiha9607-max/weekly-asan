"use client";

import type { Issue } from "@/types/issue";

type Props = {
  open: boolean;
  issues: Issue[];
  selectedId: string;
  onClose: () => void;
  onSelect: (id: string) => void;
};

export default function IssueSelector({ open, issues, selectedId, onClose, onSelect }: Props) {
  if (!open) return null;

  return (
    <div className="sheet-backdrop" role="presentation" onClick={onClose}>
      <section className="sheet" role="dialog" aria-modal="true" aria-label="지난 아산톡톡 선택" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title-row">
          <h2>지난 아산톡톡</h2>
          <button className="icon-button" type="button" onClick={onClose} aria-label="닫기">×</button>
        </div>
        <div className="issue-list">
          {issues.map((issue) => (
            <button
              key={issue.id}
              type="button"
              className={`issue-list-item ${issue.id === selectedId ? "selected" : ""}`}
              onClick={() => onSelect(issue.id)}
            >
              <span className="issue-date">{issue.publishDate}</span>
              <strong>{issue.title}</strong>
              <span>{issue.cards.length}장</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
