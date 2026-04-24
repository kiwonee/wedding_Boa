// TODO: src/assets/cover.jpg 추가 후 사용
// import cover from "./assets/cover.jpg";

// TODO: 이름 · 날짜 · 장소 수정
const Cover = () => {
  return (
    <>
      {/* 커버 사진 */}
      <div style={{ width: "100%", lineHeight: 0 }}>
        {/* cover.jpg 추가 후 아래 div를 img로 교체:
        <img className="cover-photo" src={cover} alt="cover" />
        */}
        <div style={{
          width: "100%",
          aspectRatio: "3/4",
          background: "#ccc5bb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: 13,
          fontFamily: "var(--font-body)",
          letterSpacing: "0.06em",
        }}>
          COVER PHOTO
        </div>
      </div>

      {/* 커버 하단 메타 */}
      <div className="cover-meta">
        <p className="cover-date">2026. 7. 11. Saturday 15:30</p>
        <p className="cover-venue">보테가마지오 갤러리아포레로스타뇨홀</p>
      </div>
    </>
  );
};

export default Cover;
