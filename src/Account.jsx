import { useState } from "react";

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;left:-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
};

// TODO: 계좌번호 수정
const ACCOUNTS = [
  {
    id: "groom",
    label: "신랑측 계좌번호",
    rows: [
      { name: "신랑 아버지", bank: "농협은행",   num: "33504152089740" },
      { name: "신랑 어머니", bank: "농협은행",   num: "10602204944" },
      { name: "신랑",        bank: "카카오뱅크", num: "3333213215225" },
    ],
  },
  {
    id: "bride",
    label: "신부측 계좌번호",
    rows: [
      { name: "신부 아버지", bank: "우리은행",   num: "1002964375218" },
      { name: "신부 어머니", bank: "국민은행",   num: "099240069010" },
      { name: "신부",        bank: "카카오뱅크", num: "3333370983633" },
    ],
  },
];

const AccordionItem = ({ label, rows }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  const onCopy = async (bank, num) => {
    await copyText(`${bank} ${num}`);
    setToast("복사되었습니다");
    setTimeout(() => setToast(""), 1200);
  };

  return (
    <div className="accordion-item">
      <button className="accordion-trigger" onClick={() => setOpen(!open)} type="button">
        {label}
        <span className={`accordion-arrow${open ? " open" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="accordion-body">
          {rows.map((r) => (
            <div className="bank-row" key={r.name}>
              <div className="bank-row-left">
                <p className="bank-row-name">{r.name}</p>
                <p className="bank-row-num">{r.bank} · {r.num}</p>
              </div>
              <button className="bank-copy-btn" type="button" onClick={() => onCopy(r.bank, r.num)}>
                복사
              </button>
            </div>
          ))}
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

const Account = () => {
  return (
    <div className="account-wrap">
      <div className="account-head">
        <div className="section-en gallery-title">Account</div>
      </div>

      {ACCOUNTS.map((acc) => (
        <AccordionItem key={acc.id} label={acc.label} rows={acc.rows} />
      ))}
    </div>
  );
};

export default Account;
