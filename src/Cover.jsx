import cover from "./assets/images/cover.jpg?w=1200&format=webp&as=url";

const Cover = () => {
  return (
    <>
      {/* 커버 사진 */}
      <div className="cover-door-outer">
        <img className="cover-photo" src={cover} alt="cover" />
        <div className="cover-arch-mask" />
      </div>

      {/* 커버 하단 메타 */}
      <div className="cover-meta">
        <p className="cover-date">2026. 7. 11. Saturday 15:30</p>
        <p className="cover-venue">보테가마지오 갤러리아포레 G층(B2) 로스타뇨홀</p>
      </div>
    </>
  );
};

export default Cover;
