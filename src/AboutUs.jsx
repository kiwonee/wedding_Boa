import { useState } from "react";

// TODO: 사진 파일 추가 후 import 해제
// import groomImg from "./assets/about_groom.jpg";
// import brideImg from "./assets/about_bride.jpg";

// TODO: 이름, 프로필 내용 수정
const people = [
  { key: "groom", role: "신랑", name: "인철", img: null, pos: "0% 50%" },
  { key: "bride", role: "신부", name: "보아", img: null, pos: "center 50%" },
];

const AboutUs = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="section">
      <div className="section-title">About us</div>
      <div className="hr" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {people.map(({ key, role, name, img, pos }) => (
          <button
            key={key}
            type="button"
            onClick={() => setOpen((q) => !q)}
            style={{ width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.12)", position: "relative" }}>
              {img ? (
                <img src={img} alt={name} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: pos, display: "block" }} />
              ) : (
                <div style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  background: "linear-gradient(160deg, #e8ddd4 0%, #d6c8bc 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(0,0,0,0.25)",
                  fontSize: 12,
                  fontFamily: "var(--font-body)",
                }}>
                  {role} 사진
                </div>
              )}
              <div style={{
                position: "absolute", bottom: 8, right: 8,
                fontSize: 20, fontWeight: 700, fontFamily: "var(--font-script)", letterSpacing: "0.05em",
                color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                animation: "about-hint 2s ease-in-out infinite",
              }}>Click</div>
            </div>
            <div style={{ marginTop: 8, textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, opacity: 0.6 }}>{role}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginTop: 2 }}>{name}</div>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div style={{ marginTop: 14, padding: "16px 14px", background: "rgba(255,255,255,0.6)", borderRadius: 10, fontSize: 12.5, lineHeight: 1.9, textAlign: "left", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* TODO: 프로필 내용 수정 */}
          <div>
            <div style={{ opacity: 0.8 }}>
              <div>🎂 생년월일</div>
              <div>🧠 MBTI</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ opacity: 0.6, fontSize: 11 }}>특기</span>
                <br />
                내용을 입력해주세요.
              </div>
            </div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>
              <div>🎂 생년월일</div>
              <div>🧠 MBTI</div>
              <div style={{ marginTop: 4 }}>
                <span style={{ opacity: 0.6, fontSize: 11 }}>특기</span>
                <br />
                내용을 입력해주세요.
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
