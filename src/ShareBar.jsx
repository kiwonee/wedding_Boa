import { useState } from "react";

// TODO: 카카오 앱키 · 공유 정보 수정
const SHARE = {
  title: "결혼합니다.",
  desc: "소중한 분들을 초대합니다.",
  imageUrl: "",
  kakaoJsKey: "",
};

const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.548 1.57 4.788 3.938 6.13L4.75 21l5.062-2.625c.724.105 1.47.125 2.188.125 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
  </svg>
);

const ensureKakao = (key) =>
  new Promise((resolve, reject) => {
    if (!key) return reject(new Error("no key"));
    if (window.Kakao?.isInitialized?.()) return resolve();
    const s = document.createElement("script");
    s.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js";
    s.async = true;
    s.onload = () => { try { window.Kakao.init(key); resolve(); } catch(e) { reject(e); } };
    s.onerror = reject;
    document.head.appendChild(s);
  });

const ShareBar = () => {
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1400);
  };

  const onKakao = async () => {
    if (!SHARE.kakaoJsKey) { showToast("카카오 앱키를 설정해주세요"); return; }
    try {
      await ensureKakao(SHARE.kakaoJsKey);
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: SHARE.title,
          description: SHARE.desc,
          imageUrl: SHARE.imageUrl,
          link: { mobileWebUrl: location.href, webUrl: location.href },
        },
        buttons: [{ title: "청첩장 보기", link: { mobileWebUrl: location.href, webUrl: location.href } }],
      });
    } catch {
      showToast("공유 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="share-wrap">
      <button className="kakao-btn" type="button" onClick={onKakao}>
        <KakaoIcon />
        카카오톡으로 공유하기
      </button>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default ShareBar;
