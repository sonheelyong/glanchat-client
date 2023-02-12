import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [inputemail, SetInputemail] = useState('')
  const [inputpasswd, SetInputpasswd] = useState('')

  const handleInputId = (e) => {
    SetInputemail(e.target.value)
  }

  const handleInputPw = (e) => {
    SetInputpasswd(e.target.value)
  }
  const onClickLogin = () => {
    console.log("로그인클릭");

    axios
      .post("/login", {
        email: inputemail,
        passwd: inputpasswd,
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.email : ", res.data.email);

        if (res.data.email === undefined) {
          console.log(
            "입력하신 id 가 일치하지 않습니다."
          );
          alert("입력하신 id 가 일치하지 않습니다.");

        } else if (res.data.passwd !== inputpasswd) {
          console.log(
            "입력하신 비밀번호 가 일치하지 않습니다."
          );
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data.email === inputemail) {

          console.log("로그인 성공");
          //   sessionStorage.setItem("user_id", inputemail); // sessionStorage에 id를 user_id라는 key 값으로 저장
          //   sessionStorage.setItem("name", res.data.name); // sessionStorage에 id를 user_id라는 key 값으로 저장
        }
        // document.location.href = "/";
      })
      .catch();
  };
  const navigator = useNavigate();

  const onClickRegistry = () => {
    navigator('/Registry')
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor='input_id'>ID : </label>
        <input type='text' name='input_id' value={inputemail} onChange={handleInputId} />
      </div>
      <div>
        <label htmlFor='input_pw'>PW : </label>
        <input type='password' name='input_pw' value={inputpasswd} onChange={handleInputPw} />
      </div>
      <div>
        <button type='button' onClick={onClickLogin}>Login</button>
      </div>
      <div>
        <button type='button' onClick={onClickRegistry}>이메일로 회원가입하기</button>
      </div>
    </div>
  )
}

export default SignUp;
