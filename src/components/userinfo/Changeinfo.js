
import axios from 'axios';
import React, { useEffect } from 'react';
import { authheader } from '../../service/ApiService';
import './Changeinfo.css'




export default function Changeinfo() {

    const [username,setUsername] = React.useState('');
    const [newname, setNewname] = React.useState('');
    const [intro,setIntro] =  React.useState('');
    const [check,setCheck] =  React.useState('');
   
   

  useEffect(()=> {
    authheader()
    axios.get('/user/getintro',)
    .then(response => {
        setUsername(response.data.username)
        setNewname(response.data.username)
        setIntro(response.data.intro)
        console.log(response)
    })
    .catch(error => {
        alert("유저 정보 불러오기 실패")
        console.error(error);
    });
  
  }, [])
  

  const changeinfo = () => {  
    if(check !== 0){alert("닉네임 중복확인을 해주세요.")
   }else{
    axios.put('/user/updateinfo', 
  {
      username:newname,
      intro:intro
  })
  .then(function (response) {
    setUsername(response.data.username)
    setNewname(response.data.username)
    setIntro(response.data.intro)
       
      console.log(response)  
      alert("수정완료")   
  })
  .catch(function (error) {
      console.log(error)
  })}}



  const nickcheck = () =>{

    if(newname.length < 2){
        alert("닉네임을 2글자 이상 입력해 주세요.")
    }else{
    axios.get('/auth/byusername', {
        params:{username:newname }
      })
      .then((response) => {
          setCheck(0)
          console.log(response.data)     
          alert("사용 가능한 닉네임 입니다")
       }) 
      .catch((error) => {
      console.log(error)
          alert("중복된 닉네임 입니다")
      })}
  }





  
    
    return (
        <>
            <div className='findIdDiv' >
                <h1 className='h1'>글랜챗</h1>
                
                    <div className='findIdForm'>
                     <h3 className='h3'>{username}</h3>

                     <div className='boxDiv' > 
                          닉네임
                            <input className='tel1'  
                            placeholder='닉네임을 입력해 주세요.' onChange={(e)=>{setNewname(e.target.value)}} 
                            value={newname}></input>  
                        <button className='nickcheck' type='button' onClick={nickcheck}>중복확인</button>                   
                    </div>
                   
                   
                    <div className='boxDiv'>
                           프로필 소개글
                            <textarea className='telBox1' 
                            placeholder='내용을 입력해주세요.' onChange={(e)=>{setIntro(e.target.value)
                            }} value={intro}></textarea>                     
                    </div>
                  
                    

                   
                   
                   <div>
                   <button className='authBtn' type='button' onClick={changeinfo}>저장</button> 
                   </div>

                    </div>          
            </div>
        </>
    );
    }