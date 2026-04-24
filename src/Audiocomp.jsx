import { useEffect, useRef, useState, useCallback } from "react";

// TODO: src/assets/background_music.mp3 파일 추가 후 아래 주석 해제
// import audioFile from "./assets/background_music.mp3";

const HAS_AUDIO = false; // 음악 파일 추가 후 true 로 변경

const isKakaoInApp = () => /KAKAOTALK/i.test(navigator.userAgent);
const GATE_KEY = "wedding_audio_gate_done_v1";

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);

const Audiocomp = ({ onGateDone }) => {
  const audioRef = useRef(null);
  const doneRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const callDoneOnce = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onGateDone?.();
  }, [onGateDone]);

  const ensureAudio = useCallback(() => {
    if (!HAS_AUDIO) return null;
    if (!audioRef.current) {
      // const a = new Audio(audioFile);
      // a.loop = true;
      // a.preload = "auto";
      // a.volume = 0.35;
      // audioRef.current = a;
      // a.addEventListener("play", () => setIsPlaying(true));
      // a.addEventListener("pause", () => setIsPlaying(false));
      // a.addEventListener("ended", () => setIsPlaying(false));
    }
    return audioRef.current;
  }, []);

  const play = useCallback(async () => {
    const a = ensureAudio();
    if (!a) return false;
    try {
      await a.play();
      setBlocked(false);
      setIsPlaying(true);
      return true;
    } catch {
      setBlocked(true);
      setIsPlaying(false);
      return false;
    }
  }, [ensureAudio]);

  const pause = useCallback(() => {
    const a = audioRef.current;
    if (a) a.pause();
  }, []);

  useEffect(() => {
    if (!HAS_AUDIO) {
      callDoneOnce();
      return;
    }

    const gateDone = sessionStorage.getItem(GATE_KEY) === "1";
    if (isKakaoInApp() && !gateDone) {
      setShowGate(true);
    } else {
      setShowGate(false);
      callDoneOnce();
    }
  }, [callDoneOnce]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const onClickFab = async () => {
    if (!HAS_AUDIO) return;
    if (isPlaying) { pause(); return; }
    const ok = await play();
    if (ok) setShowGate(false);
  };

  const finishGate = () => {
    sessionStorage.setItem(GATE_KEY, "1");
    setShowGate(false);
    callDoneOnce();
  };

  const onGatePlay = async () => {
    const ok = await play();
    if (ok) finishGate();
  };

  return (
    <>
      <button className="audio-fab" onClick={onClickFab} aria-label="음악 재생 토글">
        <SpeakerIcon />
        {HAS_AUDIO && <span className={`audio-dot ${isPlaying ? "on" : ""}`} />}
      </button>

      {showGate && (
        <div className="audio-gate">
          <div className="audio-gate-card">
            <div className="audio-gate-title">🎵 배경 음악과 함께 보실래요?</div>
            <div className="audio-gate-desc">
              카카오에서는 보안을 위해<br />
              <b>한 번의 터치</b> 후에만 음악 재생이 가능해요.
            </div>
            <div className="audio-gate-actions">
              <button className="audio-gate-primary" onClick={onGatePlay}>
                음악 켜고 보기
              </button>
              <button className="audio-gate-secondary" onClick={finishGate}>
                무음으로 보기
              </button>
            </div>
            {blocked && (
              <div className="audio-gate-warn">
                재생이 안 되면 <b>무음으로 보기</b>를 선택해 주세요.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Audiocomp;
