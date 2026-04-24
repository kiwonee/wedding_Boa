import { useEffect, useMemo, useState } from "react";

// TODO: 인트로 문구 수정
const Intro = ({
  onDone,
  startDelayMs = 250,
  typeMs = 1100,
  holdMs = 700
}) => {
  const text = useMemo(() => "결혼식에 초대합니다.", []);
  const [shown, setShown] = useState("");

  useEffect(() => {
    let typingTimer = null;
    let doneTimer = null;

    const start = setTimeout(() => {
      const stepMs = Math.max(24, Math.floor(typeMs / Math.max(1, text.length)));
      let i = 0;

      typingTimer = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(typingTimer);
          doneTimer = setTimeout(() => onDone?.(), holdMs);
        }
      }, stepMs);
    }, startDelayMs);

    return () => {
      clearTimeout(start);
      if (typingTimer) clearInterval(typingTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, [text, startDelayMs, typeMs, holdMs, onDone]);

  return (
    <div
      className="intro"
      onClick={() => onDone?.()}
      role="button"
      tabIndex={0}
    >
      <div className="intro-text">
        {shown}
        <span className="intro-caret" aria-hidden="true" />
      </div>
      <div className="intro-sub">화면을 터치하면 바로 이동합니다.</div>
    </div>
  );
};

export default Intro;
