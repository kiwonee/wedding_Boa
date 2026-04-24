import "./Calendar.css";

// TODO: 날짜 수정 (targetYear, targetMonth 0-indexed, targetDay, 시간 문구)
const WEDDING = {
  year: 2026,
  month: 0,   // 0-indexed (0=1월, 4=5월, 5=6월 ...)
  day: 1,
  dateStr: "0000. 00. 00",
  timeStr: "요일 오전/오후 00시 00분",
  groomName: "신랑",
  brideName: "신부",
};

const Calendar = () => {
  const today = new Date();
  const wedding = new Date(WEDDING.year, WEDDING.month, WEDDING.day, 14, 0, 0);

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const daysInMonth = new Date(WEDDING.year, WEDDING.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(WEDDING.year, WEDDING.month, 1).getDay();

  const noon = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0);
  const diffDays = Math.round((noon(wedding) - noon(today)) / (1000 * 60 * 60 * 24));

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const rows = [];
  for (let i = 0; i < calendarDays.length; i += 7) rows.push(calendarDays.slice(i, i + 7));

  const line2 =
    diffDays > 0 ? (
      <>
        <span className="dday-num">{diffDays}</span>
        <span className="dday-unit">일 남았습니다.</span>
      </>
    ) : diffDays < 0 ? (
      <>
        <span className="dday-num">{Math.abs(diffDays)}</span>
        <span className="dday-unit">일 지났습니다.</span>
      </>
    ) : (
      <span className="dday-today">결혼식 당일입니다 🎉</span>
    );

  return (
    <section className="section">
      <div className="section-title">Calendar</div>
      <div className="hr" />

      <div className="cal-bg">
        <div className="cal-strong-date">{WEDDING.dateStr}</div>
        <div className="cal-strong-time">{WEDDING.timeStr}</div>

        <div className="center">
          <table className="calendar">
            <thead>
              <tr>
                {daysOfWeek.map((day, idx) => (
                  <th key={day} className={idx === 0 ? "sunday" : ""}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((week, rIdx) => (
                <tr key={rIdx}>
                  {week.map((day, cIdx) => {
                    if (!day) return <td key={`${rIdx}-${cIdx}`} />;
                    const isSunday = cIdx === 0;
                    const isSpecial = day === WEDDING.day;
                    return (
                      <td
                        key={`${rIdx}-${cIdx}`}
                        className={`${isSunday ? "sunday" : ""} ${isSpecial ? "special-day" : ""}`}
                      >
                        {isSpecial ? (
                          <span className="special-pill" aria-label="결혼식 날짜">
                            <span className="special-date">{day}</span>
                          </span>
                        ) : (
                          day
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dday-box">
          <div className="dday-line1">
            <span className="dday-names">
              {WEDDING.groomName} <span className="dday-heart">♥</span> {WEDDING.brideName}
            </span>
            <span className="dday-phrase">의 결혼식이</span>
          </div>
          <div className="dday-line2">{line2}</div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
