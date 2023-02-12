import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhoneNumber from '../Registry/PhoneNumber';
import './FindId.css';
import { useNavigate } from "react-router-dom";

export default function FindPw() {
    const navigate = useNavigate();
    const [inputEmail, setInputEmail] = React.useState('');
    const [inputPhone, setInputPhone] = React.useState('');
    const [inputCknum,setInputCknum] =  React.useState('');
    const [ck,setCk] =  React.useState('');
    const [ck2,setCk2] =  React.useState('');

    useEffect(() => {
        if(inputPhone.length === 10){
            setInputPhone(inputPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
            console.log(inputPhone);
        }
        if(inputPhone.length === 13){
            setInputPhone(inputPhone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
            console.log(inputPhone);
        }
    
    }, [inputPhone]);
    
    const changepw = () =>{
        if(inputEmail==""){
            alert("이메일을 입력해주세요")
        }
        else if(ck=="1"){
        navigate("/changepw2",{ state:inputEmail})
       }else{
        alert("휴대폰 인증을 완료해주세요")
        
       }

      
    }
    

    const sendauth = () =>{axios.post('auth/send-one', 
    {
        email: inputEmail,
        phonenumber : inputPhone.replace(/-/g, '')
    }
    )
    .then(function (response) {
        console.log(response)
        alert("인증번호 보냄")
        setCk2("1")
    })
    .catch(function (response) {
       alert("이메일 또는 핸드폰번호를 다시 확인하세요.")
       console.log(inputEmail)
       console.log(inputPhone)
    })
    }

 
    const check = () =>{axios.post('/auth/check', 
    {
        cknum:inputCknum
    }
    )
    .then(function (response) {
        console.log(response)

        alert("인증완료")
        setCk("1")
    })
    .catch(function (error) {
        console.log(error)
        alert("인증번호를 다시 확인해주세요.")
        console.log("ck"+inputCknum)
    })

    }
    
    return (
        <>
            <div className='findIdDiv'>
                <h1 className='h1'>글랜챗</h1>
                
                    <div className='findIdForm'>
                     <h3 className='h3'>비밀번호 찾기</h3>
                     <hr className='hr'/>

                     <div className='boxDiv'>
                            <input className='telBox' type="text" 
                            placeholder='아이디를 입력해주세요.' onChange={(e)=>{setInputEmail(e.target.value)
                                   }} value={inputEmail}></input>
                     </div>

                        <div className='boxDiv'>
                          <PhoneNumber
                          value = {inputPhone}
                          onChange = {(value) => setInputPhone(value)} />
                            <button className='authBtn2' type='button' onClick={sendauth}>인증번호받기</button>                  
                        </div>

                        

                        
                        <div className='boxDiv2'>
                            <input className='authBox' type="text"
                            placeholder='인증번호를 입력해주세요.' onChange={(e)=>{setInputCknum(e.target.value)
                            }} value={inputCknum}></input>
                            <button className='authBtn2' type='button' onClick={check}>인증확인</button>
                        </div>


                        <div>
                        <button className='authBtn3' type='button' onClick={changepw}>확인</button> 
                        </div>
                       

                    </div>
            </div>
           

        </>
    );
}

