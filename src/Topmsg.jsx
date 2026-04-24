// TODO: src/assets/cover.jpg 추가 후 import 해제
// import cover from "./assets/cover.jpg";

const Topmsg = () => {
  return (
    <>
      <section className="poster-hero">
        {/* 커버 사진 자리 — cover.jpg 추가 후 아래 주석 해제
        <img className="poster-img" src={cover} alt="cover" />
        */}
        <div style={{
          width: "100%",
          aspectRatio: "3/4",
          background: "linear-gradient(160deg, #e8ddd4 0%, #d6c8bc 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(0,0,0,0.25)",
          fontSize: 13,
          fontFamily: "var(--font-body)",
        }}>
          커버 사진
        </div>

        <div className="poster-script-layer" aria-hidden="true">
          <span className="poster-script word-1">We&apos;re</span>
          <span className="poster-script word-2">Getting</span>
          <span className="poster-script word-3">Married</span>
        </div>
      </section>

      {/* TODO: 이름 · 날짜 · 장소 수정 */}
      <div className="poster-meta-layer">
        <p className="poster-names">인철 &amp; 보아</p>
        <p className="poster-info">0000년 00월 00일 요일 오전/오후 00시 00분</p>
        <p className="poster-info">예식장 이름</p>
      </div>
    </>
  );
};

export default Topmsg;
