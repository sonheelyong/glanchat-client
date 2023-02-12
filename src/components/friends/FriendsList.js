import axios from "axios";
import { useEffect, useState } from "react";
import "./friendsCSS/FriendsList.css";

const FriendsList = (props) => {
  const { requsername, requireemail } = props;
  const [isUnfollowClicked, setIsUnfollowClicked] = useState(false);
  const [isBlockClicked, setIsBlockClicked] = useState(false);

  //차단
  const block = () => {
    axios
      .put(`/friendlist/block`, {
        params: { requireemail: requireemail },
      })
      .then((res) => {
        setIsBlockClicked(true);
      })
  };

  //언팔로우, 차단해제
  const unfollowAndBlockCancel = () => {
    axios
      .delete(`/friendlist/block`, {
        params: { oppemail: requireemail },
      })
      .then((res) => {
        setIsUnfollowClicked(true);
      })
  };

  //팔로우
  const follow = () => {
    axios
      .post(`/friendlist/request`, {
        requireemail: requireemail,
        requsername: requsername,
      })
      .then((res) => {
        setIsUnfollowClicked(false);
      })
  };

  return (
    <div>
      <div className="friendsContent-tab">
        <div className="username">{requsername}</div>

        <div className="btn_tab">
          {isUnfollowClicked ? (
            <button className="followBtn" onClick={follow}>
              팔로우
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

export default FriendsList;
