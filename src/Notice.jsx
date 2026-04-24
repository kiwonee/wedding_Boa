// TODO: 안내사항 내용 수정
const Notice = () => {
  return (
    <section className="section">
      <div className="section-title">Notice</div>
      <div className="hr" />

      <div className="notice-card">
        <div className="notice-list">
          <div className="notice-item">
            <span className="notice-dot" />
            <span>
              <b>식사 시간</b><br />
              00:00 — 00:00
            </span>
          </div>

          <div className="notice-item">
            <span className="notice-dot" />
            <span>
              <b>주차 안내</b><br />
              주차 안내 내용을 입력해주세요.
            </span>
          </div>

          <div className="notice-item">
            <span className="notice-dot" />
            <span>
              <b>기타 안내</b><br />
              기타 안내 내용을 입력해주세요.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notice;
