import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { authheader, getuser } from '../../service/ApiService';



export default function Changepw() {

    const [username,setUsername] = React.useState('');
    const [newpw, setNewpw] = React.useState('');
    const [cknewpw,setCknewpw] =  React.useState('');
    const [passwd,setPasswd] =  React.useState('');
   
    
   

    

    function getuser() {
      authheader()
      axios.get('/user/getintro',)
          .then(response => {
              setUsername(response.data.username)
              console.log(response)
          })
          .catch(error => {
              alert("유저 정보 불러오기 실패")
              console.error(error);
          });
  }

  getuser()

  
  const changepw = () => {
    let regex1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (cknewpw !== newpw) {
        alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.")
        return;
    } if(regex1.test(newpw) === false){
       alert("올바른 비밀번호 형식을 입력해주세요.")
       return;
    }
    authheader()
    axios.put("/user/changepw",{
        newpw:newpw,
        chkpw:passwd
    })
    .then(function(response){
        console.log(response)
        alert("바말번호 변경 완료.")
        window.location.href = "/login"
    })
    .catch(function(error){
        console.log(error)
        alert("비밀번호를 다시 확인해 주세요.")
    })
   } 

   const ckchange = (e) =>{
      setCknewpw(e.target.value)
   }

   const coment1 = useMemo(() => {
    let regex1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if(newpw === "" ){
        return ""
    }else if(regex1.test(newpw) === false){
        return <span style={{color: 'red'}}>"6자리 이상,영문,숫자조합의 비밀번호를 입력해주세요"</span>
    }else{
        return <span style={{color: 'green'}}>사용 가능한 비밀번호 입니다.</span>
    }
}, [newpw])
    
    
const coment2 = useMemo(() => {
    if(cknewpw === "" || newpw === "" ){
        return ""
    }else if(cknewpw === newpw){
        return <span style={{color: 'green'}}>새 비밀번호와 일치합니다</span>
    }else{
        return <span style={{color: 'red'}}>새 비밀번호와 일치 하지 않습니다</span>
    }
}, [cknewpw, newpw])

    

    
   
    
    
    return (
        <>
            <div className='findIdDiv' >
                <h1 className='h1'>글랜챗</h1>
                
                    <div className='findIdForm'>
                     <h3 className='h3'>{username}</h3>
                     {/* <hr className='hr'/> */}

                     <div className='boxDiv' > 
                          이전비밀번호
                            <input className='telBox' type="password" 
                            placeholder='이전 비밀번호를 입력해주세요.' onChange={(e)=>{setPasswd(e.target.value)
                            }} value={passwd}></input>                     
                    </div>
                   
                    <div className='boxDiv'>
                           새 비밀번호
                            <input className='telBox' type="password" 
                            placeholder='새 비밀번호를 입력해주세요.' onChange={(e)=>{setNewpw(e.target.value)
                            }} value={newpw}></input>                     
                    </div>
                    <div>
                     {coment1}
                     </div>

                    <div className='boxDiv'>
                           새 비밀번호 확인
                            <input className='telBox' type="password" 
                            placeholder='새 비밀번호 확인.' onChange={ckchange} value={cknewpw}></input>                     
                    </div>
                     <div>
                     {coment2}
                     </div>
                   
                   <div>
                   <button className='authBtn' type='button' onClick={changepw}>수정</button> 
                   </div>



                    </div>
                   
                    
            </div>

         


        </>
    );
    }