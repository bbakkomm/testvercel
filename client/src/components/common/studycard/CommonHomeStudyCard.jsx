import { redirect, useNavigate } from 'react-router-dom';

function HomeStudyCard(
  { 
    idx,
    objId, 
    title, 
    thumb,
    date, 
    time, 
    place, 
    price, 
    minimumPerson, 
    maximumPerson,
    skillTag,
    complete,
  }
) {
  const navigate = useNavigate();

  const listClickHandler = (e) => {
    e.preventDefault();
    const targetUl = e.target.closest('.studyCard');
    // console.log(targetUl);
    sessionStorage.setItem('singleStudyValue', targetUl.getAttribute('data-prod'));
    navigate('/study/studydetail');
  }

  return (
    <ul className="studyCard" key={idx} data-prod={objId} onClick={listClickHandler}>
      <li className="studyCard__item">
        <div className="studyBox">
          <div className="studyBox__content">
            <div className="studyBox__image">
              <img src={thumb} alt={title + " 모임 상세보기"} />
            </div>
            <div className="studyBox__text">
              <h3 className="studyBox__title">{title}</h3>
              <div className="skill-tag">
                {complete ? <span className="skill-tag__complate">완료</span> : (<span className="skill-tag__ing">모집중</span>)}
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
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default HomeStudyCard