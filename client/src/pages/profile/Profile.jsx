import { useEffect } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// components
import ProfileCard from './components/ProfileCard';
import StudyCard from '../../components/common/studycard/CommonStudyCard';

// CSS style
// import styles from '../../assets/scss/pages/profile/profile.css';

import customFetch from '../../utils/customFetch.js';

export const loader = async ({ req }) => {
  try {
    const res = await customFetch.get('/users/current-user', req);
    const userId = res.data.user._id;
    
    const res1 = await customFetch.get(`/study/like-all/${userId}`, req);

    const res2 = await customFetch.get(`/study/member-all/${userId}`, req);
    
    return [res.data, res1.data, res2.data];
  } catch (error) {
    console.log(error);
    // return redirect('/');
  }
}

const Profile = () => {
  const loadData = useLoaderData();
  const user = loadData[0].user;
  const likes = loadData[1].studys;
  const studys = loadData[2].studys;
  // console.log(likes);

  const navigate = useNavigate();

  const logOutHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('정말 로그아웃하시겠습니까?')) {
      sessionStorage.removeItem('singleStudyValue');
      await customFetch.get('/auth/logout');
      toast.success('로그아웃 되었습니다.');
      navigate('/');
    }
  }

  // 페이지 진입시 ScrollTop
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  const likeList = likes.map((item, idx) => {
    return (
      <StudyCard 
        studyType={'like'}
        key={`study_${idx}`}
        objId={item._id}
        idx={idx}
        title={item.title}
        thumb={item.thumb}
        startDate={item.startDate}
				endDate={item.endDate}
        time={item.time}
        place={item.place}
        price={item.price}
        minimumPerson={item.minimumPerson}
        maximumPerson={item.maximumPerson}
        skillTag={item.skillTag}
        complete={item.complete}
        status={item.status}
        name={item.name}
        location={item.loaction}
        cost={item.cost}
        like={item.like}
      />      
    )
  });

  const studyList = studys.map((item, idx)=>{
    return (
      <StudyCard 
        studyType={'study'}
        key={`study_${idx}`}
        objId={item._id}
        idx={idx}
        title={item.title}
        thumb={item.thumb}
        startDate={item.startDate}
				endDate={item.endDate}
        time={item.time}
        place={item.place}
        price={item.price}
        minimumPerson={item.minimumPerson}
        maximumPerson={item.maximumPerson}
        skillTag={item.skillTag}
        complete={item.complete}
        status={item.status}
        name={item.name}
        location={item.loaction}
        cost={item.cost}
        like={item.like}
      />      
    )
  });

  return (
    <div className="profile">
      <div className="container">

        <ProfileCard 
          userImg={user.thumb} 
          userName={user.name} 
          userEmail={user.email} 
          skillTag={user.skillTag} 
          like={likes.length} 
          studing={studys.length} 
          complate={user.complete} 
        />

        <div className="groupBox">
          <h3 className="groupBox__title">내가 찜한 모임</h3>
          { likes.length ? (likeList) : (<p className="groupBox__empty_txt">찜한 모임이 없습니다</p>)}
        </div>

        <div className="groupBox">
          <h3 className="groupBox__title">내가 활동중인 모임</h3>   
          { studys.length ? (studyList) : (<p className="groupBox__empty_txt">활동중인 모임이 없습니다</p>)} 
        </div>
      </div>
      <div className="btn rebottom">
        <button className="input-submit btn-un btn-bg" onClick={logOutHandler}>로그아웃</button>
      </div>
    </div>
  )
}

export default Profile

