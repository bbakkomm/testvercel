import { redirect, useNavigate } from 'react-router-dom';

function ListBox({ 
  objId, complete, index, skillTag, 
  name, date, time, location, cost, 
  participants, imgSrc
}) {
  const navigate = useNavigate();

  const listClickHandler = (e) => {
    const targetLi = e.target.closest('.list__box');
    sessionStorage.setItem('singleStudyValue', targetLi.getAttribute('data-prod'));
    navigate('/study/studydetail');
  }

  return (
    <li className="list__box" key={index} data-prod={objId} onClick={listClickHandler}>
      <div className="list__badge">
        <p className="list__title">{complete}</p>
        <p className="list__skill">{skillTag}</p>
      </div>
      <p className="study_name">{title}</p>
      <div className="study_inner">
        <img src={imgSrc} alt="" className="img_box" />
        <div className="study_info">
          <p>{startDate} ~ {endDate}</p>
          <p>{time}</p>
          <p>{place}</p>
          <p>{price}</p>
          <p>{member}</p>
        </div>
      </div>
    </li>
  );
}

export default ListBox;