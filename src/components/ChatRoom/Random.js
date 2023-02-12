import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import axios from 'axios';
import { authheader } from '../../service/ApiService'
import { Stomp } from '@stomp/stompjs';
import { DotSpinner } from '@uiball/loaders';
import './Random.css';
import TextTranslate from '../Reply/TextTranslate';
import Header from '../Header/Header';



var stompClient =null;
const Random = () => {    
   
    const [status,setStatus] = useState("ready");
    const [messages,setMessages] =useState([]);
    const [roomid, setRoomid] = useState("");
    const [userData, setUserData] = useState({
        username: '',
        connected: false,
        message: ''
      });
      

     // 매치확인
      useEffect(() => {
        const timer = setInterval(() => {
            axios.get('/randomchat/status',{
              params:{
                roomid:roomid}
            }).then(response => {
              setStatus(response.data)
              if(response.data == "match")
              {console.log("매칭됨")
              
              // var chatMessage = {
              //   user1: "admin",
              //   roomid:roomid,
              //   msg:"상대방과 연결 되었습니다.",
              //   status: "MESSAGE"
              // };
              // // event.preventDefault();
              // stompClient.send("/app/random", {}, JSON.stringify(chatMessage));
              // setUserData({ ...userData, "message": "" });
              
               clearInterval(timer)
              }
               })
            
        }, 2000);

        return () => clearInterval(timer);
    },[roomid]);

   // 로그인유저정보
    useEffect(() => {
      authheader()
      axios.get('/user/getintro')
      .then(response => {  
        setUserData({...userData,"username": response.data.username})
    })
    .catch(error => {
        alert("요기요")
        console.error(error);
    });
    }, [userData.username]);

    //채팅 보내기
    const sendMessage = (event) => {
        var chatMessage = {
            user1: userData.username,
            roomid:roomid,
            msg:userData.message,
            status: "MESSAGE"
          };
        if(chatMessage.msg == ""){
          alert("채팅을 입력해주세요")
          event.preventDefault();
          return false;
        }
        event.preventDefault();

        stompClient.send("/app/random", {}, JSON.stringify(chatMessage));
        setUserData({ ...userData, "message": "" });
        
      };

    // 채팅방 만들기
    const registerUser=()=>{
       axios.get('/randomchat',{
        params:{
        username : userData.username }
       }).then(response => {
          setStatus(response.data.status)
          setRoomid(response.data.roomid)
          connect(response.data.roomid)
          
        if(response.data.status == "match"){
          var chatMessage = {
            user1: "admin",
            roomid:roomid,
            msg:"상대방과 연결 되었습니다.",
            status: "MESSAGE"
          };
          // event.preventDefault();
          stompClient.send("/app/random", {}, JSON.stringify(chatMessage));
          setUserData({ ...userData, "message": "" });
        }
})    
.catch(error => {
    console.error(error);
});
      
};

// 소켓연결
function connect(roomid){
  const socket = new SockJS('http://localhost:8080/ws');
          stompClient = Stomp.over(socket);
          stompClient.connect({}, (frame) => {  
          setUserData({...userData,"connected": true});
          stompClient.subscribe('/sub/chat/' + roomid, (message) => {
            var chatMessage = JSON.parse(message.body);
            setMessages((prevState) => [...prevState, chatMessage]);
          });
        
    }, error => {
        console.error(error);
        alert("?")
    });
    
    socket.on("disconnect", () => {
      console.log("Other person disconnected");
      alert("Other person disconnected");
      socket.disconnect();
    });
}

const msghandler= (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "message": value });
  }

  // 채팅방 나가기
  const disconnect = (event) => {
    var chatMessage = {
      user1: "admin",
      roomid:roomid,
      msg:"상대방과의 연결이 끊겼습니다",
      status: "MESSAGE"
    };
    // event.preventDefault();
    stompClient.send("/app/random", {}, JSON.stringify(chatMessage));
    setUserData({ ...userData, "message": "" });
    if (stompClient) {
      stompClient.disconnect();
      console.log("Disconnected");
      window.location.href = "/Random";
    }
    axios.delete("/randomchat",{
      params:{
      roomid : roomid }
     })
   
  }

  


  return (
    <div className='back' >
      <Header/>
        {/* 매치 */}
      { status == "match" ? (
        <div id="contentWrap">
    <div id="contentCover">
        <div id="chatWrap">
            <div id="chatHeader">
              <button className='endbutton' type="button" onClick={disconnect}> 나가기 </button>
              RandomChat
              </div>
            <div id="dddd">
            <div id="chatLog">

            {messages.map((chatMessage, index) => (
               <li key={index} className="randomchat-li">
               {chatMessage.user1 == "admin"? ( 
               <div>
                <span class="msg">{chatMessage.msg} </span>
                <span><button type="submit" onClick={registerUser}> 새로운 대화상대찾기 </button></span>
                
               </div> 
               ) : chatMessage.user1 != userData.username? (
                  <div class="anotherMsg">
                  <span class="anotherName">상대방</span>
                  <span class="msg">{chatMessage.msg}</span>
                  <TextTranslate text={chatMessage.msg} />
                  </div>    
                 ) : (
                  <div class="myMsg">
                  <span class="msg">{chatMessage.msg}</span>
                  </div>
               )}
             </li>
                ))}
            </div>

            <form id="chatForm" onSubmit={sendMessage}>
                <input type="text" autocomplete="off" size="30" id="message" placeholder="메시지를 입력하세요" value={userData.message} onChange={msghandler} />
                <input type="submit" value="보내기"/>
            </form>
            </div>
        </div>
    </div>
</div>
        // 랜덤챗버튼
      ) : status == "ready"? (
        <div>
          <button className='chatstartButton' type="button" onClick={registerUser}>
            랜덤챗 시작
          </button>
        </div>
        // 매칭대기
      ) :  (
        <div id='spinner'>
          <DotSpinner size={300} speed={1.3} color={'#dfb8b8'}  />
         <label className='spinnerLabel'>Matching…</label>
        </div>
      )
        }
    </div>
  );
      };
      export default Random;
  