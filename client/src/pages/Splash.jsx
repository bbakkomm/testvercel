import LogoDot from "../assets/img/common/logo_broom_nonedot.svg";

function Splash(prop) {
  const { state } = prop;

  return (
    <main className={'splash-ver2' + (state === 'blind' ? ' blind':'')}>
      <div className="title-box">
        <div className="title-box__logo">
          <img src={LogoDot} alt="" className="title-box__logo" />
          <span className="title-box__dot"></span>
        </div>
        
        <p className="title-box__desc">오늘 하루도 갓생을 살아갑니다.</p>
      </div>
    </main>
  );
}

export default Splash