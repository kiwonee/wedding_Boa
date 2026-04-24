import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "./modal";

const modules = import.meta.glob(
  "./assets/images/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}",
  { eager: true, import: "default" }
);

const SCROLL_MS = 520;

// 파일명 번호로 레이아웃 지정: span2 = 가로 2칸
const SPAN2 = [2, 5, 8]; // 원하는 번호

const getNum = (path) => parseInt(path.split("/").pop().split(".")[0], 10);

const Gallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState({ isopen: false, idx: 0 });

  const trackRef = useRef(null);
  const [dispIdx, setDispIdx] = useState(1);
  const dispIdxRef = useRef(1);
  const animRef = useRef(null);
  const isAnimRef = useRef(false);

  useEffect(() => {
    const loaded = Object.entries(modules)
      .map(([path, src]) => ({ path, src }))
      .sort((a, b) => {
        const ai = parseInt(a.path.split("/").pop().split(".")[0], 10);
        const bi = parseInt(b.path.split("/").pop().split(".")[0], 10);
        if (!isNaN(ai) && !isNaN(bi)) return ai - bi;
        return a.path.localeCompare(b.path);
      });
    setAllImages(loaded);
  }, []);

  const PREVIEW = 9;
  const visible = useMemo(
    () => (expanded ? allImages : allImages.slice(0, PREVIEW)),
    [expanded, allImages]
  );

  const n = allImages.length;
  const realIdx = dispIdx <= 0 ? n - 1 : dispIdx >= n + 1 ? 0 : dispIdx - 1;

  const jumpTo = (idx) => {
    const el = trackRef.current;
    if (!el) return;
    if (animRef.current) { clearTimeout(animRef.current); animRef.current = null; }
    isAnimRef.current = false;
    el.scrollLeft = idx * el.offsetWidth;
    dispIdxRef.current = idx;
    setDispIdx(idx);
  };

  const animateTo = (idx) => {
    const el = trackRef.current;
    if (!el) return;
    if (animRef.current) { clearTimeout(animRef.current); animRef.current = null; }
    dispIdxRef.current = idx;
    setDispIdx(idx);
    isAnimRef.current = true;
    el.scrollTo({ left: idx * el.offsetWidth, behavior: "smooth" });
    let fired = false;
    const done = () => {
      if (fired) return;
      fired = true;
      if (animRef.current) { clearTimeout(animRef.current); animRef.current = null; }
      el.removeEventListener("scrollend", done);
      isAnimRef.current = false;
      if (idx <= 0) jumpTo(n);
      else if (idx >= n + 1) jumpTo(1);
    };
    el.addEventListener("scrollend", done, { once: true });
    animRef.current = setTimeout(done, SCROLL_MS);
  };

  useEffect(() => {
    if (!modal.isopen || n === 0) return;
    const idx = Math.max(0, Math.min(n - 1, modal.idx));
    requestAnimationFrame(() => jumpTo(idx + 1));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.isopen, modal.idx, n]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !modal.isopen || n === 0) return;
    let t = null;
    const onScroll = () => {
      if (isAnimRef.current) return;
      if (animRef.current) { clearTimeout(animRef.current); animRef.current = null; }
      clearTimeout(t);
      t = setTimeout(() => {
        const w = el.offsetWidth;
        const idx = Math.round(el.scrollLeft / w);
        if (idx <= 0) { el.scrollLeft = n * w; dispIdxRef.current = n; setDispIdx(n); }
        else if (idx >= n + 1) { el.scrollLeft = w; dispIdxRef.current = 1; setDispIdx(1); }
        else { dispIdxRef.current = idx; setDispIdx(idx); }
      }, 30);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, [modal.isopen, n]);

  const goPrev = () => animateTo(dispIdxRef.current - 1);
  const goNext = () => animateTo(dispIdxRef.current + 1);
  const slides = n > 0 ? [allImages[n - 1], ...allImages, allImages[0]] : [];

  return (
    <div style={{ background: "var(--card)" }}>
      {/* 헤더 */}
      <div style={{ padding: "44px 24px 20px", textAlign: "center" }}>
        <div className="section-en gallery-title">Gallery</div>
      </div>

      {allImages.length === 0 ? (
        <div style={{ padding: "0 24px 44px", textAlign: "center", fontSize: 12, color: "var(--text-light)", lineHeight: 1.8 }}>
          사진이 없습니다.<br />src/assets/images 폴더에 사진을 추가해주세요.
        </div>
      ) : (
        <>
          <div className="gallery-grid">
            {visible.map((img, idx) => {
              const isSpan2 = SPAN2.includes(getNum(img.path));
              return (
                <button
                  key={img.path}
                  className={`gallery-item${isSpan2 ? " span2" : ""}`}
                  onClick={() => setModal({ isopen: true, idx })}
                  type="button"
                >
                  <img src={img.src} alt="" />
                </button>
              );
            })}
          </div>

          {allImages.length > PREVIEW && (
            <button
              className="gallery-more-btn"
              onClick={() => setExpanded(!expanded)}
              type="button"
            >
              {expanded ? "접기" : "더보기"}
            </button>
          )}
        </>
      )}

      <Modal isOpen={modal} onClose={() => setModal({ isopen: false, idx: 0 })}>
        <div className="gv">
          <div className="gv-top">
            <div className="gv-count">{realIdx + 1} / {n}</div>
            <button className="gv-close" onClick={() => setModal({ isopen: false, idx: 0 })} type="button">✕</button>
          </div>
          <div className="gv-track" ref={trackRef}>
            {slides.map((img, i) => (
              <div className="gv-slide" key={`${img.path}-${i}`}>
                <img className="gv-img" src={img.src} alt="" draggable={false} />
              </div>
            ))}
          </div>
          <button className="gv-nav prev" onClick={goPrev} type="button">‹</button>
          <button className="gv-nav next" onClick={goNext} type="button">›</button>
        </div>
      </Modal>
    </div>
  );
};

export default Gallery;
