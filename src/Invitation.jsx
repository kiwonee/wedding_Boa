// TODO: 부모님 이름, 신랑·신부 이름 수정
const Invitation = () => {
  return (
    <section className="section">
      <div className="section-title">Invitation</div>
      <div className="section-sub">행복한 날, 함께 해주세요.</div>
      <div className="hr" />

      <p className="invite-body" style={{ margin: 0 }}>
        <span style={{ fontSize: 15.5 }}>Join us on our special day</span>
      </p>

      <div style={{ marginTop: 22 }}>
        <div className="parents-grid">
          <div className="parents-line">
            <b>아버지 · 어머니</b> 의 <span className="child-word">아들</span>{" "}
            <span className="child-name">인철</span>
          </div>

          <div className="parents-line">
            <b>아버지 · 어머니</b> 의 <span className="child-word">딸</span>{" "}
            <span className="child-name">보아</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invitation;
