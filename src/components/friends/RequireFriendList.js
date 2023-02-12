import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "./friendsCSS/FriendsList.css";
import { WebsocketOpen } from "../../service/WebSocketTest";
import { authheader } from "../../service/ApiService";

const RequireFriendsList = (props) => {
  const { requsername, requireemail } = props;
  const [isUnfollowClicked, setIsUnfollowClicked] = useState(false);
  const [isBlockClicked, setIsBlockClicked] = useState(false);
  const stompClient = useRef(null);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);


  // 유저 정보 불러오기
  useEffect(() => {
    authheader();
    axios.get("/user/getintro").then((response) => {
      setUsername(response.data.username);
    });
    WebsocketOpen(setConnected, stompClient, username);
  }, []);

  // 팔로우 승낙
  const follow = () => {
    axios
      .put("/friendlist/consent", {
        requireemail: requireemail,
      })
      .then((res) => {
        setIsUnfollowClicked(!isUnfollowClicked);
        console.log(res.data);
        stompClient.current.send(
          "/app/hello",
          {},
          JSON.stringify({
            sendname: username,
            receivename: requireemail,
            cont: username + "님과 팔로우가 됐어요!",
          })
        );
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

  return (
    <div>
      <div></div>

      <div className="friendsContent-tab">
        <div className="username">{requsername}</div>
        <div className="btn_tab">
          {isUnfollowClicked === false ? (
            <button className="followBtn" onClick={follow}>
              팔로우 승낙
            </button>
          ) : (
            <button
              className="followingCancelBtn"
              onClick={unfollowAndBlockCancel}
            >
              언팔로우
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequireFriendsList;
