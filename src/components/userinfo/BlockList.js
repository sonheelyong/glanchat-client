import React, { useEffect, useState } from "react";
import './BlockList.css';
import { authheader } from "../../service/ApiService";
import axios from "axios";
import UserImg from "../Reply/UserImg";
import BlockListUserName from "./BlockListUserName.js";
import Header from "../Header/Header";

//차단 관리
const BlockList = () => {
  //차단 리스트 빈 리스트로 만들어둔다
  const [blockList, setBlockList] = useState([])

  //렌더 후 차단 목록을 가져온다
  useEffect(()=> {
    authheader()
    axios.get('http://localhost:8080/friendlist/block/0',)
  .then(response => {

    //차단 목록을 저장
    setBlockList(response)
  })
  .catch(error => {
    alert("유저 정보 불러오기 실패")
    console.error(error);
  });
}, [])



  return (
    <>
    <Header />
      {/* 메뉴창 */}
        <div className="BlockListForm">
          <div className="BlockDiv">
            <div>프로필</div>
            <hr className="Block-hr" />
            <div>비밀번호변경</div>
            <hr className='Block-hr' />
            <div>푸시알림</div>
            <hr className='Block-hr' />
            <div>친구관리</div>
            <hr className='Block-hr' />
          </div>
          {/* 차단창 */}
          <hr className='Block-width-hr' />
          <div className="BlockDiv">
            <div>친구관리</div>
            <hr className='Block-hr' />
            {blockList.data != null &&
              blockList.data.map((block) =>
                <div className= "block-profile-div" key={block.id}>
                  <div className="block-profile-box">
                  <UserImg email={block.requireemail}/>
                  </div>
                  <BlockListUserName email={block.requireemail}/>
                </div>
              )}

          </div>
        </div>
    </>
  )
}

export default BlockList