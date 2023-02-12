import React, { useState, useEffect } from "react";
import axios from "axios";
import "./reply.css"
import { authheader } from "../../service/ApiService";

// 유저의 사진은 이메일을 필요
const UserImg = (email) => {

  //빈 이미지 리스트를 생성
  const [img, setImg] = useState([]);

  //화면이 렌더되고 난 후 axios를 실행
  useEffect(() => {
    //이메일로 유저의 사진 파일 아이디를 가져옴
    authheader()
    axios.get(`http://localhost:8080/auth/getuserimg/${email.email}`)
      .then(result => {
        if (result.data != null) {
          //파일 아이디로 유저의 사진 이름을 들고 옴
          axios.get(`http://localhost:8080/userfile/upload/${result.data}`)
            .then(res => {
              if (res != null) {
                //들고 온 유저의 사진 이름을 빈 이미지 리스트에 저장
                setImg(res)
              }
            }).catch(
            )
        }
      })
  }, [email.email])

  return (
    <>
      {/* 이미지의 길이가 0이 아닐 경우 즉 있을 경우 실행 */}
      {img.length !== 0 && (
        <img
          className="profile"
          src={"resource/" + img.data.filename}
          alt="profileImg"
        />)
      }
    </>
  )

}

export default UserImg