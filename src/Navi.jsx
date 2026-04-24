// TODO: 예식장 정보 수정 (이름, 주소, 좌표, 지도 이미지)
// TODO: src/assets/mymap.jpg 추가 후 import 해제
// import mymap from "./assets/mymap.jpg";

// TODO: 좌표 수정 (Google Maps에서 위도/경도 확인)
const DEST = {
  name: "예식장 이름",
  addr: "도로명 주소",
  lat: 37.5665,
  lng: 126.9780,
};

const enc = (s) => encodeURIComponent(s);

const openWithFallback = (appUrl, webUrl, delay = 800) => {
  window.location.href = appUrl;
  setTimeout(() => {
    if (!document.hidden) window.location.href = webUrl;
  }, delay);
};

const openNaverMap = () => {
  const appname = enc(window.location.origin);
  const appUrl = `nmap://place?lat=${DEST.lat}&lng=${DEST.lng}&name=${enc(DEST.name)}&appname=${appname}`;
  const webUrl = `https://map.naver.com/v5/search/${enc(DEST.name)}`;
  openWithFallback(appUrl, webUrl);
};

const openKakaoNavi = () => {
  const appUrl = `kakaomap://route?ep=${DEST.lat},${DEST.lng}&by=CAR`;
  const webUrl = `https://map.kakao.com/link/to/${enc(DEST.name)},${DEST.lat},${DEST.lng}`;
  openWithFallback(appUrl, webUrl);
};

const openTmap = () => {
  const appUrl = `tmap://route?goalname=${enc(DEST.name)}&goalx=${DEST.lng}&goaly=${DEST.lat}`;
  const webUrl = `https://tmap.life/routePlan?goalname=${enc(DEST.name)}&goalx=${DEST.lng}&goaly=${DEST.lat}`;
  openWithFallback(appUrl, webUrl);
};

const Navi = () => {
  return (
    <section className="section">
      <div className="section-title">Location</div>
      <div className="hr" />

      <div className="loc-center">
        <div className="loc-name">{DEST.name}</div>
        <div className="loc-addr">{DEST.addr}</div>
      </div>

      {/* 지도 이미지 자리 */}
      <div className="map-card" style={{ marginTop: 14 }}>
        {/* mymap.jpg 추가 후 아래 주석 해제
        <img src={mymap} alt="map" />
        */}
        <div style={{
          width: "100%",
          aspectRatio: "16/9",
          background: "linear-gradient(160deg, #e8ddd4 0%, #d6c8bc 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(0,0,0,0.25)",
          fontSize: 13,
          fontFamily: "var(--font-body)",
        }}>
          지도 이미지
        </div>
      </div>

      <div className="map-actions">
        <button className="map-pill" type="button" onClick={openNaverMap}>
          네이버 지도
        </button>
        <button className="map-pill" type="button" onClick={openKakaoNavi}>
          카카오맵
        </button>
        <button className="map-pill" type="button" onClick={openTmap}>
          T map
        </button>
      </div>

      {/* TODO: 교통 안내 수정 */}
      <div className="guide2">
        <div className="guide2-row">
          <div className="guide2-title">지하철</div>
          <div className="guide2-body">
            <div>○○역 ○번 출구 - 도보 ○분</div>
          </div>
        </div>

        <div className="guide2-row">
          <div className="guide2-title">버스</div>
          <div className="guide2-body">
            <div>○○○, ○○○ ○○○ 하차</div>
          </div>
        </div>

        <div className="guide2-row">
          <div className="guide2-title">주차</div>
          <div className="guide2-body">
            <div>예식장 내 주차 가능</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navi;
