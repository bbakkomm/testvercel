import { useState, useEffect } from 'react';
import { Link, Form, redirect, useNavigation, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormRow from '../../components/FormRow';
import customFetch from '../../utils/customFetch.js';

// CSS style
// import styles from '../../assets/css/pages/profile/profileedit.css';

export const loader = async ({ req }) => {
  try {
      const getCurrentUser = await customFetch.get(`/users/current-user`, req);

      return getCurrentUser.data;
  } catch (error) {
      console.log(error);
      return redirect('/');
  }
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('thumb');
  const password = formData.get('password');
  const passconfirm = formData.get('passconfirm');

  if (!file) formData.delete('thumb');

  if (file && file.size > 500000) {
    toast.error('파일 용량이 너무 큽니다.');
    return null;
  }

  if (password !== passconfirm) {
    toast.error('비밀번호가 틀립니다. 다시 확인해주세요.');
    return null;
  }

  let skillTags = document.querySelectorAll('[name="skillTag"]');
  let skillArr = Array.from(skillTags)
    .map(item => [item.value, item.checked])
    .filter(item => item[1] === true).map(item => item[0]);
    formData.delete('skillTag');
    skillArr.forEach(value => formData.append('skillTag', value));
  
  try {
    if (window.confirm('정보를 저장하시겠습니까?')) {
      const res = await customFetch.patch('/users/profile-update-user', formData);
      toast.success('나의 정보 수정 완료.');
      return redirect('/profile');
    } else {
      return redirect('/profile/profileEdit');
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ProfileEdit = () => {
  const loadData = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const { user } = loadData;
  const userJob = user.job;
  const skillTags = user.skillTag;

  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // 페이지 진입시 ScrollTop
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="profileEdit">

      <Form method='post' className="form-box" encType='multipart/form-data'>
        <fieldset className="form-box__inner">
          <legend className="form-box__title">프로필 수정</legend>

          {/* 이미지 수정 */}
          <label htmlFor="thumb" className="profileEdit__img">
            {file && <img src={file} className='preview-img' alt="preview-img" />}
            {!file && <img src={user.thumb} className='preview-img' alt="preview-img" />}
          </label>
          <input 
            type="file" 
            id="thumb" 
            name="thumb"
            placeholder="이미지 수정" 
            accept="image/*" 
            className="input-write blind"
            onChange={handleChange}
          />

          {/* id */}
          {/* <FormRow type='uid' name="uid" labelText="아이디" placeholder="아이디" defaultValue={user.uid}/> */}

          {/* nickname */}
          <FormRow type='name' name="name" labelText="닉네임" placeholder="닉네임" defaultValue={user.name}/>

          {/* email */}
          <FormRow type='email' name="email" labelText="이메일" placeholder="이메일" defaultValue={user.email}/>

          {/* pwd */}
          <FormRow type='password' name="password" labelText="비밀번호" placeholder="비밀번호"/>
          
          {/* pwd conf */}
          <label htmlFor="passconfirm" className="input-label hidden">비밀번호 확인</label>
          <input type="password" id="passconfirm" name="passconfirm" placeholder="비밀번호 확인" className="input-write" required/>

          {/* work */}
          <p className="input-label">희망직무</p>
          <div className="select-box">
            <div className="select-box__btn">
              <input type="radio" id="planner" name="work" value="planner" 
              className="select-box__radio select-box__radio--planner" defaultChecked={userJob === 'planner'}/>
              <label htmlFor="planner" className="select-box__text">기획</label>
            </div>

            <div className="select-box__btn">
              <input type="radio" id="designer" name="work" value="designer" 
              className="select-box__radio select-box__radio--designer" defaultChecked={userJob === 'designer'}/>
              <label htmlFor="designer" className="select-box__text">디자인</label>
            </div>

            <div className="select-box__btn">
              <input type="radio" id="developer" name="work" value="developer" 
              className="select-box__radio select-box__radio--developer" defaultChecked={userJob === 'developer'}/>
              <label htmlFor="developer" className="select-box__text">개발</label>
            </div>
          </div>

          {/* skill */}
          <p className="input-label">주요기술</p>
          <div className="select-box">
            <div className="select-box__btn">
              <input type="checkbox" id="html" name="skillTag" value="html" 
              className="select-box__radio select-box__radio--html" defaultChecked={skillTags.includes('html')}/>
              <label htmlFor="html" className="select-box__text">HTML</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="css" name="skillTag" value="css" 
              className="select-box__radio select-box__radio--css" defaultChecked={skillTags.includes('css')}/>
              <label htmlFor="css" className="select-box__text">CSS</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="SCSS" name="skillTag" value="scss" 
              className="select-box__radio select-box__radio--scss" defaultChecked={skillTags.includes('scss')}/>
              <label htmlFor="SCSS" className="select-box__text">SCSS</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="javaScript" name="skillTag" value="javascript" 
              className="select-box__radio select-box__radio--javascript" defaultChecked={skillTags.includes('javascript')}/>
              <label htmlFor="javaScript" className="select-box__text">JavaScript</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="react" name="skillTag" value="react" 
              className="select-box__radio select-box__radio--react" defaultChecked={skillTags.includes('react')}/>              
              <label htmlFor="react" className="select-box__text">React</label>
            </div>

            <div className="select-box__btn">
              <input type="checkbox" id="vue" name="skillTag" value="vue" 
              className="select-box__radio select-box__radio--vue" defaultChecked={skillTags.includes('vue')}/>              
              <label htmlFor="vue" className="select-box__text">Vue</label>
            </div>              

            <div className="select-box__btn">
              <input type="checkbox" id="typescript" name="skillTag" value="typescript" 
              className="select-box__radio select-box__radio--typescript" defaultChecked={skillTags.includes('typescript')}/>              
              <label htmlFor="typescript" className="select-box__text">TypeScript</label>
            </div>      
            
            <div className="select-box__btn">
              <input type="checkbox" id="dart" name="skillTag" value="dart" 
              className="select-box__radio select-box__radio--dart" defaultChecked={skillTags.includes('dart')}/>              
              <label htmlFor="dart" className="select-box__text">Dart</label>
            </div>          
                          
            <div className="select-box__btn">
              <input type="checkbox" id="flutter" name="skillTag" value="flutter" 
              className="select-box__radio select-box__radio--flutter" defaultChecked={skillTags.includes('flutter')}/>              
              <label htmlFor="flutter" className="select-box__text">Flutter</label>
            </div>  

            <div className="select-box__btn">
              <input type="checkbox" id="figma" name="skillTag" value="figma" 
              className="select-box__radio select-box__radio--figma" defaultChecked={skillTags.includes('figma')}/>
              <label htmlFor="figma" className="select-box__text">Figma</label>
            </div>
          </div>

          <div className="profileEdit__info">
            <span className="profileEdit__info__title">소개글</span>
            <textarea
              className="profileEdit__info__textarea"
              id="introduce" 
              name="introduce" 
              cols={10} 
              maxLength={1000} 
              defaultValue={user.introduce}
              required
            />
          </div>

          <div className="profileEdit__btn">
            <button type='submit' className="input-submit btn-bg" disabled={isSubmitting}>프로필 정보 저장 {isSubmitting?'...':''}</button>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}

export default ProfileEdit