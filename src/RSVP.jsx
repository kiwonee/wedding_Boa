import { useEffect, useState } from "react";
import Modal from "./modal";

// TODO: Google Form URL 및 entry ID 수정
const FORM_URL = "";
const ENTRY = {
  name:  "entry.XXXXXXXXX",
  adult: "entry.XXXXXXXXX",
  kid:   "entry.XXXXXXXXX",
  meal:  "entry.XXXXXXXXX",
};

const RSVP = () => {
  const [modal, setModal] = useState({ isopen: false });
  const [name, setName] = useState("");
  const [adult, setAdult] = useState("");
  const [kid, setKid] = useState("");
  const [meal, setMeal] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1400);
    return () => clearTimeout(t);
  }, [toast]);

  const submit = async () => {
    if (!name.trim()) { setToast("이름을 입력해 주세요"); return; }
    if (!FORM_URL) { setToast("Google Form URL을 설정해주세요"); return; }

    const fd = new FormData();
    fd.append(ENTRY.name,  name.trim());
    fd.append(ENTRY.adult, String(adult === "" ? 0 : Math.max(0, parseInt(adult, 10) || 0)));
    fd.append(ENTRY.kid,   String(kid   === "" ? 0 : Math.max(0, parseInt(kid,   10) || 0)));
    fd.append(ENTRY.meal,  meal ? "O" : "X");

    await fetch(FORM_URL, { method: "POST", mode: "no-cors", body: fd });

    setModal({ isopen: false });
    setName(""); setAdult(""); setKid(""); setMeal(false);
    setToast("참석 의사가 전달되었습니다!");
  };

  return (
    <div className="rsvp-wrap">
      <div className="rsvp-head">
        <div className="section-en">RSVP</div>
      </div>

      <button className="rsvp-btn" type="button" onClick={() => setModal({ isopen: true })}>
        참석의사 전달하기
      </button>

      <Modal isOpen={modal} onClose={() => setModal({ isopen: false })} closeOnBackdrop={false}>
        <div>
          <div className="modal-head">
            <h3 className="modal-title">참석의사 전달하기</h3>
            <button className="modal-close" onClick={() => setModal({ isopen: false })} type="button">✕</button>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <label style={{ fontSize: 12, color: "var(--text-mid)" }}>
              이름
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="rsvp-input" placeholder="홍길동" />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <label style={{ fontSize: 12, color: "var(--text-mid)" }}>
                성인
                <input type="number" min="0" inputMode="numeric"
                  value={adult} onChange={(e) => setAdult(e.target.value)}
                  className="rsvp-input" placeholder="0" />
              </label>
              <label style={{ fontSize: 12, color: "var(--text-mid)" }}>
                유아
                <input type="number" min="0" inputMode="numeric"
                  value={kid} onChange={(e) => setKid(e.target.value)}
                  className="rsvp-input" placeholder="0" />
              </label>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text-mid)", cursor: "pointer" }}>
              <input type="checkbox" checked={meal} onChange={(e) => setMeal(e.target.checked)}
                style={{ width: 17, height: 17, accentColor: "var(--tan)", cursor: "pointer" }} />
              식전 식사 여부
            </label>

            <button className="submit-btn" type="button" onClick={submit}>제출하기</button>

            <p style={{ fontSize: 11, color: "var(--text-light)", margin: 0 }}>
              * 성인/유아를 비워두면 0명으로 저장됩니다.
            </p>
          </div>
        </div>
      </Modal>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default RSVP;
