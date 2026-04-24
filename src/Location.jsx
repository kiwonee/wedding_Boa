const DEST = {
  name: "보테가마지오 갤러리아포레",
  addr: "서울 성동구 서울숲2길 32-14 갤러리아포레 G층",
  lat: 37.5449,
  lng: 127.0368,
};

const enc = (s) => encodeURIComponent(s);

const openWithFallback = (appUrl, webUrl) => {
  window.location.href = appUrl;
  setTimeout(() => { if (!document.hidden) window.open(webUrl, "_blank"); }, 1000);
};

const openNaver = () => openWithFallback(
  `nmap://place?lat=${DEST.lat}&lng=${DEST.lng}&name=${enc(DEST.name)}&appname=${enc(window.location.origin)}`,
  `https://map.naver.com/v5/search/${enc(DEST.name)}`
);

const openKakao = () => openWithFallback(
  `kakaomap://route?ep=${DEST.lat},${DEST.lng}&by=CAR`,
  `https://map.kakao.com/link/to/${enc(DEST.name)},${DEST.lat},${DEST.lng}`
);

const openTmap = () => openWithFallback(
  `tmap://route?goalname=${enc(DEST.name)}&goalx=${DEST.lng}&goaly=${DEST.lat}`,
  `https://tmap.life/routePlan?goalname=${enc(DEST.name)}&goalx=${DEST.lng}&goaly=${DEST.lat}`
);

const Location = () => {
  return (
    <div>
      {/* 지도 iframe */}
      <div className="map-img-wrap">
        <iframe
          title="map"
          src={`https://maps.google.com/maps?q=${enc(DEST.name + " " + DEST.addr)}&t=m&z=16&output=embed&hl=ko`}
          width="100%"
          height="280"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
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
            수인분당선 서울숲역 5번 출구 도보 5분<br />
            2호선 뚝섬역 8번 출구 도보 10분
          </div>
        </div>
        <div className="transport-item">
          <div className="transport-title">주차</div>
          <div className="transport-body">
            갤러리아포레 지하 주차장 이용 가능
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
