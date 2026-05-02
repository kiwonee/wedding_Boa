import mapImg from "./assets/map.jpg?url";

const DEST = {
  name: "보테가마지오 갤러리아포레",
  addr: "서울 성동구 서울숲2길 32-14",
  lat: 37.5449,
  lng: 127.0368,
};

const enc = (s) => encodeURIComponent(s);

const openWithFallback = (appUrl, webUrl) => {
  window.location.href = appUrl;
  setTimeout(() => { if (!document.hidden) window.open(webUrl, "_blank"); }, 1000);
};

const openNaver = () => openWithFallback(
  `nmap://search?query=${enc(DEST.addr)}&appname=${enc(window.location.origin)}`,
  `https://map.naver.com/v5/search/${enc(DEST.addr)}`
);

const openKakao = () => openWithFallback(
  `kakaomap://route?ep=${DEST.lat},${DEST.lng}&by=CAR`,
  `https://map.kakao.com/link/to/${enc(DEST.name)},${DEST.lat},${DEST.lng}`
);

const openTmap = () => openWithFallback(
  `tmap://route?goalname=${enc(DEST.name)}&goaladdr=${enc(DEST.addr)}&goalx=${DEST.lng}&goaly=${DEST.lat}`,
  `https://tmap.life/routePlan?goalname=${enc(DEST.name)}&goalx=${DEST.lng}&goaly=${DEST.lat}`
);

const Location = () => {
  return (
    <div>
      {/* 헤더 */}
      <div style={{ padding: "44px 24px 20px", textAlign: "center", background: "var(--card)" }}>
        <div className="section-en gallery-title">Location</div>
        <p className="loc-header-venue">보테가마지오 갤러리아포레<br />G층(B2) 로스파뇨홀</p>
        <p className="loc-header-addr">서울 성동구 서울숲2길 32-14</p>
      </div>

      {/* 약도 이미지 - 지도 부분만 크롭 */}
      <div className="map-img-wrap map-static-wrap">
        <img src={mapImg} alt="보테가마지오 약도" className="map-static-img" />
      </div>

      {/* 장소 정보 */}
      <div className="loc-info">
        <p className="loc-venue">{DEST.name}</p>
        <p className="loc-addr-text">{DEST.addr}</p>

        <div className="nav-btns">
          <button className="nav-btn" type="button" onClick={openNaver}>네이버 지도</button>
          <button className="nav-btn" type="button" onClick={openKakao}>카카오맵</button>
          <button className="nav-btn" type="button" onClick={openTmap}>T map</button>
        </div>
      </div>

      {/* 교통 안내 */}
      <div className="transport-wrap">
        <div className="transport-item">
          <div className="transport-title">지하철</div>
          <div className="transport-body">
            수인분당 서울숲역 5번 출구 도보 최대 5분<br />
            2호선 뚝섬역 8번 출구 도보 최대 10분
          </div>
        </div>
        <div className="transport-item">
          <div className="transport-title">버스</div>
          <div className="transport-body">
            간선 뚝섬서울숲 141, 145, 148, 463<br />
            간선·지선 성동구민종합체육센터 121, 2014, 2224, 2413
          </div>
        </div>
        <div className="transport-item">
          <div className="transport-title">자가용</div>
          <div className="transport-body">
            건물 내 B3-B7 2시간 무료주차<br />
            (안내데스크 주차 등록 시)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
