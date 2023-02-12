import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./boardCSS/Modal.css";
import UpdateModal from "../board/UpdateModal";
import { authheader } from "../../service/ApiService";

const DetailBoardModal = (props) => {

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const {
    modalOpen,
    setModalOpen,
    open,
    close,
    header,
    boardContent,
    bno,
    email,
    user_email,
  } = props;

  // const [bno, setBno] = useState(props.bno);
  const [isClicked, setIsClicked] = useState(false);
  const refModal = useRef();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  //외부 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  //외부 클릭시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalOpen && refModal && !refModal.current.contains(e.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section ref={refModal}>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            {user_email === email ?
              (<button className="update" onClick={handleClick}>
                수정
              </button>) : null}
            {isClicked ?
              (<UpdateModal
                open={isClicked}
                close={() => { setIsClicked(false) }}
                header="게시글 수정"
                boardContent={boardContent}
                bno={bno}
                email={email} />) : null}
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default DetailBoardModal;
