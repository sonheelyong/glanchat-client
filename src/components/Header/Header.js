import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { IoChatbubbles } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { BsFillBellFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import WriteModal from "../board/WriteModal";
import DropDown from "../board/DropDown";
import { signout } from "../../service/ApiService";
import Friends from "../friends/Friends";
import FriendsModal from "../friends/FriendsModal";
import axios from "axios";
import WebSocket from "../Websocket"

export default function Header(props) {
  const navigate = useNavigate();

  const [writeModalOpen, setWrtieModalOpen] = useState(false);
  const [friendsModalOpen, setFriendsModalOpen] = useState(false);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [boardWriter, setBoardWriter] = useState("");

  const isWriteModal = () => {
    setWrtieModalOpen(!writeModalOpen);
  };
  const isFriendsModal = () => {
    setFriendsModalOpen(!friendsModalOpen);
  };
  const logout = () => {
    signout();
  };

  useEffect(()=> {
    axios.get('/user/getintro',)
    .then(response => {
        setBoardWriter(response.data.username)
        console.log(response)
    })
    .catch(error => {
        alert("유저 정보 불러오기 실패")
        console.error(error);
    });
  
  }, [])

  return (
    <>
      <header>
      <WebSocket/>
        <div className="tab1">
          <BsFillHouseDoorFill
            className="icon"
            size={40}
            onClick={() => {
              navigate("/board");
              window.location.reload();
            }}
          />
        </div>

        <div className="tab2">{props.children}</div>

        <div className="tab3">

          <BsPencilSquare className="icon" onClick={isWriteModal} size={25} />

          <WriteModal
            open={writeModalOpen}
            close={isWriteModal}
            header="새 게시글 작성"
          />

          <FaTelegramPlane
            className="icon"
            onClick={() => {
              navigate("/chatroom");
            }}
            size={40}
          />

          <IoChatbubbles
            className="icon"
            size={40}
            onClick={() => {
              navigate("/random");
            }}
          />

          <BsPeopleFill className="icon" size={40} onClick={isFriendsModal} />
          <FriendsModal
            open={friendsModalOpen}
            close={isFriendsModal}
            header="친구"
          >
            <Friends />
          </FriendsModal>

          <div className="dropdown-box">
            <BsPersonCircle
              className="icon"
              size={40}
              style={{ color: "#BDBDBD" }}
              onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
            />

            {/* <DropDown2 visibility={dropdownVisibility} /> */}

            <DropDown className="drops" visibility={dropdownVisibility}>
              <ul>
                <li
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  프로필
                </li>
                <li
                  onClick={() => {
                    navigate("/changeinfo");
                  }}
                >
                  프로필 수정
                </li>
                <li
                  onClick={() => {
                    navigate("/changepw");
                  }}
                >
                  비밀번호 변경
                </li>
                <li
                  onClick={() => {
                    navigate("/alarm");
                  }}
                >
                  알람
                </li>
                <li onClick={logout}>로그아웃</li>
              </ul>
            </DropDown>
          </div>
        </div>
      </header>
    </>
  );
}
