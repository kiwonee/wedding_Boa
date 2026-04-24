import { useEffect, useState } from "react";

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
};

// TODO: 계좌번호 수정
const ACCOUNTS = {
  W: {
    title: "신부측 계좌번호",
    father: ["신부 아버지", "은행명", "계좌번호"],
    mother: ["신부 어머니", "은행명", "계좌번호"],
    me:     ["신부",       "은행명", "계좌번호"],
  },
  M: {
    title: "신랑측 계좌번호",
    father: ["신랑 아버지", "은행명", "계좌번호"],
    mother: ["신랑 어머니", "은행명", "계좌번호"],
    me:     ["신랑",       "은행명", "계좌번호"],
  },
};

const MyBank = ({ src, onClose }) => {
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1200);
    return () => clearTimeout(t);
  }, [toast]);

  const dt = ACCOUNTS[src] ?? ACCOUNTS.M;

  const onCopy = async (num) => {
    await copyText(num);
    setToast("계좌번호가 복사되었습니다");
  };

  return (
    <div className="bank-wrap">
      <div className="bank-head">
        <h3 className="bank-title">{dt.title}</h3>
        <button className="bank-close" type="button" onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </div>

      <div className="bank-list">
        {["father", "mother", "me"].map((key) => (
          <div className="bank-item" key={key}>
            <div className="bank-left">
              <p className="bank-name">{dt[key][0]}</p>
              <p className="bank-num">
                {dt[key][1]} · {dt[key][2]}
              </p>
            </div>
            <button className="copy-btn" type="button" onClick={() => onCopy(`${dt[key][1]} ${dt[key][2]}`)}>
              복사
            </button>
          </div>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default MyBank;
