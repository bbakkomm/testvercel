import { Link } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ProfileCard(
    { 
        userImg, 
        userName, 
        userEmail,
        skillTag,
        like,
        studing,
        complate
    }
  ) {

  return (
    <div className="profile-card">
        <div className="profile-box">
            <div className="img-box profile-box__img">
                <img src={userImg}/>
            </div>
            <div className="profile-box__user">
                <h1 className="profile-box__username">{userName}</h1>
                <p className="profile-box__email">{userEmail}</p>
            </div>
            <Link to="./profileEdit" style={{color: "#000"}}>
              <ArrowForwardIosIcon className="btn_arrowforward"/>
            </Link>
        </div>
        <div className="skill-tag">
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
        <div className="status-box">
            <ul className='status'>
                <li className="status__item">
                    <span className="status__info status__info--like">{like}</span>
                    <span className="status__desc">찜모임</span>
                </li>
                <li className="status__item">
                    <span className="status__info status__info--studing">{studing}</span>
                    <span className="status__desc">활동중</span>
                </li>
                {/* <li className="status__item">
                    <span className="status__info status__info--complate">{complate}</span>
                    <span className="status__desc">완료</span>
                </li> */}
            </ul>
        </div>
    </div>
  )
}

export default ProfileCard