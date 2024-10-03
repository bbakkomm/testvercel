import { useEffect, useState } from 'react';
import { Link, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

// api
import customFetch from "../utils/customFetch.js";
// Swiper
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import Logo from "../assets/img/common/logo_broom.svg";

// DB
// import studyJson from '../assets/data/studyData.json';
import HomeStudyCard from '../components/common/studycard/CommonHomeStudyCard';

// const datttId = '66f18c4a2a30944fef4c41e2';

export const loader = async ({ req }) => {
  try {
    const tp = await customFetch.get('/users/current-user', req);
    const res = await customFetch.get('/study', req);
    return res.data;
  } catch (error) {
    console.log(error);
    return redirect('/login');
  }
}

function Home() {
  const loadData = useLoaderData();
  const { studys } = loadData;
  // console.log(studys);

  const [studyCard, setStudyCard] = useState(studys);
  const [search, setSearch] = useState('');

  const studyList = studyCard.map((item, idx)=>{
    return (
      <HomeStudyCard
        key={'hsc_' + nanoid()}
        idx={idx}
        objId={item._id}
        title={item.title}
        thumb={item.thumb}
        date={item.date}
        time={item.time}
        place={item.place}
        price={item.price}
        minimumPerson={item.minimumPerson}
        maximumPerson={item.maximumPerson}
        skillTag={item.skillTag}
        complete={item.complete}
      />
    );
  });


  useEffect(()=>{
    const filter = studys.filter((item)=>{
      return item.title.toLowerCase().includes(search.toLowerCase())
    })
    setStudyCard(filter);
  }, [search])

  const titleChange = (e)=>{
    setSearch(e.target.value)
  }

  return (
    <div className="broom">
      <header className="main-header">
        <h1 className="main-header__title">
          <Link to="/" title="BROOM" className="main-header__link">
            <img src={Logo} alt="B.ROOM 로고" className="logo" />
          </Link>
        </h1>
      </header>
      <div className="kv">
        <Swiper
          modules={[EffectFade, Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          effect={"fade"}
          // navigation={true}
        >
          <SwiperSlide>
            <div className="banner-box">
              <img src="https://res.cloudinary.com/dvlunddak/image/upload/v1727639093/banner_01.webp" alt="" />
              <p className="banner-box__title">찾았다! <br/>지금 가장 핫한 스터디 Top5 👑</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner-box">
              <img src="https://res.cloudinary.com/dvlunddak/image/upload/v1727639093/banner_02.gif" alt="" />
              <p className="banner-box__title banner-box__title--black">B.ROOM과 함께 <br/>단계별 스터디 찾기 🚀</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner-box">
              <img src="https://res.cloudinary.com/dvlunddak/image/upload/v1727639093/banner_03.webp" alt="" />
              <p className="banner-box__title">내 취향에 맞는 <br/>스터디 찾기 꿀팁은? 💕</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <section className="study-home">
        <p className="study-home__sub">가장 최근 등록된 스터디를 만나보세요!</p>
        <h3 className="study-home__title">지금 가장 핫한 신규 스터디</h3>
        {/* <input type="text" value={search} placeholder="검색어를 입력하세요" onChange={titleChange} /> */}
        <div className="study-home__cont">{studyList}</div>
      </section>
    </div>
  );
}

export default Home