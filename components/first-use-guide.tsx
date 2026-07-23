"use client";

export default function FirstUseGuide({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  if (!visible) return null;
  return (
    <button className="guide" type="button" onClick={onDismiss} aria-label="사용 안내 닫기">
      <strong>좌우로 넘겨보세요</strong>
      <span>아래 재생 버튼을 누르면 영어 음성을 들을 수 있어요.</span>
    </button>
  );
}
