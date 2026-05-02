import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "./modal";

const modules = import.meta.glob(
  "./assets/images/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}",
  { eager: true, import: "default", query: "?w=800&format=webp&as=url" }
);

const SCROLL_MS = 520;

const getNum = (path) => parseInt(path.split("/").pop().split(".")[0], 10);

// 6열 그리드 기준 span 지정
// 1~3: span2(3열), 4~7: span3(2열), 8~16: span2(3열), 17~19: span6(1열)
const getSpanClass = (num) => {
  if (num >= 17) return "span6";
  if (num >= 4 && num <= 7) return "span3";
  return "span2";
};

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
      .filter(([path]) => !isNaN(parseInt(path.split("/").pop().split(".")[0], 10)))
      .map(([path, src]) => ({ path, src }))
      .sort((a, b) => {
        const ai = parseInt(a.path.split("/").pop().split(".")[0], 10);
        const bi = parseInt(b.path.split("/").pop().split(".")[0], 10);
        return ai - bi;
      });
    setAllImages(loaded);
  }, []);

  const PREVIEW = 5;
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

    let startX = null;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      e.preventDefault();
    };

    const onTouchEnd = (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) {
        animateTo(dispIdxRef.current + (dx < 0 ? 1 : -1));
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
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
              const spanClass = getSpanClass(getNum(img.path));
              return (
                <button
                  key={img.path}
                  className={`gallery-item ${spanClass}`}
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

      <Modal isOpen={modal} onClose={() => setModal({ isopen: false, idx: 0 })} fullscreen>
        <div className="gv">
          <button className="gv-close" onClick={() => setModal({ isopen: false, idx: 0 })} type="button">✕</button>
          <div className="gv-track" ref={trackRef}>
            {slides.map((img, i) => (
              <div className="gv-slide" key={`${img.path}-${i}`}>
                <img className="gv-img" src={img.src} alt="" draggable={false} />
              </div>
            ))}
          </div>
          <div className="gv-bottom">
            <button className="gv-nav prev" onClick={goPrev} type="button">‹</button>
            <div className="gv-count">{realIdx + 1} / {n}</div>
            <button className="gv-nav next" onClick={goNext} type="button">›</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Gallery;
