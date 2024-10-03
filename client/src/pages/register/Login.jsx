import React, { useState } from 'react'
import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

// img
import Logo from "../../assets/img/common/logo_broom.svg";
// import Google from "../../assets/img/pages/register/google_logo.png"
// import Kakao  from "../../assets/img/pages/register/kakao_logo.png";
// import Github from "../../assets/img/pages/register/github_logo.png";

// icon 
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';

import Splash from '../Splash';

import FormRow from '../../components/FormRow';
import customFetch from '../../utils/customFetch.js';

export const loader = async () => {

  return null;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    await customFetch.post('/auth/login', data);
    toast.success('로그인 되었습니다.');
    return redirect('/');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [spState, setspState] = useState('');
  setTimeout(() => {
    setspState('blind');
  }, 2500);
  
  return (
    <main className="login">
      <Splash state={spState}/>
      <div className="login__inner">
        <img src={Logo} alt="B.ROOM 로고" className="logo" />

        {/* 로그인 폼 */}
        <Form method='post' className="form-box">
          <fieldset className="form-box__inner">
            <legend className="form-box__title">로그인</legend>

            {/* id */}
            <div className="input-box">
              <FormRow type='uid' name="uid" blind placeholder="아이디"/>
              {/* <p className="validity">이메일을 입력해주세요.</p> */}
            </div>

            {/* pw */}
            <div className="input-box">
              <FormRow type='password' name="password" blind placeholder="비밀번호"/>
              {/* <div className="input-eye">
                <RemoveRedEyeOutlinedIcon className="input-eye__on"/>
                <VisibilityOffSharpIcon className="input-eye__off"/>
              </div> */}
              {/* <p className="validity">비밀번호를 입력해주세요.</p> */}
            </div>
            
            <button type='submit' className="input-submit btn-bg" disabled={isSubmitting}>로그인 {isSubmitting?'...':''}</button>
          </fieldset>
        </Form>

        {/* 찾기 / 회원가입 페이지 이동 버튼 */}
        <div className="register">
          <Link to="/Id" className="register__btn">아이디 찾기</Link>
          <Link to="/Pw" className="register__btn">비밀번호 찾기</Link>
          <Link to="/Join" className="register__btn">회원가입</Link>
        </div>
      
        {/* SNS 계정으로 로그인 버튼 */}
        {/* <div className="sns">
          <p className="sns__title"><strong className="sns__title sns__title--bold">SNS</strong> 계정으로 로그인</p>        
          <div className="sns__btn">
            <Link className="sns__item"><img src={Google} alt="구글 로고" /><span className="blind">구글 로그인</span></Link>
            <Link className="sns__item"><img src={Kakao} alt="카카오톡 로고" /><span className="blind">카카오톡 로그인</span></Link>
            <Link className="sns__item"><img src={Github} alt="깃헙 로고" /><span className="blind">깃헙 로그인</span></Link>
          </div>
        </div> */}
      </div>
    </main>
  )
}

export default Login