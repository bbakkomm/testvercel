import React from 'react'
import { Link } from 'react-router-dom'

function JoinSetting() {
  return (
    <main className="joinsetting">
      <h2 className="joinsetting__title">회원가입</h2>

      <form action="" className="form-box">
        <fieldset className="form-box__inner">
        
          <legend className="form-box__title">회원 가입</legend>

          {/* nickname */}
          <label htmlFor="nickname" className="input-label">닉네임</label>
          <div className="input-wrap">
            <input type="text" id="nickname" name="nickname" placeholder="닉네임" className="input-write" />
            <button type="button" className="btn-small">중복확인</button>
          </div>

          <div className="btn">
            <Link to="/JoinSuccess" className="btn-un">가입하기</Link>
          </div>
        </fieldset>
      </form>
    </main>
  )
}

export default JoinSetting