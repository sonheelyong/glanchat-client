import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import "./profile.css";
import UserImg from "../Reply/UserImg";
import axios from "axios";
import SearchList from "../board/SearchList";
import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function Profile() {
  const profile = useAxios("/user/getintro");
  const [myBoardList, setMyBoardList] = useState([]);

  useEffect(()=> {
    axios.get('/user/getintro',)
    .then(response => {
        axios
            .get(`/board/profile`, {
                params: {email: response.data.email},
            })
            .then((res) => {
                setMyBoardList(res.data)
                console.log(res.data)
            })
            .catch(error => {
                alert("게시글 불러오기 실패")
                console.error(error);
            })
    })
    .catch(error => {
        alert("유저 정보 불러오기 실패")
        console.error(error);
    });
  }, [])


  return (
    <>
      <Header />
      <div className="profile-Div">
        <div className="profile-form">
          {profile.length !== 0 && (
            <div className="profile-info">
              <div className="profile-box">
                <UserImg email={profile.data.email} />
              </div>
              <div className="profile-info-text">
                <h3 className="h3">{profile.data.username}</h3>
                <h4> {profile.data.intro}</h4>
                <h5></h5>
                <div className="tabs_profile">
                    <input type="radio" name="tab_item_profile" id="profile_board" defaultChecked/>
                    <label className="tab_item_profile" htmlFor="profile_board">게시글</label>
                    <input type="radio" name="tab_item_profile" id="profile_like" />
                    <label className="tab_item_profile" htmlFor="profile_like">좋아요</label>
                    <div className="tab_content" id="profile_board_con">
                        {myBoardList.map((item) => (
                            <SearchList key={item.bno} {...item} />
                        ))}
                    </div>
                    <div className="tab_content" id="profile_like_con">
                        bbb
                    </div>
                </div>
              </div>
            </div>
          )}
          {/* <hr></hr> */}
        </div>
      </div>
      
    </>
  );
}
