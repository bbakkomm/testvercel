import { useState, useEffect } from 'react';
import { Link, Form, json, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

// component
import FormRow from '../../components/FormRow';
import customFetch from '../../utils/customFetch.js';

// icon
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AccessAlarmsRoundedIcon from "@mui/icons-material/AccessAlarmsRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('thumb');

  if (file && file.size > 500000) {
    toast.error('파일 용량이 너무 큽니다.');
    return null;
  }

  let skillTags = document.querySelectorAll('[name="skillTag"]');
  let skillArr = Array.from(skillTags)
    .map(item => [item.value, item.checked])
    .filter(item => item[1] === true).map(item => item[0]);
    formData.delete('skillTag');
    skillArr.forEach(value => formData.append('skillTag', value));
  
  try {
    const res = await customFetch.post('/study', formData);
    toast.success('스터디 생성 완료.');
    return redirect('/study');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function Creation(props) {
  const {study} = props;

  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // 페이지 진입시 ScrollTop
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  return (
    <main className="creation">
      <Form method='post' className="form-box" encType='multipart/form-data'>
        <fieldset className="form-box__inner">
          <legend className="form-box__title">로그인</legend>
          
          {/* img */}
          <div className="input-box input-box--img">
            <label htmlFor="thumb" className="input-label input-label--img">
              {file && <img src={file} alt="preview-img" />}
              {!file && <AddAPhotoOutlinedIcon className="input-label__icon"/>}
              {!file && <p className="input-label__text">스터디 모집 사진을 등록해주세요.</p>}
            </label>
            <input 
              type="file" 
              id="thumb" 
              name="thumb" 
              accept='image/*'
              className="input-write"
              onChange={handleChange}
            />
            <div className="preview"></div>
          </div>

          {/* title */}
          <div className="input-box">
            <label htmlFor="title" className="input-label input-label--require">
              <CreateOutlinedIcon/>
              <p className="blind">제목</p>
            </label>
            <input type="text" id="title" name="title" placeholder="이름" required className="input-write"/>
            <p className="validity blind">제목을 입력해주세요.</p>
          </div>

          {/* calender */}
          <div className="input-box">
            <label htmlFor="startDate" className="input-label input-label--require">
              <CalendarTodayRoundedIcon/>
              <p className="blind">시작 날짜</p>
            </label>
            <input type="date" id="startDate" name="startDate" required className="input-write"/>
            <span className="range">~</span>
            <label htmlFor="endDate" className="input-label blind">마감 날짜</label>
            <input type="date" id="endDate" name="endDate" className="input-write"/>

            <p className="validity blind">날짜를 선택해주세요.</p>
          </div>

          {/* time */}
          <div className="input-box">
            <label htmlFor="time" className="input-label input-label--require">
              <AccessAlarmsRoundedIcon/>
              <p className="blind">시간</p>
            </label>
            <input type="time" id="time" name="time" required className="input-write"/>
          </div>

          {/* place */}
          <div className="input-box">
            <label htmlFor="place" className="input-label input-label--require">
              <PlaceOutlinedIcon/>
              <p className="blind">위치</p>
            </label>
            <input type="text" id="place" name="place" required className="input-write"/>
          </div>

          {/* price */}
          <div className="input-box">
            <label htmlFor="price" className="input-label input-label--require">
              <PaymentsOutlinedIcon/>
              <p className="blind">비용</p>
            </label>
            <input type="number" id="price" name="price" placeholder="비용" className="input-write"/>
          </div>

          {/* people */}
          <div className="input-box">
            <label htmlFor="minimumPerson" className="input-label input-label--require">
              <PeopleAltOutlinedIcon/>
              <p className="blind">최소 인원</p>
            </label>
            <input type="number" id="minimumPerson" name="minimumPerson" placeholder="최소 인원" required className="input-write"/>
            ~            
            <label htmlFor="maximumPerson" className="input-label blind">최대 인원</label>
            <input type="number" id="maximumPerson" name="maximumPerson" placeholder="최대 인원" required className="input-write"/>
          </div>

          {/* skill */}
          <div className="input-box">
            <div className="input-label input-label--require">
              <SettingsOutlinedIcon/>
              <p className="blind">주요기술</p>
            </div>

            <div className="input-check">
              <span>
                <input type="checkbox" id="html" name="skillTag" value="html" className="input-check__item input-check__item--html"/>              
                <label htmlFor="html">HTML</label>
              </span>
              <span>
                <input type="checkbox" id="css" name="skillTag" value="css" className="input-check__item input-check__item--css"/>              
                <label htmlFor="css">CSS</label>
              </span>
              <span>
                <input type="checkbox" id="scss" name="skillTag" value="scss" className="input-check__item input-check__item--scss"/>              
                <label htmlFor="scss">SCSS</label>
              </span>              
              <span>
                <input type="checkbox" id="javascript" name="skillTag" value="javascript" className="input-check__item input-check__item--javascript"/>            
                <label htmlFor="javascript">JavaScript</label>
              </span>
              <span>
                <input type="checkbox" id="react" name="skillTag" value="react" className="input-check__item input-check__item--react"/>              
                <label htmlFor="react">React</label>
              </span>
              <span>
                <input type="checkbox" id="vue" name="skillTag" value="vue" className="input-check__item input-check__item--vue"/>              
                <label htmlFor="vue">Vue</label>
              </span>              
              <span>
                <input type="checkbox" id="typescript" name="skillTag" value="typescript" className="input-check__item input-check__item--typescript"/>              
                <label htmlFor="typescript">TypeScript</label>
              </span>      
              <span>
                <input type="checkbox" id="dart" name="skillTag" value="dart" className="input-check__item input-check__item--dart"/>              
                <label htmlFor="dart">Dart</label>
              </span>          
              <span>
                <input type="checkbox" id="flutter" name="skillTag" value="flutter" className="input-check__item input-check__item--flutter"/>              
                <label htmlFor="flutter">Flutter</label>
              </span>   
              <span>
                <input type="checkbox" id="figma" name="skillTag" value="figma" className="input-check__item input-check__item--figma"/>              
                <label htmlFor="figma">Figma</label>
              </span>        
            </div>
          </div>

          <div className="input-box">
            <label htmlFor="introduce" className="input-label input-label--require">
              <CreateOutlinedIcon/>
              <p className="blind">소개글</p>
            </label>
            <textarea 
            className="input-textarea" 
            id="introduce" 
            name="introduce" 
            cols={10} 
            maxLength={1000} 
            required 
            placeholder="소개글을 입력해주세요. (1,000자 작성 가능)"
            ></textarea>
          </div>
          
          <div className="btn">
            <button type='submit' className="btn-bg">스터디 생성</button>
            {/* { study ? (
              <Link to="/study" className="btn-bg">스터디 생성</Link>
            ):(
              <Link to="/project" className="btn-bg">팀프로젝트 생성</Link>
            )} */}
          </div>
        </fieldset>
      </Form>
    </main>
  )
}

export default Creation