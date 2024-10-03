import { Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormRow from '../../components/FormRow';
import customFetch from '../../utils/customFetch.js';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let skillTags = document.querySelectorAll('[name="skillTag"]');
  let skillArr = Array.from(skillTags)
    .map(item => [item.value, item.checked])
    .filter(item => item[1] === true).map(item => item[0]);
    data.skillTag = skillArr;

  try {
    await customFetch.post('/auth/register', data);
    toast.success('회원가입이 완료되었습니다.');
    return redirect('/joinsuccess');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Join = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="join">
      <h2 className="join__title">회원가입</h2>

      <Form method='post' className="form-box">
        <fieldset className="form-box__inner">
          <legend className="form-box__title">회원 가입</legend>

          {/* id */}
          <FormRow type='uid' name="uid" labelText="아이디" placeholder="아이디"/>

          {/* nickname */}
          <FormRow type='name' name="name" labelText="닉네임" placeholder="닉네임"/>

          {/* email */}
          <FormRow type='email' name="email" labelText="이메일" placeholder="이메일"/>

          {/* pwd */}
          <FormRow type='password' name="password" labelText="비밀번호" placeholder="비밀번호"/>
          
          {/* pwd conf */}
          {/* <label htmlFor="passconfirm" className="input-label hidden">비밀번호 확인</label>
          <input type="password" id="passconfirm" name="passconfirm" placeholder="비밀번호 확인" className="input-write"/> */}

          {/* job */}
          <p className="input-label">희망직무</p>
          <div className="select-box">
            <div className="select-box__btn">
              <input type="radio" id="planner" name="job" value="planner" className="select-box__radio select-box__radio--planner" />
              <label htmlFor="planner" className="select-box__text">기획</label>
            </div>

            <div className="select-box__btn">
              <input type="radio" id="designer" name="job" value="designer" className="select-box__radio select-box__radio--designer" />
              <label htmlFor="designer" className="select-box__text">디자인</label>
            </div>

            <div className="select-box__btn">
              <input type="radio" id="developer" name="job" value="developer" className="select-box__radio select-box__radio--developer" />
              <label htmlFor="developer" className="select-box__text">개발</label>
            </div>
          </div>

          {/* skill */}
          <p className="input-label">주요기술</p>
          <div className="select-box">
            <div className="select-box__btn">
              <input type="checkbox" id="html" name="skillTag" value="html" className="select-box__radio select-box__radio--html"/>
              <label htmlFor="html" className="select-box__text">HTML</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="css" name="skillTag" value="css" className="select-box__radio select-box__radio--css"/>
              <label htmlFor="css" className="select-box__text">CSS</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="SCSS" name="skillTag" value="scss" className="select-box__radio select-box__radio--scss"/>
              <label htmlFor="SCSS" className="select-box__text">SCSS</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="javaScript" name="skillTag" value="javascript" className="select-box__radio select-box__radio--javascript"/>
              <label htmlFor="javaScript" className="select-box__text">JavaScript</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="typescript" name="skillTag" value="typescript" className="select-box__radio select-box__radio--typescript"/>
              <label htmlFor="typescript" className="select-box__text">TypeScript</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="react" name="skillTag" value="react" className="select-box__radio select-box__radio--react"/>
              <label htmlFor="react" className="select-box__text">React</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="vue" name="skillTag" value="vue" className="select-box__radio select-box__radio--vue"/>
              <label htmlFor="vue" className="select-box__text">Vue</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="dart" name="skillTag" value="dart" className="select-box__radio select-box__radio--dart"/>
              <label htmlFor="dart" className="select-box__text">Dart</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="flutter" name="skillTag" value="flutter" className="select-box__radio select-box__radio--flutter"/>
              <label htmlFor="flutter" className="select-box__text">Flutter</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="figma" name="skillTag" value="figma" className="select-box__radio select-box__radio--figma"/>
              <label htmlFor="figma" className="select-box__text">Figma</label>
            </div>
          </div>

          {/* reCAPTCHA */}
          {/* <div className="recaptcha">reCAPTCHA</div> */}
          <div className="btn">
            <button type='submit' className="input-submit btn-bg" disabled={isSubmitting}>{isSubmitting?'회원가입중...':'회원가입하기'}</button>
          </div>
        </fieldset>
      </Form>
    </main>
  );
}

export default Join