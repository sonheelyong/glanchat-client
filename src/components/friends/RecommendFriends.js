import React, { useEffect, useState } from "react";
import { authheader } from "../../service/ApiService";
import axios from "axios";
import UserImg from "../Reply/UserImg";
import './friendsCSS/Recommend.css';
import UserName from "./UserName";

const RecommendFriends = () => {
  console.log("확인 중")
  

  const [favoriteList, setFavoriteList] = useState([]);
  

  authheader()
  useEffect(() => {
    axios.put('/favoriteList/algorithm')
    .then(res =>{
      console.log('성공했냐')
    })
  }, [])

  useEffect(() => {
    axios.get('/favoriteList/view')
      .then(res => {
        if (res.data != null) {
          console.log(res.data)
          setFavoriteList(res.data)
        }
      })

  }, [])

  return (
    <div className="all-recommend">
      {favoriteList.length > 0 &&
        favoriteList.map((test, idx) => {
          return (
            <div key={idx} className="recommend-container">
              <div className="recommend-box">
                <UserImg email={test} />
              </div>
              <div className="recommend-info">
                <div>
                  {test}
                </div>
                <div>
                  <UserName email={test}/>
                  </div>
                <div className="recommend-button-container">
                  <div>
                    버튼
                  </div>
                  <div>
                    버튼
                    </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )

}

export default RecommendFriends