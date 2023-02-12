import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FindId.css';
import PhoneNumber from '../Registry/PhoneNumber';

export default function FindId() {

    const [inputValue, setInputValue] = useState('');
    const [email,setEmail] =  useState('');

    
    const handleChange = (e) => {
            setInputValue(e);
    }

    useEffect(() => {
        if(inputValue.length === 10){
            setInputValue(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
            // setInput(inputValue);
            console.log(inputValue);
            // console.log(input);
        }
        if(inputValue.length === 13){
            setInputValue(inputValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
            // setInput(inputValue);
            console.log(inputValue);
            // console.log(input);
        }
    
    }, [inputValue]);

    const findemail = () => {
        axios.post('auth/getemail', 
    {
        phonenumber: inputValue.replace(/-/g, '')
    }
    )
    .then(function (response) {
        console.log(response)
        setEmail(response.data.email);
    })
    .catch(function (error) {
        console.log(error)
        console.log(inputValue.replace(/-/g, ''))
        alert("핸드폰 번호를 다시 확인해 주세요.");
    })}

    

    
    
    return (
        <>
            <div className='findIdDiv'>
                <h1 className='h1'>글랜챗</h1>
                
                    <div className='findIdForm'>
                     <h3 className='h3'>아이디 찾기</h3>
                     <hr className='hr'/>
                    
                        <div className='boxDiv'>
                            <PhoneNumber 
                            value= {inputValue}
                            onChange={(value) => handleChange(value)}/>
                        
                            {/* <input className='telBox' type="text" 
                            placeholder='휴대폰 번호를 입력해주세요.' onChange={handleChange} value={inputValue}></input> */}
                            <button onClick={findemail}>
                                아이디 찾기
                            </button>
                            {/* <button className='authBtn' type='button'>확인</button> */}
                        </div>

                        <div>
                           {email}
                        </div>

                        <div className='boxDiv3'>
                            <Link to='/findPw'>비밀번호 찾기</Link>
                        </div>
                    </div>
            </div>

        </>
    );
    }

