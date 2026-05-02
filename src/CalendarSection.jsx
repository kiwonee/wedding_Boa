// TODO: 날짜 수정
const WEDDING = {
  year: 2026,
  month: 6,      // 0-indexed (6=7월)
  day: 11,
  dateLabel: "2026. 7. 11. Saturday 15:30",
  groomName: "인철",
  brideName: "보아",
};

const CalendarSection = () => {
  const today = new Date();
  const wedding = new Date(WEDDING.year, WEDDING.month, WEDDING.day, 14, 0, 0);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const daysInMonth = new Date(WEDDING.year, WEDDING.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(WEDDING.year, WEDDING.month, 1).getDay();

  const noon = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
  const diffDays = Math.round((noon(wedding) - noon(today)) / (1000 * 60 * 60 * 24));

  const calDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calDays.push(d);

  const rows = [];
  for (let i = 0; i < calDays.length; i += 7) rows.push(calDays.slice(i, i + 7));

  return (
    <div className="cal-wrap">
      <div className="section-en gallery-title">WEDDING DAY</div>
      <div className="cal-subtitle">2026. 7. 11. Saturday 15:30</div>

      <table className="calendar">
        <thead>
          <tr>
            {daysOfWeek.map((d, i) => (
              <th key={d} className={i === 0 ? "cal-sunday" : ""}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((week, ri) => (
            <tr key={ri}>
              {week.map((day, ci) => {
                if (!day) return <td key={`${ri}-${ci}`} />;
                const isSun = ci === 0;
                const isWedding = day === WEDDING.day;
                return (
                  <td key={`${ri}-${ci}`} className={isSun ? "cal-sunday" : ""}>
                    {isWedding ? (
                      <span className="cal-special">{day}</span>
                    ) : day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="dday-wrap">
        <div className="dday-names-line">
          {WEDDING.groomName} ♥ {WEDDING.brideName}
        </div>

        {diffDays > 0 ? (
          <>
            <div className="dday-count">
              <span className="dday-d">D</span>
              <span className="dday-minus">-</span>
              <span className="dday-num">{diffDays}</span>
            </div>
            <div className="dday-label">일 남았습니다</div>
          </>
        ) : diffDays < 0 ? (
          <>
            <div className="dday-count">
              <span className="dday-d">D</span>
              <span className="dday-minus">+</span>
              <span className="dday-num">{Math.abs(diffDays)}</span>
            </div>
            <div className="dday-label">일 지났습니다</div>
          </>
        ) : (
          <div className="dday-today-text">결혼식 당일입니다 🎉</div>
        )}
      </div>

      <div className="cal-divider" />

      <div className="cal-parents">
        <div className="cal-parents-row">
          <span className="cal-parents-name">이태호 · 장순자</span>
          <span className="cal-parents-ui">의</span>
          <span className="cal-parents-child">아들</span>
          <span className="cal-parents-role">신랑</span>
          <span className="cal-parents-member">인철</span>
        </div>
        <div className="cal-parents-row">
          <span className="cal-parents-name">김철수(수철) · 장미순</span>
          <span className="cal-parents-ui">의</span>
          <span className="cal-parents-child">딸</span>
          <span className="cal-parents-role">신부</span>
          <span className="cal-parents-member">보아</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
