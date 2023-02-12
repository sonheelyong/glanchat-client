
import axios from 'axios';
import React, {  useEffect  } from 'react';
import { authheader } from '../../service/ApiService';
import Switch from './Switch';
import './Userinfo.css'


export default function Alarm() {

    const [username,setUsername] = React.useState('');
    const [value, setValue] = React.useState();
    const [value1, setValue1] = React.useState();
    const [value2, setValue2] = React.useState();
    const [value3, setValue3] = React.useState();

    useEffect(() => {
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
        

    })
    
    useEffect(() => {
        
        axios.get('/alarm',)
        .then(response => {
            console.log(response.data.allAlarm)
          
            console.log(response.data)
            if( response.data.allAlarm === '1'){
                setValue(true)
               
            }else {
                setValue(false)
               
            } 
            if(response.data.followerAlarm === '1'){
                setValue1(true)
            }else{setValue1(false)}
           
            if(response.data.chatAlarm === '1'){
                setValue2(true)
            }else{setValue2(false)}

            if(response.data.replyAlarm === '1'){
                setValue3(true)
            }else{setValue3(false)}
            
        })    
    })

    const handleToggle = (id) => {
        if(id === 0) {
            setValue(!value)      
            axios.put('/alarm/all',)
            .then({             
            })
        };        
        if(id === 1) {
            setValue1(!value1)
            axios.put('/alarm/follow',)
            .then({             
            })
        };
        if(id === 2) {
            setValue2(!value2)
            axios.put('/alarm/chat',)
            .then({             
            })
        };
        if(id === 3) {
            setValue3(!value3)
            axios.put('/alarm/reply',)
            .then({             
            })
        };
    }
    
    
    return (
        <>
            <div className='findIdDiv' >
                <h1 className='h1'>글랜챗</h1>
                
                    <div className='findIdForm'>
                     <h3 className='h3'>{username}</h3>
                     {/* <hr className='hr'/> */}
                     
                    
                    <div className='boxDiv'>
                    전체 알람
                    <Switch isOn={value} handleToggle={() => handleToggle(0)} id={0} />
                    </div>

                    <div className='boxDiv'>
                    팔로워 알람
                    <Switch isOn={value1} handleToggle={() => handleToggle(1)} id={1} />
                    </div>

                    <div className='boxDiv'>
                    채팅 알람
                    <Switch isOn={value2} handleToggle={() => handleToggle(2)} id={2} />
                    </div>

                    <div className='boxDiv'>
                    답글 알람
                    <Switch isOn={value3} handleToggle={() => handleToggle(3)} id={3} />
                    </div>
      
                    </div>
                                    
            </div>

         


        </>
    );
    }