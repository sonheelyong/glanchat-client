import axios from "axios";
import { authheader } from "../../service/ApiService";
import React, { useEffect, useState, useRef } from "react";
import DetailBoardModal from "./DetailBoardModal";
import "./boardCSS/SearchList.css";
import Reply from "../Reply/Reply";
import { Button } from "@material-ui/core";
import { BsHeartFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import DropDown from "../board/DropDown";
import { WebsocketOpen } from "../../service/WebSocketTest";

const SearchList = ({
  bno,
  createdDate,
  boardContent,
  boardCategory,
  boardHashTag,
  boardWriter,
  email,
}) => {
  authheader();

  const [modalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [color, setColor] = useState("#586d9b");
  const [like, setLike] = useState(0);
  const [user_email, setUser_email] = useState("");
  const [replyCnt, setReplyCnt] = useState(0);

  // 댓글 value
  const [replyVal, setReplyVal] = useState("");
  // 드롭박스 생성
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const stompClient = useRef(null);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);

  const handleComment = (e) => {
    setReplyVal(e.target.value);
  };

  const isModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    axios
      .get(`/reply/request/${bno}`)
      .then((res) => {
        setReplyCnt(res.data);
      })
  }, []);

  //유저 정보 불러오기
  useEffect(() => {
    authheader();
    axios
      .get("/user/getintro")
      .then((response) => {
        setUser_email(response.data.email);
        setUsername(response.data.username);
      })
      .catch((error) => {
        alert("유저 정보 불러오기 실패");
        console.error(error);
      });
  }, []);

  // 댓글 등록
  const saveComment = () => {
    axios
      .post(`/reply/register/${bno}`, {
        replyContent: replyVal,
      })
      .then((res) => {
        window.location.reload();
        stompClient.current.send(
          "/app/hello",
          {},
          JSON.stringify({
            sendname: username,
            receivename: boardWriter,
            cont: username + "님이 댓글을 작성했어요!",
          })
        );
      });
  };

  // 게시글 삭제
  const deleteBoard = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios.delete(`/board/delete/${bno}`).then((res) => {
        console.log(res.data);
      });
      alert("정상적으로 삭제되었습니다.");
      window.location.reload();
    } else {
      return;
    }
  };

  // 좋아요 증가
  const increaseLike = () => {
    axios
      .get("/like/check", {
        params: { bno: bno },
      })
      .then((res) => {
        if (res.data === false) {
          // 좋아요 증가
          axios
            .post(`/like/increase`, {
              bno: bno,
            })
            .then((res) => {
              setLike(like + 1);
              setColor("#ff0000");
              setIsClicked(true);
              console.log(res.data);
              stompClient.current.send(
                "/app/hello",
                {},
                JSON.stringify({
                  sendname: username,
                  receivename: boardWriter,
                  cont: username + "님이 좋아요를 눌렀어요!",
                })
              );
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // 좋아요 감소
          axios
            .post(`/like/decrease`, {
              bno: bno,
            })
            .then((res) => {
              setLike(like - 1);
              setColor("#586d9b");
              setIsClicked(false);
            });
        }
      });
  };

  useEffect(() => {
    //좋아요 아이콘을 유지하기 위해 한번 더 호출
    axios
      .get(`/like/check`, {
        params: { bno: bno },
      })
      .then((res) => {
        if (res.data === true) {
          setColor("#ff0000");
          setIsClicked(true);
        } else {
          setColor("#586d9b");
          setIsClicked(false);
        }
      });

    // 좋아요 갯수 호출
    axios
      .get(`/like/count`, {
        params: { bno: bno },
      })
      .then((res) => {
        setLike(res.data);
      });

    WebsocketOpen(setConnected, stompClient, username);
  }, []);

  // board detail
  useEffect(() => {
    axios.get(`/board/detail/${bno}`).then((res) => {});
  }, []);

  return (
    <div className="searchList">
      {/* 클릭시 자세히 보기 모달창 */}
      <DetailBoardModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        open={modalOpen}
        close={isModal}
        header="상세보기"
        bno={bno}
        boardContent={boardContent}
        email={email}
        user_email={user_email}
      >
        {/* 모든 댓글 */}
        <div className="infoInModal">
          <div className="md-first-tab">
            <div className="md-username">{boardWriter}</div>
            <div className="md-date"> •{createdDate}</div>
            <div className="md-dropbox">
              <BsThreeDots
                className="md-dotIcon"
                size={20}
                onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
              />
              <DropDown className="md-drops" visibility={dropdownVisibility}>
                <ul>
                  {email === user_email ? (
                    <li onClick={deleteBoard}>삭제</li>
                  ) : null}
                  <li>신고</li>
                </ul>
              </DropDown>
            </div>
          </div>
          <div className="md-categoty">{boardCategory}</div>
          <div className="md-inContent">{boardContent}</div>
          <div className="md-hashtag">{boardHashTag}</div>
          <div className="md-like">
            {isClicked ? (
              <BsHeartFill onClick={increaseLike} style={{ color: color }} />
            ) : (
              <BsHeartFill onClick={increaseLike} style={{ color: color }} />
            )}
            {like}
          </div>
        </div>
        <hr />
        <Reply bno={bno} check={"1"} user_email={user_email} />
      </DetailBoardModal>

      {/* 게시판 기본 리스트 */}
      {/* 댓글 하나 */}
      <div className="boardInfo">
        <div className="first-tab">
          <div className="username">{boardWriter}</div>
          <div className="date"> •{createdDate}</div>
          <div className="dropbox">
            <BsThreeDots
              className="md-dotIcon"
              size={20}
              onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
            />
            <DropDown className="drops" visibility={dropdownVisibility}>
              <ul>
                {email === user_email ? (
                  <li onClick={deleteBoard}>삭제</li>
                ) : null}
                <li>신고</li>
              </ul>
            </DropDown>
          </div>
        </div>
        <div className="categoty">{boardCategory}</div>
        <div className="inContent" onClick={isModal}>
          {boardContent}
        </div>
        <div className="hashtag">{boardHashTag}</div>
        <div className="like">
          {isClicked ? (
            <BsHeartFill onClick={increaseLike} style={{ color: color }} />
          ) : (
            <BsHeartFill onClick={increaseLike} style={{ color: color }} />
          )}
          {like}
        </div>
      </div>
      <Reply bno={bno} check={"2"} user_email={user_email} />
      <div>
          {replyCnt.length > 0 ? (
            <div className="moreReply" onClick={isModal}>
              댓글 {replyCnt.length}개 모두 보기
            </div>
          ) : null}
        </div>
      <div className="replyBar">
        <input
          className="inputReply"
          type="text"
          placeholder="댓글 달기"
          value={replyVal}
          onChange={handleComment}
        />
        {replyVal.length > 0 ? (
          <label className="replyBtn" onClick={saveComment}>
            작성
          </label>
        ) : null}
      </div>
    </div>
  );
};

export default SearchList;
