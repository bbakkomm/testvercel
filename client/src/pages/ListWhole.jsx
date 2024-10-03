import React, { useState } from "react";

import jsonData from '../assets/data/listData.json';



const ListWhole = () => {
  
  const [listData, setListData] = useState(jsonData.result);



// // 팝업의 열림 상태를 관리하는 변수
// const [isModalOpen, setIsModalOpen] = useState(false);
// // 팝업을 토글하는 함수
// const toggleModal = () => {
//   setIsModalOpen(!isModalOpen);
// };

// // 희망직무를 관리하는 변수
// const [selectedOption, setSelectedOption] = useState("");
//  // 옵션 선택 시 호출되는 함수
//  const handleSelect = (option) => {
//   setSelectedOption(option);
// };

// // 주요기술을 관리하는 상태 변수
// const [selectedOptions2, setSelectedOptions2] = useState([]);
// // 옵션 선택 시 호출되는 함수
// const handleSelect2 = (option) => {
//   setSelectedOptions2((prevSelected) =>
//     prevSelected.includes(option) ? prevSelected.filter((item) => item !== option) : [...prevSelected, option]
//   );
// };



// //모달창 적용 버튼
// const [inputData, setInputData] = useState("");

// // 입력 데이터 상태 업데이트 함수
//  const handleInputChange = (event) => {
//   setInputData(event.target.value);
// };
// // 데이터를 서버로 보내는 함수
//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("서버로보내는 곳", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: inputData }),
//       });

//       if (response.ok) {
//         alert("성공");
//         setInputData("");
//       } else {
//         alert("희망직무와 주요기술을 선택해주세요");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("에옹에옹에옹에옹에러");
//     }
//   };


  //반복할 데이터 배열
  // studies 라는 변수선언 후 안에 배열을 만든다 key, value로 
  //react의 map이라는 문법을 사용해 함수로 만들고(study) 안에 리스트 반복할 작성문을 담고 
  //li에 key로 id값을 부여 후 반복해서 나와야할 부분에 {study.status} < 이런식으로 값들을 넣어준다! 그러면 알아서 반복해서 나온다
  // const [studies, setStudies] = useState([
    // {
    //   id: 1,
    //   status: "모집중",
    //   name: "MORGAN",
    //   date: "2024.08.01",
    //   time: "오후 02:00",
    //   location: "강남역 4번 출구",
    //   cost: "비용없음",
    //   participants: "최소 4명 ~ 최대 13명",
    //   imgSrc: study_img_tbd //이미지 경로
    // },
    // {
    //   id: 2,
    //   status: "모집중",
    //   name: "DAVID",
    //   date: "2024.08.02",
    //   time: "오후 02:00",
    //   location: "강남역 4번 출구",
    //   cost: "비용없음",
    //   participants: "최소 4명 ~ 최대 13명",
    //   imgSrc: study_img_tbd
    // },
    // {
    //   id: 3,
    //   status: "모집중",
    //   name: "JACOB",
    //   date: "2024.08.03",
    //   time: "오후 02:00",
    //   location: "강남역 4번 출구",
    //   cost: "비용없음",
    //   participants: "최소 4명 ~ 최대 13명",
    //   imgSrc: study_img_tbd
    // },
    // {
    //   id: 4,
    //   status: "모집중",
    //   name: "YUMI",
    //   date: "2024.08.04",
    //   time: "오후 02:00",
    //   location: "강남역 4번 출구",
    //   cost: "비용없음",
    //   participants: "최소 4명 ~ 최대 13명",
    //   imgSrc: study_img_tbd
    // },
    // {
    //   id: 5,
    //   status: "모집중",
    //   name: "YUMI",
    //   date: "2024.08.05",
    //   time: "오후 02:00",
    //   location: "강남역 4번 출구",
    //   cost: "비용없음",
    //   participants: "최소 4명 ~ 최대 13명",
    //   imgSrc: study_img_tbd
    // },
    // {
    //   id: 6,
    //   status: "모집중",
    //   name: "YUMI",
    //   date: "2024.08.06",
    //   time: "오후 02:00",
    //   location: "강남역 4번 출구",
    //   cost: "비용없음",
    //   participants: "최소 4명 ~ 최대 13명",
    //   imgSrc: study_img_tbd
    // },
  // ])

//최신순으로 정렬하는 함수
const sortByLatest = () => {
  const sortedListData = [...listData].sort((a, b) => new Date(b.date) - new Date(a.date));
  setListData(sortedListData);
};



    return (
      <div>
        <div className="select">
          <p className="whole_num">전체 <span className="whole_num__count">{listData.length}</span>개</p>
          <div className="filter">
            <a className="filter__recent" onClick={sortByLatest}>최신순</a>
             {/* 모달 */}
            {/* <a className="filter__popup" onClick={toggleModal}>필터</a> 
             
              {isModalOpen && (
                <div className="modal_overlay" onClick={toggleModal}>
                  <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                    <h2 className="modal_tit">스터디 필터</h2>

                    <div className="filter_inner">

                      <div className="inner01">
                        <p className="inner01__tit">희망직무</p>
                          <div className="options_container" >
                            <div className={`option_box ${selectedOption === "option1" ? "selected" : ""}`} onClick={() => handleSelect("option1")}>기획</div>
                            <div className={`option_box ${selectedOption === "option2" ? "selected" : ""}`} onClick={() => handleSelect("option2")}>디자인</div>
                            <div className={`option_box ${selectedOption === "option3" ? "selected" : ""}`} onClick={() => handleSelect("option3")}>개발</div>
                          </div>
                      </div>
                      <div className="inner02">
                        <p className="inner02__tit">주요기술</p> 
                          <div className="options_container">
                            <div className={`option_box ${selectedOptions2.includes("option1") ? "selected1" : ""}`} onClick={() => handleSelect2("option1")}>HTML</div>
                            <div className={`option_box ${selectedOptions2.includes("option2") ? "selected2" : ""}`} onClick={() => handleSelect2("option2")}>CSS</div>
                            <div className={`option_box ${selectedOptions2.includes("option3") ? "selected3" : ""}`} onClick={() => handleSelect2("option3")}>SCSS</div>
                            <div className={`option_box ${selectedOptions2.includes("option4") ? "selected4" : ""}`} onClick={() => handleSelect2("option4")}>JAVASCRIPT</div>
                            <div className={`option_box ${selectedOptions2.includes("option5") ? "selected5" : ""}`} onClick={() => handleSelect2("option5")}>TYPESCRIPT</div>
                            <div className={`option_box ${selectedOptions2.includes("option6") ? "selected6" : ""}`} onClick={() => handleSelect2("option6")}>REACT</div>
                            <div className={`option_box ${selectedOptions2.includes("option7") ? "selected7" : ""}`} onClick={() => handleSelect2("option7")}>NODE.JS</div>
                            <div className={`option_box ${selectedOptions2.includes("option8") ? "selected8" : ""}`} onClick={() => handleSelect2("option8")}>JAVA</div>
                            <div className={`option_box ${selectedOptions2.includes("option9") ? "selected9" : ""}`} onClick={() => handleSelect2("option9")}>FIGMA</div>
                            <div className={`option_box ${selectedOptions2.includes("option10") ? "selected10" : ""}`} onClick={() => handleSelect2("option10")} >XD</div>
                          </div>
                      </div>

                      <button className="commit" onClick={handleSubmit}>적용</button>
                    </div>
                    <button className="modal_btn" onClick={toggleModal}>닫기</button>
                  </div>
                </div>
              )}*/}
          </div>
        </div>
      </div>
    )
  }
  export default ListWhole