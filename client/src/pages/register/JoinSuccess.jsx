import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/common/logo_broom.svg";

const JoinSuccess = () => {
  return (
    <main className="success">
      <div className="success__inner">
        <div className="text">
          <img src={Logo} alt="B.ROOM 로고" className="text__logo" />
          <p className="text__title"><strong>회원가입</strong>이<br />완료되었습니다.</p>
          <p className="text__desc">B.ROMM에 오신 것을 환영합니다!</p>
        </div>
      </div>

      <div className="btn">
        <Link to="/" className="btn-outline">홈으로</Link>
        <Link to="/login" className="btn-bg">로그인</Link>
      </div>
    </main>
  );
}

export default JoinSuccess;