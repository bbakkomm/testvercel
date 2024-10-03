import { useState } from 'react';

// icon
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Modal (props) {
  const { ModalClose } = props;
  const [copied, setCopied] = useState(false);

  const getStudyId = sessionStorage.getItem('singleStudyValue');
  const currentUrl = window.location.href + `?stuid=${btoa(getStudyId)}`;
  const handleCopy = () => {

    navigator.clipboard.writeText(currentUrl).then(
      () => {
        setCopied(true);
        // setTimeout(() => setCopied(false), 2000);
        setTimeout(() => setCopied(false),10000000);
      },
      () => {
        alert("URL 복사에 실패했습니다. 다시 시도해주세요.");
      }
    );
  };

  return (
    <>
      {open ? (
        <>
          <div className="dimmed" onClick={ModalClose} />
          <div className={open && `modal`}>
            <div className="modal__titleWrap">
              <p className="modal__title">링크 공유</p>
              <CloseRoundedIcon onClick={ModalClose} />
            </div>
            <div className="modal__content">
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="modal__input"
              />
              <button onClick={handleCopy} className="modal__btn">
                복사
              </button>
            </div>
            <div className="modal__notice">
              {copied && "URL이 복사되었습니다!"}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

function ShareBtn() {
  const [modal, setModal] = useState(false);

  const ModalOpen = () => {
    setModal(true);
  };

  const ModalClose = () => {
    setModal(false);
  }; 

  return (
      <>
          <button onClick={ModalOpen} className="header__share">
              <ShareOutlinedIcon className="share__icon"/>
          </button>
          {modal ? <Modal ModalClose={ModalClose}/> : null}
      </>
  )
}

export default ShareBtn;