import { useEffect, useState } from "react";
import axios from "axios";
import { authheader } from "../../service/ApiService";

const UserName = (email) => {
  console.log(email)
  const [recommendName,setRecommendName] = useState('')
  authheader()
  useEffect(()=>{
    axios.get(`auth/getusername/${email.email}`)
    .then(res => {
      setRecommendName(res.data)
    })
    
  },[email])
  
  return(recommendName)
}

export default UserName;