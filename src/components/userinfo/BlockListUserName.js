import React, { useEffect, useState } from "react"
import axios from "axios"
import { authheader } from "../../service/ApiService"
const BlockListUserName = (email) => {
  const [username, setUserName] = useState('');
  authheader()
  useEffect(() => {
  axios.get(`http://localhost:8080/auth/getusername/${email.email}`)
  .then(res =>  {
    console.log(res.data)
    setUserName(res.data)
  })
    .catch(error => {
      alert("유저 정보 불러오기 실패")
      console.error(error);
    });
  }, [])
  
  
  return(
    <>
    {username}
    </>
  )
}

export default BlockListUserName