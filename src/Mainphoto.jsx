// TODO: src/assets/mainphoto.jpg 추가 후 import 해제
// import mainphoto from "./assets/mainphoto.jpg";

const Mainphoto = () => {
  return (
    <section className="section" style={{ padding: 0 }}>
      <div className="photo-card">
        {/* mainphoto.jpg 추가 후 아래 주석 해제
        <img className="photo-img" src={mainphoto} alt="main" />
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
          메인 사진
        </div>
        <div className="photo-fade top" />
        <div className="photo-fade bottom" />
      </div>
    </section>
  );
};

export default Mainphoto;
