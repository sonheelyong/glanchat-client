import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "./friendsCSS/FriendsList.css";
import { WebsocketOpen } from "../../service/WebSocketTest";
import { authheader } from "../../service/ApiService";

const RequestFriendsList = (props) => {
  const { requsername, requireemail, isRequest } = props;
  const [isUnfollowClicked, setIsUnfollowClicked] = useState(false);
  const [isBlockClicked, setIsBlockClicked] = useState(false);
  const stompClient = useRef(null);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);


  // 유저 정보 불러오기
  useEffect(() => {
    authheader();
    axios
      .get("/user/getintro")
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        alert("유저 정보 불러오기 실패");
        console.error(error);
      });

    WebsocketOpen(setConnected, stompClient, username);
  }, []);

  // 차단
  const block = () => {
    axios
      .put(`/friendlist/block`, {
        params: { requireemail: requireemail },
      })
      .then((res) => {
        setIsBlockClicked(true);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 언팔로우 및 차단 취소
  const unfollowAndBlockCancel = () => {
    axios
      .delete(`/friendlist/block`, {
        params: { oppemail: requireemail },
      })
      .then((res) => {
        setIsUnfollowClicked(true);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(requireemail);
        console.log(error);
      });
  };

  // 팔로우 요청
  const follow = () => {
    axios
      .post(`/friendlist/request`, {
        requireemail: requireemail,
        requsername: requsername,
      })
      .then((res) => {
        setIsUnfollowClicked(false);
        console.log(res.data);
        stompClient.current.send("/app/hello", {}, JSON.stringify({'sendname': username, 'receivename':requireemail,'cont':username+"님이 팔로우 요청을 했어요!"}));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div></div>

      <div className="friendsContent-tab">
        <div className="username">{requsername}</div>
        <div className="state">
          {" "}
          {isRequest ? " • 팔로우 요청중..." : null}{" "}
        </div>
        <div className="btn_tab">
          {isUnfollowClicked ? (
            <button className="followBtn" onClick={follow}>
              팔로우 요청
            </button>
          ) : (
            <button
              className="followingCancelBtn"
              onClick={unfollowAndBlockCancel}
            >
              언팔로우
            </button>
          )}
          {isBlockClicked ? (
            <button className="blockCancelBtn" onClick={unfollowAndBlockCancel}>
              차단해제
            </button>
          ) : (
            <button className="blockBtn" onClick={block}>
              차단
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestFriendsList;
