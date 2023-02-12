
import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import './ChatRoom2.css'
import { authheader } from '../../service/ApiService';
import Header from '../Header/Header';
import TextTranslate from '../Reply/TextTranslate';
import UserImg from '../Reply/UserImg';

var stompClient = null;
const ChatRoom = () => {
  const [firstTab, setFirstTab] = useState('');
  const [privateChats, setPrivateChats] = useState(new Map());
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: ''
  });

  const [tab, setTab] = useState('')

  useEffect(()=>{
    if(!privateChats.size > 0){
    for (let index = 0; index < userList.length; index++) {

      const othername = userList[index].requsername

      axios.get('/randomchat/message', {
        params: {
          otherName : othername
        }
      })
      .then(res => {
        const chatContent = res.data
        console.log(chatContent)
        privateChats.set(othername, res.data)
        setPrivateChats(privateChats)
      })
      .catch(res=>{
        console.log(res)
      })
    }
  }
    
  },[userList, privateChats])

  


  //친구목록 불러오기
  useEffect(() => {
    authheader()
    axios.get('/friendlist/consent')
      .then(res => {
        console.log("친구목록", res.data)
        setUserList(res.data)
        setFirstTab(res.data[0].requsername)
      })

    // 내정보
    axios.get('/user/getintro')
      .then(res => {
        setUserData({ ...userData, username: res.data.username })
      })
  }, [userData.username])


  //소켓 연결
  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    userJoin();
  }

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = ["부아아아아아아아아아아아아아아아아아ㅏ"];
      list.push(payloadData);
      console.log("리스트!!!!!!!!!1", list)
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  }
  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "message": value });
  }


  // 메세지보내기
  const sendPrivateValue = (event) => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE"
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      event.preventDefault();
      console.log("프챗", privateChats)
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
    }

  }

  const onError = (err) => {
    console.log(err)
  }

  const StartChat = () => {
    connect();
    setTab(firstTab);
  }


  return (
    <div className='back2' >
      <Header />
      {userData.connected ?

        <div id="contentWrap">
          <div id="contentCover">
            <div id="roomWrap">
              <div id="roomList">
                <div id="roomHeader">친구목록</div>

                {userList.length > 0 && userList.map((user) => (
                  <div key={user.id} id="roomSelect" onClick={() => setTab(user.requsername)}>
                    <div className="roomEl active">
                      <div className="friend-tab-img-box">
                        <UserImg email={user.requireemail} />
                      </div>
                      <div className="friend-tab-name-box">
                        {user.requsername}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="chatWrap">
              <div id="chatHeader">{tab}</div>
              <div id="chatLog">
                {tab !== 'check' &&
                  [...privateChats.get(tab)].map((chat, index) => {
                    return (
                      <li key={index} className="chat-li">
                        {chat.senderName !== userData.username ? (
                          <div className='anotherMsg'>
                            <span className='anotherName'>{chat.senderName}</span>
                            <span className='msg'>{chat.message}</span>
                            <TextTranslate text={chat.message} />
                          </div>
                        ) : (
                          <div className='myMsg'>
                            <span className='msg'> {chat.message}</span>
                          </div>
                        )}
                      </li>)
                  }
                  )}
              </div>
              <form id="chatForm" onSubmit={sendPrivateValue}>
                <input type="text" autocomplete="off" size="30" id="message" placeholder="메시지를 입력하세요" value={userData.message} onChange={handleMessage} />
                <input type="submit" value="보내기" />
              </form>
            </div>
          </div>
        </div>


        :
        <div className='chat-start'>
          <button type="button" onClick={StartChat}>
            채팅 시작
          </button>
        </div>
      }
    </div>
  )
}

export default ChatRoom




