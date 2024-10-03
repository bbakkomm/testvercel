import { redirect, useLocation, useNavigate, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../../utils/customFetch.js';

// icon
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import AccessAlarmsRoundedIcon from "@mui/icons-material/AccessAlarmsRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function StudyCard(
  { 
    studyType,
    idx, 
    objId,
    title, 
    thumb,
    startDate, 
    endDate, 
    time, 
    place, 
    price, 
    minimumPerson, 
    maximumPerson,
    skillTag,
    complete,
    like
  }
) {
  const currentLocation = useLocation().pathname;
  const navigate = useNavigate();
  const loadData = useLoaderData();

  let studys = []
  let currentUserId = '';

  if (studyType === 'all') {
    studys = loadData[0].studys;
    currentUserId = loadData[1].data.user._id;
  } else if (studyType === 'like') {
    currentUserId = loadData[0].user._id;
    studys = loadData[1].studys;
  } else if (studyType === 'study') {
    currentUserId = loadData[0].user._id;
    studys = loadData[2].studys;
  }
  
  const getCurrentStudy = studys.find(v => v._id === objId);
  // let likes = like;
  let likeArr = getCurrentStudy.like;
  let isLike = likeArr.includes(currentUserId);

  const listClickHandler = (e) => {
    e.preventDefault();

    const targetUlAttr = e.target.closest('.studycard').getAttribute('data-prod');
    sessionStorage.setItem('singleStudyValue', targetUlAttr);
    navigate('/study/studydetail');
  }

  const likeClickHandler = async (e) => {
    e.stopPropagation();
    let likeState = '';

    try {
        if (!isLike) {
            likeArr.push(currentUserId);
            likeState = '찜 추가되었습니다.';
        } else {
            likeArr = likeArr.filter(value => value !== currentUserId);
            likeState = '찜 해제되었습니다.';
        }

        let formData = { like: likeArr }
        const res = await customFetch.patch(`/study/${objId}`, formData);

        toast.success(likeState);
        navigate(currentLocation);
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
  }

  return (
    <ul className="studycard" key={idx} data-prod={objId} onClick={listClickHandler}>
      <li className="studycard__item">
        <div className="skill-tag">
          {
            complete
            ? (<span className="skill-tag__complate">완료</span>)
            : (<span className="skill-tag__ing">모집중</span>)
          }
          {
              skillTag.includes('javascript')
              ? (<span className="skill-tag__javascript">JavaScript</span>)
              : ''
          }
          {
              skillTag.includes('react')
              ? (<span className="skill-tag__react">React</span>)
              : ''
          }
          {
              skillTag.includes('vue')
              ? (<span className="skill-tag__vue">Vue</span>)
              : ''
          }
          {
              skillTag.includes('typescript')
              ? (<span className="skill-tag__typescript">TypeScript</span>)
              : ''
          }
          {
              skillTag.includes('dart')
              ? (<span className="skill-tag__dart">Dart</span>)
              : ''
          }
          {
              skillTag.includes('flutter')
              ? (<span className="skill-tag__flutter">Flutter</span>)
              : ''
          }
          {
              skillTag.includes('html')
              ? (<span className="skill-tag__html">HTML</span>)
              : ''
          }
          {
              skillTag.includes('css')
              ? (<span className="skill-tag__css">CSS</span>)
              : ''
          }
          {
              skillTag.includes('scss')
              ? (<span className="skill-tag__scss">SCSS</span>)
              : ''
          }
          {
              skillTag.includes('figma')
              ? (<span className="skill-tag__figma">Figma</span>)
              : ''
          }
        </div>
        <div className="study-box">
          <h3 className="study-box__title">{title}</h3>
          <div className="study-box__content">
            <div className="study-box__image">
              <img src={thumb} alt={title + ' 모임 상세보기'} />
            </div>
            <ul className="study-box__list">
              <li className="study-box__item">
                <CalendarTodayRoundedIcon />
                <span className="study-box__desc">{startDate} ~ {endDate}</span>
              </li>
              <li className="study-box__item">
                <AccessAlarmsRoundedIcon />
                <span className="study-box__desc">{time}</span>
              </li>
              <li className="study-box__item">
                <PlaceOutlinedIcon />
                <span className="study-box__desc">{place}</span>
              </li>
              <li className="study-box__item">
                <PaymentsOutlinedIcon />
                <span className="study-box__desc">{Number(price).toLocaleString('ko-KR')}</span>
              </li>
              <li className="study-box__item">
                <PeopleAltOutlinedIcon />
                <span className="study-box__desc">최소 {minimumPerson}명 ~ 최대 {maximumPerson}명</span>
              </li>
            </ul>
          </div>
          <button className="btn-like" onClick={likeClickHandler}>
            {isLike 
              ? <FavoriteOutlinedIcon style={{color: '#FB744A', width:'2.2rem', height: '2rem'}} /> 
              : <FavoriteBorderOutlinedIcon style={{color: '#FB744A', width:'2.2rem', height: '2rem'}} />
            }
          </button>
        </div>
      </li>
    </ul>
  )
}

export default StudyCard